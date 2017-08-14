---
layout: post
title: "Scala Tutorials Part #20 - Internals of Functions in the JVM"
permalink: blog/why-scala-tutorials-part-13-pattern-matching-in-scala/
tags: [Scala]
---

Internals of functions 
----------------------

In the [last part](/blog/scala-tutorials-part-19-lambda-calculus/) we saw how functional programming came into existence with inspiration from lambda calculus. In this article we will look at how functions are implemented in the JVM since it does not natively support functional programming. This knowledge might not be really necessary in the life of a day to day developer but will come in handy when dealing with obscure bugs.

This is part 20 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul space-right"></i> Index

- [Decompiling Functions](#Decompiling)
- [The FunctionN trait](#FunctionTrait)
- [Functions vs Methods]()

<h3><b><a name = "Decompiling" class="inter-header">Decompiling Functions</a></b></h3>

Let's consider the simple square function again. 

{% highlight scala %}

def square : Int => Int = (x:Int) => x*x

{% endhighlight %}

If we take a look at the decompiled code then it translates to,

{% highlight java %}

public static scala.Function1<java.lang.Object, java.lang.Object> square();
    Code:
       0: getstatic     #16                 // Field RunExample$.MODULE$:LRunExample$;
       3: invokevirtual #42                 // Method RunExample$.square:()Lscala/Function1;
       6: areturn

{% endhighlight %}


We can see that it gets converted to an instance of the [Function1 trait](https://www.scala-lang.org/api/current/scala/Function1.html){:target="_blank"}. This trait extends the `AnyRef` class which is the root class of all [reference types](/blog/scala-tutorials-part-2-type-inference-in-scala/#ScalaTypes). This leads us to the understanding that all functions in scala are objects in some form, in this case it is an instance of the `FunctionN` trait.

<h3><b><a name = "FunctionTrait" class="inter-header">The FunctionN trait</a></b></h3>

The example we saw earlier was evaluating to a trait called `Function1`, interestingly there are similar traits ranging from Function1 to Function22. Whoa, so do the scala developers put in 22 classes manually? Well the answer is obviously no, notice on the top of source code comments it says

`// GENERATED CODE: DO NOT EDIT. See scala.Function0 for timestamp.`

meaning it is generated from somewhere and not hand coded manually. Another thing to note is that the trait is written what we would call the java equivalent of generics to handle hetegenous types.

Next question that will come up is what will happen if there are functions with more than 22 parameters? You would notice that this number 22 was also present in case classes prior to 2.11 and was removed in [2.11](https://github.com/scala/scala/pull/2305){:target="_blank"} along with a few edge cases but it lives on in `Functions` and `Tuples`. In a real world scenario, hitting the 22 limit is rare and can be overcome by using nested structures such as Tuples or use other data structures such as `HList` (will explore later). Nested tuples however makes more sense and gives a natural structure.

Developers must keep in mind that the internals of how a function is implemented can change anytime but the core concept of a function being an object is not going to change much.








