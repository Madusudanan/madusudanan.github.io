---
layout: post
title: "Scala Tutorials Part #Unknown - Option/Some/None pattern "
permalink: blog/scala-tutorials-part-12-option-some-none-pattern/
tags: [Scala]
---

Option/Some/None Pattern 
--------------------------

Java programmers would be familiar with the `NullPointerException` which basically pops up when you access when an object which does not exist or not yet created.

This issue is not because of the Java library or the runtime, its because of programmers write crappy code. But when a language allows you to write crappy code then that
is not good.

Scala addresses this issue with the Option/Some/None pattern. Let's jump right in.

This is part 11 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [First line of defense in variables](#FirstLineDefense)
- [Introduction to the Option type](#Option)

<a name="FirstLineDefense"><u>First line of defense in variables</u></a>

Recall from the first chapter that variables [can't be just declared and left un-initialized](/blog/scala-tutorials-part-1-getting-started/#Initialize).

But that does prevent what java programmers have been doing all the time, i.e just leave it as `null`

{% highlight scala %}

object Runnable extends App {


  val x  = null

  println(x.toString)


}

{% endhighlight %}

This would still result in the dreaded `NullPointerException`. We are still exposed to this issue which in medium/large code bases becomes very difficult to track and that is
assuming that the codebase is somewhat well designed.

Assigning `null` to objects seems fine in imperative environments since that is how you program. A classic example is appending data to a `ArrayList` inside of a for loop.

The `null` in the scala language exists only for inter-operation with the java language environment.

There is a better way to do this in scala.

<a name="Option"><u>Introduction to the Option type</u></a>

The [Option](http://www.scala-lang.org/api/current/scala/Option.html){:target="_blank"} is not a type per se, it is syntactic sugar to a class that is underneath it.

In fact it is an abstract class which has two children `Some` and `None`. These three are not present in the 
[scala type system hierarchy](http://localhost:4000/blog/scala-tutorials-part-2-type-inference-in-scala/#ScalaTypes) at all.





http://programmers.stackexchange.com/questions/223862/how-important-is-to-initialize-a-variable

