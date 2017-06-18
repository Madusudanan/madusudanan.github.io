---
layout: post
title: "Scala Tutorials Part #15 - The apply method"
permalink: blog/scala-tutorials-part-15-the-apply-method/
tags: [Scala]
---

The Apply Method
----------------

This is part 15 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [The apply function](#Intro)
- [Using apply in scala](#ApplyInScala)
- [Apply in case classes](#CaseClassApply)
- [Creating objects without new keyword](#WithoutNew)

<h3><b><a name = "Intro" class="inter-header">The apply function</a></b></h3>

`Apply` is just a mathematical name for applying a function to a value/set of values.

Let's consider that `f(x)` is a function with the following definition.

{% highlight matlab %}
f(x) = x+1
{% endhighlight %}

In a programming language speak calling this function can be defined as 
<cite>Call function/method f(x) with value x</cite>. Whereas in a mathematical notation, 
this is usually referred as <cite> applying `f(x)` to value x </cite>.

The [wiki page](https://en.wikipedia.org/wiki/Apply){:target="_blank"} explains this concept in detail.

<h3><b><a name = "ApplyInScala" class="inter-header">Using apply in scala</a></b></h3>

This concept of apply is present in scala to create instances of classes in a unique way. 
Let's take the below container class which represents a bunch of Strings in an array.

{% highlight scala %}

class Container  {

  //Hidden elements variable
  private val elements = Array("Books","Pens","Laptops")

  def apply(index:Int) = if(index<elements.length) elements(index) else "No element found"
  
}

{% endhighlight %}

We have a method called apply in the class which looks like an ordinary method, but it is not. We can now consume
the class and call array index of elements as below.

{% highlight scala %}

val container = new Container

println(container(2))

{% endhighlight %}

The apply method is a special one which is called by default i.e calling `container(2)` is the same as `container.apply(2)` which would 
yield the same result.

![Scala apply](/images/scala_apply.png)

If we put the `apply` method inside of a companion object then we do not need to instantiate since it would become a singleton, which then
simplifies our code to a great extent. We can use `println(Container(2))` and then it would print the same result as above.

The compiler takes of translating the calls to the apply method. 

<h3><b><a name = "CaseClassApply" class="inter-header">Apply in case classes</a></b></h3>

From the [infix notation chapter](/blog/scala-tutorials-part-12-infix-notation/#InfixNotation) we take the complex number example again.

{% highlight scala %}

case class ComplexNumber(real: Double, imaginary: Double) {

    def +(number: ComplexNumber): ComplexNumber =
      ComplexNumber(real + number.real, imaginary + number.imaginary)
      
}
  
{% endhighlight %}

We can create instances simply as,

{% highlight scala %}

  val a = ComplexNumber(2, 5)
  val b = ComplexNumber(1, -3)

  val c = a.+(b)
  
  val d = a + b

{% endhighlight %}

If we look at the [decompiled code](https://gist.github.com/Madusudanan/135e70cf55934c318b90eeee624236d8#file-complexnumber-java-L9){:target="_blank"}
behind this case class, there is an apply method which was auto generated and goes as follows.

{% highlight java %}

public static ComplexNumber apply(double, double);
    Code:
       0: getstatic     #20                 // Field ComplexNumber$.MODULE$:LComplexNumber$;
       3: dload_0
       4: dload_2
       5: invokevirtual #26                 // Method ComplexNumber$.apply:(DD)LComplexNumber;
       8: areturn

{% endhighlight %}

The `apply` method is static because for case classes there is an automatic companion object that is generated with a lot of boilerplate methods which does not make sense as instance and hence they are created in the companion object.

<h3><b><a name = "WithoutNew" class="inter-header">Creating objects without new keyword</a></b></h3>

To recollect what we have learnt till now, we can create instances without the `new` keyword in two ways.

- Case classes
- Object with apply method

Case classes are a simple way to create them. You have a companion object auto generated which creates a static apply method. 
On compilation, all the calls such as `ComplexNumber(2,1)` gets compiled to `ComplexNumber.apply(2,1)`. We can create custom classes that 
emulate only the apply behaviour of case classes by creating an apply method in the companion object .In the end it is just syntactic sugar, 
but this is all done behind the scenes by the compiler without actually resorting to a constructor.

Apply is heavily used as part of the language library such as in the `BigInt` class and other places. This method is very important
because it enables an object whether it is singleton or not to behave like a mathematical function. 









