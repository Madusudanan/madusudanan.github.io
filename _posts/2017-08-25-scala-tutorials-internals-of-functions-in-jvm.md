---
layout: post
title: "Scala Tutorials Part #20 - Internals of Functions in the JVM"
permalink: blog/scala-tutorials-part-20-internals-of-functions-in-jvm/
tags: [Scala]
---

Internals of functions 
----------------------

In the [last part](/blog/scala-tutorials-part-19-lambda-calculus/) we saw how functional programming came into existence with inspiration 
from lambda calculus. In this article we will look at how functions are implemented in the JVM, since it does not natively support functional programming. This knowledge might not be really necessary in the life of a day to day developer but will come in handy when dealing with obscure bugs.

This is part 20 of the Scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.

<i class="fa fa-list-ul space-right"></i> Index

- [Decompiling Functions](#Decompiling)
- [The FunctionN trait](#FunctionTrait)
- [Functions vs Methods](#FunctionsVsMethods)
- [Interoperability with OOP](#Interoperability)

<h3><b><a name = "Decompiling" class="inter-header">Decompiling Functions</a></b></h3>

Let's consider the simple square function again that we saw in the last part. 

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


We can see that it gets converted to an instance of the [Function1 trait](https://www.scala-lang.org/api/current/scala/Function1.html){:target="_blank"}. This trait extends the `AnyRef` class which is the root class of all [reference types](/blog/scala-tutorials-part-2-type-inference-in-scala/#ScalaTypes). 
This leads us to the understanding that all functions in Scala are objects in some form, in this case it is an instance of the `FunctionN` trait.

Another experiment we can perform is create a test class with a function.

{% highlight scala %}

class Run {

  def square(i:Int) : Int = i*i

  val squared = (i:Int) => i*i

}

{% endhighlight %}

If we compile this it generates two files i.e

- `Run.class`
- `Run$$anonfun$1.class `

The `Run$$anonfun$1.class` is the function class. By decompiling it, we can understand even more.

{% highlight java %}

public final class Run$$anonfun$1 extends scala.runtime.AbstractFunction1$mcII$sp implements scala.Serializable {
  public static final long serialVersionUID;
  public final int apply(int);
  public int apply$mcII$sp(int);
  public final java.lang.Object apply(java.lang.Object);
  public Run$$anonfun$1(Run);
}

{% endhighlight %}

Most of it is boiler plate for the JVM such as a serializable, apply and a constructor.

<h3><b><a name = "FunctionTrait" class="inter-header">The FunctionN trait</a></b></h3>

The example we saw earlier was evaluating to a trait called `Function1`, interestingly there are similar traits ranging from Function1 to Function22. 
Whoa !! So do the Scala developers put in 22 classes manually? Well the answer is obviously no and notice on the top of source code comments it says,

`// GENERATED CODE: DO NOT EDIT. See scala.Function0 for timestamp.`

Meaning it is generated from somewhere and not hand coded manually. Another thing to note is that the trait is using something what we would call the 
java equivalent of generics to handle heterogeneous types. We will see generics in detail in a later tutorial.

Next question that will come up is what will happen if there are functions with more than 22 parameters? 
You would notice that this number 22 was also present in case classes prior to 2.11 and was removed in [2.11](https://github.com/scala/scala/pull/2305){:target="_blank"} along with a few edge cases but it lives on in `Functions` and `Tuples`. In a real world scenario, hitting the 22 limit is rare 
and can be overcome by using nested structures such as Tuples or use other data structures such as `HList` (will explore later). Nested tuples however 
makes more sense and gives a natural structure.

Developers must keep in mind that the internals of how a function is implemented can change anytime but the core concept of a function being an 
object is not going to change much.

<h3><b><a name = "FunctionsVsMethods" class="inter-header">Functions vs Methods</a></b></h3>

Even though the syntax of both methods and functions start with the `def` keyword, now we know that they are not the same.

- Methods cannot be defined as values
- Cannot be passed around to other functions as values

Methods belong to the object oriented world and has nothing to do with functions. In fact the very question of how methods are different
from functions does not even make sense once you understand what functions are how the generated bytecode looks like.

<h3><b><a name = "Interoperability" class="inter-header">Interoperability with OOP</a></b></h3>

Since each function is an object by itself, it can easily work in tandem with regular imperative/object oriented code. For example, let's consider the already defined square function.

{% highlight scala %}

def square : Int => Int = (x:Int) => x*x

{% endhighlight %}

This takes an integer as a parameter and returns an integer and can be consumed like a regular method. To a programmer looks like a simple method while it is actually a function behind the scenes. 

We have come to the end of this part and have learnt quite a lot of functional programming concepts in the last part and this one. Learning the internals of functions might not be necessary but can definitely make you feel at home(JVM).










