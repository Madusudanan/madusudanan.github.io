---
layout: post
title: "Scala Tutorials Part #21 - Referential transparency"
permalink: blog/scala-tutorials-part-21-referential-transparency/
tags: [Scala]
---

Referential Transparency
------------------------

This is part 21 of the Scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Referential transparency in action](#InAction)
- [Referential transparency in the real world](#RealWorld)
- [Conclusion](#Conclusion)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

[Referential transparency](https://en.wikipedia.org/wiki/Referential_transparency){:target="_blank"} originally comes from mathematics and got adopted 
into functional programming. Its main goal is to give the programmer a toolkit to reason about program behaviour.

This concept is related to [pure functions](/blog/scala-tutorials-part-9-intro-to-functional-programming/#PureFunctions). In fact, referential 
transparency can be achieved only when the function is pure and does not have any side effect. This is not a feature of the Scala language, but this 
article is just to explain how it can be achieved.

<h3><b><a name = "InAction" class="inter-header">Referential transparency in action</a></b></h3>

Let's take the square function again.

{% highlight scala %}

def square(x:Int) = x * x

{% endhighlight %}

If we call this method using 5 and 6 as parameters.

{% highlight scala %}

  //Prints 25
  println(square(5))

  //Prints 36
  println(square(6))

{% endhighlight %}

We can replace all instances of `square(5)` with 25 and `square(6)` with 36 and the code will still work fine. This signifies that the function/method
evaluates to the same result given the same arguments/values.

Let's take something that isn't referentially transparent.

{% highlight scala %}

  var g = 20

  println(mod_rt(10))

{% endhighlight %}

A function which modifies an external variable.

{% highlight scala %}

def mod_rt(x:Int) = {
  //Modifies an external variable
  g = g+10
  g + x * x	
} 

{% endhighlight %}


In the above code block, we cannot say for sure that `mod_rt(x)` is always a value which is predictable since the variable being modified i.e `g` 
can be changed elsewhere in the code and it changes the result of the `mod_rt(x)` method. This makes it difficult to reason about what the method does 
and breaks the referential transparency principle. 

From Wikipedia,

- The function always evaluates to the same result value given the same argument value(s). It cannot depend on any hidden state or value, and it cannot 
depend on any I/O.
- Evaluation of the result does not cause any semantically observable side effect or output, such as mutation of mutable objects or 
output to I/O devices.

We can see that immutable functions/methods by itself leads to referential transparency. Immutable variables can also be used to achieve this. In the 
above example if the variable `g` was a `val` then it would lead to a compilation error.

<h3><b><a name = "RealWorld" class="inter-header">Referential transparency in the real world</a></b></h3>

In the real world certain methods/functions are naturally not suited.

- Methods which depend on time i.e something like `getDayOfWeek`,  `getHour`, `System.currentTimeMillis` etc.,
- Random number generation.
- Functionality which does Input/Output based on a user.
- Code that writes/reads to databases/data stores.

Strictly following referential transparency means we cannot have,

- Impure functions
- I/O from file/user
- Interaction with external mutable data stores

It must not be taken in a literal sense. Commonly used functionality does not follow the rules and its fine to have them. As a programmer/software 
developer we must strive to write code that follows referential transparency wherever possible and resorting to other techniques to handle mutation 
and state. Referential transparency sort of acts as a toolkit to test the purity of functions.

<h3><b><a name = "Conclusion" class="inter-header">Conclusion</a></b></h3>

A quick wrap up of what we saw in this article.

- We saw how referential transparency helps programmers reason about code.
- How immutable variables lead to good code which follow the referential transparency principle.

Even though the example was pretty simple, I hope it illustrated the concept well. Learning a new language is not just learning the constructs, 
it is also about the concepts and paradigms which are largely language neutral.
