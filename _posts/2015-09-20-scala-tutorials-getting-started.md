---
layout: post
title: "Scala Tutorials Part #1 - Getting Started with Scala"
permalink: blog/scala-tutorials-part-1-getting-started/
tags: [Scala]
last_updated: 2018-02-13
---

Getting Started with Scala
--------------------------

This is the first part of a tutorial series that ill be writing on Scala. Check [here](/blog/scala-articles-index/) for the full series.

If you are from Java there are lot of things that can be difficult to get your head around, and the most easiest way is to unlearn and re-learn them.

<i class="fa fa-film fa-lg space-right"></i> : <a href="https://www.youtube.com/watch?v=APx2yFA0-B4" target="_blank">Be like water my friend !!</a>

<i class="fa fa-language fa-lg space-right"></i> : This article has been translated to Chinese by [ChanZong Huang](http://www.linkedin.com/in/chanzong-huang-716ba261){:target="_blank"}, you can check it out
[here](http://www.itran.cc/2017/02/23/yin-du-peng-you-shou-ba-shou-jiao-ni-xue-scala-1-scalaru-men/){:target="_blank"}.

Let's get started.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction to scala and environment setup](#Intro)
- [First Hello world !!](#ScalaHelloWorld)
- [Variables](#Variables)
- [Reference vs Value immutability](#ReferenceVsValue)
- [Immutability under the hood](#AdvancedUnderstanding)
- [Comparing and Contrasting `val` and `final`](#ValVsFinal)
- [Data types in Scala](#DataTypes)
- [Type inference](#TypeInference)
- [Variable initialization](#Initialize)
- [Type annotations](#TypeAnnotations)
- [Type ascriptions](#TypeAscriptions)
- [Lazy val](#LazyVal)
- [Homework](#Homework)


<h3><b><a name = "Intro" class="inter-header">Introduction to scala and environment setup</a></b></h3>

Start with [this blog post](/blog/why-scala-will-be-the-next-big-thing) if you are new to Scala.

There are many tutorials available on the internet which talk about setting up Scala, so I am not going to walk through those again.

<i class="fa fa-desktop fa-lg space-left space-right"></i> -  Recommended developer setup.

- Operating System : Mac/Linux preferred
- Intellij IDEA community edition with Scala plugin installed

If you are done setting those up, then let's begin.

<h3><b><a name = "ScalaHelloWorld" class="inter-header">First Hello World !!</a></b></h3>

Let's directly jump into some <i class="fa fa-code fa-lg space-left space-right"></i>.

{% highlight scala %}
object Test {
  def main(args : Array[String]){
    println("Hello world")
  }
}
{% endhighlight %}

You can copy this code into your Intellij IDE and then run it. If all goes well, you should see Hello World in your console.

![First hello world](/images/first-hello-world.jpg)

Let's break it down. The first thing to notice, is that the whole code is inside an `object` block. Java programmers might find these confusing. This is explained in [part 4](/blog/scala-tutorials-part-4-objects/). Unlike Java, class names need not match with file names, not a big deal but, we do have that freedom here.

Next thing is the strange syntax of `def main()`. To begin with `def` is a keyword to declare methods. Methods are explained in [part 3](/blog/scala-tutorials-part-3-methods/). There can be arguments for a method and in our case, it is an `Array[String]`. This is similar to Java's main method, where a string array is an argument to the main method. Can be used for startup config or any runtime variables.

This is followed by a `println()` method call which prints statements on to the console. 
If you are using an IDE, then you can trace the entire call by holding ctrl+click on the method (Shortcuts differ with operating systems. On a Mac this is cmd+click). 
Python folks should find this syntax similar, it simply prints out the given string to the console.
Semicolons are optional in Scala unlike Java and the compiler relies on line breaks to identify the next literal/code block.

The `println()` method's stack trace goes as below.

![Scala println stack](/images/scala-println-stack.png)

If you have the source code attached it shows the source code directly, otherwise the decompiler from Intellij shows the decompiled code. The print from 
both Scala and Java end up in the same method call. As mentioned before, Scala is built on top of the JVM and can inter-operate with Java code seamlessly, unless there is a specific reason for a different implementation then it would be just re-inventing the wheel and hence they all rely on the existing JDK library functionality.

`Predef.scala` is similar to the java.lang package. They are available to all Scala files by default without any import. We will take a look at `Predef` in detail with a later tutorial.

A simple hello world has opened up many topics to learn, three in particular 

- Methods(Covered in later tutorials)
- Objects and Classes(Covered in later tutorials)
- Type inference — The reason why Scala is a statically typed dynamic language- Explained below

<h3><b><a name = "Variables" class="inter-header">Variables</a></b></h3>

I should have explained data types before we jump into variables, but there are some fundamental differences that we have to understand.

`var`and `val` are two keywords which are used to declare variables.

`var` is used to declare variables that are mutable and `val` to declare immutable ones. But what kind of variables are these?
For primitive data types, where does the concept of immutability come from? I encourage you to read this [stackoverflow post](http://stackoverflow.com/questions/18037082/are-java-primitives-immutable){:target="_blank"}.
Primitives by themselves are immutable i.e their type cannot be changed once declared, but their values are mutable i.e they can be changed.

<h3><b><a name = "ReferenceVsValue" class="inter-header">Reference vs Value Immutability</a></b></h3>

If `val` is immutable, then it cannot be changed? Is this similar to the Java final keyword or is it something related to String immutability?

Let's look some sample code below, to help us understand better.

{% highlight scala %}

    var myVar = 10
    //Works fine
    myVar = myVar + 10
    
    val myNum = 6
    //Will Result in compilation error
    //Reassignment to val
    myNum = myNum + 10

{% endhighlight %}

If you run the above code, you will notice an error at compilation itself such as reassignment to val. If you are using an IDE this will show up as you type because
of pre-compilation that the IDE gives.

First thing is definitely not like String immutability where it is not visible to the programmer, and is controlled at compilation level. Next question, is 
it similar to final in Java?

From a bird's eye view, this seems to be similar that once a value is assigned to it, it cannot be changed, but inside the JVM `final` has nothing to do with
immutability and it is used so that classes cannot be extended and in the case of methods it cannot be overridden.

Let's consider the below Java code to demonstrate that this is different.

{% highlight java %}

final ArrayList<Integer> arrList = new ArrayList<Integer>();

/*
This does not result in an error, we are mutating the object itself. If it were mutable it would result in error to something like it cannot be changed
*/
arrList.add(20);

/*
This results in error as we are modifying the reference 
and not the object itself
*/
arrList = null;
{% endhighlight %}

If you try the same `final` with primitive types, then its value cannot be changed. Does this mean primitives are immutable ?
This takes us back to the stackoverflow discussion above, but the reason why the error comes is because Java uses Pass by Value for primitive types, it makes no 
sense to pass by reference since they are not objects at all. So if a variable is changed, its reference(can be said as place in memory) 
changes because of the pass by value mechanism and not because that primitives are immutable.

The important point to understand is reference vs value immutability does not matter much in Scala since it does not have primitive types at all and only has objects.

<h3><b><a name = "AdvancedUnderstanding" class="inter-header">Immutability under the hood</a></b></h3>

Let's take our understanding of immutability even further by examining the byte code emitted by decompiling generated Scala class files.

Let's declare a class named `Parent` and a val inside it.

{% highlight scala %}

class Parent {
  val x = 10
}

{% endhighlight %}

On seeing the emitted bytecode, we can see that it gets translated to a java primitive type, there is nothing special going as far as the run time is concerned.

`javap -c filename.class` gives the below decompiled code.

{% highlight java %}
public class Parent {
  public int x();
    Code:
       0: aload_0
       1: getfield      #13     // Field x:I
       4: ireturn

  public Parent();
    Code:
       0: aload_0
       1: invokespecial #19     // Method java/lang/Object."<init>":()V
       4: aload_0
       5: bipush        10
       7: putfield      #13     // Field x:I
      10: return
}

{% endhighlight %}

It is clear that `val` is just a compile time restriction and has nothing to do with the emitted byte code.

We can take this approach of reading the decompiled byte code to understand things more deeply, but in most of the cases it is not required.

So whenever we are talking about immutability in Scala, we are talking about reference immutability. Immutable variables have certain performance 
benefits and leans closer to notion of writing code without side effects.

Even though the value of a `var` can be changed, its type cannot be changed.

{% highlight scala %}

  var x = 20
  
  //Allowed
  x= 40
  
  var a = 10

  //Not allowed
  a = "Test"
  
{% endhighlight %}
 
This is akin to the behaviour in Java where you cannot assign a string to an integer. This proves that type inference is indeed at compile time.

![Var type error](/images/var_type_error.png)

<h3><b><a name = "ValVsFinal" class="inter-header">Comparing and Contrasting val and final</a></b></h3>

Scala on the other hand also has the `final` keyword which works pretty similar.

A better way to visualize the difference between a val and a final is via an example.

Let's take a simple parent class.

{% highlight scala %}
class Parent {
  
  val age = 10
  
}
{% endhighlight %}


Unlike java, Scala can also override variables.

{% highlight scala %}
class Child extends Parent{

  override val age = 30
  
  def printVal ={
    println(age)
  }

}
{% endhighlight %}

Now if we declare the variable `age` as final in the Parent class, then it would not be possible for the Child class to override it and it would throw an error as below.

![Final override error](/images/final_override_error.png)

This is a real world example of where one would use `final`.

Notice that we are not breaking immutability here by overriding a val in child class. The child class creates an instance of its own instead of modifying the variable of the parent class.

<h3><b><a name = "DataTypes" class="inter-header">Data types in Scala</a></b></h3>

Scala has the same data types as in Java, with the same memory and precision.

All data types are Objects and methods can be called in them just as you would on an object.

{% highlight scala %}
val t = 69
//Prints 'E' the ASCII value of E is 69
println(t.toChar)

val s = "Hello World"  
//Just like String char at, prints l
//Trace leads to the same String class charAt method
println(s.charAt(2))
{% endhighlight %}

By the time now, another question would have come up? Where are the types in our code?

Unlike java where we declare variables with data types and then give a variable name, Scala has something called type inference.

<h3><b><a name = "TypeInference" class="inter-header">Type Inference</a></b></h3>

Type inference is nothing but the deduction of types at compile time. Hold on, isn’t that what dynamic typing means? Well no, notice that I said deduction of types, this is drastically different from what dynamically typed languages do. The main difference being that the types are deduced at compile time rather than run time.

Many languages have this built in, but the implementation varies from one language to another. Let's jump into the Scala REPL for some experimentation.

![Scala type inference](/images/type-inference-scala.png)

From the image above, it is evident that there is no magic. The variables are inferred automatically to the best types they deem fit at compile time.

Here is some more code to understand further.

{% highlight scala %}

val x = 20

//print to the console
//legit, gets inferred as an integer
println(x+10)

//Something stupid as below will throw compile time error
val z = 40
println(z / "justastring")
{% endhighlight %}

Go ahead and play with these variables, you are protected from compile time type safety, so do not hesitate to mess around.

If you are curious on what classes do the variables extend, you can dig deeper and find a class called `AnyVal`. This is part of an
entirely different topic of Scala's unified type system, which is nothing but the class hierarchy.

This is dealt with in [part 2](/blog/scala-tutorials-part-2-type-inference-in-scala) of this series with greater depth.

<h3><b><a name = "Initialize" class="inter-header">Variable initialization</a></b></h3>

In Scala you cannot simply create a variable and leave it un-initialized. 

![Variable initialization](/images/variables_initialize.png)

This is a [design choice](http://programmers.stackexchange.com/questions/223862/how-important-is-to-initialize-a-variable){:target="_blank"} 
that the scala language developers took. The obvious reason is not to leave variables un-initialized and also to avoid null pointer exceptions.

The only place where we don't assign values to variables is inside abstract classes. We will see more of it when learn about classes in scala.

<h3><b><a name = "TypeAnnotations" class="inter-header">Type annotations</a></b></h3>

Scala has the facility where we can mention the type explicitly.

`val y : Integer = 20`

These kind of type annotations are important in public facing APIs/methods. 

{% highlight scala %}

def getInfoFromBackend() =  {

    val dataList = List(1,"Literature",2,"Science")

    dataList

  }
  
{% endhighlight %}  

Without the type information explicitly annotated, developers consuming this will have confusion in understanding. Remember that not all languages on the 
JVM have type inference like java and hence a change on the type can break the client(consuming) code.

A better version would as below.

{% highlight scala %}

  def getInfoFromBackend() = List {

    val dataList = List(1,"Literature",2,"Science")

    dataList

  }
  
{% endhighlight %}  

This concept not just applies to method parameters but also to variables declared using the `val` keyword. The example just demonstrates the idea in a better understandable way.

<h3><b><a name = "TypeAscriptions" class="inter-header">Type ascriptions</a></b></h3>

Type ascriptions are something more complicated. It is process of telling the compiler of what type you would expect out of an operation that you are going to perform.

A typical use case would type casting in java.

{% highlight java %}

int x = 20;

//Valid conversion
System.out.println((byte) x);

//Run time error
Object s = new Object();
System.out.println((byte) s);

{% endhighlight %}

The above code would result in a run time exception/error as below.

    20
    Exception in thread "main" java.lang.ClassCastException: java.lang.Object cannot be cast to java.lang.Byte
        at JavaExample.main(JavaExample.java:14)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
        at java.lang.reflect.Method.invoke(Method.java:497)
        at com.intellij.rt.execution.application.AppMain.main(AppMain.java:147)

In Scala, when we use type ascription the code would not even compile.

![Scala type ascription error](/images/scala_type_ascription_error.png)

There is no syntax difference between type annotation and type ascription and often results in confusion between the two topics.

We could have taken the same java route using type casting at run time.

{% highlight scala %}

  val x = new Object().asInstanceOf[Byte]
  
{% endhighlight %}  

In the above case, you can observe that it does not throw an error at compile time and it will result in the same exception stack trace i.e `java.lang.ClassCastException` at run time.

Type ascriptions can be incredibly useful when performing type casting/conversion. You can check type safety at compile time rather than run time to ensure it does not result
in buggy code.

<h3><b><a name = "LazyVal" class="inter-header">Lazy val</a></b></h3>

As the name suggests, lazy val in scala is similar to a val, but its value is evaluated only when the variable is used.

{% highlight scala %}

import scala.io.Source._

object ReadFileExample extends App{

println(System.getProperty("user.dir"))

lazy val lines = fromFile(System.getProperty("user.dir") + "/file1.txt").getLines

println(lines)

}

{% endhighlight %}

I encourage you to try this yourself. First by commenting out `println(lines)`, you could see that it did not result in an error even though the file 
was not there. 

This is a working example where you can put in a real file on the top level of the project that you are in/ put in a specific path yourself and 
then the program would just print out the file content.

This is controlled at compile time, since a variable access can be know at compile time. 

Very useful in situations such as a file upload window in a browser. The user may or may not upload the file, so it is best to defer/lazily 
evaluate until the event happens.

![Lazy var error](/images/lazy_var_error.png)

The Lazy keyword only applies to `val` and not `var`. This is because `var` is not considered as a value definition since it can change its values
at runtime. It is difficult to know when it will exactly change and hence the whole concept of lazy evaluation does not make sense when it comes to
changing variables.

<h3><b><a name = "Homework" class="inter-header">Homework</a></b></h3>

From what we have seen in this post, we can go ahead and learn the below topics.

[Tutorials point arrays](https://www.tutorialspoint.com/scala/scala_arrays.htm){:target="_blank"} gives a good overview of the syntax.

[Scala lang official documentation of arrays](http://docs.scala-lang.org/overviews/collections/arrays.html){:target="_blank"} is a must read.

Arrays are the most simplistic collection type in the scala language and understanding them gives us a good head start.

[The Scala REPL](http://docs.scala-lang.org/overviews/repl/overview.html){:target="_blank"} is a very handy tool that we can make use of for 
experimenting short code snippets. Make sure you checkout the [Ammonite REPL](http://ammonite.io/){:target="_blank"} which is not part of the 
standard Scala toolkit but much more advanced and user friendly.

This brings an end to this post, we have started with the important parts. I encourage you to re read the post to understand it completely if you haven't 
and also refer relevant documentation on the internet.

Translating simple code snippets from other languages also helps.

I'll be updating links to this article as soon as I publish pending topics that I have mentioned here. You can also subscribe if you want to keep updated.

Scala is not easy, but it is not hard either if we take one step at a time and learn things. My goal is not to teach everything, 
but simply point in a direction that is much less shrouded that it was before.

Keep learning and watch out for more posts <i class="fa fa-smile-o fa-lg"></i>
