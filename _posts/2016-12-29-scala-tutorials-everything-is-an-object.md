---
layout: post
title: "Scala Tutorials Part #7 - Objects Everywhere"
permalink: blog/scala-tutorials-part-7-objects-everywhere/
tags: [Scala]
last_updated: 2017-03-05
---

Objects Everywhere
------------------

In this post we discuss on why the concept of an object in scala is more prevalent and what are its advantages. Examples are mostly with data types since they are fundamental to the language.

This is part 7 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.


<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Introduction)
- [Data types as Objects](#DataTypes)
- [Operations on types](#Operations)
- [Creation of custom types](#Creation)
- [Java's data type boxing/unboxing compared](#Java)
- [Bigint example](#Bigint)
- [Typecasting](#Typecasting)
- [Value comparison](#Value)
- [Implementations in other languages and some notes](#Compared)


<a name = "Introduction"><u>Introduction</u></a>

Scala is a multi-paradigm language, mainly a combination of object oriented and functional.

To support this kind of a language, it is necessary to formulate an idea around which things are built. 
As we saw earlier, in scala there are no primitive types and everything is an object. This is not be confused with singleton objects which we saw in part 4, but object
as in instance of a class. In the rest of this article an object means an instance of a class an in regular java speak.

![Objects everywhere](/images/objects-everywhere.jpg)

We have seen before that these two concepts i.e object oriented and functional are [kind of orthogonal](http://stackoverflow.com/questions/3949618/are-fp-and-oo-orthogonal){:target="_blank"} to each other.

I am not going to give a exhaustive list on what are all objects and what are not, but I will be explaining the idea and advantages behind it and why it is important.

<a name = "DataTypes"><u>Data types as Objects</u></a>

There are no native data types in scala and all of the data types have a class of their own.

Now how would you go by designing something as fundamental as a data type ? Turns out that all of the data types map to native data types in java whenever it seems appropriate. We will take a look at one example i.e Int since it is simpler to explain and the same idea extends to almost all of the types.

You can try decompiling a class containing an `Int` and see it compiles to `public static int` i.e the java primitive type int.

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

We have understood that all base types are objects in scala. The next important thing that comes to mind is that how will one do operations on it ?
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

If you try the same with regular classes you will get an error of course.

{% highlight scala %}

abstract class CustomVariable {

  def +(x: Byte): Int

}

{% endhighlight %}  

![Abstract class error](/images/abstract_class_error.png)

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

The `+` and `.+` gets compiled to same to the `iadd` operation. 
This way of calling a class member without the dot operator is called [infix notation](http://docs.scala-lang.org/style/method-invocation.html#suffix-notation){:target="_blank"} 
which we see later in a dedicated tutorial.

Since the `+` magic is done while compilation, the `+` by itself is represented as a synthetic function.

<a name = "Creation"><u>Creation of custom types</u></a>

We looked at how `Int.scala` was coded. But how would you go about creating something fundamental as this without the help of the compiler.

If you took the course in Coursera "Functional Programming principles in Scala - by Martin Odersky", then you would be familiar with this. 
Nonetheless, below is the video where he explains it in a succinct way.

[![Martin Odersky - Objects everywhere](https://img.youtube.com/vi/Uu9BaV6sKPQ/0.jpg)](https://www.youtube.com/watch?v=Uu9BaV6sKPQ){:target="_blank"}

If by any chance the above listed youtube video is taken down, just sign up for the course in Coursera, 
even if you don't need the certificate you can audit the course/see the videos. This video is listed as Lecture 4.1 in the course.

There might be some parts of the video that you might not fully understand, just ignore them for them, I will definitely cover them later.

This should give you an intuition on why such a choice was made in scala.

<a name = "Java"><u>Java's data type boxing/unboxing compared</u></a>

Unlike scala, java has both primitive and boxed types. This is kind of ugly when you compare it with scala since everything is an object here.

We already saw how scala types convert to native JVM primitive types, but how do they work in java ?
 
Let's take the below class for example.

{% highlight java %}

public class Test {

    public static void main(String[] args) {

        Integer i = 10;

        Integer k = 30;

        System.out.println(i+k);

    }
}

{% endhighlight %}  

It gets compiled to,


{% highlight java %}

public class Test {
  public Test();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: bipush        10
       2: invokestatic  #2                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
       5: astore_1
       6: bipush        30
       8: invokestatic  #2                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
      11: astore_2
      12: getstatic     #3                  // Field java/lang/System.out:Ljava/io/PrintStream;
      15: aload_1
      16: invokevirtual #4                  // Method java/lang/Integer.intValue:()I
      19: aload_2
      20: invokevirtual #4                  // Method java/lang/Integer.intValue:()I
      23: iadd
      24: invokevirtual #5                  // Method java/io/PrintStream.println:(I)V
      27: return
}

{% endhighlight %}  

- `Integer.valueOf` wraps the primitive types 10,30 to boxed types.
- The addition `i+k` gets converted to `i.intValue + k.intValue`. 
- The `intValue` method returns the primitive type assigned to that boxed type.

So the above operation has created four instances of the Integer.java class. This has to be done since Integer.java is truly an object at runtime unlike scala's int which
gets converted to primitive type at compile time.

This distinction is important and will be crucial in understanding scala collections.

We will discuss two advantages about this whole everything is an object representation.

<a name = "Bigint"><u>Bigint example</u></a>

Apart from the advantage that scala does not create objects for native types, it is also offers convenient syntax for other types such as Bigint.

In java, to add two BigInteger types, we need to use special method calls.

{% highlight java %}

import java.math.BigInteger;

public class Test {

    public static void main(String[] args) {

        BigInteger a = new BigInteger("2000");
        BigInteger b = new BigInteger("3000");

        //Results in an error
        System.out.println(a+b);
        
        //Correct version
        System.out.println(a.add(b));


    }
}

{% endhighlight %}  


Now this is fine for Big integers since we know that in java it is not a primitive type, but it is an additional tax imposed on developers.

In scala, since everything is an object and also the operators by themselves are just methods, adding two Big integers is pretty straightforward.

{% highlight scala %}

object Runnable extends App{


  val x = BigInt("92839283928392839239829382938")

  val y = BigInt("19020930293293209302932309032")

  println(x+y)

}

{% endhighlight %}  

We have to represent them as strings since they are too big even for long type.

This offers a convenient syntax and we can use the same operators we use for our known data types.

One could view this as a convenience feature for developers, but this it is much more. As we venture more into the world of scala, we will also encounter more
advanced data types such Algebraic types which are useful in Machine learning/math related computations.
What is more interesting is since everything is represented as an object we can now abstract certain things which makes it easier for programmers to write types
of their own.

<a name = "Typecasting"><u>Typecasting</u></a>

Since all of the types are now objects/classes and they all follow the tree hierarchy from the top type that is `Any`, they can have some common methods
which are useful for all types.

We will explore some of the below.

{% highlight scala %}

object Runnable extends App{


  val IntegerType = 20
  val DoubleType = 20.0
  val LongType : Long = 20
  val FloatType : Float = 20.4f

  println(IntegerType.toDouble)
  println(DoubleType.toInt)
  println(LongType.toShort)
  println(FloatType.toDouble)


}

{% endhighlight %}  

Each of the types will have type conversions to one or more other types. One need not worry about the current type under consideration
since these methods are common and if there are any mistakes, they would be at compile time rather than run time.

In java, these kind of conversions is rather cumbersome.

{% highlight java %}

public class Test {

    public static void main(String[] args) {

        int a = 20;
        double d = 30.0;
        long b = 30l;
        float c = 20.0f;

        //Primitive type conversions
        System.out.println((double) a);
        System.out.println((int) d);
        System.out.println((short) b);
        System.out.println((double) c);

        //Boxed type conversions
        System.out.println(Integer.valueOf(a).doubleValue());
        System.out.println(Double.valueOf(d).intValue());
        System.out.println(Long.valueOf(b).shortValue());
        System.out.println(Float.valueOf(c).doubleValue());


    }
}

{% endhighlight %}  

This is another example of how if everything is an object is advantageous. One can even include a method such as `toRoman` which converts the given value to a roman numeral. The programmer can choose which class to place this, an example would be Int.scala.

There are several more, but the point was to bring an intuition rather than an exhaustive listing.

<a name = "Value"><u>Value comparison</u></a>

In java you would have been taught not to use the `==` operator for comparing object types since they would compare references.

Scala has a different perspective to this. As we saw in [case classes](/blog/scala-tutorials-part-6-case-classes/#Equals) comparison can be done with `==`. This is
because everything is a [value in scala](https://en.wikipedia.org/wiki/Uniform_access_principle){:target="_blank"}.

With that said, since everything is also an object we can define our own method for the `==` comparison.

Just like the `+` method above, the `==` is a synthetic function in the scala library.

{% highlight scala %}


  /** Returns `true` if this value is equal to x, `false` otherwise. */
  def ==(x: Byte): Boolean
  /** Returns `true` if this value is equal to x, `false` otherwise. */
  def ==(x: Short): Boolean
  /** Returns `true` if this value is equal to x, `false` otherwise. */
  def ==(x: Char): Boolean
  /** Returns `true` if this value is equal to x, `false` otherwise. */
  def ==(x: Int): Boolean
  /** Returns `true` if this value is equal to x, `false` otherwise. */
  def ==(x: Long): Boolean
  /** Returns `true` if this value is equal to x, `false` otherwise. */
  def ==(x: Float): Boolean
  /** Returns `true` if this value is equal to x, `false` otherwise. */
  def ==(x: Double): Boolean

{% endhighlight %}  

Above code compiles to native java like comparison i.e for string it would be the `equals` method which does a character by character comparison underneath.

<a name = "Compared"><u>Implementations in other languages and some notes</u></a>

Turns out that scala is not the first language to implement this "objects everywhere" concept.

[In Ruby](http://stackoverflow.com/questions/10158791/java-and-ruby-everything-is-an-object-in-oo){:target="_blank"} there are no primitive types and they operate almost similar to scala except for that fact that scala is object oriented in a very pure form, which means that everything is an object.

In later tutorials we will explore on how this concept enables us to write custom methods in fundamental types such as `toRoman` for example and custom types such as [Algebraic data types](https://en.wikipedia.org/wiki/Algebraic_data_type){:target="_blank"}

Part 8 i.e the next part, I will explain about another cool feature of scala which is traits (more cooler than case classes ?) and how it really takes Object oriented programming to the next level.

Stay tuned and happy new year <i class="fa fa-smile-o fa-lg"></i> 