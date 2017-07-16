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
- [Core ideas behind functional programming](#CoreIdeas)
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

Till today, these two systems are equal in terms of power in expressing computability and computational power. There are very good courses which
teach the theoretical foundations of computer science and one such course is 
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









