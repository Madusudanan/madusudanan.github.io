---
layout: post
title: "Scala Tutorials Part #18 - Extractors"
permalink: blog/scala-tutorials-part-18-extractors/
tags: [Scala]
---

Extractors
----------

So far we have seen two of scala's magic methods i.e the [apply](/blog/scala-tutorials-part-15-the-apply-method/) 
and [update](/blog/scala-tutorials-part-17-the-update-method/) methods. In this article we will look at another one that is central
to pattern matching i.e un-apply (also called extractors) and this sort of completes the cycle with apply, update and un-apply.

This is part 18 of the scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [What are extractors?](#Intro)
- [Setting the stage](#Staging)
- [Implementing the unapply method logic](#Unapply)
- [Usage of extractors in pattern matching](#PatternMatch)
- [Extractors with multiple parameters](#MultipleParams)
- [Conclusion](#Conclusion)

<h3><b><a name = "Intro" class="inter-header">What are extractors?</a></b></h3>

An extractor is the opposite of a constructor. Constructors are used to creates new objects while an extractor extracts parameters from
a created object. `Un-apply` is the way in which you create an extractor. 

Let's jump right into an example.

<h3><b><a name = "Staging" class="inter-header">Setting the stage</a></b></h3>

Let's take a trait that indicates a car (typical textbook example).

{% highlight scala %}

trait Car {

    val price : Int

}

{% endhighlight %}

We will take only parameter i.e the `price` for simplicity. 

Let's take two other sub classes which implement this trait.

{% highlight scala %}

class SportsCar(val price:Int) extends Car

class Sedan(val price:Int) extends Car

{% endhighlight %}

Next we have to create our `unapply` methods.

<h3><b><a name = "Unapply" class="inter-header">Implementing the unapply method logic</a></b></h3>

Similar to the `apply` method, we can create the `unapply` in a companion object so that we can access it as a static method and not a instance one. 
Let's go ahead and create companion objects for our custom car classes along with the `unapply` methods.

{% highlight scala %}

 object SportsCar {

    def unapply(car: SportsCar): Option[Int] = Some(car.price)

  }

  object Sedan {

    def unapply(car: Sedan): Option[Int] = Some(car.price)

  }

{% endhighlight %}

The logic is pretty simple, they take a fully formed object such as `SportsCar` or `Sedan` and then extract a parameter out of it.
In this case `price` is the variable and we extract and return it. 

Similar to the `apply` method, the `unapply` method is not called directly and used in pattern matching.

<h3><b><a name = "PatternMatch" class="inter-header">Usage of extractors in pattern matching</a></b></h3>

Let's look at a simple example of where this comes into play.

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


We will see the internals of pattern matching in upcoming tutorials, but the example is sort of self-explanatory. First it checks whether
the class is `SportsCar` or `Sedan`. Next we take the parameter that is given by the `unapply` method which is price and then perform
some operations on it. We can imagine the parameter inside the `case` statement as a local variable as in a method which is obtained from the 
extractor/unapply. 

<h3><b><a name = "MultipleParams" class="inter-header">Extractors with multiple parameters</a></b></h3>

An extractor with a single parameter looks simple, let's add another parameter to our trait and classes.

{% highlight scala %}

  trait Car {

    val price : Int
    val name : String

  }
  
  class SportsCar(val price:Int,val name:String) extends Car
  
  class Sedan(val price:Int,val name:String) extends Car

{% endhighlight %}

Next we will modify our extractors to include the `name` parameter as well.

{% highlight scala %}

  object SportsCar {

    def unapply(car: SportsCar): Option[(Int,String)] = Some(car.price,car.name)

  }
  
  object Sedan {
  
      def unapply(car: Sedan): Option[(Int,String)] = Some(car.price,car.name)
  
  }

{% endhighlight %}

This data structure is called a `Tuple` which we will see in detail in later tutorials. We should then refactor our `printMessage` method
to handle a tuple instead of a single integer.

{% highlight scala %}

def printMessage(car: Car) = {

    car match {

      case SportsCar(price,name) => {
        if (price > 10000) {
          println(s"Not going to buy $name")
        }
        else {
          println(s"Looks like a good deal for $name")
        }
      }

      case Sedan(price,name) => {
        if (price > 3000) {
          println(s"Too pricey. $name needs to reduce its price")
        }
        else {
          println(s"Looks like a good deal for $name")
        }
      }

    }
  }
  
{% endhighlight %}


<h3><b><a name = "Conclusion" class="inter-header">Conclusion</a></b></h3>

We are yet to see how this works in case classes, but i'll cover that in detail while learning about pattern matching.

Unapply is nothing but syntactic sugar upon which you can do pattern matching. The data that gets returned from the unapply method is what you
pattern match upon. There are many other places where we can use extractors. We will cover them as and when we encounter these situations.



