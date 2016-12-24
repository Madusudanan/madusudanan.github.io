---
layout: post
title: "Scala Tutorials Part #7 - Objects Everywhere"
permalink: blog/scala-tutorials-part-7-objects-everywhere/
tags: [Scala]
---

Objects Everywhere
------------------

In this post we discuss on why the concept of an object in scala is more prevalent and what are its advantages. We compare extensively with data types since they are fundamental to the language.

This is part 7 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.


<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Introduction)
- [Data types as Objects](#DataTypes)
- [Operations on types](#Operations)
- [Creation of custom types](#Creation)
- [Java's data type boxing/unboxing compared](#Java)

<a name = "Introduction"><u>Introduction</u></a>

Scala is a multi-paradigm language, mainly a combination of object oriented and functional.

To support this kind of a language, it is necessary to formulate an idea around which things are built. 
As we saw earlier, in scala there are no primitive types and everything is an object. This is not be confused with singleton objects which we saw in part 4, but object
as in instance of a class. In the rest of this article and object means an instance of a class an in regular java speak.

![Objects everywhere](/images/objects-everywhere.jpg)

I have explained before that these two concepts i.e object oriented and functional are [kind of orthogonal](http://stackoverflow.com/questions/3949618/are-fp-and-oo-orthogonal){:target="_blank"} to each other.

I am not going to give a exhaustive list on what are all objects and what are not, but I will be explaining the idea and advantages behind it and why it is important.

<a name = "DataTypes"><u>Data types as Objects</u></a>

We have seen this before. There are no native data types in scala and all of the data types have a class of their own.

Now how would you go by designing something as fundamental as a data type ? Turns out that all of the data typs map to native data types in java whenever it seems appropriate. We will take a look at one example i.e Int since it is simpler to explain and the same idea extends to almost all of the types.

You can try decompiling a class containing an `Int` and see it compiles to `public static int age` i.e the java primitive type int.

All of the data types in scala except `String` are present inside the [package scala](http://www.scala-lang.org/api/current/scala/AnyVal.html){:target="_blank"}

Below is a list of data types that convert directly to [native types on the JVM](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html){:target="_blank"}

<table border="1"> 
    <tbody>
    <th align="left">Scala type</th>
    <th align="left">Runtime mapping</th>
    <tr><td> 
    <a href="http://www.scala-lang.org/api/current/scala/Int.html" target="_blank">
      Int.scala
    </a>
    </td>
    <td>int</td></tr>
    <tr><td> 
    <a href="http://www.scala-lang.org/api/current/scala/Short.html" target="_blank">
      Short.scala
    </a>
    </td>
    <td>short</td></tr>
    <tr><td> 
    <a href="http://www.scala-lang.org/api/current/scala/Double.html" target="_blank">
      Double.scala
    </a>
    </td>
    <td>double</td></tr>
    <tr><td> 
    <a href="http://www.scala-lang.org/api/current/scala/Long.html" target="_blank">
      Long.scala
    </a>
    </td>
    <td>long</td></tr>
    <tr><td> 
    <a href="http://www.scala-lang.org/api/current/scala/Byte.html" target="_blank">
      Byte.scala
    </a>
    </td>
    <td>byte</td></tr>
    <tr><td> 
    <a href="http://www.scala-lang.org/api/current/scala/Float.html" target="_blank">
      Float.scala
    </a>
    </td>
    <td>float</td></tr>
    <tr><td> 
    <a href="http://www.scala-lang.org/api/current/scala/Boolean.html" target="_blank">
      Boolean.scala
    </a>
    </td>
    <td>boolean</td></tr><tr><td> 
    <a href="http://www.scala-lang.org/api/current/scala/Char.html" target="_blank">
      Char.scala
    </a>
    </td>
    <td>char</td></tr>
    </tbody>
</table>

Scala variables do not have any additional overhead of creating objects, they all map to a native type in the JVM.


<a name = "Operations"><u>Operations on types</u></a>

We have established that all base types are objects in scala. The next important thing that comes to mind is that how will one do operations on it ?
Since adding two objects is not possible, scala resorts to something called synthetic methods which we saw earlier in case classes.

All operations that we do in primitive java types such as `+`,`-`,`*` etc ., are implemented as methods. Let's take [Int.scala](http://www.scala-lang.org/api/2.12.0/scala/Int.html){:target="_blank"} for example and look at how addition is implemented.

{% highlight scala %}
 /** Returns the sum of this value and `x`. */
  def +(x: Byte): Int
  /** Returns the sum of this value and `x`. */
  def +(x: Short): Int
  /** Returns the sum of this value and `x`. */
  def +(x: Char): Int
  /** Returns the sum of this value and `x`. */
  def +(x: Int): Int
  /** Returns the sum of this value and `x`. */
  def +(x: Long): Long
  /** Returns the sum of this value and `x`. */
  def +(x: Float): Float
  /** Returns the sum of this value and `x`. */
  def +(x:Double): Double
{% endhighlight %}  

Many things can be inferred from the above code snippet and `Int.scala`.

- Above code sample defines all of the possible addition operations for other types with the `Int` type. Other type operations for `Boolean`,`Double` etc have the same kind of logic.
- The above definition is inside of an abstract class and it is final hence cannot be extended.
- As we saw in the second part, all the variables with value types extend `AnyVal` which again extends from `Any`.

All of the mentioned methods which define the fundamental operators are abstract. So how does it get implemented ?

If you try the same with regular classes you will get an error.

{% highlight scala %}

abstract class CustomVariable {

  def +(x: Byte): Int

}
{% endhighlight %}  

Insert image from CentOS

So how does it work and gets translated to native type ? It's all compiler magic. As usual, lets understand by de-compiling a few classes.

Remember that scala type classes have special meaning since they follow a hierarchy and that is the reason why the Int.scala is abstract but still we are able to use it.

Let's consider the below class with a custom `+` function implemented.

{% highlight scala %}

class CustomVariable {

  def +(y:Int) : Int = {
    this+y
  }

}

{% endhighlight %}  

This gets compiled as below.

{% highlight java %}


public class CustomVariable {
  public int $plus(int);
    Code:
       0: aload_0
       1: iload_1
       2: invokevirtual #12                 // Method $plus:(I)I
       5: ireturn

  public CustomVariable();
    Code:
       0: aload_0
       1: invokespecial #20                 // Method java/lang/Object."<init>":()V
       4: return
}

{% endhighlight %}  

The `+` gets compiled to `$plus` since the former is not a legal definition as per java.

Let's see another example.

{% highlight scala %}

class CustomVariable {

  def add_1(x: Int, y: Int) = x + y

  def add_2(x: Int, y: Int) = (x).+(y)

}

{% endhighlight %}  

It gets decompiled as,

{% highlight java %}

public class CustomVariable {
  public int add_1(int, int);
    Code:
       0: iload_1
       1: iload_2
       2: iadd
       3: ireturn

  public int add_2(int, int);
    Code:
       0: iload_1
       1: iload_2
       2: iadd
       3: ireturn

  public CustomVariable();
    Code:
       0: aload_0
       1: invokespecial #20                 // Method java/lang/Object."<init>":()V
       4: return
}

{% endhighlight %}  

The `+` and `.+` gets compiled to same to the `iadd` operation. This way of calling a class member without the dot operator is called [infix notation](http://docs.scala-lang.org/style/method-invocation.html#suffix-notation){:target="_blank"} which we will in-detail below.

Since the `+` magic is done while compilation, the `+` by itself is represented as a synthetic function.

<a name = "Creation"><u>Creation of custom types</u></a>

We looked at how `Int.scala` was coded. But how would you go about creating something fundamental as this without the help of the compiler.

If you took the course in Coursera "Functional Programming principles in Scala - by Martin Odersky", then you would be familiar with this. 
Nonetheless, below is the video where he explains it in a succinct way.

https://www.youtube.com/watch?v=Uu9BaV6sKPQ



