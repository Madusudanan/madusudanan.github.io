---
layout: post
title: "Scala Tutorials #Unknown - The None Type"
permalink: blog/scala-tutorials-part-5-the-none-type
---

<i class="fa fa-list-ul fa-lg space-right"></i>Index

- [Null pointer hell](#NullPointerHell)
- [Variable initialization](#Initialization)
- [The None type](#NoneType)

<a name="NullPointerHell"><u>Null pointer hell</u></a>

Null pointer exceptions are notoriously known for being hard to track.First it is at run time,so your compiler does not help.

Next we have to figure out the code part and give it a non null default value or handle the null case by comparing the value.This is bad for unit testing, refer to the below video.

<i class="fa fa-film fa-lg space-right"></i><a href="https://www.youtube.com/watch?v=RlfLCWKxHJ0&list=PL693EFD059797C21E" target="_blank">Clean code - Don't look for things</a>

What can we do about it ? There are several ways that it can be handled, but in scala there is a much nicer way to do things.Read on to find out more.

<a name="Initialization"><u>Variable initialization</u></a>

In scala, we cannot declare a variable without giving it a value.Doing so will result in an error as below

<a class="image" href="/images/scala-variable-initialization.png">
<img src="/images/scala-variable-initialization.png" alt="Scala variable initialization"/>
</a>

This is by design and it is good for the following reasons.

- There are no uninitialized variables in your code
- Can help prevent NullPointerExceptions
- Compiler can better distinguish between instance variables and an abstract variable i.e the one inside of an abstract class

Abstract classes can have variables without any value because that is the way it should be.The implementing classes should take care of initialization.

Uninitialized variables are bad.More on that [here](http://programmers.stackexchange.com/questions/223862/how-important-is-to-initialize-a-variable){:target="_blank"}.

<a name="NoneType"><u>The None type</u></a>

In the case where the default value is a no-brainer such as -1 to a person's age there is no problem, but for a string variable/or any object what we do usually is to give null as the value.This leads to many issues and
scala has a type called <code>None</code> to handle this.

To better understand, let's compare pieces of code written in java and scala both doing the same thing.

<u>Java code</u>

<code data-gist-id="c6b7e7e7e6cfdc18a8db"></code>

We are declaring a string variable, a natural tendency is to give null as the default value.

This compiles fine in java, but it throws an exception when run i.e the ugly <code>NullPointerException</code>.

<a class="image" href="/images/java-runtime-error.png">
<img src="/images/java-runtime-error.png" alt="Java runtime error"/>
</a>

Equivalent scala code with the None type is as below.

<u>Scala Code</u>

If you are developing in Intellij, the pre-compilation in the compiler would warn you and give you an error such as below.

<a class="image" href="/images/scala-precompile-error.png">
<img src="/images/scala-precompile-error.png" alt="Scala pre-compile error"/>
</a>

But developers are dumb enough to check in code without checking the error.Human stupidity always wins against computers.

The main point is the difference between a compilation error and a run time error.Java code compiles fine, but it gives errors at run time.This makes it more harder to test and makes the 
code more brittle.

None type should be used as the default when you cannot decide how the value will be mutated/changed down the line.Of course this applies only for <code>var</code> types and for
<code>val</code> it is always a good thing to re-think the way we are doing code and think of the value of the immutable variable beforehand.




{
    "rules": {

        "kudos": {
          "$url": {
            ".read": true,
            ".write": "data.child('likes').val().length === 0",

            "likes": {
              "$userid": {
                ".read": true,
                ".write": "auth.uid === $userid"
              }
            }
          }
        }
    }
}