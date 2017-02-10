---
layout: post
title: "Scala Tutorials Part #9 - Introduction to functional programming"
permalink: blog/scala-tutorials-part-9-intro-to-functional-programming/
tags: [Scala]
---

Intro to Functional Programming in Scala
----------------------------------------

Functional programming is a paradigm in scala, one that is becoming pretty famous in the recent years due its elegance and performance characteristics
because of hardware developments in the recent years leading to multi-core performance of software programs rather than single core.

This is part 9 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

In the previous 8 parts of this series, I would not have touched the functional programming side of scala at all. If you are new to this paradigm
(which the majority of the world is) then the language, environment can be a little overwhelming to learn along with the completely new and difficult paradigm.

Since we have covered the object oriented programming side to somewhat depth, let's start with the more interesting side 

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [What is a programming paradigm?](#ProgrammingParadigm)
- [Understanding the von-neumann programming style](#VonNeumann)
- [What's wrong with von-neumann style](#WrongVonNeumann)
- [Map reduce and Immutability](#MapReduce)
- [Pure functions in scala](#PureFunctions)
- [Higher level abstractions & avoiding conceptualizing programs word by word](#Abstractions)

<a name="ProgrammingParadigm"><u>What is a programming paradigm?</u></a>

Quoting from [wikipedia](https://en.wikipedia.org/wiki/Programming_paradigm){:target="_blank"},

> Programming paradigms are a way to classify programming languages according to the style of computer programming

It is different from [design patterns](https://en.wikipedia.org/wiki/Software_design_pattern){:target="_blank"} 
which are necessarily higher level abstractions and mostly independent of the language.

A programming paradigm is built right into the language, just like C does not support classes/objects in the OOP sense and pointers
are not supported by java.

There are hundreds of [programming languages](https://en.wikipedia.org/wiki/List_of_programming_languages){:target="_blank"} 
in the world and what is common to all of them is some kind of a paradigm associated with the language.

Java is [object oriented](https://en.wikipedia.org/wiki/Object-oriented_programming){:target="_blank"}, 
C is [procedural](https://en.wikipedia.org/wiki/Procedural_programming){:target="_blank"} although you can do procedural programming in Java, but it is largely focused on
object oriented programming.

If you are not familiar with different paradigms then I would highly recommend that you take [Stanford CS107 - Programming Paradigms](https://see.stanford.edu/Course/CS107){:target="_blank"}, which gives you an excellent overview
of the popular paradigms out there.

<a name="VonNeumann"><u>Understanding the von-neumann programming style</u></a>

Imperative programming/Object oriented programming is based on something called 
[Von Neumann architecture](https://en.wikipedia.org/wiki/Von_Neumann_architecture){:target="_blank"} which is a computer architecture depicting various parts of a 
computer as below.

<br>

![Von Neumann](/images/von_neumann.png)

Image Source : [Wikimedia commons](https://commons.wikimedia.org/wiki/File:Von_Neumann_Architecture.svg){:target="_blank"}

Today's programming style has a strong correlation with the above architecture.

- Program variables       <i class="fa fa-arrow-right" aria-hidden="true"></i> Computer storage cells(Registers)

- Control statements      <i class="fa fa-arrow-right" aria-hidden="true"></i> Jump instructions

- Assignment statements   <i class="fa fa-arrow-right" aria-hidden="true"></i> Fetch/Store instructions

- Expressions             <i class="fa fa-arrow-right" aria-hidden="true"></i> Memory reference/Arithmetic instructions

If you have studied/programmed in assembly before, then the above instructions would be familiar to you. In any case if assembly/CPU/registers sound like
greek and latin to you then perhaps a refresher on [computer architecture](https://www.youtube.com/playlist?list=PL5PHm2jkkXmi5CxxI7b3JCL1TWybTDtKq){:target="_blank"}
would be of great help. The course goes very deep into architectures, but nonetheless should give you a very good idea of what we are talking about.

Programs written in assembly or imperative languages are called as instruction sequences where they present step-step instructions for the computer to execute.
 
This concept has shaped programming languages like C/, C++, Java, C# to a great extent.

<a name="WrongVonNeumann"><u>What's wrong with von-neumann style</u></a>

So what is wrong with von neumann's style and why do we need a new paradigm?

This is addressed in the classic research paper [can programming be liberated from von-neumann style](http://www.cs.ucf.edu/~dcm/Teaching/COT4810-Fall%202012/Literature/Backus.pdf){:target="_blank"} by [John Backus](http://en.wikipedia.org/wiki/John_Backus){:target="_blank"} 

It is a little long for a research paper, but I highly recommend that you read it. Many of the concepts might not make sense to you now, but it will definitely make sense later.

Understanding what is wrong with von neumann style coding requires to learn functional programming so that we can compare and contrast them. In the following sections,
ill present several functional programming constructs/concepts which can help us understand.

![FP Alien](/images/fp_alien.jpg)

<a name="MapReduce"><u>Map reduce and Immutability</u></a>

When the big data explosion happened, map reduce was at its core. [Introduction to hadoop and map reduce](https://classroom.udacity.com/courses/ud617){:target="_blank"}
is one good source to start learning hadoop and map reduce.

We are going to see a very small example of how map reduce works in apache spark. In fact the syntax or the knowledge is not much important.
 
Below is a simple working code snippet that does the famous word count problem.

{% highlight scala %}

val textFile = sc.textFile("hdfs://...")
val counts = textFile.flatMap(line => line.split(" "))
                 .map(word => (word, 1))
                 .reduceByKey(_ + _)
counts.saveAsTextFile("hdfs://...")

{% endhighlight %}

Map reduce comes in two phases, i.e the Map phase and the reduce phase.

For our understanding, lets assume that below is the content on which we must perform word count i.e count how many times each word has occurred in a given dataset.

    This is one of few movies that are truly timeless. And it's entertaining and moving, no matter how many times you view it.
    
    The only other movie I have ever seen that effects me as strongly is To Kill a Mockingbird. Both movies leave me feeling cleaner for having watched them.
    
    It is a simple film, yet it has an everlasting message.
    
When you give the above sentences as a text file input to the above code, it is going to give out the unique words in the set and how many times they appeared in the given
set. For example the word `movies` appeared twice in the set.

Let's take apart the word count example code piece by piece.
 
`val textFile = sc.textFile("hdfs://...")`
 
First we are reading a text file from HDFS. This text file contains contents similar to the example given above.

Then the syntax begins to get weird, I have specifically chose the scala part of the code instead of java since it would be better to explain the concepts.

`flatMap`, `map` is part of the collection library in scala. I am not going to explain them in detail since they are extensive topics of their own, but rather focus
on simpler terms of what they do.
 
Lets understand with the below example,

    It is a simple film, yet it has an everlasting message.
    
Walking through the steps
    
- The output of the `flatMap` would be individual words <i class="fa fa-arrow-right" aria-hidden="true"></i> It,is,a,simple .... 
- `map` then takes the individual words then maps them into a key value pair <i class="fa fa-arrow-right" aria-hidden="true"></i> (It,1),(is,1),(a,1) ....
- `reduceByKey` does what is named after. It takes the words for example (It,1) and the next (it,1) and then combines them into (It,2) assuming the output is case
 insensitive
   
![Map reduce in picture](/images/map_reduce.png)

Image Source : [Wikipedia commons](https://en.wikipedia.org/wiki/File:Mapreduce_Overview.svg){:target="_blank"}

The most important part of this entire process is that the input data once given cannot be changed i.e it is immutable and if the spark workers are configured correctly 
can easily scale to multiple cores or even multiple machines.

[Immutable objects are thread safe](http://stackoverflow.com/questions/9303532/immutable-objects-are-thread-safe-but-why){:target="_blank"} considering
that their content cannot be changed. Thread safety is directly related to parallelism and multi-core/multi-machine performance/scalability. If there are too many locks then
they slow down the entire operation and there are no locks then it will lead to wrong results.

To eliminate this, we need immutable programming concepts so that there is no thread safety needed. In scala 
[immutability implies thread safety](http://rcardin.github.io/programming/thread-safety/immutability/java/scala/2015/09/09/immutability-equal-thread-safety.html){:target="_blank"}.

In other languages they may or may not mean the same. Case class are classic examples of immutable objects/classes in scala. Except the creation part, they 
can be passed around multiple threads and wont cause any thread safety issues since the data cannot be changed. 
 
We already saw in the [case classes chapter](/blog/scala-tutorials-part-6-case-classes/) that changing the values of a case class variable after creation
leads to a compile time exception and they can be identified easily.

This is one of the reason why immutability is favoured in Scala as opposed to mutable programming constructs.

<a name="PureFunctions"><u>Pure functions in scala</u></a>

The core of functional programming is pure functions. At first glance this is confusing since the questions "Aren't methods same as functions". Turns out that they are not
the same in scala.

Note : We will only briefly touch upon the notion of functions. There is lot more to it which will be explained in future articles.

In functional programming world, a pure function is one which has no side effects.i.e it is only dependant upon the input parameter and does not mutate state elsewhere.

A function is considered not pure if it does one or more of the following.

- Variable mutation in current function/class or in some other class
- Printing to console of anywhere else
- Saving data to a database

There are many more. At first thought, one would think that if I can't do any of the above then how the heck can I write any code?

In functional languages there are [monads](https://en.wikipedia.org/wiki/Monad_(functional_programming)){:target="_blank"} to handle I/O, but that
is an advanced which we will cover later. But keep in mind that scala is multi-paradigm, the programmer can choose which style depending upon the problem at hand.

The aim of FP is not to remove mutability but rather reduce them, so that it can have various performance benefits.

Let's look at an example 

{% highlight scala %}

val x = math.sin(10)

{% endhighlight %}

The sin function in the `scala.math` package can be considered as a pure function. Wait, this mutates the variable right? Actually no, this returns a new value 
and does not change the passed in value.

{% highlight scala %}

object Runnable extends App {

  val init = 10

  val x = math.sin(init)

  println(x)
  //init does not change
  println(init)


}

{% endhighlight %}

Java programmers might argue that for objects it is pass by reference and in that case would the function be impure? It could be, but the function is only taking in
primitive types. This is slightly different in scala where there is only [call by value and call by name](/blog/scala-tutorials-part-3-methods/#CallByNamevsValue) 
(will explore later)

Pure functions can be incredibly helpful, they have several advantages as below.

- No thread safety required since no mutability involved
- Reduces the [cognitive load of your code](http://www.ppig.org/papers/15th-shaffer.pdf){:target="_blank"} . More on this in later tutorials.
- Since they don't depend on any external resource, they provide excellent encapsulation i.e one need not understand what is happening underneath to use them.


<a name="Abstractions"><u>Higher level abstractions & avoiding conceptualizing programs word by word</u></a>

The key to tackling complexity is abstractions. This is the main concept that was described by the paper presented by John backus.

We can take code from the map reduce example as a good example of abstraction.

{% highlight scala %}

object Runnable extends App {

  val x = List(10,20,30,40)

  val y = x.map( i => i* 3)

  println(y)

}

{% endhighlight %}

This is a map transformation which multiplies each element in the list by 3 and gives a new list. 

With a traditional for loop this is a little trickier.

{% highlight scala %}

import scala.collection.mutable.ListBuffer

object Runnable extends App {

  val x = List(10,20,30,40)

  val mutable = new ListBuffer[Int]

  for (e <- x) {
    mutable += (e * 3)
  }

  println(mutable.toList)

}

{% endhighlight %}


Since `List` is an immutable data structure we need to introduce an additional mutable data structure called `ListBuffer`. This already breaks the immutability principle
that discussed before. 

