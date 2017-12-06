---
layout: post
title: "Scala Tutorials Part #25 - Recursion"
permalink: blog/scala-tutorials-part-25-recursion/
tags: [Scala]
---

Recursion
--------

[Recursion](https://en.wikipedia.org/wiki/Recursion_(computer_science)){:target="_blank"} is a fundamental concept in many programming languages and it
is important to understand how it works in Scala and its significance in the language.

This is part 25 of the Scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.

<i class="fa fa-list-ul space-right"></i> Index

- [Introduction](#Intro)
- [Stack overflow](#StackOverflow)
- [Tail recursion](#TailRecursion)
- [Tailrec annotation](#TailRec)
- [Conclusion](#Conclusion)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

![Recursion](https://imgs.xkcd.com/comics/tabletop_roleplaying.png)

Scala has full support for functional programming and recursion is important to write functional code.

Let's take a simple factorial example.

{% highlight scala %}

  def factorial(x:Int) : Int = {

    if(x==0) 1 else x * factorial(x-1)

  }
  
{% endhighlight %}

This piece of code is not tail-recursive, i.e the last part of the function creates additional stack frames per call. The moment you get pretty deep 
in the call stack then you end up the famous `StackOverflowError`

<h3><b><a name = "StackOverflow" class="inter-header">Stack overflow</a></b></h3>

Let's modify the above code to work on `BigInt` instead of `Int` so that we can simulate the error.

{% highlight scala %}

 def factorial(x:BigInt) : BigInt = {

    if(x==0) 1 else x * factorial(x-1)

  }

{% endhighlight %}

If we call this with a ridiculously high value such as `factorial(10000)` then,

{% highlight java %}

Exception in thread "main" java.lang.StackOverflowError
	at scala.math.BigInt$.apply(BigInt.scala:49)
	at scala.math.BigInt$.long2bigInt(BigInt.scala:101)
	at scala.math.BigInt.isValidLong(BigInt.scala:131)
	at scala.math.BigInt.equals(BigInt.scala:125)
	at scala.runtime.BoxesRunTime.equalsNumNum(BoxesRunTime.java:168)
	at scala.runtime.BoxesRunTime.equalsNumObject(BoxesRunTime.java:140)

{% endhighlight %}

The `Stack` space is a limited memory area, and this exception is unrecoverable and generally results in the application crashing. There
are plenty of resources on the web that goes into detail on explaining of how stack overflow occurs internally, so I am not going to bother 
explaining.

<h3><b><a name = "TailRecursion" class="inter-header">Tail recursion</a></b></h3>

![Xkcd Functional]( https://imgs.xkcd.com/comics/functional.png)

The common way to overcome a stack overflow error is to write a tail recursive version. Developers will usually resort to loop constructs but its better 
modeled with recursion when you are writing [pure functions](/blog/scala-tutorials-part-9-intro-to-functional-programming/#PureFunctions) 
which is [referentially transparent](/blog/scala-tutorials-part-21-referential-transparency/).

{% highlight scala %}

  def factorial(x:BigInt) : BigInt = {

    def internal (acc:BigInt,n:BigInt) : BigInt = {
      if (n == 0) acc
      else internal(acc * n, n - 1)
    }

    internal(1,x)

  }
  
{% endhighlight %}

This version should run the `factorial(10000)` without any issue. In fact, it can run even higher numbers until we hit either a type limit or memory 
issue. We create another internal helper function which acts as an accumulator which uses `n-1` as the last call which is tail recursive. Tail
recursion is the functional counterpart of iteration and hence it is always necessary to do tail call optimization when the values could get large.

Intellij is always helpful in telling us whether the function is tail recursive or not.

![Recursive](/images/recursive.png)

![Tail recursive](/images/tail_recursive.png)

I am not going to explain on converting regular functions into its tail recursive versions, that is a topic for another tutorial.

<h3><b><a name = "TailRec" class="inter-header">Tailrec annotation</a></b></h3>

Apart from the IDE helping you out, the Scala compiler has an annotation that throws an error if the function is not tail recursive.

{% highlight scala %}


@tailrec
  def factorial(x:BigInt) : BigInt = {

    if(x==0) 1 else x * factorial(x-1)

  }

{% endhighlight %}

Error is thrown at compile time.

![Tail rec error](/images/tailrec_error.png)
  
In this case, the compiler is not able to optimize into a loop. The annotation works as intended on the inner recursive function.

![Tail rec success](/images/tailrec_success.png)

It is important to understand what the `@tailrec` annotation actually means. Some important notes below.

- This annotation does not perform automatic optimization of recursive methods into a tail recursive one.
- It is a common misunderstanding that the absence of this annotation will not optimize the method. JVM does an insane amount of code optimization and 
it does not relate to this annotation being present. After the code passes the Scala compiler, it is all byte code. So the JVM does certain things 
regardless of the language that it compile from.
- Functions and methods are different as saw in many previous articles and this annotation only applies to methods and it does not work with functions.

> [You don't annotate methods that can be optimized. You annotate methods that must be optimized, so that you will get a compile error, when they can't be optimized.](https://stackoverflow.com/a/35013414){:target="_blank"}

It is more of a documentation to the developers. Many functional languages such as Haskell perform automatic tail call optimization 
(with conditions applied). Scala cannot do this due to the limitation with the JVM.

<h3><b><a name = "Conclusion" class="inter-header">Conclusion</a></b></h3>

Recursion is interesting because it is very important for functional programming languages to write good functional code. There are some limitations
in the JVM due to which there is no automatic tail call optimization. But the `@tailrec` annotation comes in handy in such situations. Certain algorithms
such as tree traversals, search are naturally recursive in nature. 

Hopefully this article gave you a good overview of recursion. They are not meant for replacing loops entirely, but with modern JVMs they should
work similar to loops in terms of performance. It is important to consult the documentation for your VM and also don't forget to test everything.
