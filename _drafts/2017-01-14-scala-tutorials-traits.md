---
layout: post
title: "Scala Tutorials Part #8 - Traits"
permalink: blog/scala-tutorials-part-8-traits/
tags: [Scala]
---


Traits
------

This is part 8 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul space-right"></i> Index

- [Introduction to traits](#Intro)
- [A basic trait - Syntax explanation](#TraitSyntax)
- [Concept of abstract variables in java](#JavaAbsVariables)
- [Type annotations for abstract variables](#TypeAnnotations)
- [Mixing abstract and concrete members](#AbsConcrete)

<a name = "Intro"><u>Introduction to traits</u></a>

Traits are a new concept to scala just like case classes are. They complement to the already existing features in OOP.

A better way to understand traits is comparing it with java's language features.

They are kind of similar to interfaces, but they can have implementations of methods, which works like abstract classes except that 
traits do not have constructors.

Best way to understand them is via examples. So let's get our hands dirty.

<a name = "TraitSyntax"><u>A basic trait - Syntax explanation</u></a>

Declaring a trait begins with the `trait` keyword and then the trait name, followed by the body/content of the trait.

{% highlight scala %}

trait Book {

  val id : Int
  val name : String
  val isbn : Long

}

{% endhighlight %}


<a name = "JavaAbsVariables"><u>Concept of abstract variables in java</u></a>

If you are coming from a java background, then the above example might confuse you. In java, there is no such thing as abstract variable in java.


Only methods and classes can be abstract in java, variables cannot.

![Abstract variable error in java](/images/abstract_variables_error_java.png)


And since we do not have abstract variables, we also cannot override variables.

![Field override error](/images/field_override_error_java.png)

The reason why scala is different in this aspect i.e why it has abstract variables has to do with two functional programming concepts. One is [uniform access principle](https://en.wikipedia.org/wiki/Uniform_access_principle){:target="_blank"}  which we saw earlier in classes and another is [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency){:target="_blank"}.

As these concepts are complex they require additional posts of their own, we will explore them later.

Since scala strives to see methods and values as the same using uniform access principle i.e everything is a value type we also have abstract variables as well.

<a name = "TypeAnnotations"><u>Type annotations for abstract variables</u></a>

Abstract variables should have their [types annotated](/blog/scala-tutorials-part-1-getting-started/#TypeAnnotations) regardless of whether they are in traits or in abstract classes. I should have explained this concept in the classes article itself but since traits also use them I thought I will explain it here.

If we do not mention the type, then we get an error as below.

---

Put error screenshot of below code

trait Book {

  val id
  val name
  val isbn

}

---

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

object RunExample extends App  {
  
  val id : Unit = Unit

  println(id)

} 

{% endhighlight %}

It would print `()` but it doesn't make sense to annotate a variable with a `Unit` type.

<a name = "AbsConcrete"><u>Mixing abstract and concrete members</u></a>

So far we have seen only abstract variables. In reality we would use a mixture of abstract variables,methods and/or concrete variables/methods.

Let's take an example.





