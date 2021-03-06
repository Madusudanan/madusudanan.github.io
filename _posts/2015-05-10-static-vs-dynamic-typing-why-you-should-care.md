---
layout: post
title: "Static vs Dynamic typing - Why you should care?"
permalink: blog/static-vs-dynamic-typing-why-you-should-care/
tags: [Programming]
last_updated: 2016-08-03
---

Static vs Dynamic typing
------------------------

As a primer to this post, you can read 
[this](http://stackoverflow.com/questions/1517582/what-is-the-difference-between-statically-typed-and-dynamically-typed-languages){:target="_blank"} stack overflow article.

<i class="fa fa-arrow-circle-right" aria-hidden="true"></i> What this blog post is?

The main purpose is to emphasize the importance of types in programming and why it matters for serious programming.

<i class="fa fa-arrow-circle-right" aria-hidden="true"></i> What it is not?

This may sound like a rant, but the actual purpose is to remove lot of myths that surround both dynamic and static typing. This is not a comparison between compiled
and interpreted languages, that is a design decision of the language developer. Our goal here is to understand it from a programmer's perspective and what difference does it make. 
Also I am not comparing languages, but rather than the paradigm behind it which is more important, and for that reason certain things might not be applicable to all dynamically typed languages.

Back to the topic, in a nutshell what static typing means is that the type of the variable should be declared/known at compile time. 
Examples of these are Java, Scala, Go. Languages such as PHP, Python, Javascript do not require the type information at compile time 
and they are evaluated at run time.

<h3>Problems with dynamic typing</h3>

Note that these are just examples to give a feel, not to list things that are wrong.

- <a href="#NoReturn">No return statements</a>
- <a href="#NoTypeInfo">No type information</a>
- <a href="#TypeCastingHell">Type casting is hell</a>
- <a href="#MissedDependancies">Rune time error checking</a>
- <a href="#Slow">Performance factor</a>
 
<h3><b><a name="NoReturn" class="inter-header">No return statements</a></b></h3> 

Consider the below piece of python code which returns a result greater when a>b and does not do return anything when it is lesser. 
This is a programmer's fault, but the compiler and/or editor will not alert that there is something wrong, 
and when you print it out it prints "None" in python and "Undefined" in Javascript.

{% highlight python %}

def greater(a, b):
    if a > b:
    return "greater"
        
print(greater(10, 22))
    
{% endhighlight %}


This could cause problems, when you are evaluating these function values. In a statically typed language such as Java, 
the code would not even compile and if you are using an IDE (you should be) it would highlight the problem.

<h3><b><a name = "NoTypeInfo" class="inter-header">No type information</a></b></h3>

Dynamic typing is notoriously known for better programmer productivity (whatever that is) due to the type freedom when coding. But people forget something that is
fundamentally wrong with this idea, you still have to know what type you are dealing with. You cannot add two classes or subtract two strings, although the compiler would
throw up some result, it will usually be some pretty useless information(read typecasting below).

For an example, consider the below piece of code.

{% highlight php %}

<?php>
function readFromWebServiceAndParse($data){
  //Do something
  //Return some value
}
{% endhighlight %}


The function does not have any type information coming in or going out of it. Now the question is, can you consume this function without any documentation or going
through/understanding the code completely? Where is the so called type freedom here?

On the contrary, even though static typing is not self describing about the function/method's purpose, it would at least save the hassle of calling it with the wrong
type with compile time checking.

>Being type free is not freedom

<h3><b><a name = "TypeCastingHell" class="inter-header">Type casting is hell</a></b></h3>

Type casting needs to be done in all languages, but it is painful in dynamically typed languages. 
Although there are no naive code examples that I can give to demonstrate this, 
[Wat](https://www.destroyallsoftware.com/talks/wat){:target="_blank"} is a fun talk(video) 
below given by [Gary Bernhardt](https://twitter.com/garybernhardt){:target="_blank"} which just gives you the idea. Take it on a lighter note BTW.

<h3><b><a name = "MissedDependancies" class="inter-header">Run time error checking</a></b></h3>

This is something that I have personally faced, let's say we have two [pull requests](http://git-scm.com/docs/git-request-pull){:target="_blank"} and they depend on each other. 
A mistake happens and Pull request #2 which depends on #1 is merged first. Since there is no build, you would not know this unless you actually see this in run time as a
user or possibly some in some logs. Of course, proper testing could have prevented this, but in a static language system you cannot do this and your build will fail. 
The problems with dynamic typing is you would require a lot of work to prevent issues, such as documentation about types, careful testing. 
In a static setting you are protected against some of these due to compile time checking rather than at runtime.

Certain error checking for dynamic languages are provided my modern IDEs, but the compiler/interpreter does not provide this. 
This is the nature of dynamic languages, they were not meant to catch errors are compile time, since the language itself is interpreted rather than compiled. 
Why make it harder for yourself when the compiler does all the error checking for you?
 
<h3><b><a name = "Slow" class="inter-header">Performance factor</a></b></h3>

Of course there is the performance issue, but I have put this last since most of the applications do not even near this.Something at the scale of facebook, it does matter
and [HHVM](http://hhvm.com/){:target="_blank"} is a practical example of this.

Even though these problems exist, some people still favour dynamic typing for the wrong reasons, most of these are myths created by self-taught programmers who have no
idea what Software Engineering is and how it should be done.

>The sooner you catch an error, they easier and cheaper it is to fix it.

<h3>Myths</h3>

There are some myths that surround both of these paradigms. Time for some myth-busting.

- <a href="#Verbosity">Verbosity of static typing</a>
- <a href="#Build">Build/Compilation is slow</a>
- <a href="#SkilledProgrammers">Skilled programmers can avoid type problems</a>
- <a href="#TDD">Test driven development can solve many of the type problems</a>
- <a href="#Productivity">Dynamic typing has better productivity</a>
- <a href="#TypeFreedom">Static typing is rigid</a>
- <a href="#HeterogenousTypes">Heterogeneous data structures</a>
- <a href="#PythonUniv">Universities use python</a>

<h3><b><a name = "Verbosity" class="inter-header">Verbosity of static typing</a></b></h3>

What is verbosity?

Well people call some languages verbose because they are lazy to type, but the actual meaning is having to type unnecessary information.This is not entirely true, there
are some places where you call out Java as verbose, but the language by itself cannot be categorized in such a way. Some newer languages such as Scala and Go, 
fare much better at this while maintaining type information. And with strong support from IDEs for things like auto-complete, verbosity is a thing of the past.

<h3><b><a name = "Build" class="inter-header">Build/Compilation is slow</a></b></h3>

Of all the things listed here, this actually is a real problem. The compilation is slower and it is at times frustrating. Reality is many web frameworks such as Play have hot reload built in
, where it automatically compiles where you have done the changes. There are some standalone solutions such as [JRebel](http://zeroturnaround.com/software/jrebel/){:target="_blank"}
and some open source alternatives as well such as [Spring loaded](https://github.com/spring-projects/spring-loaded){:target="_blank"}.

If you are a using a modern framework, chances are the compilation problem has been already solved.

To solve the build problem, there is something called [build automation](http://en.wikipedia.org/wiki/Build_automation){:target="_blank"}, unless you have been living under
a rock you would have already known about this.

There are tons of frameworks such as [gradle](https://gradle.org/){:target="_blank"}, [maven](https://maven.apache.org/){:target="_blank"} being the famous ones and there are Continuous integration tools
to maintain/sync automatic builds.
 
If you are wasting time waiting for a build to complete, then you are doing it wrong.

<h3><b><a name="SkilledProgrammers" class="inter-header">Skilled programmers can avoid type problems</a></b></h3>

Let's face it, programmers are lazy, you cannot expect people to document something as monotonous as which type information that can go in and come out and all the 
fallacies of dynamic typing.

<h3><b><a name = "TDD" class="inter-header">Test driven development can solve many of the type problems</a></b></h3>

Using TDD to test type casting and conversions is an abuse of TDD. It should be used to validate/test functionality, not something that is fundamental such as types.
 
<h3><b><a name = "Productivity" class="inter-header">Dynamic typing has better productivity</a></b></h3>

Yes it has better productivity if you are the only person in the project and you know the code very well.If there is another person who wants to come in and read your code
and work on top of it, it is the exact opposite and it gets worse with the increase in number of people.

The supposed productivity gain is a myth on the longer run.

> [Reading code takes more time than writing code](https://blog.codinghorror.com/when-understanding-means-rewriting/){:target="_blank"}

<h3><b><a name = "TypeFreedom" class="inter-header">Static typing is rigid</a></b></h3>

Java has something called [generics](http://en.wikipedia.org/wiki/Generics_in_Java){:target="_blank"}, in which you can write a functionality that works independent of 
types.Not exactly type freedom, but this is the fundamental way you write something in Java that does not depend on types and avoids boilerplate code.

Of course, method overloading is another way.

Other languages do have something similar.

<h3><b><a name = "HeterogenousTypes" class="inter-header">Heterogeneous data structures</a></b></h3>

Heterogeneous types are possible in Java and even in other languages.Below is an example.

{% highlight java %}
Object[][] array = {
    {"John Smith", 000}, {"Smith John", 001}
};
{% endhighlight %}

Although a class would be better in terms of design.The point is, it is possible, you just have to understand and design it in a different (better) way.

<h3><b><a name = "PythonUniv" class="inter-header">Universities use python</a></b></h3>

Another popular argument. Universities use it because there is lot less startup time to teach them and does not necessarily mean that it is better. In a production setting
there is always code maintenance, try maintaining the all the throw away code from those systems.

This post does not imply that you should avoid dynamic typing, in fact I encourage you to use them, but at appropriate places such as below.

- Rapid prototyping - Focusing on the idea rather than maintenance and the architecture.
- Front end templating - Anything related to displaying content on the web.This does not require types at all.
- Small utilities - Python can almost be entirely used as a replacement for shell scripting.
- Teaching programming - Teaching the core concepts of programming is easier without worrying about types.

That's all folks. Do let me know your thoughts using comments below.

References
----------

- [Team ten - Java for everything](http://www.teamten.com/lawrence/writings/java-for-everything.html)
- [Stackoverflow - What do people find so appealing in dynamic languages](http://stackoverflow.com/questions/42934/what-do-people-find-so-appealing-about-dynamic-languages)
- [Jooq - The inconvenient truth about dynamic typing](http://blog.jooq.org/2014/12/11/the-inconvenient-truth-about-dynamic-vs-static-typing/)
- [Programmers SE - Dynamic vs Static language studies](http://programmers.stackexchange.com/questions/10032/dynamically-vs-statically-typed-languages-studies)
- [Programmers - SE - Supposed productivity gain of dynamic typing](http://programmers.stackexchange.com/questions/122205/what-is-the-supposed-productivity-gain-of-dynamic-typing)
















