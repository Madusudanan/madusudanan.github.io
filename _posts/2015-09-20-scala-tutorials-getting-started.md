---
layout: post
title: "Scala Tutorials Part #1 - Getting Started with Scala"
permalink: blog/scala-tutorials-part-1-getting-started
---

## Getting Started with Scala

This is the first part of a tutorial series that ill be publishing on scala.Check [here](/blog-list?item-0&item-0-2&item-0-2-0) for the full series.

Prerequisites

- Basic programming experience with prior languages such as Java/Python (There are certain things where I would take it for granted that you would know about it)
- A working computer with the below mentioned software setup
- Curiosity to learn

All the tutorials will be very detailed and will be very in-depth, [no gimme the codez](http://thedailywtf.com/articles/plz-email-me-teh-codez){:target="_blank"} tutorials.Improvements are always welcome.

A warning !! If you are from Java there are lot of things that can be difficult to get your head around, and the most easiest way to learn this is to unlearn and learn.
    
<i class="fa fa-film fa-lg space-right"></i><a href="https://www.youtube.com/watch?v=APx2yFA0-B4" target="_blank">Be like water my friend !!</a>

Let's get started.

<i class="fa fa-list-ul fa-lg space-right"></i>Index

Here is what this post covers.

- [Short introduction to scala and environment setup](#Intro)
- [The Scala REPL, a short presentation](#ScalaREPL)
- [First Hello world !!](#ScalaHelloWorld)
- [Variables](#Variables)
- [Data types in Scala](#DataTypes)
- [Type inference](#TypeInference)

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
in an upcoming tutorial.

If there is a method then there has to be arguments to it.In our case, it is a <code>Array[String]</code>.This is similar to java's main method, where an array of strings can
be an argument to the main method.This can be startup configs or anything else, usage is completely optional of course.

This is followed by a <code>println()</code> method call which prints statements on to the console.If you are using an IDE (you should be), you can trace the entire call
by holding ctrl+click on the method.Python folks should find this syntax similar, and in fact to a programmer there is nothing to this except printing out a String to the console.

But let's dig a little deeper.For the Java folks, a general print on the console will be like <code>System.out.println</code>.So, how is this different ?

The answer is it is not so different, <code>println()</code> is a method in class called Predef.scala, which then calls goes to Console.scala's println method which then calls <code>out.prinln</code>
on PrintStream.class or PrintStream.java if you have the source code attached, otherwise the decompiler from Intellij shows the decompiled code.Notice that, the print from 
both scala and java end up in the same method call.As said before,scala is built on top of the JVM and can inter-operate with Java code seamlessly as we just saw, there would be a specific reason if the implementation was different, otherwise
it would be just re-inventing the wheel.

In fact there are many more examples which utilizes java libraries in our journey in learning about scala.

You would have noticed some strange syntax from the scala source code, where there would no type information associated with a method parameter.This is something called
type-inference which we deal with later in this tutorial.

A simple hello world has opened up many topics to learn, three in particular 

- Methods(Covered in later tutorials)
- Objects and Classes(Covered in later tutorials)
- Type inference - The reason why scala is a statically typed dynamic language- Explained below

<a name="Variables"><u>Variables in Scala</u></a>

I should have explained data types before we jump into variables, but there are some fundamental differences that I want to speak about so that the we can understand them
more deeply.

<code>var</code> and <code>val</code> are two keywords which are used to declare variables in scala.

<code>var</code> is used to declare variables that are mutable and <code>val</code> to declare immutable.But what kind of variables are these?
For primitive data types, where does the concept of mutability come from? I encourage you to read this [stackoverflow post](http://stackoverflow.com/questions/18037082/are-java-primitives-immutable){:target="_blank"}.
Primitives by themselves are immutable i.e their type cannot be changed once declared, but their values are mutable i.e they can be changed.

This is confusing at first about why the concept of mutability comes for variables and not objects, this is explained below in data types section, there are no primitive
types in scala, all are objects.

Now that we are clear about the mutability/immutability concept (we are going to see more of this, scala is centered around the whole immutability principle for functional programming) let's proceed further.

If <code>val</code> is immutable, then it cannot be changed ? Is this similar to the Java final keyword or is it something related to String immutability ?

Let's look some sample code below, to help us understand better.

<code data-gist-id="08b652a8489ab89622e6"></code>

If you run the above code, you will notice an error at compilation itself such as reassignment to val.If you are using an IDE this will show up as you type because
of pre-compilation that the IDE gives.

First thing is definitely not like String immutability where it is not visible to the programmer, and is controlled at compilation level.Next question, is 
it similar to final in Java?

From a bird's eye view, this seems to be similar that once a value is assigned to it, it cannot be changed, but inside the JVM <code>final</code> has nothing to do with
immutability and it is used so that classes cannot be extended and int the case of methods it cannot be overridden.

To put it in an another way, final refers to the reference while immutability refers to the object itself.

Let's consider the below Java code to demonstrate that this is different.

<code data-gist-id="854dad554e10999f5b03"></code>

If you try the same <code>final</code> with primitive types, you will notice that its value cannot be changed.Does this mean primitives are immutable ?
This takes us back to the stackoverflow discussion above, but the reason why the error comes is because Java uses Pass by Value for primitive types,it makes no 
sense to Pass by reference since they are not objects at all.So if a variable is changed,its reference(sorta - can be said as place in memory) changes because of the Pass by value mechanism and not because that
primitives are immutable.

This can be confusing.If this mutability comparison is making your head hurt, then the simplest way is to unlearn and re-learn, be like water my friend.

Immutable variables have certain performance benefits and leans closer to notion of writing code without side effects.

By the time now, another question would have come up? Where are the types in the scala code ?

Unlike java where we declare variables with data types and then give a variable name, scala has something called type inference(see the topics below), but don't jump there
yet, there is a reason why I separated it out from the variables section.Read on to find out more.

<a name="DataTypes"><u>Data types in Scala</u></a>

Scala has the same data types as in Java,with the same memory and precision.Except the fact that there are no primitive types in Scala.

All data types are Objects and methods can be called in them just as you would on an object.

<code data-gist-id="4d7953af0626dd36b9aa"></code>

<a name="TypeInference"><u>Type Inference</u></a>

If you are not familiar with the term, it is nothing but the deduction of types at compile time.Hold on, isn’t that what dynamic typing means ? Well no, notice that I said deduction of types, 
this is drastically different from what dynamically typed languages do and another thing is it is done at compile time and not run time.

Many languages have this built in, but the implementation varies from one language to another.This might be confusing at the beginning, but it will be clearer with code examples.

Let's jump into the Scala REPL for some experimentation.

<a class="image" href="/images/type-inference-scala.png">
<img src="/images/type-inference-scala.png" alt="Scala type inference"/>
</a>

From the image above, it is evident that there is no magic, the variables are inferred automatically to the best types they deem fit and at compile time.

Here is some more code to understand further.

<code data-gist-id="f431a256b5cc1153430b"></code>

Go ahead and play with these variables, you are protected from compile time type safety, so do not hesitate to mess around.

We can also mention the type explicitly, as below

<code>val y : Integer = 20</code>, which makes more sense to the programmer and this brings us to another discussion, when to mention and not mention types ?

This is dealt with in part 2 of this series [here](/blog/scala-tutorials-part-2-type-inference-in-scala) with greater depth.

If you been curious on what classes do the variables extend and if you dig deeper, then you would have come across a class called AnyVal.This is part of an
entirely different topic of Scala's unified type system, which is nothing but the class hierarchy.Again this requires an entire article of its own.

This brings an end to this first blog post, we have started with the important parts.I encourage you to re read the post to understand it completely if you haven't 
and also refer relevant documentation on the internet.

Translating simple code snippets from other languages also helps.

I'll be updating links to this article as soon as I publish pending topics that I have mentioned here.You can also subscribe if you want to keep updated.

Scala is not easy, but it is not hard either if we take one step at a time and learn things.My goal is not to teach everything, but simply point in a direction that is much less shrouded that it was before.

Keep learning watch out for more posts <i class="fa fa-smile-o fa-lg"></i>

<hr>
# Categorized Under
<br>
<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0" onClick="nav()">Software Engineering</a>

&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-2" onClick="nav()">Programming Languages</a>

&nbsp;&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-2&item-0-2-0" onClick="nav()">Scala</a>





























