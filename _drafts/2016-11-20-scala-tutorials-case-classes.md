---
layout: post
title: "Scala Tutorials Part #6 - Case Classes"
permalink: blog/scala-tutorials-part-6-case-classes/
tags: [Scala]
---

Case Classes
------------

Case classes are very similar to classes, but they do lot of boiler plate stuff and have some neat functionality.

This is part 6 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

- [Declaring case classes](#Declaration)
- [Creating classes without the new keyword](#Consumption)
- [Accessing variables](#Access)
- [Immutable objects](#Immutable)
- [Mutable objects](#Mutable)
- [Getters & Setters](#GettersSetters)
- [Automatic hashCode,equals,toString]
- [Under the hood - Apply Method] - This enables creating classes without the new keyword


<a name="Declaration"><u>Declaring case classes</u></a>

The code below declares a class called Book with three member variables `id`,`title`,`isbn`

{% highlight scala %}

case class Book(id:Int,title:String,isbn:Long)

{% endhighlight %}

Yes, it is a valid syntax and it takes just one line of code.

We would be tempted to put it along wherever we wan't since it is just one line, but the [scala style guide](http://docs.scala-lang.org/style/files.html){:target="_blank"} pretty much sumps up on the styling part.

Of course this can be different based on the requirement, one can group together multiple case classes into one single file with having similar functionality. This discussion is a separate topic, but if you are in doubt on where to place a case class, then put it in a separate file.

<a name="Consumption"><u>Creating classes without the new keyword</u></a>

Case classes can be created without using the new keyword. 

{% highlight scala %}

object RunExample extends App{

  val x = Book(100,"Stephen hawkings : A brief history of time",9788370017361L)

}

{% endhighlight %}

This is just for removing verbosity, in fact we can include the new keyword and it works in the same manner.

Can be compared syntactically to java strings. They can can be created without using the new keyword as well.

<a name="Access"><u>Accessing variables</u></a>

Variables can be accessed similar to their class counterparts.

{% highlight scala %}

object RunExample extends App{

  val book = Book(100,"Stephen hawkings : A brief history of time",9788370017361L)

  println(book.id)
  println(book.title)
  println(book.isbn)

}

{% endhighlight %}

<a name="Immutable"><u>Immutable classes</u></a>

Case classes by default are immutable i.e once declared they cannot be changed. In the previous tutorial we briefly touched upon something similar in classes.
But case classes are naturally suited in creating immutable classes and they have a whole suite of advantages which we will see below.

![Constructor no value](/images/case_class_immutable.png)

In the case of immutable classes then you need not worry about direct variable access/creating getters and setters since they cannot be changed. This gives you a much more 
neater syntax.

> Passing around objects to different functions and mutating them is bad design. If a method/component mutates its values, then its state is changed. It is better to create
> another instance instead of the mutated one. This has several advantages including not to lock objects across multiple threads and create something akin to a event passing
> system. This is another topic/design decision which we will explore in further tutorials.

<a name="Mutable"><u>Mutable objects</u></a>

Immutable objects are good design. But it is a decision that should be taken by the programmer.

The language by itself provides a way to create mutable classes. We saw this in the previous tutorial where we promote the class parameter to a class field.

We can change the case class variables as below.

{% highlight scala %}

case class Book(
var id:Int,var title:String,var isbn:Long
)

{% endhighlight %}

This enables us to change the variables as and when required.

{% highlight scala %}

object RunExample extends App{

  val x = Book(100,"Stephen hawkings : A brief history of time",9788370017361L)
  x.id = 200

  println(x.id)

}

{% endhighlight %}

Of course, this is one way to do this. But this is bad design in a variety of ways.

In java, you would typically create these variables as private and use getters and setters.













