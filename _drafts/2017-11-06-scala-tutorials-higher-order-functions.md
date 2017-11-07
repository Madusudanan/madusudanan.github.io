---
layout: post
title: "Scala Tutorials Part #27 - Higher Order Functions"
permalink: blog/scala-tutorials-part-27-higher-order-functions/
tags: [Scala]
---

Higher Order Functions
----------------------

This is part 27 of the Scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Example with collections](#Example)
- [Creating a custom higher order function](#CustomHigherOrder)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

In [part 19](/blog/scala-tutorials-part-19-lambda-calculus/), we saw how functions are treated as first class citizens in Scala. In this article we are going to take a look at higher order functions. Higher order functions are one functions which take in other functions as a parameter and then work on top of it.

<h3><b><a name = "Example" class="inter-header">Example with collections</a></b></h3>

First we will define a `List` with some values.

{% highlight scala %}

val list = List(10,11,12,13)

{% endhighlight %}

Next, lets define a function that doubles each value that is given to it.

{% highlight scala %}

def doubleValue = (x: Int) => x * x

{% endhighlight %}

There is something called a `map` function which takes in other functions and produces a new `List`. We are going to feed our `doubleValue` function to it.

{% highlight scala %}

val doubledList = list.map(x => doubleValue(x))

{% endhighlight %}

This gives us a list with values `(100, 121, 144, 169)`. The `map` function is a classic example of a higher order function. We can give it an anonymous function in case if we do not want to define the function passed in.

{% highlight scala %}

val doubledList = list.map(x => x * x)

{% endhighlight %}

<h3><b><a name = "CustomHigherOrder" class="inter-header">Creating a custom higher order function</a></b></h3>






