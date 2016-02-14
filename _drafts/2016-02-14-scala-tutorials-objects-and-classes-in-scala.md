---
layout: post
title: "Scala Tutorials #3 - Objects & Classes in Scala"
permalink: blog/scala-tutorials-part-3-objects-and-classes-in-scala
---

##Classes & Objects in Scala

This is part 3 of the scala tutorial series.Check [here](/blog-list?item-0&item-0-2&item-0-2-0) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i>Index

- [Classes and its syntax](#Classes)
- [Instantiating Classes](#Instantiation)
- []()
- [Getters, setters and private](#Getters_Setters)

<a name="Classes"><u>Classes and its syntax</u></a>

Classes are the foundations of Object oriented programming.Scala as already discussed is a multi-paradigm language which fully supports object oriented programming.

Creating a class is pretty straight forward as below.

<code data-gist-id="53700847279dfcff4222"></code>

It is a simple class with two variables age and name.

<a name="Objects"><u>Objects in depth</u></a>


<i class="fa fa-info-circle fa-lg space-right"></i>What are objects ?

So what are objects? In the Object oriented programming world, an object is an instance of a class.In scala it is no different, but it is much more than just an instance.

A Scala object is a singleton instance of an anonymous class.The anonymous here means the object cannot be instantiated again by using new keyword, this can be related
to the singleton design pattern.

If you try to create one, you will end up with an error like below.

<a class="image" href="/images/object-instance-error.png">
<img src="/images/object-instance-error.png" alt="Object Instance Error"/>
</a>

However you can access the methods of the Object just by using <code>HelloWorld.TestMethod()</code> where HelloWorld being the Object and TestMethod being the method.
Objects are roughly the equivalent of static in Java and that is why main methods are declared inside Object.And there are static variables in scala.

If you have created a main method inside a class instead of an object like below,

<code data-gist-id="ca3c857a5a27d4167c28"></code>

You will not be able to run the code with Intellij since it disables the option to run like below.

<a class="image" href="/images/intellij-run-disabled.png">
<img src="/images/intellij-run-disabled.png" alt="Object Instance Error"/>
</a>

If you tried to be heroic to compile it into a jar, well you cannot generate a jar in the first place since the main method is not accessible.

<i class="fa fa-info-circle fa-lg space-right"></i>When to use them ?

As already mentioned, they are roughly the equivalent of static in Java, you can use them to create objects which are singleton and can be passed around without having to worry
about their value being changed.