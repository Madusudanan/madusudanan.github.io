---
layout: post
title: "Understanding caching in Postgres"
permalink: blog/understanding-caching-in-postgres
---

##Caching

Caching can be considered an important aspect in tuning database system performance.
     
While this post is mainly focused on postgres, it can be easily compared and understood with other database systems.

<i class="fa fa-list-ul fa-lg space-right"></i>Index

- [What is a cache and why do we need one?](#CachePurpose)
- [Storage abstraction](#StorageAbs)
- [What is cached?](#Contents)
- [Memory areas](#MemoryAreas)
- [The LRU/Clock sweep cache algorithm](#LRU)
- [Dirty pages and cache invalidation](#DirtyPages)
- [The case for sequential scans](#SeqScans)
- [Understanding caches from explain analyze](#CacheExplain)
- [The role of the operating system in caching](#OSCaching)
- [Notion of disk thrashing](#DiskThrashing)
- [Initial configuration](#Initial)
- [Optimize as you go](#Optimize)
- [Understanding how cache grows](#CacheGrowth)
- [Sniffing with pg_buffer_cache](#Pgbuffer)
- [Using pg-prewarm to bring back DB to a natural state](#Pgprewarm)

<br>

<a name="CachePurpose"><u>What is a cache and why do we need one</u></a>

Different computer components operate at different speeds.We humans are extremely poor at understanding numbers at the scale that computers do.So looking at the table below (taken from [here](http://blog.codinghorror.com/the-infinite-space-between-words/){:target="_blank"})

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

This is the general idea of a cache which is common to almost all databases.

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

This abstraction is what we will be dealing with down the line.

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

Let's talk about each action in the cache in detail.

<u>Buffer allocation</u>

Postgres is a process based system, i.e each connection has a native OS process of its own which is spawned from the postgres root process(previously called postmaster).

When a process requests for a page in the LRU cache (this is done whenever that page is accessed via a typical SQL query),it requests for a buffer allocation.

If the block is already in cache, it gets pinned and then returned.The process of pinning is a way to increase the usage count discussed below.A page is said to be unpinned
when the usage count is zero.

Only if there are any new buffers/slots free for a page, then it goes for buffer eviction below.
 
<u>Buffer eviction</u>

Deciding which pages should be evicted from memory and written to disk is a classic computer science problem.

A plain LRU(Least Recently Used) algorithm does not work well in reality since it has no memory of the previous run.

Postgres keeps track of page usage count, so if a page usage count is zero, it is evicted from memory and written to disk.It is also written to disk when the page is dirty (see below).

[This presentation](http://www.westnet.com/~gsmith/content/postgresql/InsideBufferCache.pdf){:target="_blank"} goes a little more depth in understanding them.

Regardless of the nitty-gritty details, the cache algorithm by itself requires almost no tweaking and is much smarter than what people would usually think.

<a name="DirtyPages"><u>Dirty pages and cache invalidation</u></a>

We were talking about select queries till now, what happens to DML queries ?

Simple, they get written to the same pages.If they are memory, then they are written to it or else they are fetched from memory and written to it.

This is where the notion of dirty pages come in, i.e a page has been modified and has not been written to disk.

Here is some more homework/study to be done, before we proceed, in particular about WAL and checkpoints [here](http://www.interdb.jp/pg/pgsql09.html){:target="_blank"}.

WAL is a redo log that basically keeps track of whatever that is happening to the system.This is done by logging all changes separately to a WAL Log.Checkpointer is a process
which writes the so called dirty pages to disk periodically and controlled by a time setting.It does so, because when the database crashes it need to replay everything from scratch.

This is the most common way of pages getting evicted from memory, the LRU eviction almost never happens in a typical scenario.

<a name="SeqScans"><u>The case for sequential scans</u></a>

A sequential scan i.e when there is no index and postgres has to fetch all the data from disk are a problem area for a cache like this.

Since a single seq scan can wipe all of the data from a cache, it is handled differently.

Instead of using a normal LRU/clock sweep algorithm, it uses a series of buffers of total 256 K.B in size.The below experimentation should give a good idea on it.

    performance_test=# explain (analyze,buffers) select count(*) from users;
                                                          QUERY PLAN                                                       
    -----------------------------------------------------------------------------------------------------------------------
     Aggregate  (cost=48214.95..48214.96 rows=1 width=0) (actual time=3874.445..3874.445 rows=1 loops=1)
       Buffers: shared read=35715
       ->  Seq Scan on users  (cost=0.00..45714.96 rows=999996 width=0) (actual time=6.024..3526.606 rows=1000000 loops=1)
             Buffers: shared read=35715
     Planning time: 0.114 ms
     Execution time: 3874.509 ms


Executing the above query again.

    performance_test=# explain (analyze,buffers) select count(*) from users;
                                                          QUERY PLAN                                                      
    ----------------------------------------------------------------------------------------------------------------------
     Aggregate  (cost=48214.95..48214.96 rows=1 width=0) (actual time=426.385..426.385 rows=1 loops=1)
       Buffers: shared hit=32 read=35683
       ->  Seq Scan on users  (cost=0.00..45714.96 rows=999996 width=0) (actual time=0.036..285.363 rows=1000000 loops=1)
             Buffers: shared hit=32 read=35683
     Planning time: 0.048 ms
     Execution time: 426.431 ms


We can see that exactly 32 blocks have moved into memory i.e 32 * 8 = 256 KB.


http://stackoverflow.com/questions/7142335/how-does-postgresql-cache-statements-and-data

http://dba.stackexchange.com/questions/25513/postgresql-index-caching

http://www.westnet.com/~gsmith/content/postgresql/InsideBufferCache.pdf

http://facility9.com/2011/03/postgresql-row-storage-fundamentals/


Postgres data flow - http://4.bp.blogspot.com/-FXWs_cq2NPg/T4r0BQaquqI/AAAAAAAAAKQ/aUOg8Ic8W14/s1600/caching1.png


Questions still pending

If postgres relies on OS caching, isn't the data duplicated on both the caches.Postgres data flow image above might answer this question.

<a name="Initial"><u>Initial configuration</u></a>

As with many database systems,there is no silver bullet configuration which will just work.PostgreSQL ships with a basic configuration tuned for wide compatibility rather than performance.

It is the responsibility of the database administrator/developer to tune the configuration
according to the application/workload.However, the folks at postgres have a good documentation of where to start [here](http://www.postgresql.org/docs/current/static/runtime-config-resource.html#GUC-SHARED-BUFFERS){:target="_blank"}

<a name="Optimize"><u>Optimize as you go</u></a>

If you cannot measure something, you cannot optimize it.With postgres, there are two ways you can measure.

- Operating system
  
  While there is no general consensus on which platform postgres works best,I am assuming that you are using something in the linux family of operating systems.But the idea
  is kind of similar.
  
  To start with, there is a tool called [Io top](http://guichaz.free.fr/iotop/){:target="_blank"} which can measure disk I/O.Similar to top, this can come in handy
  when measuring disk I/O.Just run the command <code>iotop</code> to measure writes/reads.
  
  This can give useful insights into how postgres is behaving under load.
  
- Using [Pg stat statements](http://www.postgresql.org/docs/current/static/pgstatstatements.html){:target="_blank"}


http://www.craigkerstiens.com/2013/01/10/more-on-postgres-performance/