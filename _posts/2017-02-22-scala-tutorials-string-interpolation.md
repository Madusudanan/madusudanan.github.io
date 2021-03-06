---
layout: post
title: "Scala Tutorials Part #11 - String Interpolation"
permalink: blog/scala-tutorials-part-11-string-interpolation/
tags: [Scala]
last_updated: 2018-07-05
---

String Interpolation
--------------------

In this part we are going to see a pretty nifty feature of scala called 
[String interpolation](https://en.wikipedia.org/wiki/String_interpolation){:target="_blank"}.

This is part 11 of the scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.


<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [String concatenation in java](#Intro)
- [Concatenation vs Interpolation](#Comparison)
- [Anatomy of a string interpolator in scala](#Anatomy)
- [Combining operations with standard interpolation](#OpCombine)
- [Format interpolator](#Format)
- [Raw interpolator](#Raw)
- [Type annotation in interpolators](#TypeAnnotation)
- [Interpolation in other languages](#OtherLang)

<h3><b><a name = "Intro" class="inter-header">String concatenation in java</a></b></h3>

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

<h3><b><a name = "Comparison" class="inter-header">Concatenation vs Interpolation</a></b></h3>

Let's see how we do the same thing with string interpolation.


{% highlight scala %}

  val name = "John"
  val weight = 154
  val unit = "Pounds"

  //String concatenation
  println(name + " weighs " + weight + " " + unit)

  //Interpolation
  println(s"$name weighs $weight $unit")

{% endhighlight %}

Both the versions produce the same result, but the interpolation seems to be slightly better in terms of syntax when compared with concatenation. 

Also there are lesser chances to make mistakes in the interpolated version.

<h3><b><a name = "Anatomy" class="inter-header">Anatomy of a string interpolator in scala</a></b></h3>

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

If we follow the code path, it ends up in the method called `standardInterpolator` 
which does a couple of steps to transform the given result into a complete string. 
One important point to note is that the entire process uses a `StringBuilder` underneath. 

This is different in terms of performance with the traditional string concatenation which in the above example 
creates additional 3 strings including the space string. Of course we can code that string using a `StringBuilder` but the syntactic sugar is pretty nice.

The `$` symbol is used to differentiate variables and strings.

<h3><b><a name = "OpCombine" class="inter-header">Combining operations with standard interpolation</a></b></h3>

We can combine arithmetic operations with interpolation as follows.

{% highlight scala %}

  val name = "John"
  val weight = 154
  val unit = "Pounds"

  val name2 = "Jack"
  val weight2 = 166


  println(s"$name2 weighs ${weight2 - weight} $unit more than $name ")

{% endhighlight %}

The operation needs to be inside `${}` to work correctly, otherwise it would replace the variables but will not perform the minus operation. For example,

{% highlight scala %}

println(s"$name2 weighs $weight2-$weight $unit more than $name ")

{% endhighlight %}

would just print <cite>Jack weighs 166-154 Pounds more than John</cite>, so the `${}` is important.

Any arbitrary expression can be embedded inside `${}` and it would just work.

Another thing to note is that string interpolation is typesafe, 
you can't just include variables that don't exist or perform any syntax errors inside of `${}`.

<h3><b><a name = "Format" class="inter-header">Format interpolator</a></b></h3>

The format interpolator is similar to the `printf` command in the C language. 

{% highlight scala %}

  val height = 1.9d
  val name = "James Sawyer"
  println(f"$name%s is $height%2.2f meters tall")

{% endhighlight %}

Here instead of `s""` we use `f""` as the prefix. 

In the given example `%s` is used to denote a string and `%f` to denote double.

The `2.2f` is used to denote precision i.e 2 decimals before the point and 2 after the point. 

If our need is just printing to the console we can just use the `printf` method.

{% highlight scala %}

  val height = 1.9d
  val name = "James Sawyer"

  //The format interpolator. Produces a string as an output
  println(f"$name%s is $height%2.2f meters tall")

  //C Style abstraction over java PrintStream
  printf("%s is %2.2f meters tall",name,height)

{% endhighlight %}

But in many cases we would want to use the formatted value as a string elsewhere. 
A good example is printing out values in logs. Without string interpolation we would have to rely on the logging library or use string concatenation.

Note that the `f` interpolator is type safe i.e something like below will throw an error.

![f interpolator error](/images/f_interpolator_error.png)

<h3><b><a name = "Raw" class="inter-header">Raw interpolator</a></b></h3>

The raw interpolator is pretty similar to the standard one, except that literals are not escaped within the string.

{% highlight scala %}

  val height = 1.9d

  val name = "James Sawyer"

  //Tab is printed after $name is
  println(s"$name is \t $height meters tall")

  // \t is just printed as a string
  println(raw"$name is \t $height meters tall")


{% endhighlight %}

It was not named just `r""` cause that would cause confusion with regular expressions.

This is useful when we dont want to escape literals. 

One can also use the standard interpolator and ignore literals as below,

{% highlight scala %}

println(s"$name is \\t $height meters tall")

{% endhighlight %}

It is a design decision that the developer can take. 
If there are only a handful of literals to be ignored then we can hard code them or else use the raw interpolator.
 
We can also write our own [interpolator](http://docs.scala-lang.org/overviews/core/string-interpolation.html#advanced-usage){:target="_blank"}, but
that is kind of advanced and not needed in most of the cases.

<h3><b><a name = "TypeAnnotation" class="inter-header">Type annotation in interpolators</a></b></h3>

We can annotate the types for the variables we put inside the interpolator and it will throw an error during compile time.

![Type annotation in interpolation](/images/type_annotation_interpolator.png)

In the above example, the second element in the list or any element in that matter is of `Any` type and not of the `String` type. 

<h3><b><a name = "OtherLang" class="inter-header">Interpolation in other languages</a></b></h3>

As mentioned in the [string intepolation wiki](https://en.wikipedia.org/wiki/String_interpolation){:target="_blank"}, 
this concept of embedding variable references is not new to scala.

In fact very early languages such as `bash` and `perl` had this functionality. 

This is a pretty neat feature considering that Scala was aimed to used for everything including scripting.

We will look at how to use scala for scripting in future articles.

Interpolation is commonly used across many frameworks/libraries in scala. In fact it is considered a de-facto standard instead of string concatenation.

On the whole this might not seem as a pretty big thing when compared to Java string concatenation, 
but it is small things like these that transform the entire language into a better one.

Stay tuned <i class="fa fa-smile-o fa-lg"></i>






