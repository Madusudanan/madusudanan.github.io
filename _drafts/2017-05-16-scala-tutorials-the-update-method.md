---
layout: post
title: "Scala Tutorials Part #17 - The Update method "
permalink: blog/scala-tutorials-part-17-the-update-method/
tags: [Scala]
---

The Update method
-----------------

This is part 17 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Example in scala arrays](#ArrayExample)
- [Custom example](#CustomExample)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

Update method is a companion to the `apply` method in the sense that you apply a function to a value and you get a value outside. `update` on the
other hand is used to update an existing value to an object. It's usage in core language libraries is pretty widespread as the apply method itself.

<h3><b><a name = "ArrayExample" class="inter-header">Example in scala arrays</a></b></h3>

Arrays unlike java are part of collection in scala. Let's consider the below example to understand how `apply` and `update` method works.

{% highlight scala %}
 
  //Created using the apply method
  val a = Array(12,4,5)

  //Accessing the second index
  println(a(2))

  //Updating the second index
  //This is where the update method comes into play
  a(2) = 20
  
  //Printing out the changed value
  println(a(2)) 

{% endhighlight %}

First thing to understand is that we can put any kind of logic inside the apply and update methods. But best practices advise developers to stick
to certain standards. `apply` is generally used for applying a value(constructor in this case) and `update` is used to update the array value
at a particular index. Since we are mutating the array object itself, it is generally recommended to use update method only in the case of mutable
objects/collections.

Notice that array elements are called using the `()` symbols instead of the `[]` as in java. This is again because array is a class and not 
something native as in java.

The [Array class](https://github.com/scala/scala/blob/2.12.x/src/library/scala/Array.scala#L548){:target="_blank"} 
does not have a fully formed definition of the update method because it gets generated at compile time. This will be more clear while writing our
own example below.

<h3><b><a name = "CustomExample" class="inter-header">Custom example</a></b></h3>

Let's imagine that we have a class in which we need to store list of user names. We define the class skeleton as follows.

{% highlight scala %}

class UserList() {

private var list = Map(1 -> "Victor",2 -> "Selene" , 3 -> "Lucian")

}

{% endhighlight %}

We will see in detail what the `Map` data structure is in later tutorials. For now, it can be assumed it is the equivalent of java hashmap.

Next we will define an apply method which will return the element with that key.

{% highlight scala %}

def apply(id : Int) = list(id)

{% endhighlight %}

Now we are ready to define our update method which updates a value for the given key.

{% highlight scala %}

def update(id:Int,name:String) = list = list + (id -> name)

{% endhighlight %}



