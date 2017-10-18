---
layout: post
title: "Scala Tutorials Part #16 - The Option type "
permalink: blog/scala-tutorials-part-16-the-option-type/
tags: [Scala]
last_updated: 2017-10-18
---

The Option Type
---------------

Java programmers would be familiar with the `NullPointerException` which pops up when you access an object instance
which has not yet been created yet.

This issue is not because of the Java library or the runtime, but it's because of programmers writing crappy code. 
A language can offer some level of defense against human stupidity and that is what differentiates languages. 
Take a look at [Null References : The Billion Dollar Mistake](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare){:target="_blank"}

Scala addresses this issue with the [Option type](http://www.scala-lang.org/api/current/scala/Option.html){:target="_blank"}. Let's jump right in.

This is part 16 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [First line of defense in variables](#FirstLineDefense)
- [Introduction to the Option type](#Option)
- [Creating our own Option type](#CustomOption)
- [Conclusion](#Conclusion)

<h3><b><a name = "FirstLineDefense" class="inter-header">First line of defense in variables</a></b></h3>

Recall from the first chapter that variables [can't be just declared and left un-initialized](/blog/scala-tutorials-part-1-getting-started/#Initialize).

But that does not prevent what java programmers have been doing all the time, i.e just leave them as `null`

{% highlight scala %}

  val x  = null

  println(x.toString)

{% endhighlight %}

This would result in the dreaded `NullPointerException`. We are still exposed to this issue which in medium/large code bases becomes very difficult 
to track . Assigning `null` to objects is often misused in imperative environments. 
The `null` in the scala language exists only for inter-operation with the java language environment. There is a better way to do this.

<h3><b><a name = "Option" class="inter-header">Introduction to the Option type</a></b></h3>

`Option` is not a type per se, it is syntactic sugar to a class that is underneath it.

In fact it is an abstract class which has two children `Some` and `None`. These three are not present in the 
[scala type system hierarchy](/blog/scala-tutorials-part-2-type-inference-in-scala/#ScalaTypes) at all. Let's take a look at how they work
with a real world example.

Let's try add data to an null `ArrayList`.

{% highlight java %}

 ArrayList<Integer> data = null;

 data.add(1);

{% endhighlight %}

This would obviously lead to an exception.

	Exception in thread "main" java.lang.NullPointerException
		at JavaRunner.main(JavaRunner.java:9)

If you are developing a customer facing application with some sort of a UI, throwing this error back to it would be absurd. What we would generally
do is to catch this exception and then return some sort of a meaningful error message such as the "list not initialized" or something depending 
on the application.

{% highlight java %}

try {

 ArrayList<Integer> data = null;
 data.get(1);

}

catch (NullPointerException e) {

 System.out.println("Array list not initialized");

}

{% endhighlight %}

This is handled in a completely different way in scala.

![Option in scala](/images/option_example.png)

`List` is not exactly equal to a java `ArrayList`, but for demonstration purposes this should be fine. What we are trying to do is to find the first value
that is greater than 100 and also the first value greater than 1000. Since we have a value that is greater than 100, the list returns the value
by wrapping it into a `Some` type. In the case where there is no value greater than 1000 then return `None`.

Unlike `Some` which indicates the presence of a value of some type, `None` indicates non-existent values. `None` should not be confused with
the `Unit` type which is used to represent the absence of a type itself.

This facility is of course provided by the `List` collection in scala, but we can build our own if we want to.

At this point, a typical java programmer would have a question in mind like "How do I declare a variable and not initialize it?" 
and the simple answer it to that is "You don't". You change your programming style not to include un-initialized variables in the code 
and not initialize them to `null` as well. We will be dealing with the latter part of it i.e `null` handling, the former part which is 
"Declaring a variable and initializing the variable along with the declaration" style as already seen in 
[part 1](/blog/scala-tutorials-part-1-getting-started/#Initialize) was a design choice taken by the scala language developers themselves.

<h3><b><a name = "CustomOption" class="inter-header">Creating our own Option type</a></b></h3>

Let's consider a case class `User`

{% highlight scala %}

case class User(id:Int,email:String)

{% endhighlight %}

Now there is a situation where we disallow email IDs belonging to gmail and yahoo domains.

{% highlight scala %}

def getFilteredEmailID(user:User) : Option[String] = {

    val disallowedDomains = "gmail.com,yahoo.com"

    if(!disallowedDomains.contains(user.email.split("@")(1))) Some(user.email) else None

}

{% endhighlight %}

The method splits the string using the `@` character and gets the second index from the split array which gives the domain of the email address. 
This is now checked with the banned domains list and if there is a match then we return `None` else we return a `Some`. 
Below code example which consumes this method should make it clear.


{% highlight scala %}

val emailID = getFilteredEmailID(User(100,"fox@gmail.com"))

  emailID match {
    case Some(x) => println(x)
    case None => println("Domain not allowed")
  }

{% endhighlight %}

We feed the `User` object to the `getFilteredEmailID` method which returns an `Option[String]`. 
It can be either `Some` or `None` depending on the computation. This is why `Option` is an abstract class since the result is either `Some` 
or `None` but never an `Option` itself at the top level. 
`Some` is a [case class](/blog/scala-tutorials-part-6-case-classes/) and 
`None` is a [case object](/blog/scala-tutorials-part-10-case-objects-in-scala/) underneath.

What we are doing above is called pattern matching. We will see in detail about what pattern matching is in later tutorials. 
For now, it can be visualized as a simplified version of switch statements. The real advantage lies in everything being compile time and there is 
no possibility of a runtime `NullPointerException`.

A more simpler way to consume `Option` is to use the built in `getOrElse` method.

{% highlight scala %}

val emailID = getFilteredEmailID(User(100,"fox@gmail.com"))

println(emailID.getOrElse("Banned domain"))

{% endhighlight %}

If `None` is returned then "Banned domain" is printed else the given email ID is printed. This can be used in simpler situations whereas 
pattern matching can be used in complex situations.

There are other ways in which an `Option` can be consumed, we will take a look at them at appropriate places in our journey through scala.

<h3><b><a name = "Conclusion" class="inter-header">Conclusion</a></b></h3>

![Scala option type](/images/scala-option.png)

We saw the usage of the `Option` type in a very brief manner. There are several advantages of using the Option/Some/None pattern over java's `null`. 
The main reason is you cannot say in a concrete manner when a `NullPointerException` will come since it is at runtime. 
Although you can carefully profile your code. In reality large code bases make this task tedious and not feasible. When using Scala's `Option`, 
you can precisely reason that it can be either `Some` or `None` and we can deal with it rather than raising an exception and then catching it.

The `Option` type and its supporting classes `Some` and `None` can also be used to deal with situations other than null pointers. It is otherwise
known as a monadic container which we will see more about in later tutorials.
	
For a spoiler on the upcoming tutorials, we will see how the unapply method works which is the opposite of apply method and then extractors 
finally leading to pattern matching.

Stay tuned <i class="fa fa-smile-o fa-lg"></i>


