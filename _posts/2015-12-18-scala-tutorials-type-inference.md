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
- [Hindley-Milner(HM) type inference](#Hindley)
- [Local vs Global type inference - Why scala choose local type inference](#LocalvsGlobal)
- [A brief overview of scala's type system and sub-typing](#ScalaTypes)
- [When to use type inference?](#Usage)
- [References](#References)

<a name="Perspective"><u>What exactly is type inference from a programmer's perspective</u></a>

As said before this is not a new concept to the programming world.Many languages such as OCaml,Haskell,Rust,Swift,C#(starting with version 3.0) 
already have these. 

Let's start with the [wikipedia's definition](https://en.wikipedia.org/wiki/Type_inference){:target="_blank"}.
 
>Type inference refers to the automatic deduction of the data type of an expression in a programming language

Well, that was obvious as we saw from the previous post that it automatically deduces types.

The primary purpose is to help the programmer avoiding verbose typing but still maintaining the compile time type safety of a statically typed language.

>Saying in a succinct manner, type inference is the best of both world's i.e static and dynamic typing.

Or at-least it tries to be.The reality is largely dependant upon where/how we use it(read below).

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

<a name="Hindley"><u>Hindley-Milner(HM) type inference</u></a>

We can talk about type inference for days but perhaps the most famous algorithm of them all is [HM type inference algorithm](https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system){:target="_blank"}.

The HM algorithm checks the program to deduce what type it belongs to.If you have taken the courses above, then you would have a pretty solid idea what that means.

Below is an example of a typical type system with type inference would work.It would build a parse tree consisting of all the elements,analyses the elements of what type it could belong to and arrive at a final conclusion.The below image explains a simple example.

<br>

<a class="image" href="/images/HM-type-inference.png">
<img src="/images/HM-type-inference.png" alt="Scala type system"/>
</a>

<br>

The above code is not Scala, for the moment you can consider as a pseudo code for simplicity.It returns true if the sum is less than 10 and false if greater.Plain and simple as that.We can translate/build up
from this example to other complicated workflows.

Many algorithms work in almost the similar manner.As you can see, there is no guessing involved.If there is any type mistake that we do, for example multiplying two strings.It would throw an error.

I would encourage you to do some entry level haskell programming.[Here](http://learnyouahaskell.com/){:target="_blank"} is a good website to start with.

Hindley-Milner algorithm is also called as Global type inference.In other words, it reads the whole of the code and deduces the types.Scala's type system works a little different as explained below.

<a name="LocalvsGlobal"><u>Local vs Global type inference and sub-typing - Why scala choose local type inference</u></a>

Scala's style follows a combination of sub-typing and local type inference.I tend to compare it with Haskell, since it one of the most famous Functional Programming(F.P) paradigm language out there.
Let's understand them with an example.

If we consider the below code, it gives a compile time error in Intellij.

<code data-gist-id="4c7eadb90613fae2e901"></code>

Error message <i class="fa fa-level-down fa-lg space-right"></i>

<a class="image" href="/images/scala-factorial-error.png">
<img src="/images/scala-factorial-error.png" alt="Scala type error"/>
</a>

The syntax details can be ignored for now (we can deal in lot more details in learning methods), but the program computes the factorial value based on the number passed in.Notice that the error
in Intellij, it is not able to infer the type of the recursive function.The same(similar) code can be used in haskell without any errors.

<code data-gist-id="4a6b1e61de6374de0d7c"></code>

The above code when executed inside the haskell GHCI shell (kind of like scala REPL) with no errors.

<a class="image" href="/images/haskell-factorial.png">
<img src="/images/haskell-factorial.png" alt="Haskell Global type inference"/>
</a>

This is a real world example of Global vs Local type inference.In scala, we are explicitly required to annotate the types wherever local type inference does not help (also see below on when to use type inference).

The correct version of the above code would be as follows.Notice the type Int is explicitly mentioned which is not present in the code above.

<code data-gist-id="643578d79670af2dc137"></code>

For a language that is multi-paradigm it is really hard to do global/hm style type inference since it restricts doing OOP features such as inheritance and method overloading.We are not going to in
detail of why languages such as Haskell cannot do such things (there are lots of resources on the net if you are curious on systems programming/compiler hacking), but the point is scala has made a different trade-off.

Systems do exist which combine these together, but in reality to a programmer if there is a type error, the compiler has to give meaningful error messages so that they can be fixed.In reality,
this is very hard to do.Continuous research is being done in this area to improve systems.

There is also another component to scala's type system i.e sub-typing which is explained below.

<a name="ScalaTypes"><u>A brief overview of scala's type system and subtyping</u></a>

As mentioned above a type system is made of pre-defined components of types and this forms the foundation of how scala infers them.

<a class="image" href="/images/scala-type-system.png">
<img src="/images/scala-type-system.png" alt="Scala type system"/>
</a>

The picture says it all,you can try to dig into the source code by the usual intellij route of ctrl+click and it all points to the Any class.Please note that types are not regular classes,although 
they seem to be.We are not going to discuss the difference between them, unless we see classes and objects in detail.

[Sub-typing](https://en.wikipedia.org/wiki/Subtyping){:target="_blank"} is something that is not supported by the Hindley-Milner algorithm, but is essential in a multi-paradigm world.This is also 
another reason why scala does not use the HM algorithm.

Let's look at the below example to understand sub-typing.

<a class="image" href="/images/scala-sub-typing.png">
<img src="/images/scala-sub-typing.png" alt="Scala sub-typing"/>
</a>

We are constructing a heterogeneous list.Sub-typing converts the lower type into a higher type if possible.A simple example would converting a Int to a Double which is the first example.
If it cannot be fit, it goes to the top level i.e the <code>'Any'</code> type.All of this conversion can be translated to the type system hierarchy above.

This makes Objected oriented programming much easier to handle.

For more information on the type system visit the [scala docs](http://docs.scala-lang.org/tutorials/tour/unified-types.html){:target="_blank"}.

<a name="Usage"><u>When to use type inference?</u></a>

There is a fine line that divides dynamic typing (no types) and static typing with type inference.As they say "all code should look like well written prose", it is important to know when to use
them and when not to.

<i class="fa fa-question-circle fa-lg space-right"></i>When to use them ? 

When it saves programmer time and also where type information does not really matter.Situations could be inside of a function or a loop where the information about types is obvious.

<i class="fa fa-question-circle fa-lg space-right"></i>When not to use them ?

Simple, when type information is important i.e it should not leave the programmer who reads to code guessing about types.

It is hard to give a code example since it really depends on application under consideration.The only fool-proof way to deal with this is to conduct code reviews with peer programmers and see if they can understand them.

After all writing code is O(K) and reading code would be O(N), where K would be a constant with not much variation and N would be the size of your team trying to read the code.Which is bigger?

With guessing comes mistakes, and with mistakes come bad code, and with bad code
comes frustration, with frustration comes the [axe murderer](http://blog.codinghorror.com/coding-for-violent-psychopaths/){:target="_blank"}

It is a matter of code readability rather than anything else.With freedom comes responsibility <i class="fa fa-thumbs-o-up fa-lg"></i>

Congratulations !! If you have understood/reached this far, then you should be proud of yourself.Rather than saying this is a pretty difficult topic, it is a very non-intuitive one to get 
your head around.

<i class="fa fa-hourglass-start fa-lg space-right"></i> Stay tuned !! This is just the beginning.

<a name="References"><u>References</u></a>

- [University of washington - Programming Languages](https://courses.cs.washington.edu/courses/cse341/13wi/){:target="_blank"},
- [Arizona State University - Principles of Programming Languages](https://www.youtube.com/playlist?list=PLOJWMozcY9B1NfDp_AJkJnFPaS7wOwEha){:target="_blank"}
- [Edx Functional programming - Delft University of Technology](https://www.edx.org/course/introduction-functional-programming-delftx-fp101x-0){:target="_blank"} 
- [Learning haskell](http://learnyouahaskell.com/){:target="_blank"} 

<hr>
# Categorized Under
<br>
<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0" onClick="nav()">Software Engineering</a>

&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-2" onClick="nav()">Programming Languages</a>

&nbsp;&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-2&item-0-2-0" onClick="nav()">Scala</a>



