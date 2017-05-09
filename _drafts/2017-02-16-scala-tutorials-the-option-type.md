---
layout: post
title: "Scala Tutorials Part #Unknown - The Option type "
permalink: blog/scala-tutorials-part-16-the-option-type/
tags: [Scala]
---

The Option Type
---------------

Java programmers would be familiar with the `NullPointerException` which basically pops up when you access when an object instance
which has not yet been created yet.

This issue is not because of the Java library or the runtime, its because of programmers writing crappy code. A language can offer some level of defense against human stupidity and that is what differentiates languages.

Scala addresses this issue with the [Option type](http://www.scala-lang.org/api/current/scala/Option.html){:target="_blank"}. Let's jump right in.

This is part 16 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [First line of defense in variables](#FirstLineDefense)
- [Introduction to the Option type](#Option)
- [Creating our own Option type](#CustomOption)

<h3><b><a name = "FirstLineDefense" class="inter-header">First line of defense in variables</a></b></h3>

Recall from the first chapter that variables [can't be just declared and left un-initialized](/blog/scala-tutorials-part-1-getting-started/#Initialize).

But that does prevent what java programmers have been doing all the time, i.e just leave it as `null`

{% highlight scala %}

object Runnable extends App {


  val x  = null

  println(x.toString)


}

{% endhighlight %}

This would result in the dreaded `NullPointerException`. We are still exposed to this issue which in medium/large code bases becomes very difficult to track and that is
assuming that the codebase is somewhat well designed.

Assigning `null` to objects seems fine in imperative environments since that is how you program. 
A classic example is appending data to a `ArrayList` inside of a for loop.

The `null` in the scala language exists only for inter-operation with the java language environment. There is a better way to do this in scala.

<h3><b><a name = "Option" class="inter-header">Introduction to the Option type</a></b></h3>

`Option` is not a type per se, it is syntactic sugar to a class that is underneath it.

In fact it is an abstract class which has two children `Some` and `None`. These three are not present in the 
[scala type system hierarchy](/blog/scala-tutorials-part-2-type-inference-in-scala/#ScalaTypes) at all. Let's take a look at how they work
with a real world example.

Let's try to access a non existing index in an `ArrayList`.

{% highlight java %}

 ArrayList<Integer> data = new ArrayList<>();

 data.get(1);

{% endhighlight %}

This would obviously lead to an exception.


    Exception in thread "main" java.lang.IndexOutOfBoundsException: Index: 1, Size: 0
        at java.util.ArrayList.rangeCheck(ArrayList.java:653)
        at java.util.ArrayList.get(ArrayList.java:429)
        at Test.main(Test.java:9)

If you are developing a customer facing application with some sort of a UI, throwing this error back to it would be absurd. What we would generally
do is to catch this exception and then return some sort of a meaningful error message such as the "list is empty" or something depending on the
application.

{% highlight java %}

try {

    ArrayList<Integer> data = new ArrayList<>();
    data.get(1);

}

catch (IndexOutOfBoundsException e) {

    System.out.println("List is empty. Nothing to display");

}

{% endhighlight %}

This is handled in a completely different way in scala.

![Option in scala](/images/option_example.png)

`List` is not exactly equal to a java `ArrayList`, but for demonstration purposes this is ok. What we are trying to do is to find the first value
that is greater than 100 and also the first value greater than 1000. Since we have a value that is greater than 100, the list returns the value
by wrapping it into a `Some` type. In the case where there is no value greater than 1000 then return `None`.

Unlike `Some` which indicates the presence of a value of some type, `None` indicates non-existent values. `None` should not be confused with
the `Unit` type which is used to represent the absence of a type.

This facility is of course provided by the `List` collection in scala, but we can build our own if we want to.

<h3><b><a name = "CustomOption" class="inter-header">Creating our own Option type</a></b></h3>

Let's consider a case class `User`

{% highlight scala %}

case class User(id:Int,email:String)

{% endhighlight %}

Now there is a situation where we disallow email IDs belonging to gmail and yahoo subdomains.

{% highlight scala %}

def getFilteredEmailID(user:User) : Option[String] = {

    val disallowedDomains = "gmail.com,yahoo.com"

    if(!disallowedDomains.contains(user.email.split("@")(1))) Some(user.email) else None

}

{% endhighlight %}

The method splits the string with the `@` character and gets the second index from the split array which gives the domain of the email address. This is now checked with the disallowed domains list and if there is a match then we return `None` else we return a `Some`. Below code which consumes this method should make it clear.


{% highlight scala %}

val emailID = getFilteredEmailID(User(100,"fox@gmail.com"))

  emailID match {
    case Some(x) => println(x)
    case None => println("Domain not allowed")
  }

{% endhighlight %}

We feed the `User` object to the `getFilteredEmailID` method which returns either `Option[String]`. This can be either `Some` or `None` depending on the computation. This is why `Option` is an abstract class. `Some` is a case class and `None` is a case object underneath.
What we are doing above is called pattern matching. We will see in detail about what pattern matching is in later tutorials. For now, it can be seen as a simple version of switch statements. The real advantage is because everything is compile time and there is no possibility of a runtime
`NullPointerException`.

There are other ways in which an `Option` can be consumed, we will take a look at them as and when we encounter in our journey.



