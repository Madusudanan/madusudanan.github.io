---
layout: post
title: "Scala Tutorials Part #2 - Type Inference in Scala"
permalink: blog/scala-tutorials-part-2-type-inference-in-scala
---

##Type inference

This is part 2 of the scala tutorial series.Here is [part 1](/blog/scala-tutorials-part-1-getting-started).

In this part we are going to deal with type inference in depth.If you recall from the first part, we briefly dealt with type inference and a few examples.
Now we are going to deal it with a little more depth, below is what this article will cover.

<i class="fa fa-list-ul fa-lg space-right"></i>Index

- [What exactly is type inference from a programmer's perspective](#Perspective)
- [Language classification according to their type system](#TypeSystem)
- [When to use type inference?](#Usage)
- [A brief overview of scala's type system](#Types)


<a name="Perspective"><u>What exactly is type inference from a programmer's perspective</u></a>

As said before type inference is not a new concept to the programming world.Many languages such as OCaml,Haskell,Rust,Swift,C#(starting with version 3.0) 
already have these. 

Let's start with the [wikipedia's definition](https://en.wikipedia.org/wiki/Type_inference){:target="_blank"}.
 
>Type inference refers to the automatic deduction of the data type of an expression in a programming language

Well, that was obvious as we saw from the previous post that it automatically deduces types.

The primary purpose of type inference is to help the programmer avoiding verbose typing but still maintaining the compile time type safety of a statically typed language.



