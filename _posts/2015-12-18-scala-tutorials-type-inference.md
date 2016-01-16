---
layout: post
title: "Scala Tutorials Part #2 - Type Inference & types in Scala"
permalink: blog/scala-tutorials-part-2-type-inference-in-scala
---

##Type inference

This is part 2 of the scala tutorial series.Check [here](/blog-list?item-0&item-0-2&item-0-2-0) for the full series.

If you recall from the first part, we briefly dealt with type inference and a few examples.
Now we are going to deal it with a little more depth, below is what this article will cover.

<i class="fa fa-sticky-note-o space-right"></i>Note: This is a pretty dry topic,mostly theory based with not much code examples,but also important.I have tried to cover the essential ones in the most minimalistic way possible.Many 
materials have been given for leisure study.

<i class="fa fa-list-ul fa-lg space-right"></i>Index

- [What exactly is type inference from a programmer's perspective](#Perspective)
- [An Overview of a type system](#TypeSystemOverview)
- [Language classification according to their type system](#TypeSystem)
- [Hindley-Milner type inference](#Hindley)
- [Local vs Global type inference - Why scala choose local type inference](#LocalvsGlobal)
- [A brief overview of scala's type system](#ScalaTypes)
- [When to use type inference?](#Usage)
- [References](#References)

<a name="Perspective"><u>What exactly is type inference from a programmer's perspective</u></a>

As said before this is not a new concept to the programming world.Many languages such as OCaml,Haskell,Rust,Swift,C#(starting with version 3.0) 
already have these. 

Let's start with the [wikipedia's definition](https://en.wikipedia.org/wiki/Type_inference){:target="_blank"}.
 
>Type inference refers to the automatic deduction of the data type of an expression in a programming language

Well, that was obvious as we saw from the previous post that it automatically deduces types.

The primary purpose of type inference is to help the programmer avoiding verbose typing but still maintaining the compile time type safety of a statically typed language.

>Saying in a succinct manner, type inference is the best of both world's i.e static and dynamic typing.

Or at-least it tries to be.The reality is largely dependant upon where we use type inference (read below).

<a name="TypeSystemOverview"><u>An Overview of a type system</u><a>

A type system is a software component that is responsible for type checking.Scala is a statically typed language(read classification below), so there are always a defined set of types, and anything that 
does not belong to that is not regarded as a valid type and an error is thrown at compile time.

Why have any type system at all?

Because computers cannot match human stupidity, and certain things are better handled by the compiler rather than relying on people for getting it right.It also can prevent a ton of bugs
that pop up due to improper types.A type system exists to give [type safety](https://en.wikipedia.org/wiki/Type_safety){:target="_blank"}, and the levels of strictness is what differentiates 
between different systems.

This brings us to another question, what kind of type systems exist and how do these languages fit in those.

<a name="TypeSystem"><u>Language classification according to their type system</u></a>

Quoting from this [wikipedia page](https://en.wikipedia.org/wiki/Type_system){:target="_blank"},

- Dynamic type checking
- Static type checking
- Inferred vs Manifest
- Nominal vs Structural
- Dependant typing
- Gradual typing
- Latent typing
- Sub-structural typing
- Uniqueness typing
- Strong and weak typing

That was a dizzying number of systems that exist.I also highly encourage you take this [course](https://courses.cs.washington.edu/courses/cse341/13wi/){:target="_blank"}, to understand more.
Videos are available for download/offline viewing.

This might also come up on [coursera](https://www.coursera.org/course/proglang){:target="_blank"} as well, so make sure you add it to your watchlist.
 
There is also another course [here](https://www.youtube.com/playlist?list=PLOJWMozcY9B1NfDp_AJkJnFPaS7wOwEha){:target="_blank"} which is also really good.

Scala as already mentioned above can be classified as a statically typed language with type inference.There is a strong relation between functional programming and type inference which we 
will keep re-visiting from time to time along with examples for ease of understanding.

<a name="Hindley"><u>Hindley-Milner type inference</u></a>

We can talk about type inference for days but perhaps the most famous algorithm of them all is [HM type inference algorithm](https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system){:target="_blank"}.

The HM algorithm checks the program to deduce what type it belongs to.If you have taken the courses above, then you would have a pretty solid idea what that means.

It would build a parse tree consisting of all the elements,analyses the elements of what type it could belong to and arrive at a final conclusion.The below image explains a simple example.

<br>

<a class="image" href="/images/HM-type-inference.png">
<img src="/images/HM-type-inference.png" alt="Scala type system"/>
</a>

<br>

Many algorithms work in almost the similar manner.As you can see, there is no guessing involved.If there is any type mistake that we do, for example multiplying two strings.It would throw an error.

I would encourage you to do some entry level haskell programming.[Here](http://learnyouahaskell.com/){:target="_blank"} is a good website to start with.

Hindley-Milner type inference is also called as Global type inference.In other words, it reads the whole of the code and deduces the types.Scala's type system works a little different as explained below.

<a name="LocalvsGlobal"><u>Local vs Global type inference - Why scala choose local type inference</u></a>

Scala's style of type inference can be called as a combination of sub-typing and local type inference.Let's understand them with an example.

For a language that is multi-paradigm it is really hard to do global/hm style type inference since it restricts doing OOP features such as inheritance and method overloading.We are not going to in
detail of why languages such as Haskell cannot do such things, but the point is scala has made a different trade-off.

Systems do exist which combine these together, but in reality to a programmer if there is a type error, the compiler has to give meaningful error messages so that they can be fixed.In reality,
this is very hard to do.Continuous research is being done in this area to improve systems.

<a name="ScalaTypes"><u>A brief overview of scala's type system</u></a>

As mentioned above a type system is made of pre-defined components of types and this forms the foundation of how scala infers them.

<a class="image" href="/images/scala-type-system.png">
<img src="/images/scala-type-system.png" alt="Scala type system"/>
</a>

The picture says it all,you can try to dig into the source code by the usual intellij route of ctrl+click and it all points to the Any class.Please note that types are not regular classes,although 
they seem to be.We are not going to discuss the difference between them, unless we see classes and objects in detail.

For more information on the type system visit the [scala docs](http://docs.scala-lang.org/tutorials/tour/unified-types.html){:target="_blank"}.

<a name="Usage"><u>When to use type inference?</u></a>

There is a fine line that divides dynamic typing (no types) and static typing with type inference.As they say "all code should look like well written prose", it is important to know when to use
them and when not to.

When to use them ? 

When it saves programmer time and also where type information does not really matter.Situations could be inside of a function or a loop where the information about types is obvious.

When not to use them ?

Simple, when type information is important i.e it should not leave the programmer who reads to code guessing about types.

Let's take the two pieces of code to illustrate the differences.



With guessing comes mistakes, and with mistakes come bad code, and with bad code
comes frustration, with frustration comes the [axe murderer](http://blog.codinghorror.com/coding-for-violent-psychopaths/){:target="_blank"}

It is a matter of code readability rather than anything else.With freedom comes responsibility <i class="fa fa-thumbs-o-up fa-lg"></i>

<hr>
# Categorized Under
<br>
<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0" onClick="nav()">Software Engineering</a>

&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-2" onClick="nav()">Programming Languages</a>

&nbsp;&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-2&item-0-2-0" onClick="nav()">Scala</a>



