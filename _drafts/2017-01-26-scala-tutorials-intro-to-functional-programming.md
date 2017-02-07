---
layout: post
title: "Scala Tutorials Part #9 - Introduction to functional programming"
permalink: blog/scala-tutorials-part-9-intro-to-functional-programming/
tags: [Scala]
---

Intro to Functional Programming in Scala
----------------------------------------

Functional programming is a paradigm in scala, one that is becoming pretty famous in the recent years due its elegance and performance characteristics
because of hardware developments in the recent years leading to multi-core performance of software programs rather than single core.

This is part 9 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

In the previous 8 parts of this series, I would not have touched the functional programming side of scala at all. If you are new to this paradigm
(which the majority of the world is) then the language, environment can be a little overwhelming to learn along with the completely new and difficult paradigm.

Since we have covered the object oriented programming side to somewhat depth, let's start with the more interesting side 

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [What is a programming paradigm?](#ProgrammingParadigm)
- [Understanding the von-neumann programming style](#VonNeumann)
- [What's wrong with von-neumann style](#WrongVonNeumann)
- [Map reduce and its origins](#MapReduce)


<a name="ProgrammingParadigm"><u>What is a programming paradigm?</u></a>

Quoting from [wikipedia](https://en.wikipedia.org/wiki/Programming_paradigm){:target="_blank"},

> Programming paradigms are a way to classify programming languages according to the style of computer programming

It is different from [design patterns](https://en.wikipedia.org/wiki/Software_design_pattern){:target="_blank"} 
which are necessarily higher level abstractions and mostly independent of the language.

A programming paradigm is built right into the language, just like C does not support classes/objects in the OOP sense and pointers
are not supported by java.

There are hundreds of [programming languages](https://en.wikipedia.org/wiki/List_of_programming_languages){:target="_blank"} 
in the world and what is common to all of them is some kind of a paradigm associated with the language.

Java is [object oriented](https://en.wikipedia.org/wiki/Object-oriented_programming){:target="_blank"}, 
C is [procedural](https://en.wikipedia.org/wiki/Procedural_programming){:target="_blank"} although you can do procedural programming in Java, but it is largely focused on
object oriented programming.

If you are not familiar with different paradigms then I would highly recommend that you take [Stanford CS107 - Programming Paradigms](https://see.stanford.edu/Course/CS107){:target="_blank"}, which gives you an excellent overview
of the popular paradigms out there.

<a name="VonNeumann"><u>Understanding the von-neumann programming style</u></a>

Imperative programming/Object oriented programming is based on something called 
[Von Neumann architecture](https://en.wikipedia.org/wiki/Von_Neumann_architecture){:target="_blank"} which is a computer architecture depicting various parts of a 
computer as below.

<br>

![Von Neumann](/images/von_neumann.png)

Image Source : [Wikimedia commons](https://commons.wikimedia.org/wiki/File:Von_Neumann_Architecture.svg){:target="_blank"}

Today's programming style has a strong correlation with the above architecture.

- Program variables       <i class="fa fa-arrow-right" aria-hidden="true"></i> Computer storage cells(Registers)

- Control statements      <i class="fa fa-arrow-right" aria-hidden="true"></i> Jump instructions

- Assignment statements   <i class="fa fa-arrow-right" aria-hidden="true"></i> Fetch/Store instructions

- Expressions             <i class="fa fa-arrow-right" aria-hidden="true"></i> Memory reference/Arithmetic instructions

If you have studied/programmed in assembly before, then the above instructions would be familiar to you. In any case if assembly/CPU/registers sound like
greek and latin to you then perhaps a refresher on [computer architecture](https://www.youtube.com/playlist?list=PL5PHm2jkkXmi5CxxI7b3JCL1TWybTDtKq){:target="_blank"}
would be of great help. The course goes very deep into architectures, but nonetheless should give you a very good idea of what we are talking about.

Programs written in assembly or imperative languages are called as instruction sequences where they present step-step instructions for the computer to execute.
 
This concept has shaped programming languages like C/, C++, Java, C# to a great extent.


<a name="WrongVonNeumann"><u>What's wrong with von-neumann style</u></a>

So what is wrong with von neumann's style and why do we need a new paradigm?

This is addressed in the classic research paper [can programming be liberated from von-neumann style](http://www.cs.ucf.edu/~dcm/Teaching/COT4810-Fall%202012/Literature/Backus.pdf){:target="_blank"} by [John Backus](http://en.wikipedia.org/wiki/John_Backus){:target="_blank"} 

It is a little long for a research paper, but I highly recommend that you read it. Many of the concepts might not make sense to you now, but it will definitely make sense later.




