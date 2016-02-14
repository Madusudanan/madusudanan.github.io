---
layout: post
title: "All you need to know about sorting in Postgres"
permalink: blog/all-you-need-to-know-about-sorting-in-postgres
---


##Sorting

Sorting is one of the most fundamental operations in database systems and understanding how they work inside is crucial in optimizing them.

This blog post mainly focuses on postgres(a kick ass relational database), but it can be translated to other databases in algorithmic terms.
 
- [Setting the stage](#SettingStage)
- [Disk merge sort - When data does not fit in memory](#DiskMerge)
- [Quick sort - Completely in memory](#QuickSort)
- [Heap sort - Sorting with a limit](#Heapsort)
- [Using indexes for sorting](#Indexes)
- [Optimization](#Optimization)

<a name="SettingStage"><u>Setting the stage</u></a>

Below are the details of my setup.

<i class="fa fa-database fa-lg space-right"></i> Database version : [9.5 (Latest version at the time of this writing)](http://www.postgresql.org/about/news/1636/){:target="_blank"}.
    
<i class="fa fa-server fa-lg space-right"></i> Operating system : [Cent OS 7](https://www.centos.org/){:target="_blank"}

<i class="fa fa-table fa-lg space-right"></i> Table structure is as below

<br> 

<a class="image" href="/images/postgres-orderby-table-structure.png">
<img src="/images/postgres-orderby-table-structure.png" alt="Postgres table structure - Order by"/>
</a>

<br>

<i class="fa fa-bar-chart fa-lg space-right"></i> Total Rows : 1 Million Rows.All values are unique via random data population.

<i class="fa fa-bell fa-lg space-right"></i> Terminologies : If you are not familiar with any of the technical terms mentioned here, refer [Postgres Guide](http://postgresguide.com/){:target="_blank"}.

<a name="DiskMerge"><u>Disk merge sort - When data does not fit in memory</u></a>

If we consider a query like below,

<code>Select * from users order by userid;</code>

Running explain analyze,gives us the plan as follows (it actually runs the query).

<a class="image" href="/images/postgres-orderby-external-merge.png">
<img src="/images/postgres-orderby-external-merge.png" alt="External Merge"/>
</a>

Of course, in a real life situation nobody would use <code>select *</code> and select without a limit, but for demo purposes this should be fine.

External merge is much like [Merge sort](https://en.wikipedia.org/wiki/Merge_sort){:target="_blank"}.It is used when the data does not fit in memory.This is probably the slowest sort method since
there is lot of disk thrashing involved.

There are two different memory areas we can talk about mainly in postgres.<code>shared_buffers</code> is where all of the table data i.e the cached data from tables is stored.<code>work_mem</code> or worker memory
is what is used by postgres for sorting,joins etc.,

So when we say that the data does not fit in memory, it means that work_mem is too low.

<a name="QuickSort"><u>Quick sort - Completely in memory</u></a>

If we bump up worker memory(say 128MB) and change the query slightly as follows.

<code>Select userid from users order by userid;</code>

We have a new query plan as below.

<a class="image" href="/images/postgres-orderby-quicksort.png">
<img src="/images/postgres-orderby-quicksort.png" alt="Quick Sort"/>
</a>

Postgres uses a well known sorting algorithm called [Quick sort](https://en.wikipedia.org/wiki/Quicksort){:target="_blank"} to accomplish in memory sorting.There are certain variations from a vanilla
quick sort, you can lookup the source code to understand in much deeper detail.

This will definitely be faster than external merge, since all of the data is brought into memory and then the sorting is done in memory itself.

<a name="Heapsort"><u>Heapsort - Sorting with a limit</u></a>

Let's look at a real life use case query.

<code>Select userid from users order by userid limit 10;</code>

Plan is changed as below.

<a class="image" href="/images/postgres-orderby-heapsort.png">
<img src="/images/postgres-orderby-heapsort.png" alt="Heap Sort"/>
</a>

Underlying problem is the same, order all the rows by the column userid and select the top 10.The default sort order is ascending order in postgres.

You might wonder how does the plan change, it has to sort all of the data anyway to get the top 10/bottom 10 rows.The answer is yes, but what changes is the memory usage for sorting.Since
we need only a limited set of rows, there is no need to sort all of them inside memory.

To achieve this, postgres maintains a [heap](https://en.wikipedia.org/wiki/Heap_(data_structure)){:target="_blank"} with a bounded size.It consumes the input values in sequence.After it fills the heap up to the target number of tuples/rows it starts looking each new value to see if it's larger than all current values/smaller than all current values, or fits within the heap.

If it's larger than all current values (ascending sort in our case) it gets discarded, since we have enough values already.If it's smaller than all current values or than some current values, it's inserted at the appropriate point in the heap, everything gets shifted down by one, and it bumps the last entry off the heap.               

The Algorithm used is [heap sort](https://en.wikipedia.org/wiki/Heapsort){:target="_blank"} which makes use of the heap data structure to sort things.This is also a classical well known algorithm.

Normally,unless you have very wide rows and you are selecting more rows that cannot fit it in memory, then heap sort is what will be used.

There won't be much speed difference between a quicksort and a heap-sort, but what will be significant is the memory usage which can be seen clearly from both the query execution plans.When allocating 
memory is costly i.e when you have lesser free memory to allocate immediately, often happens when your machine is not scaling well to the memory needs, then there can be huge differences in speed.

<a name="Indexes"><u>Using indexes for sorting</u></a>

All of the algorithms above involve a great deal of overhead that is common in all databases i.e the disk seek.No matter what algorithm is used, it has to first fetch all of the rows and then 
sort the data.Disk as we all know is probably the slowest and most time consuming component in a computing system.

We can avoid disk seek by using indexes.A [B-Tree](https://en.wikipedia.org/wiki/B-tree){:target="_blank"} are commonly used to speed up sorting,where conditions,group by and a whole lot of
other use cases.

Creating an index on the userid column is pretty straightforward as below.

<code>create index on users(userid);</code>

The table definition also lists that there is an index.

<a class="image" href="/images/postgres-table-def-with-index.png">
<img src="/images/postgres-table-def-with-index.png" alt="Postgres table with index"/>
</a>

There is a great speed up in query execution time.

<a class="image" href="/images/postgres-orderby-indexes.png">
<img src="/images/postgres-orderby-indexes.png" alt="Postgres order by with index"/>
</a>

Since indexes are already ordered, it has to just lookup the values in the indexes which is much faster.After all a b-tree offers a lookup of O(logN) in asymptotic complexity time.A typical query that uses indexes will be in the order of milliseconds.

An index can be used in descending sort as well.

<a class="image" href="/images/postgres-orderby-index-backwards.png">
<img src="/images/postgres-orderby-index-backwards.png" alt="Postgres order by desc"/>
</a>

Indexes can also be cached entirely in memory, since they are smaller in size.

If we want to sort by multiple columns then we have to create an index appropriately.

<code>create index on users(name desc,userid asc);</code>

The above index called as a composite index, can be used for a query such as <code>Select userid,name from users order by name desc,userid asc limit 10;</code>

<a class="image" href="/images/postgres-orderby-multicolumn-sort.png">
<img src="/images/postgres-orderby-multicolumn-sort.png" alt="Postgres order by multi-column"/>
</a>

<a name="Optimization"><u>Optimization</u></a>

I have listed four methods in which postgres does sorting.

- External merge (Slowest,because of increased disk I/O)
- Quick sort (Faster than external merge, best suited for sorting large data sets)
- Top-N heapsort (Faster than quicksort,stops when the limit of data is gathered)
- Sorting using indexes (Fastest, just lookup, no sorting)

It is important to understand that these algorithms by themselves are not slow.Postgres just uses the best algorithm for the job.

<u>Optimizing Order by</u>

- First step is to use an index.Almost always this is the rule of thumb.
- Check if your query has a limit clause.It makes no sense to order and select all of the rows in the table.
- Bump up worker memory for sorting.This has to be done carefully since each order by,sorting and other operations can use this individually, i.e if it is configured to be 128MB,
then if there are 10 queries running, the total memory usage would 10 * 128 MB.
- In-memory tables.As said earlier, the slowest part of a database operation is disk access.An in-memory table can be used when it is not feasible to create indexes on all columns.This is usually done
when a user does sorting on the application UI.Postgres does not have anything natively that supports/keeps the entire table in memory but there is a way to do this via [IMCS](https://github.com/knizhnik/imcs){:target="_blank"}.
There are other advantages in having in memory tables, which i'll probably cover in a separate post.


<hr>
# Categorized Under
<br>
<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0" onClick="nav()">Software Engineering</a>

&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-4" onClick="nav()">Database Systems</a>

&nbsp;&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-4&item-0-4-0" onClick="nav()">Postgres</a>