---
layout: post
title: "Scala Tutorials Part #2 - Type Inference & types in Scala"
permalink: blog/scala-tutorials-part-2-type-inference-in-scala/
tags: [Scala]
last_updated: 2017-09-18
---

Type inference
--------------

This is part 2 of the Scala tutorial series. Check [here](/tags/#Scala) for the full series.

If you recall from the first part, we briefly dealt with type inference with a few examples.
Now we are going to deal it with a little more depth, below is what this article will cover.

<i class="fa fa-language fa-lg space-right"></i> : This article has been translated to Chinese by 
[ChanZong Huang](http://www.linkedin.com/in/chanzong-huang-716ba261){:target="_blank"}, 
you can check it out [here](http://www.itran.cc/2017/02/23/yin-du-peng-you-shou-ba-shou-jiao-ni-xue-scala-2-scalali-de-lei-xing-jie-kou-lei-xing/){:target="_blank"}.

<i class="fa fa-list-ul space-right"></i> Index

- [What exactly is type inference from a programmer's perspective](#Perspective)
- [Overview of a type system](#TypeSystemOverview)
- [Language classification according to their type system](#TypeSystem)
- [Hindley-Milner(HM) type inference](#Hindley)
- [Local vs Global type inference - Why scala choose local type inference](#LocalvsGlobal)
- [A brief overview of scala's type system and sub-typing](#ScalaTypes)
- [Value types and Reference types](#ValueVsReference)
- [When to use type inference?](#Usage)
- [References](#References)

<h3><b><a name = "Perspective" class="inter-header">What exactly is type inference from a programmer's perspective</a></b></h3>

This is not something unique to Scala, many languages such as OCaml, Haskell, Rust, Swift, C#(starting with version 3.0) 
already have these. 

Let's start with the [Wikipedia's definition](https://en.wikipedia.org/wiki/Type_inference){:target="_blank"}.
 
>Type inference refers to the automatic deduction of the data type of an expression in a programming language

Well, that was obvious as we saw from the previous post that it automatically deduces types.

The primary purpose is to help the programmer avoiding verbose typing but still maintaining the compile time type safety of a statically typed language.

>Type inference is the best of both worlds i.e static and dynamic typing.

Or at-least it tries to be. The reality is largely dependent upon where/how we use it.

<h3><b><a name = "TypeSystemOverview" class="inter-header">Overview of a type system</a></b></h3>

A type system is a language component that is responsible for type checking.  
Scala is a statically typed language, so there are always a defined set of types and anything that 
does not belong in that set is not regarded as a valid type and an appropriate error is thrown at compile time.

Why have any type system at all?

Because computers cannot match human stupidity, and certain things are better handled by the compiler rather than relying on people for getting it right. 
It also can prevent a ton of bugs that pop up due to improper types. A type system exists to give 
[type safety](https://en.wikipedia.org/wiki/Type_safety){:target="_blank"}, and the levels of strictness is what differentiates between different languages and 
run times.

This brings us to another question, the kind of type systems that exist and how we can classify different languages.

<h3><b><a name = "TypeSystem" class="inter-header">Language classification according to their type system</a></b></h3>

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

That was a dizzying number of systems. I also highly encourage you take this [course](https://courses.cs.washington.edu/courses/cse341/13wi/){:target="_blank"}, 
to understand more. Videos are available for download/offline viewing.

This might also come up on [Coursera](https://www.coursera.org/course/proglang){:target="_blank"} as well, so make sure you add it to your watchlist. There is also [another course](https://www.youtube.com/playlist?list=PLOJWMozcY9B1NfDp_AJkJnFPaS7wOwEha){:target="_blank"} which is really good.

Scala can be classified as a statically typed language with type inference. 
There is a strong relation between functional programming and type inference which we will keep re-visiting from time to time.

<h3><b><a name = "Hindley" class="inter-header">Hindley-Milner(HM) type inference</a></b></h3>

We can talk about type inference for days but perhaps the most famous algorithm of them all is 
[HM type inference algorithm](https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system){:target="_blank"}.

The HM algorithm checks the program to deduce what type it belongs to. If you have taken the courses above, then you would have a pretty solid idea what that means.

Below is an example of how a typical type system with type inference would work. 
It would build a parse tree consisting of all the elements, analyses the elements of what type it could be and prepare the final tree.

![Scala type system](/images/HM-type-inference.png)

<br>

The above example is pseudo code and the syntax is not much of importance. It returns true if the sum is less than 10 and false if greater. 
We can translate/build up from this example to other complicated workflows.

Many algorithms work in almost the same manner. If there are any type errors such as multiplying two strings, it would throw an exception.

Some entry level haskell programming will really help to understand this better. [Learn you a haskell](http://learnyouahaskell.com/){:target="_blank"} 
is a good website to start with.

Hindley-Milner algorithm is also called as Global type inference. It reads the source code as a whole and deduces the types. 
Scala's type system works a little different.

<h3><b><a name = "LocalvsGlobal" class="inter-header">Local vs Global type inference and sub-typing - Why scala choose local type inference</a></b></h3>

Scala's follows a combination of sub-typing and local type inference. I tend to compare it with Haskell, since it one of the most famous 
Functional Programming(F.P) paradigm language out there.

Let's understand with an example.

If we consider the below code, it gives a compile time error in Intellij.

{% highlight scala %}

def factorial(a: Int) = {
    if (a <= 1) 1 else a * factorial(a - 1)
}

{% endhighlight %}

Error message <i class="fa fa-level-down fa-lg space-right"></i>

![Scala type error](/images/scala-factorial-error.png)

Syntax details can be ignored for now (we can deal with lot more detail while learning methods). 
The program computes the factorial value based on the number passed in. If we notice the error, the compiler is not able to infer/deduce the type of the 
recursive function. The same(similar) code can be used in haskell without any errors.

{% highlight haskell %}
let factorial 0 = 1; factorial n = n * factorial (n - 1)
{% endhighlight %}

The above code when executed inside the Haskell GHCI shell (kind of like Scala REPL) compiles with no errors.

![Haskell Global type inference](/images/haskell-factorial.png)

This is a real world example of Global vs Local type inference. In Scala, we have to annotate the types wherever 
local type inference does not help (also see below on when to use type inference).

The correct version of the above code would be as follows. Notice the type `Int` is explicitly mentioned.

{% highlight scala %}

 def factorial(a:Int): Int = {
    if(a <=1) 1 else a * factorial(a-1)
  }
  
{% endhighlight %}  

For a language that is multi-paradigm, it is really hard to do global/hindley-milner style type inference since it restricts doing OOP features such as 
inheritance and method overloading. We are not going to in detail of why languages such as Haskell cannot do such things 
(there are lots of resources on the net if you are curious on systems programming/compiler hacking), but the point is Scala has made a different trade-off.

Systems do exist which combine these together(experimental) and continuous research is being done in this area to improve them.

<h3><b><a name = "ScalaTypes" class="inter-header">A brief overview of scala's type system and subtyping</a></b></h3>

A type system is made of predefined components/types and this forms the foundation of how they are inferred.

![Scala type system](/images/scala-type-system.png)

The picture says it all, you can try to dig into the source code by the usual intellij route of ctrl+click and it all points to the `Any` class. 
Please note that types are not regular classes, although they seem to be. We will deal with it in a future article in detail.

[Sub-typing](https://en.wikipedia.org/wiki/Subtyping){:target="_blank"} is something that is not supported by the Hindley-Milner algorithm, 
but is essential in a multi-paradigm world. This is also another reason why Scala does not use the HM algorithm.

Let's look at the below example to understand sub-typing.

![Scala sub-typing](/images/scala-sub-typing.png)

We are constructing a heterogeneous list where sub-typing converts the lower type into a higher type wherever necessary. 
A simple example would converting a Int to a Double which is the first example. If it cannot be fit, it goes to the top level i.e the `Any` type. 
All of this conversion can be translated to the type system hierarchy above.

This makes Objected oriented programming much easier to handle. For more information you can visit the [Scala docs](http://docs.scala-lang.org/tutorials/tour/unified-types.html){:target="_blank"} for type systems.

<h3><b><a name = "ValueVsReference" class="inter-header">Value types and Reference types</a></b></h3>

The left sub-tree in the above tree contains all the value types i.e everything that comes under
`AnyVal` and types that come under `AnyRef` are all reference types. They are similar to their java counterparts and compiles to the same thing as far as the JVM is concerned (more on that in later tutorials).

Value types are similar to native types in java. They are created as follows.

{% highlight scala %}

val x : Int = 3

{% endhighlight %}  

While reference types need to have the `new` keyword.

{% highlight scala %}

val arr = new ArrayBuffer[Int]()

{% endhighlight %}  

Of course there are some exceptions to this. `String` is a special one. Collection classes such as `Array` and `List` have their own `apply` method so that they can be created without the new keyword (`apply` is explained in [part 15](/blog/scala-tutorials-part-15-the-apply-method/)). Technically, they are objects in the jvm as opposed to native types, so they require the `new` keyword for their creation.

<h3><b><a name = "Usage" class="inter-header">When to use type inference?</a></b></h3>

There is a fine line that divides dynamic typing (no types) and static typing with type inference. 
As they say "all code should look like well written prose", it is important to know when to use them and when not to.

<i class="fa fa-arrow-circle-right" aria-hidden="true"></i> When to use them? 

When it saves programmer time and also where type information does not really matter. 
Situations could be inside of a function or a loop where the information about types is obvious.

<i class="fa fa-arrow-circle-right" aria-hidden="true"></i> When not to use them? 

Simple, when type information is important i.e it should not leave the programmer who reads to code guessing about types.

It is hard to give a code example since it really depends on application under consideration. 
The only fool-proof way to deal with this is to conduct code reviews with peer programmers and see if they can understand them.

After all writing code is O(K) and reading code would be O(N), where K would be a constant with not much variation, 
since only a single person would be writing it and N would be the size of your team trying to read the code. It multiplies with team size.

With guessing comes mistakes, with mistakes come bad code, and with bad code
comes frustration, with frustration comes the [axe murderer](http://blog.codinghorror.com/coding-for-violent-psychopaths/){:target="_blank"}

It is a matter of code readability rather than anything else. With freedom comes responsibility <i class="fa fa-thumbs-o-up"></i>

Congratulations !! If you have understood/reached this far, then you should be proud of yourself. Rather than saying this is a pretty difficult topic, 
I would say it is a very non-intuitive one to get your head around.

<i class="fa fa-hourglass-start space-right"></i> Stay tuned !! This is just the beginning.

<h3><b><a name = "References" class="inter-header">References</a></b></h3>

- [University of washington - Programming Languages](https://courses.cs.washington.edu/courses/cse341/13wi/){:target="_blank"}
- [Arizona State University - Principles of Programming Languages](https://www.youtube.com/playlist?list=PLOJWMozcY9B1NfDp_AJkJnFPaS7wOwEha){:target="_blank"}
- [Edx Functional programming - Delft University of Technology](https://www.edx.org/course/introduction-functional-programming-delftx-fp101x-0){:target="_blank"} 
- [Learning haskell](http://learnyouahaskell.com/){:target="_blank"} 