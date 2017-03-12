---
layout: post
title: "Scala Tutorials Part #10 - Case objects in scala "
permalink: blog/scala-tutorials-part-10-case-objects-in-scala/
tags: [Scala]
---

Case Objects
-------------

We have seen [objects](/blog/scala-tutorials-part-4-objects/) and [case classes](/blog/scala-tutorials-part-6-case-classes/) before. 
Case objects are a mix of both i.e it is a singleton similar to an object and with lot of boilerplate as in a case class. 
The only difference is that the boilerplate is done for an object instead of a class.

This is part 10 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Case objects vs Case classes](#ComparisonCOvsCC)
- [Advantages of case objects](#Advantages)
- [Conclusion](#Conclusion)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

Case objects are pretty useful if you want the boilerplate stuff that is there for case classes.

They can be created as below.

{% highlight scala %}

case object CaseObjectDemo {

  println("I am a case object")

}

{% endhighlight %}  

When you compare the decompiled version  of a [case object](https://gist.github.com/Madusudanan/1c11276cdef43dd6c95e896fc8a768c6){:target="_blank"} 
with a [case class](https://gist.github.com/Madusudanan/f903809a968be6d15688acaaadc6f17b){:target="_blank"} then you will be able to see the differences.

<h3><b><a name = "ComparisonCOvsCC" class="inter-header">Case objects vs Case classes</a></b></h3>

Things that are missing in case objects.

- Apply, Un-apply methods. We will see about this later
- There are no copy methods since this is a singleton
- No method for structural equality comparison
- No constructor as well 

The missing pieces are the ones that are actually not needed when compared to case classes.
 
<h3><b><a name = "Advantages" class="inter-header">Advantages of case objects</a></b></h3>

We can clearly see what is being generated in the decompiled class when compared to a regular `Object`.

- `toString` method
- `hashCode` based on [murmur hash](https://en.wikipedia.org/wiki/MurmurHash){:target="_blank"}
-  Case object/Case class is serializable by default 

We can verify that it is `Serializable` with the below code example.


{% highlight scala %}

object Runnable extends App  {

  //Will print false
  println(SerializationExample.isInstanceOf[Serializable])
  //Will print true
  println(CaseObjectSerializationExample.isInstanceOf[Serializable])


}

object SerializationExample {

}

case object CaseObjectSerializationExample {

}

{% endhighlight %} 

If we want the regular `Object` to become serializable then it can extend the `Serializable` trait.


{% highlight scala %}

object Runnable extends App  {

  //Will print true since it extends the Serializable trait
  println(SerializationExample.isInstanceOf[Serializable])
  //Will print true
  println(CaseObjectSerializationExample.isInstanceOf[Serializable])


}

object SerializationExample extends Serializable{

}

case object CaseObjectSerializationExample {

}

{% endhighlight %}  

<h3><b><a name = "Conclusion" class="inter-header">Conclusion</a></b></h3>

We have reached the end of the article. This was a pretty short one and we saw that there is something called case object and why it exists.

The syntactic sugar that case objects offer over regular objects can be argued when comparing with its counterpart i.e case classes. 
At first sight they do not seem to have much advantages, but that is not true.

In the following tutorials we will see usages of case objects where the syntactic sugar is actually turned into good, readable code, particularly in two scenarios

1) Where we can do pattern matching with case classes and case objects

2) Using case objects as the base structure for Enumerations in scala

These are advanced topics requiring knowledge of various other functional programming concepts. We will conquer them one at a time.

Stay tuned <i class="fa fa-smile-o fa-lg"></i>


