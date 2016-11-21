---
layout: post
title: "Scala Tutorials Part #5 - Classes"
permalink: blog/scala-tutorials-part-5-classes/
tags: [Scala]
---

Classes
-------

This is part 5 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Access and visibility](#AccessVisibility)
- [Constructors](#Constructors)
- [Immutable classes and direct member access](#AccessMods)
- [Auxiliary constructors](#AuxiliaryConstructors)
- [Default constructor values](#DefaultConstructorValues)
- [Abstract classes](#AbsClasses)
- [The Override keyword](#Override)
- [When to use abstract classes](#WhenToUse)

<a name="Intro"><u>Introduction</u></a>

The concept of a class in scala is very similar to their counterpart in java. But there are lot of differences in the functionality they provide.
 
To start off, lets take a simple example.
 
{% highlight scala %}
 
 //Typical java style class
 class Person {
 
   var name = "Noname"
   var age = -1
 
   
   def setName (name:String)  {
      this.name = name
   }
   
   
   def setAge (age:Int) {
     this.age = age
   }
   
   def getName () : String = {
     name
   }
   
   def getAge () : Int = {
     age
   }
   
   
 
 }
 
{% endhighlight %}
 
We have two variables name and age with getters and setters which can be accessed as follows.

{% highlight scala %}

object RunExample extends App{

  val personObj = new Person

  println(personObj.getName)
  println(personObj.getAge)

}

{% endhighlight %}

 
<a name="AccessVisibility"><u>Access and visibility</u></a>

Previous example had the default access modifier. Let's look at other modifiers in detail.

To recap, java has four access modifiers.

Java access levels

<table border="1">
     <th align="left">Modifier</th>
     <th align="left">Class</th>
     <th align="left">Package</th>
     <th align="left">Subclass</th>
     <th align="left">Project</th>
     <tr><td>Public</td><td>Y</td><td>Y</td><td>Y</td><td>Y</td></tr>
     <tr><td>Protected</td><td>Y</td><td>Y</td><td>Y</td><td>N</td></tr>
     <tr><td>Default/No modifier</td><td>Y</td><td>Y</td><td>N</td><td>N</td></tr>
     <tr><td>Private</td><td>Y</td><td>N</td><td>N</td><td>N</td></tr> 
</table>

A similar representation can be drawn for scala.

<table border="1">
     <th align="left">Modifier</th>
     <th align="left">Class</th>
     <th align="left">Companion Object</th>
     <th align="left">Package</th>
     <th align="left">Subclass</th>
     <th align="left">Project</th>
     <tr><td>Default/No modifier</td><td>Y</td><td>Y</td><td>Y</td><td>Y</td><td>Y</td></tr>
     <tr><td>Protected</td><td>Y</td><td>Y</td><td>Y</td><td>N</td><td>N</td></tr>
     <tr><td>Private</td><td>Y</td><td>Y</td><td>N</td><td>N</td><td>N</td></tr>
 </table>
 
It is more or less similar to java's access modifiers, except that there are only three levels. There is no equivalent of java's default access, and the default in scala
is equal to java's public.
 
This should be enough to get going, but if you are interested in taking a more deeper look, 
[scala access modifiers](http://www.jesperdj.com/2016/01/08/scala-access-modifiers-and-qualifiers-in-detail/){:target="_blank"} is a good read.
 
The [official documentation](http://www.scala-lang.org/files/archive/spec/2.11/05-classes-and-objects.html#modifiers){:target="_blank"} can also be referred.
 
You would find that, the scala access levels are slightly better in contrast to java. 

<a name="Constructors"><u>Constructors</u></a>

Next obvious thing to understand in a class would be constructors. Unlike java, there are some unique ways to create constructors.

{% highlight scala %}

class Person (name:String,age:Int) {


  def getName () : String = {
    name
  }

  def getAge () : Int = {
    age
  }


}

{% endhighlight %}

The class implementation is similar to the original one, except that there are no setters and only getters.
 
They can be consumed as below. 

{% highlight scala %}

object RunExample extends App{

  val personObj = new Person("John",-1)

  println(personObj.getName)
  println(personObj.getAge)

} 

{% endhighlight %}

Method style parameters are given during class definition to indicate constructors.

Once a constructor is declared, we cannot create a class without providing the default parameters as specified in the constructor.

![Constructor no value](/images/constructor_error_no_value.png)

We cannot call the variables directly as they resort to `private val` by default and as per the access levels defined above, it would throw an error.
 
![Class creation error](/images/class_creation_error.png)

<a name="AccessMods"><u>Immutable classes and direct member access</u></a>

Apart from the access modifiers there are certain other ways to control access to members of a class.

<u>Immutable classes</u>
 
We can declare the variables as immutable in class constructors.
 

{% highlight scala %}
 class Person (val name:String,val age:Int) {
 
   def getName () : String = {
     name
   }
 
   def getAge () : Int = {
     age
   }
 
 }
 
{% endhighlight %}

Once the values are declared, it cannot be re-assigned again, this is the default behaviour as explored in the first part.

![Val constructors](/images/val_constructors.png)

Declaring the values during initialization and changing the assigned values after initialization are two different things. 
In this case, we have achieved something similar to immutable classes, i.e once declared their values cannot be changed. 
 
Scala has something called `case classes` which are specifically built for handling situations like immutable classes along with several other usage advantages.
We will be exploring cases classes in a future tutorial.

If we want to directly change the class variables, then we can change val to var. But that would be a bad idea from a design perspective.

<u>Direct variable access</u>

The above example also enables us to directly access the class variables, without a getter/setter.   

{% highlight scala %}

object RunExample extends App{

  val example = new Person("Test",20)

  println(example.name)
  println(example.age)


}

{% endhighlight %}


As we previously saw, the default access modifier is private val which is not visible to the programmer and there is val/var in front of the variables.
If we change it to val/var, we also change the access modifier to default access and hence it is now accessible outside the class.

Designing things like this is a bad idea, but it is something that can be done.

<a name="AuxiliaryConstructors"><u>Auxiliary constructors</u></a>

In a real world scenario we often need to have two or three constructors with different parameters.

To do this we have a special style of constructor creation called auxiliary constructors.

{% highlight scala %}
class Person (name:String,age:Int) {

  //When nothing is provided
  def this(){
    this("",-1)
  }
  
  //When name is provided, but age is not
  def this(name:String){
    this(name,-1)
  }
  
  //When age is provided, but name is not
  def this(age:Int){
    this("",age)
  }

  def getName () : String = {
    name
  }

  def getAge () : Int = {
    age
  }

}
{% endhighlight %}

The comments on the code pretty much sums up the idea. An important thing to note is that an auxiliary constructor is not an actual constructor, but acts as a wrapper
to the existing constructor.

When we wan't to add a parameter to the above person class, say a phone number, then we add it to the primary constructor i.e the class parameters.

{% highlight scala %}
class Person (name:String,age:Int,phone:String) {

  //When nothing is provided
  def this(){
    this("",-1,"")
  }

  //When name is provided, but age is not
  def this(name:String){
    this(name,-1,"")
  }

  //When age is provided, but name is not
  def this(age:Int){
    this("",age,"")
  }

  def getName () : String = {
    name
  }

  def getAge () : Int = {
    age
  }

}
{% endhighlight %}


Please note that the all of the auxiliary constructors have to now include the phone as a parameter. 
This might seem as an overhead, but it is actually good design.

<a name="DefaultConstructorValues"><u>Default constructor values</u></a>

Auxiliary constructors are good for implementing polymorphic behaviour, i.e different constructors can exhibit different flows in the class execution/functionality.

A most common bad practice is to use these to implement default variable values. Like methods, we can provide the default values during constructor 
declaration itself.

{% highlight scala %}
class Person(name:String = "Unnamed",age:Int = -1,phone:String = "No number") {


  def getName () : String = {
    name
  }

  def getAge () : Int = {
    age
  }

  def getPhone () : String ={
    phone
  }

}
{% endhighlight %}


We can then consumer this class without declaring value to one or even all of them.

{% highlight scala %}

object RunExample extends App{

  val example = new Person()

  println(example.getName())
  println(example.getAge())
  println(example.getPhone())


}

{% endhighlight %}

Listed example will work correctly and would print the default values Unnamed,-1,No number.
 
This is a pretty handy way of declaring pre-defined class values. 

<a name="AbsClasses"><u>Abstract classes</u></a>

Abstract classes in scala are similar to java, but they are superseded by a concept called `traits`. We will explore traits in a later tutorial.

Below is a simple example of an abstract class.


{% highlight scala %}


abstract class Parent(name:String = "Noname") {

  //Method with definition/return type
  def getAge

  //Method with no definition with String return type
  def getID : String

  //Explicit way of saying that no implementation is present
  def getEmail () : String {}

  //Method with its functionality implemented
  //Need not be implemented by subclasses, can be overridden if required
  def getName : String = {
    name
  }


}

{% endhighlight %}

The comments give a good idea of what the methods do. The `abstract` keyword is not necessary, when the method body is not defined it is taken to be as a abstract method.

If we extend this to another class, we need to implement the three methods `getAge`,`getID` and `getEmail`.
 
We may choose to override/not override the `getName` method since it is already implemented. 

<a name="Override"><u>The Override keyword</u></a>

In Java when we need to override a method from a parent class we need to do anything special. For clarity we can use the `@Override` annotation.

Scala has an `override` keyword which is mandatory in case of overriding a concrete method from a parent class.

![Override Error](/images/override_error.png)

This promotes better type safety and accidental overriding. 

We can add a `override` keyword in front of the method to work as expected.

![Override no error](/images/override_no_error.png)

<a name="WhenToUse"><u>When to use abstract classes</u></a>

As I said before, abstract classes were superseded by `traits`, so in what situation we need to use Abstract classes ?

This requires more knowledge of traits, but we will briefly touch upon two situations.

- When we want a base class with constructor arguments
  
  We will see in further tutorials why traits do not allow this.
  
- When we want to use the class from Java code
   
  Since traits are something specific to scala, abstract classes are better in terms of compatibility.
   
With this, I would like to bring an end to this tutorial. The next in this series would be understanding case classes, traits and why they are really cool.    

Stay tuned  <i class="fa fa-smile-o fa-lg"></i>




