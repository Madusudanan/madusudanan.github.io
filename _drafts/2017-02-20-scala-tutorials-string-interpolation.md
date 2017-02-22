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
- [Anatomy of a string interpolator in scala](#Anatomy)
- [Combining operations with standard interpolation](#OpCombine)
- [Format interpolator](#Format)
- [Raw interpolator](#Raw)
- [Interpolation in other languages](#OtherLang)

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

Also there are lesser chances to make mistakes in the interpolated version.

<a name="Anatomy"><u>Anatomy of a string interpolator in scala</u></a>

The syntax that we encountered might be weird in the beginning but the `s""` before the string is actually a method in `StringContext.scala`.

It goes as follows,

{% highlight scala %}

def s(args: Any*): String = standardInterpolator(treatEscapes, args)

{% endhighlight %}

which then again calls another method called `standardInterpolator`. 

In scala there are three string interpolators,

- The Standard interpolator (The one we just used)
- Raw interpolator
- Format interpolator

We will look at the other ones in sections below.

If we follow the code path, it ends up in the method called `standardInterpolator` which does a couple of steps to transform the given result into a complete string. 
One important point to note is that the entire process uses a `StringBuilder` underneath. 

This is different in terms of performance with the traditional string concatenation which in the above example creates additional 3 strings including the space string. 
Of course we can code that string using a `StringBuilder` but the syntactic sugar is pretty nice.

The `$` symbol is used to differentiate variables and strings.

<a name="OpCombine"><u>Combining operations with standard interpolation</u></a>

We can combine arithmetic operations with interpolation as follows.

{% highlight scala %}

object Runnable extends App  {

  val name = "John"
  val weight = 154
  val unit = "Pounds"

  val name2 = "Jack"
  val weight2 = 166


  println(s"$name2 weighs ${weight2 - weight} $unit more than $name ")


}

{% endhighlight %}

The operation needs to be inside `${}` to work correctly, otherwise it would replace the variables but will not perform the minus operation. For example,

{% highlight scala %}

println(s"$name2 weighs $weight2-$weight $unit more than $name ")

{% endhighlight %}

would just print <cite>Jack weighs 166-154 Pounds more than John</cite>.

In fact, any arbitrary expression can be embedded inside `${}` and it would just work.

Another thing to note is that string interpolation is typesafe, you can't just include variables that don't exist or perform any syntax errors inside of `${}`.

<a name="Format"><u>Format interpolator</u></a>

The format interpolator is similar to the `printf` command in the C language. 

{% highlight scala %}

object RunExample extends App  {

  val height = 1.9d
  val name = "James Sawyer"
  println(f"$name%s is $height%2.2f meters tall")

}

{% endhighlight %}

Here instead of `s""` we use `f""` as the prefix. `%s` is used to denote a string and `%f` to denote double.

The `2.2f` is used to denote precision i.e 2 decimals before the point and 2 after the point. 

If our need is just printing to the console we can just the `printf` method.

{% highlight scala %}

object RunExample extends App  {

  val height = 1.9d
  val name = "James Sawyer"

  //The format interpolator. Produces a string as an output
  println(f"$name%s is $height%2.2f meters tall")

  //C Style abstraction over java PrintStream
  printf("%s is %2.2f meters tall",name,height)


}

{% endhighlight %}

But in many cases we would want to use the formatted value as a string elsewhere. A good example is printing out values in logs. Without string interpolation we would have to rely the logging library or use string concatenation.

<a name="Raw"><u>Raw interpolator</u></a>

The raw interpolator is pretty similar to the standard one, except that literals are not escaped within the string.

{% highlight scala %}

object RunExample extends App {

  val height = 1.9d

  val name = "James Sawyer"

  //Tab is printed after $name is
  println(s"$name is \t $height meters tall")

  // \t is just printed as a string
  println(raw"$name is \t $height meters tall")


}

{% endhighlight %}

It was not named just `r""` cause that would cause confusion with regular expressions.

This is useful when we dont want to escape literals. 

One can also use the standard interpolator and ignore literals as below,

{% highlight scala %}

println(s"$name is \\t $height meters tall")

{% endhighlight %}

It is a design decision the developer can take. If there are only a handful of literals to be ignored then we can hardcode them or else use the raw interpolator. 

<a name="OtherLang"><u>Interpolation in other languages</u></a>

As mentioned in the [string intepolation wiki](https://en.wikipedia.org/wiki/String_interpolation){:target="_blank"}, this concept of embedding variable references is not new to scala.

In fact very early languages such as `bash` and `perl` had this functionality. 

This is a pretty neat feature considering that Scala was aimed to used for everything including scripting.

We will look at how to use scala for scripting in future articles.

Interpolation is commonly used across many frameworks/libraries in scala. In fact it is considered a de-facto standard instead of string concatenation.

On the whole this might not seem such a pretty big thing when compared to Java string concatenation, but it is small things like these that transform the entire language into a better one.

Stay tuned <i class="fa fa-smile-o fa-lg"></i>






