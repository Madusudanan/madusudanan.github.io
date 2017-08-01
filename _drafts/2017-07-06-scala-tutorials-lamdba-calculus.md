---
layout: post
title: "Scala Tutorials Part #19 - Lambda Calculus "
permalink: blog/scala-tutorials-part-19-lambda-calculus/
tags: [Scala]
---

In this part we are going to see where the core ideas of functional programming came from. This is part 19 of the scala tutorial series. 
Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [History](#History)
- [The notion of turing completeness](#TuringCompleteness)
- [Church-Turing thesis](#ChurchTuring)
- [Revisiting call by name](#CallByName)
- [Functions as Values](#FunctionsAsValues)
- [Methods vs Functions](#MethodsVsFunctions)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

We saw a little sneak peek into the world of functional programming in [part 9](/blog/scala-tutorials-part-9-intro-to-functional-programming/). In this
article we are going to dig deep into what functional programming is really all about, how it was created and its applications.

[Lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus){:target="_blank"} is a formal system in mathematical logic
to express computations in the form of functions. In this article, we will take a high level view of what lambda calculus is and more importantly
how it applies to functional programming.

<h3><b><a name = "History" class="inter-header">History</a></b></h3>

If you have a CS background or been programming for some time, you might have heard about the 
[turing machine](https://en.wikipedia.org/wiki/Turing_machine){:target="_blank"}, which is kind of more famous in the computing world in comparison
to lambda calculus and is also a formal system to express computation. Turns out that [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) 
the one who invented the turing machine was Alonzo Church's PhD Student. [Alonzo church](https://en.wikipedia.org/wiki/Alonzo_Church) 
was the one who formulated lambda calculus. 

Till today, these two systems are equal in terms of power in expressing computability and computational power (see church turing thesis below).
There are very good courses which teach the theoretical foundations of computer science and one such course is
[introduction to theoretical computer science](https://udacity.com/course/intro-to-theoretical-computer-science--cs313/){:target="_blank"}.

<h3><b><a name = "TuringCompleteness" class="inter-header">The notion of turing completeness</a></b></h3>

[Turing completeness](https://en.wikipedia.org/wiki/Turing_completeness){:target="_blank"} tells us whether a programming language
will be to simulate functionality of a turing machine. We can only simulate the functionality of the turing machine and cannot practically 
define it since it is a theoretical model.
 
Examples of turing complete languages are some common languages we use such as

- Scala
- Java
- Python
- Haskell
- C & C++

Domain specific languages such as 

- JSON
- YAML
- XML

are not turing complete since it is very difficult/impossible to express general purpose computability in such languages. An example
is we cannot add two numbers using JSON.

Turing and Church worked on the same problem independently. In fact there were many other mathematicians who presented models for computation.
Some of them were,

- [Stephen Kleene](https://en.wikipedia.org/wiki/Stephen_Cole_Kleene){:target="_blank"} - Recursive Function Theory 
- [Noam Chomsky](https://en.wikipedia.org/wiki/Noam_Chomsky){:target="_blank"} - Universal grammar
- [Raymond Smullyan](https://en.wikipedia.org/wiki/Raymond_Smullyan){:target="_blank"} - Logic

Lambda calculus as a system is turing complete even though it pre-dates turing machine and that is where the Church-Turing thesis comes in.

<h3><b><a name = "ChurchTuring" class="inter-header">Church-Turing thesis</a></b></h3>

Some years after they invented, several mathematical theories came out which proves that lambda calculus and turing machines are essentially equivalent
in terms of power/expressiveness. These were collectively known as [church-turing thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis){:target="_blank"}.
For the record, we should know that lambda calculus pre-dates turing machines.

This theoretical base is important since most of the modern imperative languages we see today are based on turing machines. Even the von-neumann
model which we saw earlier is based on turing machines. But, most functional languages such as haskell, f# and scala are based on lambda calculus.
Functional languages do not natively fit within von-neumann architectures and that was
[addressed by john backus](/blog/scala-tutorials-part-9-intro-to-functional-programming/#WrongVonNeumann).

In the next sections we will explore how we can the principles behind lambda calculus and the different constructs which make use of it.

<h3><b><a name = "CallByName" class="inter-header">Revisiting call by name</a></b></h3>

The `=>` symbol has many different meanings in scala all related to its mathematical meaning as implication. We saw in 
[part 3](/blog/scala-tutorials-part-3-methods/#CallByNamevsValue) that this means calling by name as opposed to call by value. Next we saw 
how this operator was used in [pattern matching](/blog/scala-tutorials-part-16-the-option-type/) where it was used to separate the pattern and the
optional guard from the resultant expression.

We will explore more on its usage as and when we come across situations. The important takeaway is that we should not have a fixed meaning/understanding
of the `=>` operator as they change depending upon the places where it is being used.

<h3><b><a name = "FunctionsAsValues" class="inter-header">Functions as Values</a></b></h3>




