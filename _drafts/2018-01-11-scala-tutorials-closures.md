---
layout: post
title: "Scala Tutorials Part #30 - Closures"
permalink: blog/scala-tutorials-part-30-closures/
tags: [Scala]
---

Closures
--------

This is part 30 of the Scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Encapsulating state and behaviour](#StateBehaviour)
- [Free variables](#FreeVariables)
- [Reasoning about referential transparency](#ReferentialTransparency)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

[Closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)){:target="_blank"} is an important concept in the world of Functional Programming. A considerably simpler definition of a Closure is presented well in this [excellent blog post](http://www.jerf.org/iri/post/2542){:target="_blank"}.

> A closure is a function that you can pass around that retains the same "environment" as the one it had when it was created.

They are not very unique to Scala, usually they are found in many languages which give emphasis to functions as first class values. To understand closures, let's understand what object oriented programming offers as a fundamental feature i.e encapsulation of state behaviour.

<h3><b><a name = "StateBehaviour" class="inter-header">Encapsulating state and behaviour</a></b></h3>

Let's take the below simple class.

{% highlight scala %}

class Person {

  //State - Carries data
  var name = "Noname"
  var age = -1

  //Encapsulates behaviour
  def setName (name:String)  {
    this.name = name
  }

  def setAge (age:Int) {
    this.age = age
  }

  def getName () : String = {
    name
  }

  def getAge () : Int = {
    age
  }

}

{% endhighlight %}

This is a pretty concise definition of an object. It carries the variables which represent state and the methods which encapsulate behaviour.

In functional programming, instead of passing around objects, we pass around functions. But when we compare objects and functions, we can see that functions in general do not carry state and only carry behaviour.

<h3><b><a name = "FreeVariables" class="inter-header">Free variables</a></b></h3>

The concept of a [free variable](https://en.wikipedia.org/wiki/Free_variables_and_bound_variables){:target="_blank"} comes from mathematics and functional programming theory. They refer to variables which are used locally but enclosed in some scope such as a class of method.

In the below code, the variable `interest` is defined for the class scope.

{% highlight scala %}

 val interestRate = 10

 def printInterest(): Unit = {
   println(interestRate)
 }

{% endhighlight %}

The different between a normal function and a closure is that a closure is dependant on one or more free variables. Let's expand on our above example.

{% highlight scala %}

 var increaseRate = 10.0

 calculateIncreasedAmount(1000)

 def calculateIncreasedAmount(amount:Double): Unit = {
   println(s"Increased amount is ${amount * (increaseRate/100)} units")
 }

{% endhighlight %}

Here the variable `increaseRate` is a var and can be changed at any point of the program. In the below example, it changes according to the recent state/value of the `increaseRate` variable.

{% highlight scala %}

var increaseRate = 10.0

calculateIncreasedAmount(1000)

def calculateIncreasedAmount(amount:Double): Unit = {
  println(s"Increased amount is ${amount * (increaseRate/100)} units")
}

increaseRate = 20.0

calculateIncreasedAmount(1000)

{% endhighlight %}

At first it prints 100.0 and then 200.0 since the state variable changed.

<h3><b><a name = "ReferentialTransparency" class="inter-header">Reasoning about referential transparency</a></b></h3>

We saw how functions can be termed pure if they are referentially transparent in [part 21](/blog/scala-tutorials-part-21-referential-transparency/). Using the same rules mentioned, is the above function/closure refentially transparent? No, because the variable `increaseRate` is a var and can be changed anywhere in the flow. If it is a val then it would make the closure referentially transparent and hence pure.

So in order for any closure to be pure, the free variable should be either a val/immutable object. It is good practice to keep the free variable immutable so that the resultant closure is referentially transparent.

