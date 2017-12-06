---
layout: post
title: "Scala Tutorials Part #8 - Traits"
permalink: blog/scala-tutorials-part-8-traits/
tags: [Scala]
---


Traits
------

This is part 8 of the scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.

<i class="fa fa-language fa-lg space-right"></i> : This article has been translated to chinese by 
[ChanZong Huang](http://www.linkedin.com/in/chanzong-huang-716ba261){:target="_blank"}, 
you can check it out [here](https://www.itran.cc/2017/03/14/yin-du-peng-you-shou-ba-shou-jiao-ni-xue-scala-8-te-zhi-2/){:target="_blank"}

<i class="fa fa-list-ul space-right"></i> Index

- [Introduction to traits](#Intro)
- [A basic trait - Syntax explanation](#TraitSyntax)
- [Concept of abstract variables in java](#JavaAbsVariables)
- [Type annotations for abstract variables](#TypeAnnotations)
- [Mixing abstract and concrete members](#AbsConcrete)
- [Java syntax differences](#JavaSyntaxDifference)
- [Extending traits](#ExtendingTraits)
- [The with keyword](#WithKeyword)
- [Mixin class composition](#Mixin)
- [Conclusion](#Conclusion)


<h3><b><a name = "Intro" class="inter-header">Introduction to traits</a></b></h3>

Traits are a new concept to scala just like case classes are. They complement to the already existing features in OOP.

A better way to understand traits is comparing it with java's language features.

They are kind of similar to interfaces, but they can have implementations of methods, which works like abstract classes except that 
traits do not have constructors.

Best way to understand them is via examples. So let's get our hands dirty.

<h3><b><a name = "TraitSyntax" class="inter-header">A basic trait - Syntax explanation</a></b></h3>

Declaring a trait begins with the `trait` keyword and then the trait name, followed by the body/content of the trait.

{% highlight scala %}

trait Book {

  val id : Int
  val name : String
  val isbn : Long

}

{% endhighlight %}


<h3><b><a name = "JavaAbsVariables" class="inter-header">Concept of abstract variables in java</a></b></h3>

If you are coming from a java background, then the above example might confuse you. In java, there is no such thing as abstract variable in java.


Only methods and classes can be abstract in java, variables cannot.

![Abstract variable error in java](/images/abstract_variables_error_java.png)


And since we do not have abstract variables, we also cannot override variables.

![Field override error](/images/field_override_error_java.png)

The reason why scala is different in this aspect i.e why it has abstract variables has to do with two functional programming concepts. 
One is [uniform access principle](https://en.wikipedia.org/wiki/Uniform_access_principle){:target="_blank"}  
which we saw earlier in classes and another is [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency){:target="_blank"}.

As these concepts are complex they require additional posts of their own, we will explore them later.

Since scala strives to see methods and values as the same using uniform access principle i.e everything is a value type we have abstract variables as well.

<h3><b><a name = "TypeAnnotations" class="inter-header">Type annotations for abstract variables</a></b></h3>

Abstract variables should have their [types annotated](/blog/scala-tutorials-part-1-getting-started/#TypeAnnotations) regardless of whether they are in traits or in abstract classes. 
I should have explained this concept when I was explaining scala classes but since traits also use them I thought I will explain it here.

If we do not mention the type, then we get an error as below.

![Abstract variables without types](/images/abstract_variables_without_types.png)

Remember that scala has [local type inference](/blog/scala-tutorials-part-2-type-inference-in-scala#LocalvsGlobal), so we need to annotate the types explicitly.

For methods the scenario is slightly different. We can declare a method such as below.


{% highlight scala %}

trait Book {

  def noExplicitTypeAnnotation

}

{% endhighlight %}

It is a valid syntax and compiles without error. 

There are subtle differences to note here. `def noExplicitTypeAnnotation` is the same as `def noExplicitTypeAnnotation() : Unit`. The type `Unit` is equivalent of `void` in java. It indicates the absence of an element in the literal void sense. This is not to be confused with other types that exist in scala such as `Nothing` and `Null` which I will cover later.

The `Unit` type makes no sense when applied to variables and hence the compiler does infer to that type as it does for methods.

We can however assign `Unit` as a type to a variable.

{% highlight scala %}
 
  val id : Unit = Unit

  println(id)

{% endhighlight %}

It would print `()` but it doesn't make sense to annotate a variable with a `Unit` type.

<h3><b><a name = "AbsConcrete" class="inter-header">Mixing abstract and concrete members</a></b></h3>

So far we have seen only abstract variables. In reality we would use a mixture of abstract variables,methods and/or concrete variables/methods.

Let's take an example.


{% highlight scala %}

trait Book {

    val id : Int
    val name : String
    val isbn : Long
    val price : Double
    //Concrete variable
    val category = "Uncategorized"
  
   //Concrete implementation  
   def getTaxOnPrice : Double = {
     (price * 14)/100
   }

}

{% endhighlight %}


As we saw in the methods tutorial, if we omit the part after the `=` then it becomes an abstract method.

Notice that type inference works for concrete variables since it is known at compile time and type annotation is optional.

<h3><b><a name = "JavaSyntaxDifference" class="inter-header">Java syntax differences</a></b></h3>

In java, we have interfaces and abstract classes and we extend abstract classes/classes and implement interfaces.

{% highlight java %}

public class Child extends Root implements Interface1,Interface2 {
}

{% endhighlight %}

Scala does not have both interface and the implements keyword.

![No implements error](/images/implements_error.png)

![Interface error](/images/interface_error.png)

There are subtle differences in syntax and there is also a new keyword called `with` which we will explore below.

<h3><b><a name = "ExtendingTraits" class="inter-header">Extending traits</a></b></h3>

Similar to java, scala has the `extends` keyword which can be used for extending classes and traits.

Traits can be extended by other traits,abstract classes,concrete classes and case classes as well.

<i class="fa fa-hashtag" aria-hidden="true"></i> Traits extending traits

Since traits cannot be instantiated, it is not necessary that the abstract members have to implemented.

{% highlight scala %}

trait ScienceBook extends Book{
  
}

{% endhighlight %}

But if we need to implement any of the concrete members, we need the override modifier.

![Trait override error](/images/override_error_trait.png)

A correct version of the above would be.

{% highlight scala %}

trait ScienceBook extends Book{

  override val category: String = "Science Book"

}

{% endhighlight %}

<i class="fa fa-hashtag" aria-hidden="true"></i> Abstract classes extending traits

Abstract classes can also extend traits.

The same principles which apply to traits extending traits are also applicable here.

{% highlight scala %}

abstract class ScienceBook extends Book{

  override val category: String = "Science Book"

}

{% endhighlight %}

<i class="fa fa-hashtag" aria-hidden="true"></i> Classes extending traits

Since classes are concrete i.e instances can be created, the abstract members of the trait should be implemented.

![Abstract members impl](/images/class_abs_members_error.png)

A correctly implemented version of the class would be as follows.

{% highlight scala %}

class ScienceBook extends Book{

  override val id: Int = 1000
  override val name: String = "A Brief History of Time"
  override val isbn: Long = 9783499605550l
  override val price: Double = 7.43
  
}

{% endhighlight %}

We did not implement the `getTaxOnPrice` method and the variable `category` variable which is fine since they are concrete members. The type annotations are of course
optional, they were present in my code example since Intellij auto-generated them.
  
If we need to change the logic we can of course override their implementation.

{% highlight scala %}

class ScienceBook extends Book{

  override val id: Int = 1000
  override val name: String = "A Brief History of Time"
  override val isbn: Long = 9783499605550l
  override val price: Double = 7.43

  override val category: String = "Science book"

  override def getTaxOnPrice : Double = {
    (price * 10)/100
  }
  
}

{% endhighlight %}


Since case class inheritance is a complex topic, I will be explaining that in a dedicated tutorial.

<h3><b><a name = "WithKeyword" class="inter-header">The with keyword</a></b></h3>

Since there is no concept of interfaces and implements keyword in scala, how would you go about extending a trait and then a class
at the same time?

In java you would typically do it like

{% highlight java %}
public class Root extends Ex1 implements Intef1,Intef2 {
}

{% endhighlight %}

Scala has a new keyword for it.

Let's consider another abstract class called `Product`

{% highlight scala %}

abstract class Product {

  val prodID : Int
  val skuID : Int


}

{% endhighlight %}


Now since a book is a product we can combine the logic.

{% highlight scala %}

class ScienceBook extends Product with Book{

  override val id: Int = 1000
  override val name: String = "A Brief History of Time"
  override val isbn: Long = 9783499605550l
  override val price: Double = 7.43

  override val category: String = "Science book"

  override def getTaxOnPrice : Double = {
    (price * 10)/100
  }

 //Members of product abstract class
  override val prodID: Int = 20001504
  override val skuID: Int = 4574555
}

{% endhighlight %}

<h3><b><a name = "Mixin" class="inter-header">Mixin class composition</a></b></h3>

Now imagine that there are situations where we need not extend `Product` class and situations where we also need to extend.

This is impossible to solve with the OOP concepts that exist in java since we need to declare what the `ScienceBook` class extends beforehand.

Scala has something called mixins which can enable to do a mix of class compositions where we can choose to extend the `Product` features without modifying
its original class hierarchy.

To demonstrate, we need to make a simple change to our abstract class `Product` and change it to a trait.

{% highlight scala %}

trait Product {

  val prodID : Int
  val skuID : Int
  
}

{% endhighlight %}


Next during instance declaration we can now extend the product trait with a different syntax as below.

{% highlight scala %}

  //Extension with mixin
  val scBook = new ScienceBook() with Product {
    override val prodID: Int = 1000
    override val skuID: Int = 2000
  }
  
  //Original class instance
  val scBookWithoutProduct = new ScienceBook()

{% endhighlight %}

Since we are creating an actual instance we need to override the abstract variables.

The original `ScienceBook` class however remains intact in its logic i.e it need not extend the `Product` trait. Now we have a the functionality of the Book,ScienceBook,Product 
classes and traits in a pretty neatly laid out way.

The [scala doc article](http://docs.scala-lang.org/tutorials/tour/mixin-class-composition.html){:target="_blank"} on understanding these mixins is also good.

<h3><b><a name = "Conclusion" class="inter-header">Conclusion</a></b></h3>

Traits are more related to abstract classes than to interfaces. Main difference being traits do not have a constructor.
Whenever you need to have a constructor for your OOP logic, then an abstract class will suit better, for all else traits are much better.

There are much more complex topics that traits open up, two in particular that I will cover in later tutorials are

1) Trait linearization - Since traits allow definitions and we can extend multiple traits how is the old problem of multiple inheritance handled?

2) Sealed traits - The sealed keyword says that classes in other files cannot extend the trait, but there is much more to this.

This brings an end to this article. I have covered the introductory and easier topics in this post and plan to cover advanced topics one at a time in later articles. 

Stay tuned  <i class="fa fa-smile-o fa-lg"></i>



