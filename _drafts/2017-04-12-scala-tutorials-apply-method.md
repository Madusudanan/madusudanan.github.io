---
layout: post
title: "Scala Tutorials Part #15 - The apply method"
permalink: blog/scala-tutorials-part-15-the-apply-method/
tags: [Scala]
---

The Apply Method
----------------


This is part 15 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [The apply function](#Intro)
- [Using apply in scala](#ApplyInScala)

<h3><b><a name = "Intro" class="inter-header">The apply function</a></b></h3>

`Apply` is just a mathematical name for applying a function to a set of values.

Let's consider that `f(x)` is a function with the following definition.

{% highlight matlab %}
f(x) = x+1
{% endhighlight %}

In a programming language speak "Call function/method f(x) with value x" whereas in a mathematical notation, this is 
usually referred as applying `f(x)` to value x.

The [wiki page](https://en.wikipedia.org/wiki/Apply){:target="_blank"} explains this concept in detail.

<h3><b><a name = "ApplyInScala" class="inter-header">Using apply in scala</a></b></h3>

This concept of apply can be used is present in scala to create instances of classes in a unique way. 
Let's take the below container class which just represents a bunch of Strings in an array.

{% highlight scala %}

class Container  {

  //Hidden elements variable
  private val elements = Array("Books","Pens","Laptops")

  def apply(index:Int) = if(index<elements.length) elements(index) else "No element found"
  
}

{% endhighlight %}

We have a method called apply in the class which looks like an ordinary method, but it is not. We can now consume
the class and call array index of elements as below.

{% highlight scala %}

val container = new Container

println(container(2))

{% endhighlight %}

The apply method is a special one which is called by default i.e calling `container(2)` is the same as `container.apply(2)` which would 
yield the same result.


