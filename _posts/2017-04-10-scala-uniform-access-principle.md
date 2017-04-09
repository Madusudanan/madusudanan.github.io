---
layout: post
title: "Scala Tutorials Part #14 - Uniform Access Principle in Scala"
permalink: blog/scala-tutorials-part-14-uniform-access-principle/
tags : Scala
---

Uniform Access Principle
-----------------------

This is part 14 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Implementation in scala](#UAPScala)
- [Namespace Collision](#NameSpaceCol)
- [Summing it up](#Conclusion)


<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

The [Uniform access principle](http://wiki.c2.com/?UniformAccessPrinciple){:target="_blank"} is a programming concept that goes simply as

<i class="fa fa-quote-left" aria-hidden="true"></i> All services offered by a module should be available through a uniform notation, which does not betray whether they are implemented through storage 
or through computation. <i class="fa fa-quote-right" aria-hidden="true"></i>

It was put forth by [Bertrand Meyer](https://en.wikipedia.org/wiki/Bertrand_Meyer){:target="_blank"} in his book called 
[Object oriented software construction](https://en.wikipedia.org/wiki/Object-Oriented_Software_Construction){:target="_blank"}. This is not necessarily a functional
programming concept, for instance you would not find this abundantly present in haskell as this is more oriented towards OOP rather than FP.

<h3><b><a name = "UAPScala" class="inter-header">Implementation in scala</a></b></h3>

We already saw in the [scala classes article](/blog/scala-tutorials-part-5-classes/#ScalaStyleGetter) that the getters and setters can be used in the same way. 
Accessing methods and variables is the same in scala.

{% highlight scala %}

  val array : Array[Int] = Array(10,30,44)

  val someString =  "Testing"

  println(array.length)

  println(someString.length)

{% endhighlight %}

The same example in java leads to an error.

![No uac java](/images/java_no_uac.png)

In java accessing the length of an array is different from accessing the length of a string. 
We cannot access both in the same way because the array length is a variable and the `String.length()` is actually a method inside the String class.

Another example in scala.

{% highlight scala %}

class Runnable {

  val string = "Scala 2.12 is out"

  def anotherString = "Scala 2.12 is out"

}

object Runnable extends App  {

  val instance = new Runnable

  println(instance.string)
  println(instance.anotherString)

}

{% endhighlight %}

<h3><b><a name = "NameSpaceCol" class="inter-header">Namespace Collision</a></b></h3>

There is a possibility of name space collision due to the nature of how the uniform access principle works. For instance, the below example would work in java.

{% highlight java %}

public class Test {

    int example = 10;
    public int example() {
        return 10;
    }

}

{% endhighlight %}

Something similar in scala would end up in a compilation error.

![Scala namespace](/images/scala_namespace.png)

The error checking is necessary since it would lead to ambiguity at the language level and the compiler throws an error to prevent it.

<h3><b><a name = "Conclusion" class="inter-header">Summing it up</a></b></h3>

- Less confusion, access array length and string length in the same way.
- The client side code can consume it and the handler code logic can be changed without fear of breaking the client code unless 
it breaks the contract i.e return `Int` in the place of a `String`
- Refactoring and unit testing is much easier because of this.
- Leads to better design patterns and libraries. In fact the collection API in scala benefits a lot from this.



