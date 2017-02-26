---
layout: post
title: "Scala Tutorials Part #12 - Infix notation"
permalink: blog/scala-tutorials-part-12-extractor-patterns-in-scala/
tags: [Scala]
---

Infix Notation
--------------

We already saw what [infix notation](https://en.wikipedia.org/wiki/Infix_notation){:target="_blank"} was 
in [part 7](/blog/scala-tutorials-part-7-objects-everywhere/#Operations) in a very brief manner.
 
In this article we are going to see what it is in a detailed manner and where it actually helps.

This is part 12 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.


<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Dot notation in java](#DotNotation)
- [Infix notation introduction](#InfixNotation)
- [Dealing with verbosity](#Verbosity)
- [Method arity](#Arity)

<a name="DotNotation"><u>Dot notation in java</u></a>

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

The dot indicates that it is a method call. In fact it is also used to refer variables as well.

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

So this works fine. Let's understand what infix notation means and why it can be used in place the dot notation.

<a name="InfixNotation"><u>Infix notation introduction</u></a>

We already saw that even the `+` operation is a method call in part 7. In fact it is a pretty good example of how the infix notation works.

The `.+` can be called without the `.` and with the `+` alone and even with spaces. This is in fact a feature of the scala compiler and not syntactic
sugar i.e its built right into the language.

Let's understand with our own example.

We will consider a case class which can represent a complex number and have an addition operation inside it.

{% highlight scala %}

case class ComplexNumber(real: Double, imaginary: Double) {

    def +(number: ComplexNumber): ComplexNumber =
      ComplexNumber(real + number.real, imaginary + number.imaginary)
      
}
  
{% endhighlight %}

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

<a name="Verbosity"><u>Dealing with verbosity</u></a>

Assume that we don't have the infix notation option then we would have deal with the below syntax.

{% highlight scala %}

object Runnable extends App  {
  
  val dotNotation = ComplexNumber(10,7).+(ComplexNumber(12,44)).+(ComplexNumber(55,4))
  
}

{% endhighlight %}

With infix notation this much more simpler.

{% highlight scala %}

object Runnable extends App  {

  val dotNotation = ComplexNumber(10,7).+(ComplexNumber(12,44)).+ (ComplexNumber(55,4))

  val infixNotation = ComplexNumber(10,7) + ComplexNumber(12,44) + ComplexNumber(55,4)

}

{% endhighlight %}

Not only that the syntax is natural, but there are lesser chances to make mistakes.

Verbosity does not necessarily mean that it is bad, but it should not get in the way of a programmer, there is a fine line that divides where it helps and where
it is just a headache.

The [Bigint type](/blog/scala-tutorials-part-7-objects-everywhere/#Bigint) which we saw earlier is also another good example of this can be useful.

A programmer need not invent special syntax to work with complex types. In fact with this syntax one can write almost any type that seems sensible
and give all this syntactic sugar over it such `+`,`-` etc.,


