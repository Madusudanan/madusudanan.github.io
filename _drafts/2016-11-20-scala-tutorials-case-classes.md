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
- [Default and partial constructor values](#Defaults)
- [Accessing variables](#Access)
- [Immutable objects](#Immutable)
- [Structural equality - Automatic equals generation](#Equals)
- [Reference equality](#ReferenceEquality)
- [String representation](#String)
- [Automatic hashcode generation](#Hashcode)
- [Case class decompiled](#Decompiled)
- [Under the hood - Apply Method] - This enables creating classes without the new keyword
- [Pattern matching]


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

Note that in case classes, the variables are just `val` by default and not private val as in regular classes and hence there are no need of special getters.

<a name="Defaults"><u>Default and partial constructor values</u></a>

We saw in the previous tutorial on how default values can be given to classes using the primary constructor. 
Same can be done in case classes as well.

{% highlight scala %}

case class Book(
private val id:Int = -1,private val title:String = "No name",private val isbn:Long = -1
)

{% endhighlight %}

We can then create an instance and access the variables as follows.

{% highlight scala %}

object RunExample extends App{

   val book = Book()

   println(book.id)
   println(book.title)
   println(book.isbn)

}

{% endhighlight %}

The programmer has the freedom to choose which values to supply and which values to leave it as default. In the below example only the `id` parameter is supplied,
rest are the default values.

{% highlight scala %}

object RunExample extends App{

   val book = Book(100)

   println(book.id)
   println(book.title)
   println(book.isbn)

}

{% endhighlight %}


If we wan't to provide a custom book value, then we can do that as below.

{% highlight scala %}

object RunExample extends App{

   val book = Book(title = "Lord of the Rings")

   println(book.id)
   println(book.title)
   println(book.isbn)

}

{% endhighlight %}

The second style of providing the variable identifier and then providing the value is considered good practice since it mentions what variable is being provided a custom value
in an explicit manner.

One thing to note that this style of giving partial constructor values is also possible in regular scala classes, but it is kind of better suited to case classes.

<a name="Immutable"><u>Immutable classes</u></a>

Case classes by default are immutable i.e once declared they cannot be changed. In the previous tutorial we briefly touched upon something similar in classes.
But case classes are naturally suited in creating immutable classes and they have a whole suite of advantages which we will see below.

![Constructor no value](/images/case_class_immutable.png)

In the case of immutable classes then you need not worry about direct variable access/creating getters and setters since they cannot be changed. This gives you a much more 
neater syntax.

All of the other stuff for regular classes such as val/var field promotion,getters/setters still apply.

<a name="Equals"><u>Structural equality - Automatic equals generation</u></a>

When comparing objects in java, one of the most painful tasks in java is structural equality i.e comparing the individual variables/members of the class.

Case classes generate a lot of boilerplate which includes equals comparison. We can simply compare two classes as below.

{% highlight scala %}

object RunExample extends App{

  val book1 = Book(100,"Fifty Shades of Grey",9788490322178l)

  val book2 = Book(100,"Fifty Shades of Grey",9788490322178l)

  //Prints true
  println(book1 == book2)

}

{% endhighlight %}

As a seasoned java developer you would have been taught not to use `==` on strings/classes and use `equals` method. 
It is not quite the same in scala, but you can of course use `println(book1.equals(book2))` and it would still print true.

The `==` also prints true and it is something called a [synthetic method](https://docs.oracle.com/javase/tutorial/java/generics/bridgeMethods.html){:target="_blank"} also called
a bridge method which actually calls the equals method. It is generated by the scala compiler as a shorthand/convenience.

In our journey through scala we would frequently encounter such methods. It is not necessary to understand the implementation that is beneath it.

<a name="ReferenceEquality"><u>Reference equality</u></a>

We might encounter situations where we  want to compare the actual references.

In java you would use `==` as above, but scala has made a design decision of using double equals for structural equality since it is more used in real world scenarios.
There are specialized methods to compare references, two in particular i.e `eq` and `ne` 

{% highlight scala %}

object RunExample extends App{

  val book_1 = Book(title = "Something else")

  val book_2 = Book(title = "Something else")

  //book_1 and book_2 are different references
  //Evaluates to false
  println(book_1 eq book_2)

  //using a reference copy
  val book_1_copy = book_1

  //Evaluates to true
  println(book_1 eq book_1_copy)

}

{% endhighlight %}

`ne` is the exact opposite of `eq`.

{% highlight scala %}

object RunExample extends App{

  val book_1 = Book(title = "Something else")

  val book_2 = Book(title = "Something else")

  //Evaluates to false
  println(book_1 eq book_2)

  //Evaluates to true
  println(book_1 ne book_2)

}

{% endhighlight %}

These are synthetic methods similar to `==` and members of the [AnyRef class](http://www.scala-lang.org/api/current/scala/AnyRef.html){:target="_blank"}

<a name="String"><u>String representation</u></a>

In a normal java/scala class if you call `toString` on the object it would typically return the hex string representation of the hashcode which in most of the cases 
completely useless. Case classes have a pretty nice toString method which gives a meaningful string representation of the class.


{% highlight scala %}

object RunExample extends App{

  val book = Book(100,"Fifty Shades of Grey",9788490322178l)

  //Prints Book(100,Fifty Shades of Grey,9788490322178)
  println(book.toString)
  
}

{% endhighlight %}

This is much better than the default toString present in regular classes and helpful in debugging. If you application requires something new, then you can always override and 
provide a customized implementation.

<a name="Hashcode"><u>Automatic hashcode generation</u></a>

I am assuming that readers are familiar with the java's implementation of hashcode if not then its nothing but an implementation for the convenience of 
putting them into hash tables.

The [java docs](http://docs.oracle.com/javase/7/docs/api/java/lang/Object.html#hashCode()){:target="_blank"} explanation sums it up well.

Another thing to understand is the implementations in java are [native methods](http://stackoverflow.com/questions/10578764/why-are-hashcode-and-getclass-native-methods){:target="_blank"}.
A native method is one that relies upon the direct machine implementation rather than a java based implementation.

The internals of the exact implementation is not necessary to understand for a developer, but if you are curios you can take a look at it.

It is important to understand the hashcode API contract which is summed up as below.

- Whenever it is invoked on the same object more than once during an execution of a Java application, 
the hashCode method must consistently return the same integer, provided no information used in equals comparisons on the object is modified. 
This integer need not remain consistent from one execution of an application to another execution of the same application.
- If two objects are equal according to the equals(Object) method, then calling the hashCode method on each of the two objects must produce the same integer result.
- It is not required that if two objects are unequal according to the equals(java.lang.Object) method, 
then calling the hashCode method on each of the two objects must produce distinct integer results. 
However, the programmer should be aware that producing distinct integer results for unequal objects may improve the performance of hashtables

That should pretty much sum up how java does the hashcode part.

In scala the things are a bit different.

http://stackoverflow.com/questions/40980193/scala-murmur-hash-vs-java-native-hash

https://gist.github.com/Madusudanan/f903809a968be6d15688acaaadc6f17b