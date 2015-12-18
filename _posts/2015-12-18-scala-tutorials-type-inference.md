---
layout: post
title: "Scala Tutorials Part #2 - Type Inference & types in Scala"
permalink: blog/scala-tutorials-part-2-type-inference-in-scala
---

##Type inference

This is part 2 of the scala tutorial series.Here is [part 1](/blog/scala-tutorials-part-1-getting-started).

In this part we are going to deal with type inference in depth.If you recall from the first part, we briefly dealt with type inference and a few examples.
Now we are going to deal it with a little more depth, below is what this article will cover.

<i class="fa fa-sticky-note-o space-right"></i>Note: This is a pretty dry topic,mostly theory based with not much code examples,but also important.I have tried to cover the essential ones in the most minimalistic way possible.Many 
materials have been given for leisure study.

<i class="fa fa-list-ul fa-lg space-right"></i>Index

- [What exactly is type inference from a programmer's perspective](#Perspective)
- [An Overview of a type system](#TypeSystemOverview)
- [Language classification according to their type system](#TypeSystem)
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

Or at-least it tries to be.The reality is largely dependant upon where we use type inference (later below).

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

Simple, when type information is important i.e it does leave the programmer who reads to code guessing about types.With guessing comes mistakes, and with mistakes come bad code, and with bad code
comes frustration, with frustration comes the [axe murderer](http://blog.codinghorror.com/coding-for-violent-psychopaths/){:target="_blank"}

With freedom comes responsibility <i class="fa fa-thumbs-o-up fa-lg"></i>

<hr>
# Categorized Under
<br>
<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0" onClick="nav()">Software Engineering</a>

&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-2" onClick="nav()">Programming Languages</a>

&nbsp;&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-2&item-0-2-0" onClick="nav()">Scala</a>



