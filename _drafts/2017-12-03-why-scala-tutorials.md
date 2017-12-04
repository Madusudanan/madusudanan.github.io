---
layout: post
title: "On Learning Scala"
permalink: blog/on-learning-scala/
tags: [Scala]
---


Learning Scala
--------------

I have written several blog articles on [Scala](/tags/#Scala), my longest streak so far on any topic. You might have several questions on what got me interested and why I wrote this and how is this different from the other awesome books out there on Scala.

I'll try to answer many questions in this article and also this blog post will serve as a index to the Scala articles.


<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Why the interest on Scala](#Interest)
- [Are these tutorials good to learn Scala?](#Tutorials)
- [Index](#Index)

<h3><b><a name = "Interest" class="inter-header">Why the interest on Scala</a></b></h3>

Scala is a wonderful language. It is very well designed from the ground up keeping on thing in mind i.e Object Oriented Programming + Functional Programming and language that Scales. The interest in Functional Programming has picked up pace in the recent years, Java 8 has lambdas, and future versions will have type inference. More importantly, dealing with lower level constructs such as Threads, Executor Service etc., has not scaled. This fundamental problem is dealt with the Actor model of concurrency. But more importantly, Scala gives the right tools to solve such Higher Level Abstractions in an excellent way. Even if you don't use Scala for your work, learning it can make you a better programmer. The emphasis is on the concepts, type inference, case classes, pattern matching etc., has found its way to many languages such as Kotlin and also poised to make entry into Java. Scala has significantly evolved since its inception, and will continue to evolve. 


<h3><b><a name = "Tutorials" class="inter-header">Are these tutorials good to learn Scala?</a></b></h3>

Ever since I began writing these tutorials, I shared them around in many social sites such as Twitter, Reddit, Hacker News etc., I got consistent feedback(other than your english sucks and other such useless rants) on whether this is a good source to learn Scala. My answer is it depends. There are of course other far better sources on learning Scala from the others themselves and people who are highly experienced in it, but they lack an important thing called perspective. Most of the books either directly jump in without sufficient theoritical introduction or take it very lightly on the surface. So, these tutorials are more like documenting my journey of learning Scala. My tutorials directly target Java developers who are the majority and also takes a very different and less ceremonial approach on learning. With that said, I am not a native english speaker so there might be grammatical issues and also issues regarding code. Please do point out any if you come across them.

P.S : I have written on how should a beginner approach on learning Scala -[A Beginners guide to learn Scala](https://dev.to/bmadusudanan/a-beginners-guide-to-learn-scala)

<h3><b><a name = "Index" class="inter-header">Index</a></b></h3>

- [Part 1 - Getting Started](/blog/scala-tutorials-part-1-getting-started/)
  - [Introduction to scala and environment setup](/blog/scala-tutorials-part-1-getting-started/#Intro)
  - [First Hello World!!](/blog/scala-tutorials-part-1-getting-started/#ScalaHelloWorld)
  - [Variables](/blog/scala-tutorials-part-1-getting-started/#Variables)
  - [Reference vs Value Immutability](/blog/scala-tutorials-part-1-getting-started/#ReferenceVsValue)
  - [Immutability under the hood](/blog/scala-tutorials-part-1-getting-started/#AdvancedUnderstanding)
  - [Comparing and Contrasting val and final](/blog/scala-tutorials-part-1-getting-started/#ValVsFinal)
  - [Data types in Scala](/blog/scala-tutorials-part-1-getting-started/#DataTypes)
  - [Type Inference](/blog/scala-tutorials-part-1-getting-started/#TypeInference)
  - [Variable initialization](/blog/scala-tutorials-part-1-getting-started/#Initialize)
  - [Type annotations](/blog/scala-tutorials-part-1-getting-started/#TypeAnnotations)
  - [Type ascriptions](/blog/scala-tutorials-part-1-getting-started/#TypeAscriptions)
  - [Lazy val](/blog/scala-tutorials-part-1-getting-started/#LazyVal)
  - [Homework](/blog/scala-tutorials-part-1-getting-started/#Homework)
- [Part 2 - Type Inference & types in Scala](/blog/scala-tutorials-part-2-type-inference-in-scala/)  
  - [What exactly is type inference from a programmer's perspective](/blog/scala-tutorials-part-2-type-inference-in-scala/#Perspective)
  - [Overview of a type system](/blog/scala-tutorials-part-2-type-inference-in-scala/#TypeSystemOverview)
  - [Language classification according to their type system](/blog/scala-tutorials-part-2-type-inference-in-scala/#TypeSystem)
  - [Hindley-Milner(HM) type inference](/blog/scala-tutorials-part-2-type-inference-in-scala/#Hindley)
  - [Local vs Global type inference and sub-typing - Why scala choose local type inference](/blog/scala-tutorials-part-2-type-inference-in-scala/#LocalvsGlobal)
  - [A brief overview of scala's type system and subtyping](/blog/scala-tutorials-part-2-type-inference-in-scala/#ScalaTypes)
  - [Value types and Reference types](/blog/scala-tutorials-part-2-type-inference-in-scala/#ValueVsReference)
  - [When to use type inference?](/blog/scala-tutorials-part-2-type-inference-in-scala/#Usage)
  - [References](/blog/scala-tutorials-part-2-type-inference-in-scala/#References)
- [Part 3 - Methods](/blog/scala-tutorials-part-3-methods/)
  - [Primer](/blog/scala-tutorials-part-3-methods/#Primer)
  - [Syntax of Methods](/blog/scala-tutorials-part-3-methods/#Syntax)
  - [The Unit type](/blog/scala-tutorials-part-3-methods/#Unit)
  - [Immutable method parameters](/blog/scala-tutorials-part-3-methods/#MethodParameters)
  - [Note on the return keyword](/blog/scala-tutorials-part-3-methods/#Return)
  - [Heterogeneous return types](/blog/scala-tutorials-part-3-methods/#Heterogeneous)
  - [Call by name vs Call by value](/blog/scala-tutorials-part-3-methods/#CallByNamevsValue)
  - [Default values for method parameters](/blog/scala-tutorials-part-3-methods/#DefaultValues)
  - [Stubbing out methods](/blog/scala-tutorials-part-3-methods/#Stubbing)