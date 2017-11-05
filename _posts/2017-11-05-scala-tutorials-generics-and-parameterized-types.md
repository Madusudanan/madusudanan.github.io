---
layout: post
title: "Scala Tutorials Part #26 - Type parameterization"
permalink: blog/scala-tutorials-part-26-type-parameterization/
tags: [Scala]
---

Type parameterization
---------------------

This is part 26 of the Scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Getting started with an example](#Example)
- [Using custom class types](#CustomClasses)
- [Multiple type parameters](#MultiParameter)
- [Decomposing types with Generic methods](#DecomposingTypes)
- [Conclusion](#Conclusion)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

Type parameterization or otherwise called as generics combined with Scala's type system add stability to the code. This concept is not
new to Scala. Java added support for generics in J2SE 5.0 which was released in 2004. It equips the programmer with the ability to write
code which is more predictable during compile time rather than time. It is heavily used in the collections API of Java and Scala.

{% highlight java %}

ArrayList<String> list=new ArrayList<String>();  
list.add("1");  
list.add("2");

{% endhighlight %}
 
Any type within the Java language type system can be encoded within the `<>`. These are called generics and the class is just defined once using 
the generics container and can be re-used.

<h3><b><a name = "Example" class="inter-header">Getting started with an example</a></b></h3>

We are going to design a Stack data structure from scratch. This is just an example and you would typically use something within collections when
it come to actual production code. But for explanation purposes, they do just fine. 

{% highlight scala %}

class Stack[A] {
}

{% endhighlight %}

Here `A` is a type parameter similar to `E` used in Java collections API.

Next we will declare two variables which are private to the class. 

{% highlight scala %}

    //Internal array buffer. Kind of like java array list
    private val arrayBuffer = new ArrayBuffer[A]()
    //Stack position pointer
    private var stack_pointer = -1
    
{% endhighlight %}


We will implement three basic methods `push`, `pop` and `peek`. 

{% highlight scala %}

    def push(a:A): Unit = {
      stack_pointer = stack_pointer + 1
      arrayBuffer.append(a)
    }

    def pop() : Option[A] = {
      if(stack_pointer == -1){
        None
      }
      else{
        val poppedElement = arrayBuffer(stack_pointer)
        stack_pointer = stack_pointer - 1
        Some(poppedElement)
      }
    }

    def peek() : Option[A]  = {
      if(stack_pointer != -1) {
        Some(arrayBuffer(stack_pointer))
      }
      else {
        None
      }
    }

{% endhighlight %}

Our final implementation now looks like this.

{% highlight scala %}

class Stack[A] {

    //Internal array buffer. Kind of like java array list
    private val arrayBuffer = new ArrayBuffer[A]()
    //Pointer
    private var stack_pointer = -1

    def push(a:A): Unit = {
      stack_pointer = stack_pointer + 1
      arrayBuffer.append(a)
    }

    def pop() : Option[A] = {
      if(stack_pointer == -1){
        None
      }
      else{
        val poppedElement = arrayBuffer(stack_pointer)
        stack_pointer = stack_pointer - 1
        Some(poppedElement)
      }
    }

    def peek() : Option[A]  = {
      if(stack_pointer != -1) {
        Some(arrayBuffer(stack_pointer))
      }
      else {
        None
      }
    }

  }
  
{% endhighlight %}
 
Using this data structure is pretty simple.

{% highlight scala %}


  val stack = new Stack[Int]

  stack.push(10)
  stack.push(20)
  stack.push(30)

  println(stack.pop())
  println(stack.peek())
  
{% endhighlight %}
   
<h3><b><a name = "CustomClasses" class="inter-header">Using custom class types</a></b></h3>

Since the type `A` can be used to encode almost any type, lets try some of our custom classes.

{% highlight scala %}

//Root trait
trait Car

//Types extending from the Car trait
class Toyota extends Car
class Hyundai extends Car 

{% endhighlight %}

We can then use these classes in our stack data structure.

{% highlight scala %}

  val t = new Toyota
  val h = new Hyundai
  
  val stack = new Stack[Car]
  
  stack.push(t)
  stack.push(h)

{% endhighlight %}

<h3><b><a name = "MultiParameter" class="inter-header">Multiple type parameters</a></b></h3>

The Java language has an interface called [`Pair`](https://docs.oracle.com/javase/tutorial/java/generics/types.html){:target="_blank"} which goes as 
follows,

{% highlight java %}

public interface Pair<K, V> {
public K getKey();
public V getValue();
}

{% endhighlight %}

It has two generic parameters. This is used in collections such as `HashMap`. Scala's counterpart is not that different.

{% highlight scala %}

trait Pair[A,B] {
  def getKey : A
  def getValue : B
}

{% endhighlight %}

The `[]` is equivalent to `<>` in terms of syntactic sugar as we saw in examples above.

<h3><b><a name = "DecomposingTypes" class="inter-header">Decomposing types with Generic methods</a></b></h3>

In [part 23](/blog/scala-tutorials-part-23-pattern-matching-in-scala/) we saw an example in which we decomposed a higher type `Any` into its sub types. 

{% highlight scala %}

val typeTest : Any = "String"

  typeTest match {
    case i : Int => println("Integer type")
    case d : Double => println("Double type")
    case f : Float => println("Float type")
    case s : String => println("String type")
    case _ : BigDecimal => println("Big decimal type")
    case _ => println("Unknown type")
  }

{% endhighlight %}

We explicitly gave the type ascription to the variable `typeTest`. This gets translated to type casting and it is not necessarily a good way to do this.

A better and a type safe way to accomplish this is by using a generic type signature. Let's create an empty method which operates on generic types.

{% highlight scala %}

def identifyType[A](value:A)  = {
}

{% endhighlight %}

The `[A]` after the method name is necessary to indicate that the method operates on generic types. Next we will do the same pattern matching inside 
the method.

{% highlight scala %}

  def identifyType[A](value:A)  = {

    value match {
      case i : Int => println("Integer type")
      case d : Double => println("Double type")
      case f : Float => println("Float type")
      case s : String => println("String type")
      case _ : BigDecimal => println("Big decimal type")
      case _ => println("Unknown type")
    }

  }

{% endhighlight %}

Now we can call this without explicit type annotation, since it is taken care by the compiler.

{% highlight scala %}

  //String
  identifyType("Testing")
  //Integer
  identifyType(10)
  //Double
  identifyType(20.0)

  case class Box(name:String)
  val box  = Box("test")
  //Custom type - No explicit annotation
  identifyType(box)

{% endhighlight %}

Prints out the following.

{% highlight scala %}

String type
Integer type
Double type
Unknown type

{% endhighlight %}

<h3><b><a name = "Conclusion" class="inter-header">Conclusion</a></b></h3>

Generics are a powerful way of abstraction and writing type safe code which is more compile time reliant rather than run time. We have merely scratched 
the surface of what is possible with them in Scala and this article has been more like an introduction to its syntax. I have deliberately left out 
advanced topics such as type variance, structural typing(duck typing) which will be explained in later tutorials.

The `Stack` data structure above is partially derived from the Scala lang's official documentation guide on 
[generics](https://docs.scala-lang.org/tour/generic-classes.html){:target="_blank"}. 


