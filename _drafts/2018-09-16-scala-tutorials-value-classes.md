---
layout: post
title: "Scala Tutorials Part #31 - Value Classes in Scala"
permalink: blog/scala-tutorials-part-31-value-classes-in-scala/
tags: [Scala]
---

Value Classes
-------------

Value classes are how you can extend the existing base types to provide additional functionality. 

This is part 31 of the scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Introduction)
- [A Simple Example](#SimpleExample)

<h3><b><a name = "Introduction" class="inter-header">Introduction</a></b></h3>

We already saw in [part 2](/blog/scala-tutorials-part-2-type-inference-in-scala/#ValueVsReference) where we understood what value types meant. They compile to what is called [primitive types in Java](/blog/scala-tutorials-part-7-objects-everywhere/#DataTypes) in the JVM.

Value classes is where Scala allows users/developers to write classes which extend the `AnyVal` class. These classes are incredibly helpful if you want to do a bunch of basic stuff but do not want to pollute the main class. In this case, we cannot do that since modifying the `Int` class needs a re-compilation from source.

> Value classes were introduced in Scala 2.10 in [SIP-15](https://docs.scala-lang.org/sips/value-classes.html)

<h3><b><a name = "SimpleExample" class="inter-header">A Simple Example</a></b></h3>

Let's take a look at a very simple example. 



