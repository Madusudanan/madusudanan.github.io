---
layout: post
title: "Why Scala will be the next big thing"
permalink: blog/why-scala-will-be-the-next-big-thing/
tags: [Scala]
last_updated: 2016-08-03
---

Why Learn Scala ?
-----------------

This is not a scala fanboy post, I am currently learning scala and below are some of the things that I felt worth sharing about the language.

It is a very powerful language and not a simple one to learn. First, I will list the good things, and this cannot be done without comparing it with other languages and ill also
speak about its downsides and how to avoid them. There will not be any code, but there are few good videos/talks that you can use to learn the nuances of coding.

No programming language is a silver bullet, it is upto to you to decide what is best for your job.

PS : You are free to use this article to sell scala to your boss <i class="fa fa-smile-o fa-lg"></i>

Heads Up !!
-----------

> If I were to pick a language to use today other than Java, it would be Scala. -- James Gosling, creator of Java  
                                                         
> If someone had shown me the 'Programming in Scala' book back in 2003, I'd probably have never created Groovy -- James Strachan, creator of Groovy

> No other language on the JVM seems as capable of being 'replacement of Java' as Scala, and the momentum behind Scala is now unquestionable -- Charles Nutter , co-creator of JRuby

Ok, those are some pretty big names talking about scala. Let's get started.

A Little bit of History
-----------------------

