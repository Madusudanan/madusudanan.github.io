---
layout: post
title: "Scala Tutorials #1 - Getting Started with Scala"
permalink: blog/scala-tutorials-getting-started
---

## Getting Started with Scala

This is the first of tutorial series that ill be publishing on scala.

Prerequisites

- Basic programming experience with prior languages such as Java/Python (There are certain things where I would take it for granted that you would know about it)
- A working computer with the below mentioned software setup
- Curiosity to learn

All the tutorials will be very detailed and will be very in-depth, [no gimme the codez](http://thedailywtf.com/articles/plz-email-me-teh-codez){:target="_blank"} tutorials.Improvements are always welcome.

<i class="fa fa-list-ul fa-lg space-right"></i>Index

Here is what this post covers.

- [Short introduction to scala and environment setup](#Intro)
- [The Scala REPL, a short presentation](#ScalaREPL)
- [First Hello world !!](#ScalaHelloWorld)
- [Variables]()
- [Type inference]()

<a name = "Intro"><u>Short introduction to scala and environment setup</u></a>

If you do not have an idea about scala then I encourage you to read [this blog post](/blog/why-scala-will-be-the-next-big-thing).

There are many tutorials on the net which talk about scala setup and IDE installation, so I am not going to walk through those again.

The setup that I would recommend is as below.

- Operating System : Ubuntu 14.04 LTS
- Good old Ubuntu terminal with scala installed to work with REPL
- Intellij IDEA community edition with Scala plugin installed

If you are done setting those up, then lets begin.

<a name = "ScalaREPL"><u>The Scala REPL, a short presentation</u></a>

Below is a link to a short presentation about scala REPL.

<i class="fa fa-pencil-square-o fa-lg space-right"></i><a href="http://madusudanan.com/revealjs-presentations/scala-repl-intro" target="_blank">Scala REPL Intro</a>

The REPL will act as your swiss army knife in learning scala.

<a name = "ScalaHelloWorld"><u>First Hello World !!</u></a>

If you are coming from a Java background then scala is a little different in how it is represented.Before we take a look at that, let's directly jump into some code.

<code data-gist-id="62f0b6cbc3980826303e"></code>

I would recommend to put this code into your Intellij IDE and then do right click run.If all goes well, you should see Hello World in your console.

Congratulations !! You have authored your first Hello world.

Now let's take this apart piece by piece.

The first thing to notice, is that the whole code is inside an Object block.Java programmers might find these confusing.Hold on to this question for now, the next section
deals with this in a more detailed way.Unlike Java, class names need not match with file names, it is not a big thing but we do have that freedom here <i class="fa fa-smile-o fa-lg"></i>.

Next thing is the strange syntax of <code>def main()</code>.To begin with <code>def</code> is a keyword to declare methods.We will be dealing with methods in greater detail
in a upcoming tutorial.

If there is a method then there has to be arguments to it.In our case, it is a <code>Array[String]</code>.This is similar to java's main method, where an array of string can
be an argument to the main method.This can be startup configs or anything else, usage is completely optional of course.

This is followed by a <code>println()</code> method call which prints statements on to the console.If you are using an IDE (you should be), you can trace the entire call
by holding ctrl+click on the method.Python folks should find this syntax similar, and in fact to a programmer there is nothing to this except printing out a String to the console.

But lets dig a little deeper, for the Java folks, a general print on the console will be like <code>System.out.println</code>.So, how is this different ?

In fact, it is not. <code>println()</code> is a method in class called Predef.scala, which then calls goes to Console.scala's println method which then calls <code>out.prinln</code>
on PrintStream.class or PrintStream.java if you have the source code attached, otherwise the decompiler from Intellij shows the decompiled code.Notice that, the print from 
both scala and java end up in the same method call.To remind, scala is built on top of the JVM and can inter-operate with Java code seamlessly as we just saw, there would be a specific reason if the implementation was different, otherwise
it would be just re-inventing the wheel.

In fact there are many more examples which utilizes java libraries in our journey in learning about scala.

You would have noticed some strange syntax from the scala source code, where there would no type information associated with a method parameter.This is something called
type-inference which we deal with later in this tutorial.

A simple hello world has opened up many topics to learn, three in particular 

- Methods(Covered in later tutorials)
- Objects and Classes(Covered in later tutorials)
- Type inference - The reason why scala is a statically typed dynamic language- Explained below


















