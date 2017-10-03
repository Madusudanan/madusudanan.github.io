---
layout: post
title: "Scala Tutorials Part #23 - Pattern Matching in Scala "
permalink: blog/scala-tutorials-part-23-pattern-matching-in-scala/
tags: [Scala]
---

Pattern Matching
----------------

This is part 23 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Pattern matching value types](#PTValues)

<h3><b><a name = "PTValues" class="inter-header">Pattern matching value types</a></b></h3>

We saw how [extractors](/blog/scala-tutorials-part-18-extractors/) can facilitate pattern matching by writing an `unapply` method. In this article, 
we are going to see how they actually work and also the internals.

Let's do some matching on an `Int`.

{% highlight scala %}

 val status  = 0


 status match {
   case 0 => println("The status is false")
   case 1 => println("The status is true")
   case _ => println("Unknown status")
 }

{% endhighlight %}  

That was easy. Let's try on a `String`.

val score = 4.0

  score match {

    case it if(it>=1.0 && it<=5.0) => println("Grade C")
    case _ => println("Unknown")

  }




 val httpStatus = "Sunday"


  httpStatus match {
   case "Sunday" => println("Holiday")
   case "Saturday" => println("Holiday")
   case "Monday" => println("Weekday")
   case "Tuesday" => println("Weekday")
   case "Wednesday" => println("Weekday")
   case "Thursday" => println("Weekday")
   case "Friday" => println("Weekday")
   case _ =>

 }



