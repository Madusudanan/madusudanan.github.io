---
layout: post
title: "Scala Tutorials Part #18 - Extractors"
permalink: blog/scala-tutorials-part-18-extractors/
tags: [Scala]
---

Extractors
----------

So far we have seen two of scala's so called magic methods i.e the [apply](/blog/scala-tutorials-part-15-the-apply-method/) 
and [update](/blog/scala-tutorials-part-17-the-update-method/) methods. In this article we will look at another one that is central
to pattern matching i.e un-apply (also called extractors) and this sort of completes the cycle with apply, update and un-apply.

This is part 18 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [What are extractors?](#Intro)
- [Setting the stage](#Staging)
- [Implementing the unapply method logic](#Unapply)
- [Unapply in case classes](#CaseClass)

<h3><b><a name = "Intro" class="inter-header">What are extractors?</a></b></h3>

An extractor is the opposite of a constructor. Constructors are used to creates new objects while an extractor extracts parameters from
a created object. `Un-apply` is the way in which you create an extractor. 

This will seem to be confusing in the first place but it will get cleared once we look at examples.

<h3><b><a name = "Staging" class="inter-header">Setting the stage</a></b></h3>

Let's take a trait that indicates a car (typical textbook example).


{% highlight scala %}

trait Car {

    val price : String

}

{% endhighlight %}

We will take only parameter i.e the `price` for simplicity. 

Let's take two other sub classes which implement this trait.

{% highlight scala %}

class SportsCar(val price:String) extends Car

class Sedan(val price:String) extends Car

{% endhighlight %}

Next we have to create our `unapply` methods.

<h3><b><a name = "Unapply" class="inter-header">Implementing the unapply method logic</a></b></h3>

As we saw in the apply method article, we can create the `unapply` in a companion object so that we can access it as a static method and not a instance one. Let's go ahead and create companion objects for our custom car classes along with the `unapply` methods.

{% highlight scala %}

 object SportsCar {

    def unapply(car: SportsCar): Option[String] = Some(car.price)

  }

  object Sedan {

    def unapply(car: Sedan): Option[String] = Some(car.price)

  }

{% endhighlight %}

Their logic is pretty simple, they take a fully formed object such as `SportsCar` or `Sedan` and then take a parameter out of it
such as `price` in this case and then return it. Let's look at a simple example of where this comes into play.

{% highlight scala %}

 def printMessage(car: Car) = {

    car match {

      case SportsCar(price) => {
        if (price > 10000) {
          println("I ain't buying this")
        }
        else {
          println("Looks like a good deal")
        }
      }

      case Sedan(price) => {
        if (price > 3000) {
          println("Not going to happen")
        }
        else {
          println("Done deal")
        }
      }

    }
  }

{% endhighlight %}






