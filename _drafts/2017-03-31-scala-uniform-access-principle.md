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
- [Absence of Uniform access principle](#AbsenceUAP)


<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

The [Uniform access principle](http://wiki.c2.com/?UniformAccessPrinciple){:target="_blank"} is a programming concept that goes simply as

<i class="fa fa-quote-left" aria-hidden="true"></i> All services offered by a module should be available through a uniform notation, which does not betray whether they are implemented through storage 
or through computation. <i class="fa fa-quote-right" aria-hidden="true"></i>

It was put forth by [Bertrand Meyer](https://en.wikipedia.org/wiki/Bertrand_Meyer){:target="_blank"} in his book called 
[Object oriented software construction](https://en.wikipedia.org/wiki/Object-Oriented_Software_Construction){:target="_blank"}. This is not necessarily a functional
programming concept, for instance you would not find this abundantly present in haskell largely because this is more oriented towards OOP rather than FP.

<h3><b><a name = "AbsenceUAP" class="inter-header">Absence of Uniform access principle</a></b></h3>

In java accessing the length of an array is different from accessing the length of a string.

![No uac java](/images/java_no_uac.png)

We cannot access the length of a string in the same as we access the length of an array because the array length is a variable and length is actually a method
in the String class.

This again comes to the fundamental problem in the type system in which a variable is accessed differently from a 

