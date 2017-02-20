---
layout: post
title: "Scala Tutorials Part #11 - String Interpolation"
permalink: blog/scala-tutorials-part-11-string-interpolation/
tags: [Scala]
---

String Interpolation
--------------------

In this part we are going to see a pretty nifty feature of scala called [String interpolation](https://en.wikipedia.org/wiki/String_interpolation){:target="_blank"}.

This is part 11 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.


<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [String concatenation in java](#Intro)
- [Concatenation vs Interpolation](#Comparison)
- [Anatomy of string interpolation in scala](#Anatomy)


<a name="Tntro"><u>String concatenation in java</u></a>

There is no string interpolation/string variable substitution in java so to speak. Seasoned java programmers are used to string concatenation.

{% highlight java %}

public class JavaRunner {

    public static void main(String[] args) {

       String name = "John";
       String weight = "154";
       String unit = "Pounds";

       System.out.println(name + " weighs " + weight + " " + unit);

    }
}

{% endhighlight %}

This works as intended so what is so special with interpolation? Read on to find out more.


<a name="Comparison"><u>Concatenation vs Interpolation</u></a>

Let's see how we do the same thing with string interpolation.


{% highlight scala %}

object RunExample extends App  {

  val name = "John"
  val weight = 154
  val unit = "Pounds"

  //String concatenation
  println(name + " weighs " + weight + " " + unit)

  //Interpolation
  println(s"$name weighs $weight $unit")


}

{% endhighlight %}

Both the versions produce the same result, but the interpolation seems to be slightly better in terms of syntax when compared with concatenation. 

Also there is lesser probability to make mistakes in the interpolated version.

<a name="Anatomy"><u>Anatomy of string interpolation in scala</u></a>

The syntax that we encountered might be weird in the beginning but the `s""` before the string is actually a method in `StringContext.scala`.

It goes as follows,

{% highlight scala %}

def s(args: Any*): String = standardInterpolator(treatEscapes, args)

{% endhighlight %}

which then agains calls another method called `standardInterpolator`. 

In scala there are three string interpolators,

- The Standard interpolator (The one we just used)
- Raw interpolator
- Format interpolator

We will look at the other ones in sections below.

If we follow the code path, it ends up in the method called `standardInterpolator` which does a couple of steps to transform the given result into a complete string. One important point to note is that the entire process uses a `StringBuilder` underneath. 

This is different in terms of performance with the traditional string concatenation which in the above example creates additional 3 strings including the space string. Of course we can code that string using a `StringBuilder` but the syntactic sugar is pretty nice.

The `$` symbol is used to differentiate variables and strings.