Scala was designed from 2001 by [Martin Odersky](http://en.wikipedia.org/wiki/Martin_Odersky){:target="_blank"} who was also the co-creator of [javac](http://en.wikipedia.org/wiki/Javac){:target="_blank"} and [Java Generics](http://en.wikipedia.org/wiki/Generics_in_Java){:target="_blank"}.

The main goal of Scala was to be multi paradigm, focused on the JVM and to overcome the potholes left by other languages.

[Scala evolution](http://www.slideshare.net/Odersky/scala-evolution){:target="_blank"} is a short presentation which you can read if you are curious.


Scala - The Good Stuff !!
-------------------------

- <a href="#MultiParadigm">Multi Paradigm</a>
- <a href="#RunsOnJVM">Runs on the JVM</a>
- <a href="#StaticallyTyped">Statically typed</a>
- <a href="#DistributedParallelComputing">Built for Concurrent/Parallel computing</a>
- <a href="#SupportAndEcosytem">Support and Ecosystem</a>


<a name = "MultiParadigm"><u>Multi Paradigm</u></a>

Scala [orthogonally combines](http://stackoverflow.com/questions/3949618/are-fp-and-oo-orthogonal){:target="_blank"} functional programming and object oriented programming which no other language has done till date or at least not to the 
level of Scala on the JVM. Technically Object oriented programming is not a paradigm and falls under the imperative programming paradigm, but you get the idea.

In this aspect it is better than [Haskell](https://www.haskell.org/){:target="_blank"}. 

Functional programming purists might disagree with this statement and say that pure functional programming is always better and does not mix well with OOP.

Well that is not true. Why mix OOP and FP? - Because that's how the real world is like. 
Some aspects are nicely modelled with timeless relations, others need life-cycle and state. Scala offers this perfect balance between both.

But why functional programming in the first place? Below is an excellent talk by Martin Odersky himself on that.

[![Martin Odersky, "Working Hard to Keep It Simple"](https://img.youtube.com/vi/3jg1AheF4n0/0.jpg)](https://youtu.be/3jg1AheF4n0){:target="_blank"}

<a name = "RunsOnJVM"><u>Runs on the JVM</u></a>

Scala was designed to run on the JVM platform. Despite several people ranting about JVM for several reasons, it is a very powerful platform 
which developers can leverage. Making scala run in its own environment would have been re-inventing the wheel. The designers of scala took a very good decision in this aspect.
This has several advantages, mainly being able to directly use Java libraries and other feature rich APIs without having to do much boilerplate work.

This where Scala's close counterpart [OCaml](https://ocaml.org/){:target="_blank"} loses out. Although things are improving, there are many libraries that are missing.

<a name = "StaticallyTyped"><u>Statically typed</u></a>

Yes, scala is statically typed. Why is this even mentioned as an advantage? I encourage you to read [this](/blog/static-vs-dynamic-typing-why-you-should-care) post that explains
the advantages of static typing.

[Clojure](http://clojure.org/){:target="_blank"} was a more newer language that came out in the JVM platform, but it is dynamically typed which gives Scala the advantage here.
There is [typed closure](http://typedclojure.org/){:target="_blank"}, which offers a type safe version, I have not tried that yet so I cannot comment on it. Until then ill go with Scala.

<a name = "DistributedParallelComputing"><u>Built for Concurrent/Parallel computing</u></a>

As [Moore's law](http://en.wikipedia.org/wiki/Moore%27s_law){:target="_blank"} draws near, the need for concurrency is greater than ever. Companies today are looking out for scaling
out rather than scaling up and distributed systems come more into play. With these things in mind, Scala was built to handle concurrency at a more fundamental level using Functional programming.

<a name = "SupportAndEcosytem"><u>Support and Ecosystem</u></a>

Scala has gained extensive support. Companies including Linkedin, Twitter, Coursera, Foursquare etc have ported majority of their code bases to Scala. There is a commercial company called
[typesafe](https://www.typesafe.com/){:target="_blank"}, which Martin Odersky himself is part of it and offers consulting for the Reactive platform built using Scala.

Edit : Typesafe is now [lightbend.](https://www.lightbend.com/){:target="_blank"}

A more comprehensive list is available [here.](https://www.typesafe.com/resources/case-studies-and-stories){:target="_blank"}

Many open source projects such as [Apache Spark](https://spark.apache.org/){:target="_blank"}, [Apache Kafka](http://kafka.apache.org/){:target="_blank"} use Scala for their Core. 
The pretty famous [Play framework](https://www.playframework.com/){:target="_blank"} is developed using Scala.
 
And unlike some languages which I shall not name, Scala was created and has a ecosystem of some really smart people. This does make a difference when you are looking for a platform
to build and rely upon for your product/business rather than for your hobby projects, although it is fun to do some hobby projects using Scala.
  
The Shortcomings !!
-------------------

- <a href="#NotPurelyFunctional">Not purely functional</a>
- <a href="#LearningCurve">Larger learning curve</a>
- <a href="#Popularity">Not yet popular - Well really?</a>


<a name = "NotPurelyFunctional"><u>Not purely functional</u></a>

If you are familiar with the functional programming world, then you can find lot of people arguing that Scala is not purely functional and is ugly at doing some functional
programming constructs. This is not entirely true, while Scala is not a pure functional language, it was not intended to either, it has the right mix of constructs for the real
world implementations. I find the programming constructs comparison a little too academic rather than real world.

But nonetheless, if you are looking for a pure functional language, then you might want to look elsewhere.

<a name = "LearningCurve"><u>Larger learning curve</u></a>

This is common for any new language, but I would admit that it has a steeper learning curve to it. Fortunately things have improved and there are many resources that I have listed
separately below that can be leveraged to overcome this.

<a name = "Popularity"><u>Not yet popular - Well really?</u></a>

You might be surprised that after mentioning many big names that popularity is listed as a shortcoming. Well yes, the software industry is slow to adopt new technologies, primarily because
companies don't really feel comfortable in the cost of migration and developers who don't adapt fearing losing their jobs. Scala is not yet as popular as Java and other languages.
It takes time, but it is definitely not a prototype language, mission critical systems have been developed using Scala.

But as mentioned earlier it is already built on the JVM and it can operate seamlessly with Java libraries.

> Scala is the only language which is statically typed,multi paradigm (object, functional and imperative) and runs on the JVM.

Resources
---------

- Coursera has a really [good course](https://www.coursera.org/course/progfun){:target="_blank"} taught by martin himself.
- Another [excellent course](https://www.coursera.org/course/reactive){:target="_blank"} for reactive programming using Akka (The concurrency library behind play framework).
- A really nice [scala tour](http://www.scala-tour.com/#/welcome){:target="_blank"}.
- A couple of good talks [here](https://www.youtube.com/watch?v=LH75sJAR0hc){:target="_blank"} and [here](https://www.youtube.com/watch?v=ecekSCX3B4Q){:target="_blank"}.

If you find one that is really good, do let me know.

There are several more, but hopefully that should get you started.

References
----------

- [Why we love Scala at Coursera](https://tech.coursera.org/blog/2014/02/18/why-we-love-scala-at-coursera/){:target="_blank"}
- [The Play framework at Linkedin](https://engineering.linkedin.com/play/play-framework-linkedin){:target="_blank"}
- [The Why and How of Scala at Twitter](http://www.slideshare.net/al3x/the-how-and-why-of-scala-at-twitter){:target="_blank"}
- [If you have to just learn one programming language](http://blog.srinivasan.biz/software/if-you-have-to-learn-just-one-programming-language){:target="_blank"}

Hopefully I have convinced you to adopt scala, do let me know your thoughts by commenting below.

Do watch out for more Scala articles.

Happy Coding <i class="fa fa-smile-o fa-lg"></i>



                                                                         
                                                                         