---
layout: post
title: "Scala Tutorials Part #25 - Recursion"
permalink: blog/scala-tutorials-part-25-recursion/
tags: [Scala]
---

Recursion
--------

[Recursion](https://en.wikipedia.org/wiki/Recursion_(computer_science)){:target="_blank"} is a fundamental concept in many programming languages and 
scala has very good support for it.

This is part 25 of the Scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul space-right"></i> Index

- [Introduction](#Intro)
- [Stack overflow](#StackOverflow)
- [Tail recursion](#TailRecursion)
- [Tailrec annotation](#TailRec)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

![Recursion](https://imgs.xkcd.com/comics/tabletop_roleplaying.png)

Scala has full support for functional programming and recursion is vital to write code in a functional way.

Let's take a simple factorial example.

{% highlight scala %}

  def factorial(x:Int) : Int = {

    if(x==0) 1 else x * factorial(x-1)

  }
  
{% endhighlight %}

This piece of code is not tail-recursive, i.e the last part of the function creates additional stack frames per call. Once you get pretty deep
then you end up the famous `StackOverflowError`

<h3><b><a name = "StackOverflow" class="inter-header">Stack overflow</a></b></h3>

Let's modify the above code to work on `BigInt` instead of `Int` so that we can encounter the error.

{% highlight scala %}

 def factorial(x:BigInt) : BigInt = {

    if(x==0) 1 else x * factorial(x-1)

  }

{% endhighlight %}

If we call this with an ridiculously high value such as `factorial(10000)` then,

{% highlight java %}

Exception in thread "main" java.lang.StackOverflowError
	at scala.math.BigInt$.apply(BigInt.scala:49)
	at scala.math.BigInt$.long2bigInt(BigInt.scala:101)
	at scala.math.BigInt.isValidLong(BigInt.scala:131)
	at scala.math.BigInt.equals(BigInt.scala:125)
	at scala.runtime.BoxesRunTime.equalsNumNum(BoxesRunTime.java:168)
	at scala.runtime.BoxesRunTime.equalsNumObject(BoxesRunTime.java:140)

{% endhighlight %}

The `Stack` space is a limited memory area, and this exception is unrecoverable and generally results in the application getting crashed. There
are plenty of resources on the net that goes into detail on explaining of how stack overflow occurs internally, so I am not going to bother explaining.

<h3><b><a name = "TailRecursion" class="inter-header">Tail recursion</a></b></h3>

![Xkcd Functional]( https://imgs.xkcd.com/comics/functional.png)

The common way to overcome a stack overflow error is to write a tail recursive version. People will even resort to writing loops but its better modeled
in a recursive way.

{% highlight scala %}

  def factorial(x:BigInt) : BigInt = {

    def internal (acc:BigInt,n:BigInt) : BigInt = {
      if (n == 0) acc
      else internal(acc * n, n - 1)
    }

    internal(1,x)

  }
  
{% endhighlight %}

This version should run the `factorial(10000)` without any issue. In fact it can run even higher numbers until we hit either a type limit or memory 
issue. We create another internal helper function which acts as an accumulator which uses `n-1` as the last call which is tail recursive. Tail
recursion is the functional counterpart of iteration and hence it is always necessary to do tail call optimization when the values could get large.

Intellij is always helpful in telling us whether the function is tail recursive or not.

![Recursive](/images/recursive.png)

![Tail recursive](/images/tail_recursive.png)

I am not going to explain on converting regular functions into its tail recursive versions, that is a topic for another tutorial.

<h3><b><a name = "TailRec" class="inter-header">Tailrec annotation</a></b></h3>

Apart from the IDE helping you out, the scala compiler has an annotation that throws an error unless the function is tail recursive.

{% highlight scala %}


@tailrec
  def factorial(x:BigInt) : BigInt = {

    if(x==0) 1 else x * factorial(x-1)

  }

{% endhighlight %}

Error is thrown at compile time.

![Tail rec error](/images/tailrec_error.png)
  
In this case, the compiler is not able to optimize into a loop. The annotation when put in a recursive function works well.

![Tail rec success](/images/tailrec_success.png)

It is important to understand what the `@tailrec` annotation actually means. Some important notes below.

- This annotation does automatic optimization of methods into a tail call -- This is not the case as we saw above.
- Absence of annotation will not optimize the method -- JVM does an insane amount of code optimization and it does not relate to this annotation
being present. After the code passes the scala compiler, it is all bytecode.
- Functions and methods are different as saw in many previous articles and this annotation only applies to methods and it does not work with functions.

> [You don't annotate methods that can be optimized. You annotate methods that must be optimized, so that you will get a compile error, when they can't be optimized.](https://stackoverflow.com/a/35013414){:target="_blank"}

It is more of a documentation to the developers. Many functional languages such as haskell has automatic tail call optimization. Scala has this
limitation due to the JVM.



