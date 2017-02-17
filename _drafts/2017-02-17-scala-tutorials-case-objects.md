---
layout: post
title: "Scala Tutorials Part #10 - Case objects in scala "
permalink: blog/scala-tutorials-part-10-case-objects-in-scala/
tags: [Scala]
---

Case Objects
-------------

We have seen [objects](/blog/scala-tutorials-part-4-objects/) and [case classes](/blog/scala-tutorials-part-6-case-classes/) before. Case objects are a mix of both i.e it is a singleton similar to an object and with lot of boilerplate as in a case class. 
The only difference is that the boilerplate is done for an object instead of a class.

This is part 10 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)

Case objects are pretty useful if you want the boilerplate stuff that is there for case classes.

They can be created as below.

{% highlight scala %}

case object CaseObjectDemo {

  println("I am a case object")

}

{% endhighlight %}  

When you compare the [decompiled version](https://gist.github.com/Madusudanan/1c11276cdef43dd6c95e896fc8a768c6){:target="_blank"}  of [case object](https://gist.github.com/Madusudanan/f903809a968be6d15688acaaadc6f17b){:target="_blank"}  with case class then you will be able to see the difference.

