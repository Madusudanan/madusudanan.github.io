---
layout: post
title: "Scala Tutorials Part #23 - Pattern Matching in Scala "
permalink: blog/scala-tutorials-part-23-pattern-matching-in-scala/
tags: [Scala]
---

Pattern Matching
----------------

This is part 23 of the Scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Pattern matching value types](#PTValues)
- [Using conditionals](#Conditionals)
- [Pattern matching strings](#Strings)
- [Capturing values](#CaptureValues)
- [Matching with Options](#Options)
- [Heterogeneous pattern matching](#HeterogenousMatch)
- [Decomposing types using pattern matching](#DecomposingTypes)
- [Case class matching](#CaseClass)
- [Pattern matching decompiled](#PTDecompiled)
- [Finale](#Finale)

<h3><b><a name = "PTValues" class="inter-header">Pattern matching value types</a></b></h3>

We saw how [extractors](/blog/scala-tutorials-part-18-extractors/) can aid pattern matching by writing an `unapply` method. In this article, 
we are going to see how they actually work and also look at the internals.

Let's say we have an Integer variable and want to do a match on it.

{% highlight scala %}

 val status  = 0

 status match {
   case 0 => println("The status is false")
   case 1 => println("The status is true")
   case _ => println("Unknown status")
 }

{% endhighlight %}  

Code is pretty self explanatory, it checks for matching values 0/1 and prints appropriate messages. The `_` is used to match any other value, 
kind of like the `default` in java switch statements. 

That was straightforward, let's try with a double.

{% highlight scala %}

  val score = 4.0

  score match {
    case 4.0 => println("High score")
    case 3.0 => println("Moderate")
    case 2.0 => println("Low")
    case 1.0 => println("Very low")
    case _ => println("Unknown score")
  }

{% endhighlight %}  

It is more or less similar to the `Int` example. In a real world situation we will have the need to use
conditional expressions to match one or more cases. 

The left side of the expression is used to capture the variable and also the condition matching it while the right side i.e the expression after the `=>` returns a value. In the above example it returns a `Unit` since it just prints out and does not do any other computation.

If the execution does not match any of the cases, then it simply throws an exception.

{% highlight scala %}

object RunExample extends App{
  
  val status  = 10

  status match {
    case 0 => println("The status is false")
    case 1 => println("The status is true")
  }
  
}

{% endhighlight %}  

Executing the above code results in the following.

{% highlight java %}

Exception in thread "main" scala.MatchError: 10 (of class java.lang.Integer)
  at RunExample$.delayedEndpoint$RunExample$1(RunExample.scala:8)
  at RunExample$delayedInit$body.apply(RunExample.scala:3)
  at scala.Function0$class.apply$mcV$sp(Function0.scala:34)
  at scala.runtime.AbstractFunction0.apply$mcV$sp(AbstractFunction0.scala:12)
  at scala.App$$anonfun$main$1.apply(App.scala:76)
  at scala.App$$anonfun$main$1.apply(App.scala:76)
  at scala.collection.immutable.List.foreach(List.scala:381)
  at scala.collection.generic.TraversableForwarder$class.foreach(TraversableForwarder.scala:35)
  at scala.App$class.main(App.scala:76)
  at RunExample$.main(RunExample.scala:3)
  at RunExample.main(RunExample.scala)

{% endhighlight %}  

<h3><b><a name = "Conditionals" class="inter-header">Using conditionals</a></b></h3>

Taking the same example above with a broader score range.

{% highlight scala %}

 val score = 8.0

  score match {
    case highScore 
      if highScore >= 8.0 && highScore <= 10.0 => 
      println("High score")
    case averageScore 
      if averageScore >= 5.0 && averageScore < 8.0 => 
      println("Average score")
    case lowScore 
      if lowScore >=0.0 && lowScore < 5.0 => 
      println("Low score")
    case _ => 
      println("Error. Invalid score. It has to be in the range 0.0 to 10.0")
  }

{% endhighlight %}  

The variables `highScore`, `averageScore` and `lowScore` are actually doubles and can be used in the right side of the computation. 

{% highlight scala %}

  val score = 9.0

  score match {
    case highScore
      if highScore >= 8.0 && highScore <= 10.0 =>
      println(s"High score : Got $highScore")
    case averageScore
      if averageScore >= 5.0 && averageScore < 8.0 =>
      println(s"Average score : Got $averageScore")
    case lowScore
      if lowScore >=0.0 && lowScore < 5.0 =>
      println(s"Low score : Got $lowScore")
    case _ =>
      println("Error. Invalid score. It has to be in the range 0.0 to 10.0")
  }

{% endhighlight %}  

Since java switch case statements can take only constant values in its case's, this is more elegant to work with. It is important to note that there is no need of a break statement since it automatically matches only of the cases present and falls back to the `_` case if there is no 
match and throws an exception if there is no fallback as we saw above. Conditionals are also called guard statements similar to the guard in for comprehensions.


<h3><b><a name = "Strings" class="inter-header">Pattern matching strings</a></b></h3>

So far we have been seeing value types. Let's take a look at string pattern matching which is very useful(Intentionally keeping the examples simple 
in order to grasp the concepts).

{% highlight scala %}

  val dayOfTheWeek = "Sunday"

  dayOfTheWeek match {
    case "Sunday" => println("Holiday")
    case "Saturday" => println("Holiday")
    case "Monday" => println("Weekday")
    case "Tuesday" => println("Weekday")
    case "Wednesday" => println("Weekday")
    case "Thursday" => println("Weekday")
    case "Friday" => println("Weekday")
    case _ => println("Invalid Day")
  }

{% endhighlight %}  

If we want the comparison to be case-insensitive then,

{% highlight scala %}


  val dayOfTheWeek = "monday"

  dayOfTheWeek toLowerCase match {
    case "sunday" => println("Holiday")
    case "saturday" => println("Holiday")
    case "monday" => println("Weekday")
    case "tuesday" => println("Weekday")
    case "wednesday" => println("Weekday")
    case "thursday" => println("Weekday")
    case "friday" => println("Weekday")
    case _ => println("Invalid Day")
  }

{% endhighlight %}  

Locale should be handled correctly in the above example, but you get the idea.

We can optimize the above code block into something more concise as below,

{% highlight scala %}

val dayOfTheWeek = "sunday"

  dayOfTheWeek toLowerCase match {

    case "sunday" | "saturday" =>
      println("Holiday")

    case
      "monday"  | "tuesday" | "wednesday" | "thursday" | "friday" =>
      println("Weekday")

    case _ => println("Invalid day of the week")
  }

{% endhighlight %}  

The `|` is a shorthand for or condition. 

<h3><b><a name = "CaptureValues" class="inter-header">Capturing values</a></b></h3>

Each match in a pattern match block are capable of returning a value and hence the result can be stored into a variable.

{% highlight scala %}

val score = 8.0

  val scoreFeedback = score match {
    case highScore
      if highScore >= 8.0 && highScore <= 10.0 =>
      "High score"
    case averageScore
      if averageScore >= 5.0 && averageScore < 8.0 =>
      "Average score"
    case lowScore
      if lowScore >=0.0 && lowScore < 5.0 =>
      "Low score"
    case _ =>
      "Error. Invalid score. It has to be in the range 0.0 to 10.0"
  }

{% endhighlight %}  

<h3><b><a name = "Options" class="inter-header">Matching with Options</a></b></h3>

In case we do not want to store the error message in the result, then we can use an `Option`.

{% highlight scala %}

val scoreFeedback : Option[String] = score match {
    case highScore
      if highScore >= 8.0 && highScore <= 10.0 =>
      Some("High score")
    case averageScore
      if averageScore >= 5.0 && averageScore < 8.0 =>
      Some("Average score")
    case lowScore
      if lowScore >=0.0 && lowScore < 5.0 =>
      Some("Low score")
    case _ =>
      println("Error. Invalid score. It has to be in the range 0.0 to 10.0")
      None
  }

{% endhighlight %}  

The results can then be pattern matched again as we saw in [part 16](/blog/scala-tutorials-part-16-the-option-type/).

<h3><b><a name = "HeterogenousMatch" class="inter-header">Heterogeneous pattern matching</a></b></h3>

Pattern matching is not restricted to a particular type. Because of Scala's robust type system, we can literally match anything that fits the type 
hierarchy properly.

{% highlight scala %}

  val monthOfYear : Any = "January"

  monthOfYear match {
    case 1 | "January" => println("First month of the year")
    case 2 | "February" => println("Second month of the year")
    case _ : Int => println("Invalid month integer")
    case _ : String => println("Invalid month string")
  }

{% endhighlight %}  

<h3><b><a name = "DecomposingTypes" class="inter-header">Decomposing types using pattern matching</a></b></h3>

Another unique capability of pattern matching is to decompose an unknown type or higher type into a recognized type.

{% highlight scala %}

  val typeTest : Any = "String"

  typeTest match {
    case i : Int => println("Integer type")
    case d : Double => println("Double type")
    case f : Float => println("Float type")
    case s : String => println("String type")
    case _ : BigDecimal => println("Big decimal type")
    case _ => println("Unknown type")
  }

{% endhighlight %}  

The type ascription `Any` is necessary in order for the compiler to treat it as a higher type and avoid the variable type being automatically inferred to `String`. 
In real world, the type you are going to match might come from an API endpoint/from a file etc., 

<h3><b><a name = "CaseClass" class="inter-header">Case class matching</a></b></h3>

Case classes are named after pattern matching i.e the case keyword. They are naturally suited to it because of the 
`unapply` method which gets automatically generated.

Let's create a textbook example of cars.

{% highlight scala %}

  abstract class Car
  case class Hyundai(name:String) extends Car
  case class Toyota(name:String) extends Car
  case class Audi(name:String) extends Car

{% endhighlight %}  

Let's create an instance of this car (the type ascription is important)

{% highlight scala %}

val car : Car = Audi("Audi V8")

{% endhighlight %} 

We can then do a match on this variable.

{% highlight scala %}

 car match {
    case Hyundai(name) => println(s"$name is from South Korea")
    case Toyota(name) => println(s"$name is from Japan")
    case Audi(name) => println(s"$name is from Germany")
  }

{% endhighlight %} 

We do a pattern match on the case class type with a parameter name. The parameter `name` is important since the case class cannot be created without it. You can revisit the [decompiled version](/blog/scala-tutorials-part-6-case-classes/#Decompiled) of the case class and see the `unapply` method. It would make much more sense now and how it is useful in pattern matching. Case objects can also be matched using a 
similar approach.

<h3><b><a name = "PTDecompiled" class="inter-header">Pattern matching decompiled</a></b></h3>

We are not going to exhaustively see how pattern matching works behind the scenes for all examples. Let's take three different examples to understand how they behave. Since the decompiled code is pretty big, I have collected both in a gist. 

- [Decompiled with a simple pattern match](https://gist.github.com/Madusudanan/0510dfc3e18750443d34c4fed839a681){:target="_blank"}
- [With conditionals](https://gist.github.com/Madusudanan/13a7f69ba2b68d44cde20bd0a224603a){:target="_blank"}
- [Example with type decomposition](https://gist.github.com/Madusudanan/6bdd22a6c33c384cccba7ba5d08be138){:target="_blank"}

[Fernflower decompiler](https://github.com/JetBrains/intellij-community/tree/master/plugins/java-decompiler/engine){:target="_blank"} does a pretty good job of decompiling the code. It is interesting to see that in the first example it is being compiled to java switch statements, the second one with a bunch of if-else since switch case does not support condition based matching. The third one is done via a couple of `instanceOf` comparisons. We can see that pattern matching gives us a very nice abstraction and lets the compiler deal with the all the hardwork. The decompiled code can change as the JVM evolves and a lot of features are added natively.
 
<h3><b><a name = "Finale" class="inter-header">Finale</a></b></h3>

Let's summarize what we have seen till now.

- An overview of pattern matching with value types and string
- Usage of pattern matching with case classes
- Type decomposition with pattern matching

There are more complex use cases of pattern matching in data structures such as `Seq`, `List`, `Vector` etc., I will cover those when we get to collections.

We are also protected from quite a few run time issues partly due to the type system of Scala and also how pattern matching by itself is designed. Next time whenever you see a switch case/complex if-else structure, think of re-writing it with pattern matching.









