---
layout: post
title: "Scala Tutorials Part #26 - Type parameterization"
permalink: blog/scala-tutorials-part-26-type-parameterization/
tags: [Scala]
---

Type parameterization
---------------------

This is part 26 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Getting started with an example](#Example)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

Type parameterization or otherwise called as generics add stability to the code combined with scala's type system. This concept is not
new to Scala. Java added support for generics in J2SE 5.0 which was released in 2004. It equips the programmer with the ability to write
code which is more predictable during compile time rather than time. It is heavily used both in Java and Scala collections.

{% highlight java %}

ArrayList<String> list=new ArrayList<String>();  
list.add("1");  
list.add("2");

{% endhighlight %}
 
Here the type within `<>` are called generics and the class is just defined once using generics and they are re-used.

<h3><b><a name = "Example" class="inter-header">Getting started with an example</a></b></h3>

We are going to design a Stack data structure from scratch. It is not an elaborate one and you should definitely not use this in production
code. But for explaining the concepts, they work well.

{% highlight scala %}

class Stack[A] {
}

{% endhighlight %}

Here `A` is a type parameter similar to `E` used in Java collections API.

Next we will declare two variables which are private to the scala implementation. 

{% highlight scala %}

    //Internal array buffer. Kind of like java array list
    private val arrayBuffer = new ArrayBuffer[A]()
    //Pointer tracker
    private var stack_pointer = -1
    
{% endhighlight %}


We will implement three basic methods of a Stack data structure i.e `push`, `pop` and `peek`. 

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

Our final implementation looks this.

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
 
Consuming this class is pretty simple.

{% highlight scala %}


  val stack = new Stack[Int]

  stack.push(10)
  stack.push(20)
  stack.push(30)

  println(stack.pop())
  println(stack.peek())
  
{% endhighlight %}
    
Of course this isn't a proper implementation, but you get the idea.



 