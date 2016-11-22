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
- [Immutable classes](#Immutable)
- [Changing constuctors to vars] - This creates mutable classes with getters
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







