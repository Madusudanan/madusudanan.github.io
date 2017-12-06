---
layout: post
title: "Scala Tutorials Part #27 - Higher Order Functions"
permalink: blog/scala-tutorials-part-27-higher-order-functions/
tags: [Scala]
---

Higher Order Functions
----------------------

This is part 27 of the Scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Example with collections](#Example)
- [Creating a custom higher order function](#CustomHigherOrder)
- [Closing notes](#Conclusion)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

In [part 19](/blog/scala-tutorials-part-19-lambda-calculus/), we saw how functions are treated as first class citizens in Scala. In this article we are 
going to take a look at higher order functions. [Higher order functions](https://en.wikipedia.org/wiki/Higher-order_function){:target="_blank"} 
are functions which are,

- Functions that takes another Function as a parameter
- Functions that returns another Function

<h3><b><a name = "Example" class="inter-header">Example with collections</a></b></h3>

First we will define a `List` with some values.

{% highlight scala %}

val list = List(10,11,12,13)

{% endhighlight %}

Next, lets define a function that doubles each value that is given to it.

{% highlight scala %}

def doubleValue = (x: Int) => x * x

{% endhighlight %}

The `List` class has something called a `map` function which takes in other function and produces a new `List`. We are going to feed our `doubleValue` 
function to it.

{% highlight scala %}

val doubledList = list.map(x => doubleValue(x))

{% endhighlight %}

This gives us a list with values `(100, 121, 144, 169)`. The `map` function is a classic example of a higher order function. We can also give it an 
anonymous function in case we do not want to define a function explicitly.

{% highlight scala %}

val doubledList = list.map(x => x * x)

{% endhighlight %}

<h3><b><a name = "CustomHigherOrder" class="inter-header">Creating a custom higher order function</a></b></h3>

In order to fully understand Higher Order functions, its best that we learn to create one ourselves. Let's create a function that applies a pattern 
to a given string.

{% highlight scala %}

 //Function that decorates the given string with the given logic
 def HTMLStringDecorator(text:String,f:String => String): String = {
   f(text)
 }

{% endhighlight %}

This is an example of a function that takes another function as a parameter. `f` is a variable which is of type function and one which takes in a 
String and gives out another `String`. Next, we will create a function which given a string appends a `<title>` tag to it and which can be passed 
into the `HTMLStringDecorator` function.

{% highlight scala %}

 //Function that appends the title tag
 def titleTag(data:String): String => String = {
   _ : String => s"<title>$data</title>"
 }

{% endhighlight %}

Unlike `HTMLStringDecorator` this returns a function itself. We can then call the decorator with the title tag appender function.

{% highlight scala %}

val message = "hello"

 println(
   HTMLStringDecorator(
     message,
     titleTag(message)
   )
 )
 
 //Prints
 //<title>hello</title>

{% endhighlight %}

This might seem simple, but using such patterns we can build powerful DSL based syntax and languages. Higher order functions are just one piece of the 
puzzle, we still have partially applied functions, closures, currying etc., which can help build systems that make complex patterns much simpler to 
work with.

<h3><b><a name = "Conclusion" class="inter-header">Closing notes</a></b></h3>

We saw a very basic overview of higher order functions. At this point this knowledge should be enough to move forward. But we must remember that with 
such power comes responsibility and not everything must be dealt with a DSL/Higher order functions. Design and best practices is a completely 
different area which we will explore in later tutorials. 