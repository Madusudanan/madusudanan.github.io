---
layout: post
title: "All you need to know about sorting in Postgres"
permalink: blog/all-you-need-to-know-about-sorting-in-postgres/
tags: [Postgres]
---


Sorting
-------

Sorting is one of the most fundamental operations in database systems and understanding how they work inside is crucial in optimizing them.

This blog post mainly focuses on postgres(a kick ass relational database), but it can be translated to other databases in algorithmic terms.
 
- [Setting the stage](#SettingStage)
- [Disk merge sort - When data does not fit in memory](#DiskMerge)
- [Quick sort - Completely in memory](#QuickSort)
- [Heap sort - Sorting with a limit](#Heapsort)
- [Using indexes for sorting](#Indexes)
- [Optimization](#Optimization)

<h3><b><a name = "SettingStage" class="inter-header">Setting the stage</a></b></h3>

Below are the details of my setup.

<i class="fa fa-database space-right"></i> Database version : [9.5 (Latest version at the time of this writing)](http://www.postgresql.org/about/news/1636/){:target="_blank"}.
    
<i class="fa fa-server space-right"></i> Operating system : [Cent OS 7](https://www.centos.org/){:target="_blank"}

<i class="fa fa-table space-right"></i> Table structure is as below

![Postgres table structure - Order by](/images/postgres-orderby-table-structure.png)

<i class="fa fa-bar-chart space-right"></i> Total Rows : 1 Million Rows.All values are unique via random data population.

<i class="fa fa-bell space-right"></i> Terminologies : If you are not familiar with any of the technical terms mentioned here, refer [Postgres Guide](http://postgresguide.com/){:target="_blank"}.

<h3><b><a name = "DiskMerge" class="inter-header">Disk merge sort - When data does not fit in memory</a></b></h3>

If we consider a query like below,

`Select * from users order by userid;`

Running explain analyze, gives us the plan as follows (it actually runs the query).

{% highlight sql %}
performance_test=# explain analyze select * from users order by userid;
    
  Sort  (cost=352825.84..355325.84 rows=1000000 width=219) (actual time=1601.031..2033.621 rows=1000000 loops=1)
    Sort Key: userid
    Sort Method: external merge  Disk: 225872kB
    ->  Seq Scan on users  (cost=0.00..41250.00 rows=1000000 width=219) (actual time=0.477..225.933 rows=1000000 loops=1)
  Planning time: 0.298 ms
  Execution time: 2170.056 ms
 (6 rows)   
 
{% endhighlight %}
    
Of course, in a real life situation nobody would use `select *` and select without a limit, but for demo purposes this should be fine.

External merge is much like [Merge sort](https://en.wikipedia.org/wiki/Merge_sort){:target="_blank"}. It is used when the data does not fit in memory. This is probably the slowest sort method since
there is lot of disk thrashing involved i.e it takes data from disk sorts it and then puts it back, it takes total table data/memory it can fit. 

There are two different memory areas we can talk about mainly in postgres. `shared_buffers` is where all of the table data i.e the cached data from tables is stored. `work_mem` or worker memory
is what is used by postgres for sorting, joins etc.,

So when we say that the data does not fit in memory, it means that work_mem is too low.

<h3><b><a name = "QuickSort" class="inter-header">Quick sort - Completely in memory</a></b></h3>

If we bump up worker memory(say 300MB) and change the query slightly as follows.

`Select userid from users order by userid;`

We have a new query plan as below.

{% highlight sql %}

performance_test=# explain analyze select * from users order by userid;
   
  Sort  (cost=140907.84..143407.84 rows=1000000 width=219) (actual time=719.208..879.849 rows=1000000 loops=1)
    Sort Key: userid
    Sort Method: quicksort  Memory: 290202kB
    ->  Seq Scan on users  (cost=0.00..41250.00 rows=1000000 width=219) (actual time=0.039..266.260 rows=1000000 loops=1)
  Planning time: 0.079 ms
  Execution time: 966.795 ms
 (6 rows)

{% endhighlight %}


Postgres uses a well known sorting algorithm called [Quick sort](https://en.wikipedia.org/wiki/Quicksort){:target="_blank"} to accomplish in memory sorting. There are certain variations from a vanilla
quick sort, you can lookup the source code to understand in much deeper detail.

This will definitely be faster than external merge, since all of the data is brought into memory and then the sorting is done in memory itself.

<h3><b><a name = "Heapsort" class="inter-header">Heapsort - Sorting with a limit</a></b></h3>

Let's look at a real life use case query.

`Select userid from users order by userid limit 10;`

Plan is changed as below.

{% highlight sql %}

performance_test=# explain analyze select userid from users order by userid limit 10;
    
 Limit  (cost=62859.64..62859.67 rows=10 width=8) (actual time=483.900..483.901 rows=10 loops=1)
    ->  Sort  (cost=62859.64..65359.64 rows=1000000 width=8) (actual time=483.898..483.899 rows=10 loops=1)
          Sort Key: userid
          Sort Method: top-N heapsort  Memory: 25kB
          ->  Seq Scan on users  (cost=0.00..41250.00 rows=1000000 width=8) (actual time=0.045..300.833 rows=1000000 loops=1)
  Planning time: 0.078 ms
  Execution time: 483.933 ms
 (7 rows)    

{% endhighlight %}

Underlying problem is the same, order all the rows by the column userid and select the top 10. The default sort order is ascending order in postgres.

You might wonder how does the plan change, it has to sort all of the data anyway to get the top 10/bottom 10 rows. The answer is yes, but what changes is the memory usage for sorting. 
Since we need only a limited set of rows, there is no need to sort all of them inside memory.

To achieve this, postgres maintains a [heap](https://en.wikipedia.org/wiki/Heap_(data_structure)){:target="_blank"} with a bounded size. 
It consumes the input values in sequence. After it fills the heap up to the target number of tuples/rows it starts looking each new value to see if it's larger than all current values/smaller than all current values, or fits within the heap.

If it's larger than all current values (ascending sort in our case) it gets discarded, since we have enough values already. If it's smaller than all current values or than some current values, it's inserted at the appropriate point in the heap, everything gets shifted down by one, and it bumps the last entry off the heap.               

The Algorithm used is [heap sort](https://en.wikipedia.org/wiki/Heapsort){:target="_blank"} which makes use of the heap data structure to sort things. This is also a classical well known algorithm.

Normally, unless you have very wide rows and you are selecting more rows that cannot fit it in memory, then heap sort is what will be used.

There won't be much speed difference between a quicksort and a heap-sort, but what will be significant is the memory usage which can be seen clearly from both the query execution plans. 
When allocating memory is costly i.e when you have lesser free memory to allocate immediately, often happens when your machine is not scaling well to the memory needs, then there can be huge differences in speed.

<h3><b><a name = "Indexes" class="inter-header">Using indexes for sorting</a></b></h3>

All of the algorithms above involve a great deal of overhead that is common in all databases i.e the disk seek. No matter what algorithm is used, it has to first fetch all of the rows and then 
sort the data. Disk as we all know is probably the slowest and most time consuming component in a computing system.

We can avoid disk seek by using indexes. A [B-Tree](https://en.wikipedia.org/wiki/B-tree){:target="_blank"} are commonly used to speed up sorting, where conditions, group by and a whole lot of
other use cases.

Creating an index on the userid column is pretty straightforward as below.

`create index on users(userid);`

The table definition also lists that there is an index.

![Postgres table with index](/images/postgres-table-def-with-index.png)

There is a great speed up in query execution time.

{% highlight sql %}

performance_test=# explain analyze select userid from users order by userid limit 10;
    
  Limit  (cost=0.42..0.68 rows=10 width=8) (actual time=0.030..0.041 rows=10 loops=1)
    ->  Index Only Scan using users_userid_idx on users  (cost=0.42..25980.42 rows=1000000 width=8) (actual time=0.029..0.034 rows=10 loops=1)
          Heap Fetches: 0
  Planning time: 0.096 ms
  Execution time: 0.070 ms
 (5 rows)
    
{% endhighlight %}


Since indexes are already ordered, it has to just lookup the values in the indexes which is much faster. After all a b-tree offers a lookup of O(logN) in asymptotic complexity time. 
A typical query that uses indexes will be in the order of milliseconds.

An index can be used in descending sort as well.

`select userid from users order by userid desc limit 10;`

{% highlight sql %}
performance_test=# explain analyze select userid from users order by userid desc limit 10;
    
  Limit  (cost=0.42..0.68 rows=10 width=8) (actual time=0.085..0.092 rows=10 loops=1)
    ->  Index Only Scan Backward using users_userid_idx on users  (cost=0.42..25980.42 rows=1000000 width=8) (actual time=0.084..0.089 rows=10 loops=1)
          Heap Fetches: 0
  Planning time: 0.142 ms
  Execution time: 0.121 ms
 (5 rows)
{% endhighlight %}

Indexes can also be cached entirely in memory, since they are smaller in size.

If we want to sort by multiple columns then we have to create an index appropriately.

`create index on users(name desc,userid asc);`

The above index called as a composite index, can be used for a query such as below,

`Select userid,name from users order by name desc,userid asc limit 10;`

{% highlight sql %}
performance_test=# explain analyze Select userid,name from users order by name desc,userid asc limit 10;

  Limit  (cost=0.55..1.12 rows=10 width=59) (actual time=0.025..0.059 rows=10 loops=1)
    ->  Index Only Scan using users_name_userid_idx on users  (cost=0.55..57240.55 rows=1000000 width=59) (actual time=0.024..0.030 rows=10 loops=1)
          Heap Fetches: 0
  Planning time: 0.114 ms
  Execution time: 0.088 ms
 (5 rows)
{% endhighlight %}

<h3><b><a name = "Optimization" class="inter-header">Optimization</a></b></h3>

I have listed four methods in which postgres does sorting.

- External merge (Slowest, because of increased disk I/O)
- Quick sort (Faster than external merge, best suited for sorting large data sets)
- Top-N heapsort (Faster than quicksort, stops when the limit of data is gathered)
- Sorting using indexes (Fastest, just lookup, no sorting)

It is important to understand that these algorithms by themselves are not slow. Postgres just uses the best algorithm for the job.

<i class="fa fa-hashtag" aria-hidden="true"></i> Optimizing Order by

- First step is to use an index. Almost always this is the rule of thumb.
- Check if your query has a limit clause. It makes no sense to order and select all of the rows in the table.
- Bump up worker memory for sorting. This has to be done carefully since each order by, sorting and other operations can use this individually, i.e if it is configured to be 128MB,
then if there are 10 queries running, the total memory usage would 10 * 128 MB.
- In-memory tables. As said earlier, the slowest part of a database operation is disk access. An in-memory table can be used when it is not feasible to create indexes on all columns. This is usually done
when a user does sorting on the application UI. Postgres does not have anything natively that supports/keeps the entire table in memory but there is a way to do this via [IMCS](https://github.com/knizhnik/imcs){:target="_blank"}. 
But you do not need to do this, since indexes are optimized to fit in memory and there is no need to cache/store the whole table in memory.