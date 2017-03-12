---
layout: post
title: "Scala Tutorials Part #12 - Infix notation"
permalink: blog/scala-tutorials-part-12-infix-notation/
tags: [Scala]
---

Infix Notation
--------------

We already saw what [infix notation](https://en.wikipedia.org/wiki/Infix_notation){:target="_blank"} was 
in [part 7](/blog/scala-tutorials-part-7-objects-everywhere/#Operations) in a very brief manner.
 
In this article we are going to see what it is in detail and where it actually helps.

This is part 12 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.


<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Dot notation in java](#DotNotation)
- [Infix notation introduction](#InfixNotation)
- [Dealing with verbosity](#Verbosity)
- [Avoiding infix in suffix notation methods](#Suffix)
- [N-Arity methods](#N-Arity)

<h3><b><a name = "DotNotation" class="inter-header">Dot notation in java</a></b></h3>

The regular way to call methods in a language such as `java` would be like,

{% highlight java %}

public class Test {

    public static void main(String[] args) {
        
        Test t = new Test();
        
        t.printSomething();
       
    }
    
    
    public void printSomething() {
        System.out.println("Hello from a java method");
    }
}

{% endhighlight %}

The dot indicates that it is a method call. It is also used to refer variables as well.

{% highlight java %}

public class Test {

    int a = 10;

    public static void main(String[] args) {

        Test t = new Test();

        t.printSomething();
        System.out.println(t.a);

    }


    public void printSomething() {
        System.out.println("Hello from a java method");
    }
}

{% endhighlight %}


<h3><b><a name = "InfixNotation" class="inter-header">Infix notation introduction</a></b></h3>

We already saw that even the `+` operation is in fact a method call in part 7. It is a pretty good example of how this works.

The `.+` can be called without the `.` and with the `+` alone and even with spaces. This is a feature of the scala compiler and not syntactic
sugar i.e its built right into the language.

Let's understand with our own example.

Consider a case class which can represent a complex number and have an addition operation inside it.

{% highlight scala %}

case class ComplexNumber(real: Double, imaginary: Double) {

    def +(number: ComplexNumber): ComplexNumber =
      ComplexNumber(real + number.real, imaginary + number.imaginary)
      
}
  
{% endhighlight %}

This defines a method with the name `+` and adds two instances of the `ComplexNumber` class. Not to be confused with recursion, here we are just calling
the constructor with different values.

As we saw in [part 6](/blog/scala-tutorials-part-6-case-classes/) creating instances of these is pretty simple. We can even create two instances and make
use of the plus method to add them together.

{% highlight scala %}

object Runnable extends App  {


  val a = ComplexNumber(2, 5)
  val b = ComplexNumber(1, -3)

  val c = a.+(b)


}

{% endhighlight %}

Using infix notation we can call the method `+` without using the dot.

{% highlight scala %}

object Runnable extends App  {


  val a = ComplexNumber(2, 5)
  val b = ComplexNumber(1, -3)

  val c = a.+(b)
  
  val d = a + b


}

{% endhighlight %}

<h3><b><a name = "Verbosity" class="inter-header">Dealing with verbosity</a></b></h3>

If we don't have the infix notation option then we would have deal with the below syntax.

{% highlight scala %}

object Runnable extends App  {
  
  val dotNotation = ComplexNumber(10,7).+(ComplexNumber(12,44)).+(ComplexNumber(55,4))
  
}

{% endhighlight %}

Life is much more simpler with infix notation.

{% highlight scala %}

object Runnable extends App  {

  val dotNotation = ComplexNumber(10,7).+(ComplexNumber(12,44)).+ (ComplexNumber(55,4))

  val infixNotation = ComplexNumber(10,7) + ComplexNumber(12,44) + ComplexNumber(55,4)

}

{% endhighlight %}

Not only that the syntax is natural, but there are lesser chances to make mistakes.

Verbosity does not necessarily mean that it is bad, but it should not get in the way of a programmer, there is a fine line that divides where it helps and where
it is just a headache.

The [Bigint type](/blog/scala-tutorials-part-7-objects-everywhere/#Bigint) which we saw earlier is an another good example of this can be useful.

A programmer need not invent special syntax to work with complex types. In fact with this syntax one can write almost any type that seems sensible
and give all this syntactic sugar over it such `+`,`-` etc.,

<h3><b><a name = "Suffix" class="inter-header">Avoiding infix in suffix notation methods</a></b></h3>

Now that we understand how this notation thingie works, there are cases where they should not be used.

In [part 3](/blog/scala-tutorials-part-3-methods/#Method4) we saw that a method which has does not take any parameters and 
returns nothing is called as a [0 arity method](http://docs.scala-lang.org/style/method-invocation.html#arity-0){:target="_blank"} and it can be called either 
with or without an empty circular param depending on how the original method is defined. This is called 
[suffix notation](http://docs.scala-lang.org/style/method-invocation.html#suffix-notation){:target="_blank"}.

One important point to note is that this notation should be used only if it is a [pure function](/blog/scala-tutorials-part-9-intro-to-functional-programming/#PureFunctions).

This is a situation where the infix notation would cause a problem. Let's take the below example.

![Method arity error](/images/arity_method_error.png)

As explained in the docs, since there is no semicolon after the `a x` infix call, it considers the next statement i.e the `println` also as a method argument.

If we gave the method a dummy parameter of the `Unit` type as below.

{% highlight scala %}

object Runnable extends App  {

  val a = new A
  a x
  println("b")

}

class A {

  def x(f: Unit): Unit = println("a")

}

{% endhighlight %}

Then something unexpected happens. It prints out `b` and then `a` as opposed to `a` and then `b`. This occurs since the entire `println` is passed as an argument to the `x` method.

I also encourage to debug through the code for more clarity.

So it is better to follow the regular dot notation and avoid infix for the above suffix/no argument pure functions.

{% highlight scala %}

object Runnable extends App  {

  val a = new A
  a.x
  println("b")

}

class A {

  def x(): Unit = println("a")

}

{% endhighlight %}

Works as expected i.e printing `a` before `b`.

<h3><b><a name = "N-Arity" class="inter-header">N-Arity methods</a></b></h3>

Any method that has greater than zero arguments can be considered as an n-arity method where n is the number of arguments to that method.

As always, an example speaks more than words.

{% highlight scala %}

object RunExample extends App  {

  val list = List(1,2,3,4)

  println(list mkString "|")

}

{% endhighlight %}

`mkString` is a method which takes one string argument as a separator and then turns the given list to a `String`.

If there is more than one argument, then it needs to be wrapped up to into a param.

{% highlight scala %}

object RunExample extends App  {

  val string = "Hi there"
  
  //Wrong - Will result in compilation error
  string substring 1,3
  
  //Correct
  string substring (1,3)

}

{% endhighlight %}

Infix notation is one of the core concepts in scala and it is used all over the place. It is particularly useful to design Domain Specific Languages(DSLs). A good understanding of it is necessary. 

Stay tuned <i class="fa fa-smile-o fa-lg"></i>



