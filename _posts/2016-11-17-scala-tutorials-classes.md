---
layout: post
title: "Scala Tutorials Part #5 - Classes"
permalink: blog/scala-tutorials-part-5-classes/
tags: [Scala]
last_updated: 2016-11-22
---

Classes
-------

This is part 5 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-language fa-lg space-right"></i> : This article has been translated to chinese by 
[ChanZong Huang](http://www.linkedin.com/in/chanzong-huang-716ba261){:target="_blank"}, 
you can check it out [here](http://www.itran.cc/2017/03/05/yin-du-peng-you-shou-ba-shou-jiao-ni-xue-scala-5-lei/){:target="_blank"}

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Access and visibility](#AccessVisibility)
- [Constructors](#Constructors)
- [Class parameters and Class fields](#FieldParams)
- [Promoting class parameters](#PromotingParams)
- [Direct member access](#Direct)
- [Immutable objects and Mutable objects](#ImmutabilityAndMutability)
- [When to use Getters and Setters](#WhenToUse)
- [Scala style Getters and Setters](#ScalaStyleGetter)
- [Auxiliary constructors](#AuxiliaryConstructors)
- [Default constructor values](#DefaultConstructorValues)
- [Abstract classes](#AbsClasses)
- [The Override keyword](#Override)
- [When to use abstract classes](#WhenToUseAbs)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

The concept of a class in scala is very similar to their counterpart in java. But there are lot of differences in the functionality they provide.

To start off, let's take a simple example.

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

We have two variables `name` and `age` with getters and setters which can be accessed as follows.

{% highlight scala %}

object RunExample extends App{

  val personObj = new Person

  println(personObj.getName)
  println(personObj.getAge)

}

{% endhighlight %}

<h3><b><a name = "AccessVisibility" class="inter-header">Access and visibility</a></b></h3>

Previous example had the default access modifier. Let's look at other modifiers in detail.

To recap, java has four access modifiers.

Java access levels

<table>
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

<table>
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

<h3><b><a name = "Constructors" class="inter-header">Constructors</a></b></h3>

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

<h3><b><a name = "FieldParams" class="inter-header">Class parameters and Class fields</a></b></h3>

It is important to understand that for a class, there are two components i.e class parameters and class fields.

Class parameters are one which you mention in declaration i.e the primary constructor.

Class field are regular member variables.

The above example had getters, without those it would be impossible for another class to access the variables of that particular class.

If we take a closer look, the actual reason is more subtle than just private, the parameters have scope only to the constructor and do not live beyond that. 
This is very similar to accessing a variable that is declared inside a loop. These are class parameters and live only inside the scope of the constructor.

Class fields on the other hand can be accessed (based on their access level) outside the class.

This distinction is important and it forms the basis of the following discussions.

<h3><b><a name = "PromotingParams" class="inter-header">Promoting class parameters</a></b></h3>

The process of promoting class parameters is nothing but changing their scope for usage beyond the constructor.

This can be done in two ways. Either by affixing `val` or `var` before the variables in the constructor parameters.

{% highlight scala %}

class Person (val name:String,val age:Int) {}

{% endhighlight %}

or 

{% highlight scala %}

class Person (var name:String,var age:Int) {}

{% endhighlight %}

Even though the classes do not have a body, instances can still be created and consumed. 

<h3><b><a name = "Direct" class="inter-header">Direct member access</a></b></h3>

Changing the parameters to val/var enables us to directly access the class variables, without a getter/setter.

The above example with either val/var can be consumed as below.

{% highlight scala %}

object RunExample extends App{

  val example = new Person("Test",20)

  println(example.name)
  println(example.age)


}

{% endhighlight %}

We can access the variables directly since it is the default access level. In fact, val/var do not have anything to do with access.

Designing things like this is a bad idea, but it is something that can be done.  

This gives rise to two ways in which a class can be designed i.e mutable/immutable.

<h3><b><a name = "ImmutabilityAndMutability" class="inter-header">Immutable objects and Mutable objects</a></b></h3>

With val, we can have immutable objects.

<i class="fa fa-hashtag" aria-hidden="true"></i> Immutable objects

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

Once the values are declared, it cannot be re-assigned again, this is the default behaviour of val as explored in the first part.

![Val constructors](/images/val_constructors.png)

Scala has something called `case classes` which are specifically built for handling situations like immutable classes along with several other neat features.
We will be exploring cases classes in a future tutorial.

<i class="fa fa-hashtag" aria-hidden="true"></i> Mutable objects

{% highlight scala %}
class Person (var name:String,var age:Int) {

   def getName () : String = {
     name
   }

   def getAge () : Int = {
     age
   }

}

{% endhighlight %}

We can then declare an instance and change the name directly.

{% highlight scala %}


object RunExample extends App{

  val p = new Person("Rob",43)

  p.name = "Jacob"

  //Prints the changed name
  println(p.name)

}

{% endhighlight %}

<h3><b><a name = "WhenToUse" class="inter-header">When to use Getters and Setters</a></b></h3>

There are two key decisions to be made when designing a class.

- Whether it should be mutable/immutable (Read [objects should be immutable](http://www.yegor256.com/2014/06/09/objects-should-be-immutable.html){:target="_blank"})
- Using getters/setters vs direct variable access.

For the first point, it is basically trade offs. The linked article summarizes the advantages of immutable objects.

The second point is something to ponder over.

[Traditional wisdom](http://stackoverflow.com/questions/1568091/why-use-getters-and-setters){:target="_blank"} in java on when to use getters and setters still apply.

A simple example is to do more than just setting values to the variable, we can do several other things such as checking access, logging etc.,

But the [scala style guide](http://docs.scala-lang.org/style/naming-conventions.html#accessorsmutators){:target="_blank"} says a different story.

What is being advised is that the users of the class need not have knowledge on whether a method/class member is being accessed. They can simply choose to
change/access it with the variable name itself. This greatly simplifies code and it looks much cleaner.

The next section describes on how to create such a getter/setter with a somewhat obscure syntax.

<h3><b><a name = "ScalaStyleGetter" class="inter-header">Scala style Getters and Setters</a></b></h3>

Scala has a different way of creating getters/setters although the java style is still supported as we saw in the first example.

Lets take the below class.

{% highlight scala %}

class Person() {

  private var _age: Int = -1

  def age: Int = _age

  def age_=(value: Int) = {
    _age = value
  }


}

{% endhighlight %}

This can be consumed as below.

{% highlight scala %}

object RunExample extends App{

  val p = new Person

  p.age = 20

  println(p.age)

}

{% endhighlight %}

Parameter `age` is actually a method inside the class Person, however the user can access this as if it was a variable.

The syntax might look bizarre, but understanding where they fit in will give a more clear picture. Lets take it apart piece by piece. 

`age` is actually `_age` behind the scenes. The getter is pretty clear, just return the `_age` variable. 
The setter is little more confusing. First the method name is `def age_=`, the underscore is a special character which enables a space in calling the method.
This enables us to call the method like `age =`. 

Notice that the method name, underscore and the equal sign should be together without any space.
Everything else should make sense already i.e it takes in a parameter `value` and assigns it to the `_age` variable.

This definition should be enough to get your head around it, but the underscore character has more to it and there is something called the 
[uniform access principle](https://en.wikipedia.org/wiki/Uniform_access_principle){:target="_blank"}. We will explore that in later dedicated tutorial.

Scala plugin in Intellij can do all the [code generation](https://www.jetbrains.com/help/idea/2016.2/generating-getters-and-setters.html){:target="_blank"} for you.
 
Getters and setters in general are viewed as second class citizens since scala encourages immutable objects.  

<h3><b><a name = "AuxiliaryConstructors" class="inter-header">Auxiliary constructors</a></b></h3>

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

When we want to add a parameter to the above person class, say a phone number, then we add it to the primary constructor i.e the class parameters.

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

<h3><b><a name = "DefaultConstructorValues" class="inter-header">Default constructor values</a></b></h3>

Auxiliary constructors are good for implementing polymorphic behaviour, i.e different constructors can exhibit different flows in the class execution/functionality.

A most common bad practice is to use these to implement default variable values. 

Like methods, we can provide the default values during constructor declaration itself.

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

<h3><b><a name = "AbsClasses" class="inter-header">Abstract classes</a></b></h3>

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

<h3><b><a name = "Override" class="inter-header">The Override keyword</a></b></h3>

In Java when we need to override a method from a parent class we need to do anything special. For clarity we can use the `@Override` annotation.

Scala has an `override` keyword which is mandatory in case of overriding a concrete method from a parent class.

![Override Error](/images/override_error.png)

This promotes better type safety and accidental overriding.

We can add a `override` keyword in front of the method to work as expected.

![Override no error](/images/override_no_error.png)

<h3><b><a name = "WhenToUseAbs" class="inter-header">When to use abstract classes</a></b></h3>

As I said before, abstract classes were superseded by `traits`, so in what situation we need to use Abstract classes ?

This requires more knowledge of traits, but we will briefly touch upon two situations.

- When we want a base class with constructor arguments

  We will see in further tutorials why traits do not allow this.

- When we want to use the class from Java code

  Since traits are something specific to scala, abstract classes are better in terms of compatibility.

With this, I would like to bring an end to this tutorial. The next in this series would be understanding case classes, traits and why they are really cool.

Stay tuned  <i class="fa fa-smile-o fa-lg"></i>
