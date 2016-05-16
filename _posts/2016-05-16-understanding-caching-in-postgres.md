---
layout: post
title: "Understanding caching in Postgres - An in-depth guide"
permalink: blog/understanding-postgres-caching-in-depth
---

##Caching

Caching can be considered an important aspect in tuning database system performance.
     
While this post is mainly focused on postgres, it can be easily compared and understood with other database systems.

<i class="fa fa-list-ul fa-lg space-right"></i>Index

- [What is a cache and why do we need one?](#CachePurpose)
- [Understanding terminologies](#StorageAbs)
- [What is cached?](#Contents)
- [Memory areas](#MemoryAreas)
- [The LRU/Clock sweep cache algorithm](#LRU)
- [Dirty pages and cache invalidation](#DirtyPages)
- [Understanding caches from explain analyze](#CacheExplain)
- [The case for sequential scans](#SeqScans)
- [Memory flow and OS caching](#OSCaching)
- [Initial configuration](#Initial)
- [Optimize as you go](#Optimize)
- [References](#References)

<br>

<a name="CachePurpose"><u>What is a cache and why do we need one</u></a>

Different computer components operate at different speeds.We humans are extremely poor at understanding numbers at the scale that computers do.

Looking at the table below (taken from [here](http://blog.codinghorror.com/the-infinite-space-between-words/){:target="_blank"}) we can have an idea.

The numbers are approximated at human scale.

<table border="1"> 
    <tbody>
    <tr><td>1 CPU cycle</td><td>0.3 ns</td><td>1 s</td></tr>
    <tr><td>Level 1 cache access</td><td>0.9 ns</td><td>3 s</td></tr>
    <tr><td>Level 2 cache access</td><td>2.8 ns</td><td>9 s</td></tr>
    <tr><td>Level 3 cache access</td><td>12.9 ns</td><td>43 s</td></tr>
    <tr><td>Main memory access</td><td>120 ns</td><td>6 min</td></tr>
    <tr><td>Solid-state disk I/O</td><td>50-150 μs</td><td>2-6 days</td></tr>
    <tr><td>Rotational disk I/O</td><td>1-10 ms</td><td>1-12 months</td></tr>
    <tr><td>Internet: SF to NYC</td><td>40 ms</td><td>4 years</td></tr>
    <tr><td>Internet: SF to UK</td><td>81 ms</td><td>8 years</td></tr>
    <tr><td>Internet: SF to Australia</td><td>183 ms</td><td>19 years</td></tr>
    </tbody>
</table>

<br>

In a database system, we are mainly concerned about disk I/O.

Magnetic disks are poor for random I/O when compared to their newer counterparts the SSDs.

Most [OLTP](https://en.wikipedia.org/wiki/Online_transaction_processing){:target="_blank"} workloads are random I/O,hence the fetch from the disk can be very slow.
 
To overcome this, postgres caches data in RAM which can greatly improves performance.Even in the case of SSDs,RAM is much faster.

This general idea of a cache is common to almost all database systems.

<a name="StorageAbs"><u>Understanding terminologies</u></a>

Before we move forward, it is necessary to understand certain terminologies.

I suggest to start reading with [this](http://rachbelaid.com/introduction-to-postgres-physical-storage/){:target="_blank"} excellent article.

Once you are done with that, [here](http://www.interdb.jp/pg/pgsql01.html){:target="_blank"} is an another one which goes in a little more depth.In particular, the section about heap tuples.

The official documentation for this is also [available](http://www.postgresql.org/docs/current/static/storage.html){:target="_blank"}, but it is a little hard to get 
your head around.

Regardless of the content, postgres has a storage abstraction called a page(8KB in size).The image below gives a rough idea.

<a class="image" href="/images/postgres_page_structure.png">
<img src="/images/postgres_page_structure.png" alt="Postgres page"/>
</a>

This abstraction is what we will be dealing with in the rest of this post.

<a name="Contents"><u>What is cached?</u></a>

Postgres caches the following.

- Table data

  This is actual content of the tables.
- Indexes

  Indexes are also stored in 8K blocks.They are stored in the same place as table data, see [Memory areas](#MemoryAreas) below. 
- Query execution plans

  When you look at a query execution plan, there is the stage called the planning stage, which basically selects the best plan suited for the query.
  Postgres can cache the plans as well, which is on a per session basis and once the session is ended, the cached plan is thrown away.This can be tricky to optimize/analyze, but
  generally of less importance unless the query you are executing is really complex and/or there are a lot of repeated queries.
  
  The [documentation](http://www.postgresql.org/docs/current/static/sql-prepare.html){:target="_blank"} explains those in detail pretty well.We can query <code>pg_prepared_statements</code> to see what is cached.Note that
  it is not available across sessions and visible only to the current session.
  
We will explore how table data and indexes are cached in detail further in this post.

<a name="MemoryAreas"><u>Memory areas</u></a>

Postgres has several configuration parameters and understanding what they mean is really important.

For caching, the most important configuration is the [shared_buffers](http://www.postgresql.org/docs/current/static/runtime-config-resource.html#GUC-SHARED-BUFFERS){:target="_blank"}.

Internally in the postgres source code, this is known as the NBuffers, and this where all of the shared data sits in the memory.

The shared_buffers is simply an array of 8KB blocks.Each page has metadata within itself to distinguish itself as mentioned above.Before postgres checks out the data from the disk,
it first does a lookup for the pages in the shared_buffers, if there is a hit then it returns the data from there itself and thereby avoiding a disk I/O.

<a name="LRU"><u>The LRU/Clock sweep cache algorithm</u></a>

The mechanisms involved in putting data into a cache and evicting from them is controlled by a clock sweep algorithm.

It is built to handle OLTP workloads, so that almost all of the traffic are dealt with in memory.

Let's talk about each action in detail.

<u>Buffer allocation</u>

Postgres is a process based system, i.e each connection has a native OS process of its own which is spawned from the postgres root process(previously called postmaster).

When a process requests for a page in the LRU cache (this is done whenever that page is accessed via a typical SQL query),it requests for a buffer allocation.

If the block is already in cache, it gets pinned and then returned.The process of pinning is a way to increase the usage count discussed below.A page is said to be unpinned
when the usage count is zero.

Only if there are no buffers/slots free for a page, then it goes for buffer eviction.
 
<u>Buffer eviction</u>

Deciding which pages should be evicted from memory and written to disk is a classic computer science problem.

A plain LRU(Least Recently Used) algorithm does not work well in reality since it has no memory of the previous run.

Postgres keeps track of page usage count, so if a page usage count is zero, it is evicted from memory and written to disk.It is also written to disk when the page is dirty (see below).

Regardless of the nitty-gritty details, the cache algorithm by itself requires almost no tweaking and is much smarter than what people would usually think.

<a name="DirtyPages"><u>Dirty pages and cache invalidation</u></a>

We were talking about select queries till now, what happens to DML queries ?

Simple, they get written to the same pages.If they are memory, then they are written to it or else they are fetched from memory and written to it.

This is where the notion of dirty pages come in, i.e a page has been modified and has not been written to disk.

Here is some more homework/study to be done, before we proceed, in particular about WAL and checkpoints [here](http://www.interdb.jp/pg/pgsql09.html){:target="_blank"}.

WAL is a redo log that basically keeps track of whatever that is happening to the system.This is done by logging all changes separately to a WAL Log.Checkpointer is a process
which writes the so called dirty pages to disk periodically and controlled by a time setting.It does so, because when the database crashes it need to replay everything from scratch.

This is the most common way of pages getting evicted from memory, the LRU eviction almost never happens in a typical scenario.

<a name="CacheExplain"><u>Understanding caches from explain analyze</u></a>

Explain is a wonderful way to understand what is happening under the hoods.It can even tell how much data blocks came from disk and how much came from shared_buffers
i.e memory.

A query plan below gives an example,

<a class="image" href="/images/postgres-read.png">
<img src="/images/postgres-read.png" alt="Postgres Buffers Read"/>
</a>

Shared read, means it comes from the disk and it was not cached.If the query is run again, and if the cache configuration is correct (we will discuss about it below),
it will show up as shared hit.

<a class="image" href="/images/postgres-shared-hit.png">
<img src="/images/postgres-shared-hit.png" alt="Postgres Shared Hit"/>
</a>

It is very convenient this way to learn about how much is cached from a query perspective rather than fiddling with the internals of the OS/Postgres.

<a name="SeqScans"><u>The case for sequential scans</u></a>

A sequential scan i.e when there is no index and postgres has to fetch all the data from disk are a problem area for a cache like this.

Since a single seq scan can wipe all of the data from a cache, it is handled differently.

Instead of using a normal LRU/clock sweep algorithm, it uses a series of buffers of total 256 K.B in size.The below queries show how it is handled.

<code data-gist-id="333e6662b7b78220c6292d575aaf091d"></code>

Executing the above query again.

<code data-gist-id="81e0d7cd6735a76d9642cd273f054171"></code>

We can see that exactly 32 blocks have moved into memory i.e 32 * 8 = 256 KB.This is explained in the [src/backend/storage/buffer/README](https://github.com/postgres/postgres/blob/master/src/backend/storage/buffer/README#L208){:target="_blank"}

<a name="OSCaching"><u>Memory flow and OS caching</u></a>

Postgres as a cross platform database, relies heavily on the operating system for its caching.

The shared_buffers is actually duplicating what the OS does.A typical picture of how the data flows through postgres is given below.

<a class="image" href="/images/postgres-cache-flow.png">
<img src="/images/postgres-cache-flow.png" alt="Postgres Cache flow"/>
</a>

This is confusing at first, since caching is managed by both the OS and postgres as well, but there are reasons to this.

Talking about operating system cache requires another post of its own, but there are many resources on the net which can leveraged.

Keep in mind that the OS caches data for the same reason we saw above, i.e why do we need a cache ?

We can classify the I/O as two types, i.e reads and writes.To put it even more simpler, data flows from disk to memory for reads and flows from memory to disk for writes.

<u>Reads</u>

For reads, when you consider the flow diagram above, the data flows from disk to OS cache and then to shared_buffers.We have already discussed how the pages will get
pinned on to the shared_buffers until they get dirty/unpinned.

Sometimes, both the OS cache and shared_buffers can hold the same pages.This may lead for space wastage, but remember the OS cache is using a simple LRU and not a database
optimized clock sweep.Once the pages take a hit on shared_buffers, the reads never reach the OS cache, and if there are any duplicates, they get removed easily.

In reality, there are not much pages which gets stacked on both the memory areas.

This is one of the reasons why it is advised to size the shared_buffers carefully.Using hard and fast rules such as giving it the lion's share of the memory or
giving it too little is going to hurt performance.

We will discuss more on optimization below.

<u>Writes</u>

Writes flow from memory to disk.This is where the concept of dirty pages come in.

Once a page is marked dirty, it gets flushed to the OS cache which then writes to disk.This is where the OS has more freedom to schedule I/O based on the incoming traffic.

As said above, if the OS cache size is less, then it cannot re-order the writes and optimize I/O.This is particularly important for a write heavy workload.So the OS cache size
is important as well.

<a name="Initial"><u>Initial configuration</u></a>

As with many database systems,there is no silver bullet configuration which will just work.PostgreSQL ships with a basic configuration tuned for wide compatibility rather than performance.

It is the responsibility of the database administrator/developer to tune the configuration according to the application/workload.
However, the folks at postgres have a good documentation of where to start [here](http://www.postgresql.org/docs/current/static/runtime-config-resource.html#GUC-SHARED-BUFFERS){:target="_blank"}

Once the default/startup configuration is set.We can do load/performance testing to see how it is holding up.

Keep in mind that the initial configuration is tuned for availability rather than performance, it is better to always experiment and arrive at a config that is more
suitable for the workload under consideration.

<a name="Optimize"><u>Optimize as you go</u></a>

> If you cannot measure something, you cannot optimize it

With postgres, there are two ways you can measure.

<u> Operating system </u>
  
While there is no general consensus on which platform postgres works best,I am assuming that you are using something in the linux family of operating systems.But the idea
is kind of similar.
  
To start with, there is a tool called [Io top](http://guichaz.free.fr/iotop/){:target="_blank"} which can measure disk I/O.Similar to top, this can come in handy
when measuring disk I/O.Just run the command <code>iotop</code> to measure writes/reads.
  
<a class="image" href="/images/iotop-in-action.png">
<img src="/images/iotop-in-action.png" alt="IO top in action"/>
</a>
  
This can give useful insights into how postgres is behaving under load i.e how much is hitting the disk and how much is from RAM which can be arrived based on the load
being generated.

<u> Directly from postgres </u>

It is always better to monitor something directly from postgres,rather than going through the OS route.

Typically we would do OS level monitoring if we believe that there is something wrong with postgres itself, but this is rarely the case.

With postgres, there are several tools at our disposal for measuring performance with respect to memory.

- [Explain](http://www.postgresql.org/docs/current/static/sql-explain.html){:target="_blank"}

  The default is SQL explain.Gives more information than any other database system, but a little hard to get your head around.Needs practice to get used to.
  Don't miss the several useful flags, that can be given especially buffers which we previously saw.
  
  Check out the below links to understand explain in depth.
  
  - [More about explain on postgresguide.com](http://postgresguide.com/performance/explain.html){:target="_blank"}
  - [Explain visualizer](https://github.com/AlexTatiyants/pev){:target="_blank"}
  
- [Query logs](http://www.postgresql.org/docs/current/static/runtime-config-logging.html){:target="_blank"}
  
  Query logs are another way to understand what is happening inside the system.
  
  Instead of logging everything, we can log only queries that cross certain duration or otherwise called slow query logs using the log_min_duration_statement parameter.
  
- [Auto explain](http://www.postgresql.org/docs/current/static/auto-explain.html){:target="_blank"}
  
  This is another cool thing that you can do which will automatically log the execution plan along with the slow queries.
  Very useful for debugging without having the need to run explain by hand.

- [Pg stat statements](http://www.postgresql.org/docs/current/static/pgstatstatements.html){:target="_blank"}

  The above methods are good, but lack a consolidated view.

  This is a module built within postgres itself, but disabled by default.
  
  We can enable this by doing <code>create extension pg_stat_statements</code>
  
  Once this is enabled, after a fair amount of queries are run, then we can fire a query such as below.
  
  <code data-gist-id="cf41ad220182f1d2595677572303e34a"></code>
  
  Gives lot of details on how much time queries took and their average. 
  
  The disadvantage with this approach is it takes some amount of performance, so it is not generally recommended in production systems.
  
- [PG Buffer cache](http://www.postgresql.org/docs/current/static/pgbuffercache.html){:target="_blank"} and [PG fincore](http://pgfoundry.org/projects/pgfincore){:target="_blank"}
  
  If you want to get a little deeper, then there are two modules which can dig directly into shared_buffers and OS cache itself.
  
  An important thing to note is that the explain (analyze,buffers) shows data from shared_buffers only and not from the OS cache.

  - PG buffer cache
    
    This helps us see the data in shared buffers in real time.Collects information from shared_buffers and puts it inside of pg_buffercache for viewing.
    
    A sample query goes as below, which lists the top 10 tables along with the number of pages cached.
    
    <code data-gist-id="cf41ad220182f1d2595677572303e34a"></code>
    
  - PG fincore
    
    This an external module, that gives information on how the OS caches the pages.It is pretty low level and also very powerful.
    
- [Pg prewarm](http://www.postgresql.org/docs/current/static/pgprewarm.html){:target="_blank"}

  This is an in built module that can actually load the data into shared_buffers/OS cache or both.If you think memory warm up is the problem, then this is pretty useful
  for debugging.


There are several more, but I have listed the most popular and easy to use ones for understanding postgres cache and also in general.Armed with these tools, there
are no more excuses for a slow database because of memory problems <i class="fa fa-smile-o fa-lg"></i>


<a name="References"><u>References</u></a>

- [Robert haas on shared and wal buffers](http://rhaas.blogspot.in/2012/03/tuning-sharedbuffers-and-walbuffers.html){:target="_blank"}

- [Craig kerstiens - PG performance](http://www.craigkerstiens.com/2013/01/10/more-on-postgres-performance/){:target="_blank"}

- [Greg smith - Inside postgres buffers](http://www.westnet.com/~gsmith/content/postgresql/InsideBufferCache.pdf){:target="_blank"}

- [Raghav T - Caching in postgres](http://raghavt.blogspot.in/2012/04/caching-in-postgresql.html){:target="_blank"}


<hr>
# Categorized Under
<br>
<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0" onClick="nav()">Software Engineering</a>

&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-4" onClick="nav()">Database Systems</a>

&nbsp;&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-4&item-0-4-0" onClick="nav()">Postgres</a>