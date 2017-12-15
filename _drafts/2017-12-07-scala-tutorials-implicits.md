---
layout: post
title: "Scala Tutorials Part #28 - Getting started with Implicits in Scala"
permalink: blog/scala-tutorials-part-28-getting-started-with-implicits-in-scala/
tags: [Scala]
---

Implicits
---------

This is part 28 of the scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.

<i class="fa fa-list-ul space-right"></i> Index

- [Introduction](#Intro)
- [Implicit Method Parameters](#ImplicitParams)
- [Implicit Functions](#ImplicitFunctions)
- [Conclusion](#Conclusion)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

Implicit by meaning means pre-defined or understood. The `implicit` keyword is extensively used in Scala and its important to understand what it is. 

If used correctly, implicits can greatly reduce the amount of boilerplate code.

<h3><b><a name = "ImplicitParams" class="inter-header">Implicit Method Parameters</a></b></h3>

Let's declare a method that takes in an `implicit` parameter.

{% highlight scala %}

def multiply(implicit param1: Int) = param1 * value

{% endhighlight %}

`value` is a variable which the `multiply` method has scope to. So let's just declare a simple variable as below.

{% highlight scala %}

val value = 10

{% endhighlight %}

We will be able to call the `multiply` method now without any parameters since they are `implicit`. But, it will lead to an error as we have not declared any implicit variables that is suitable for that method.

{% highlight scala %}

println(multiply) 

{% endhighlight %}

![Implicit error](/images/implicit_error.png)

If we define an `implicit` variable then it should work fine.

{% highlight scala %}

implicit val param1 = 2

{% endhighlight %}

Now,

{% highlight scala %}

println(multiply)

{% endhighlight %}

Will print 20.

An interesting thing to note here is that the implicit param can be of any name and the method would still work.

{% highlight scala %}

object RunExample extends App{

  val value = 10

  implicit val anotherValue = 2

  def multiply(implicit param1: Int) = param1 * value

  //Prints 20
  println(multiply)

}

{% endhighlight %}

As you can see, only the variable type is more important rather than the name. At this point, an important question that would come up is what will happen if there are two implicit variables of the same type.

![Two implicit variables error](/images/two-implicit-error.png)

The compiler is much more strict here. It could resort to taking the first defined implicit value but it could lead to bad/ambigous code, so it promptly complains here.

Once we declare the first parameter as implicit, anything that follows it is also implicit. The below example makes it more clear.

{% highlight scala %}

def multiply(implicit param1: Int,param2 : Int) = param1 * param2

{% endhighlight %}

If we call just `multiply` it prints 4 as it takes the value of `anotherValue` twice. Usually there will be only one implicit parameter for a method. We cannot call `param2` directly here since it is implicit. 

It also not possible to make the second parameter `implicit`. Such a syntax would lead to a compiler erorr.

![Implicit second param error](/images/implicit-second-param-error.png)

<h3><b><a name = "ImplicitFunctions" class="inter-header">Implicit Functions</a></b></h3>

Just like implicit method parameters, implicit functions are useful in places where we want the compiler to call the method automatically.

Let’s take the below example.

{% highlight scala %}

val x : Int = 20.23

{% endhighlight %}

This will obviously throw an error.

![Variable type error](/images/variable-type-error.png)

Let’s declare an implicit method that converts `Double` to `Int`.

{% highlight scala %}

implicit def doubleToInt(d: Double) = d.toInt

{% endhighlight %}

Now the above code works fine and it evaluates to 42. Very handy in situations where it needs this to be done by default

<h3><b><a name = "Conclusion" class="inter-header">Conclusion</a></b></h3>

This design pattern tends to be over used and should be used with caution. With power comes responsibility.

Many advanced patterns are possible with `implicits` which I'll cover in later tutorials.


