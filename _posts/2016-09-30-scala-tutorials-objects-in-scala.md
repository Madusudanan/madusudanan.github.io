---
layout: post
title: "Scala Tutorials Part #4 - Objects"
permalink: blog/scala-tutorials-part-4-objects/
tags : Scala
---

Objects in Scala
----------------

This is part 4 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

We are going to deal with `objects` in this article.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [What are objects?](#Intro)
- [Concept of a java singleton and comparison with object in scala](#Singleton)
- [Static and OOP](#Static)
- [Companion objects](#CompanionObj)
- [Hello world revisited](#HelloWorldReVisit)

<a name="Intro"><u>What are objects?</u></a>

In scala, `object` is a keyword, we saw that in the [first](/blog/scala-tutorials-part-1-getting-started/) part of this tutorial series. 

Let's take a look at the hello world program again to retrospect.

{% highlight scala %}
object Test {
    def main(args : Array[String]){
      println("Hello world")
    }
  }
{% endhighlight %}

This is similar to a java hello world example, except for the fact that the main method is not inside a `class` but inside of an `object`. This might be confusing, since in the
object oriented world an `object` means an instance of a `class`.

In scala, the word/keyword `object` means two things.

1) Instance of a class as in java

2) A keyword that depicts a singleton `object` i.e instance. But very different.

<a name="Singleton"><u>Concept of a singleton and comparison with object in scala</u></a>

Most of you would have heard about/used the `Singleton` design pattern. But here is an example just for completeness sake.

{% highlight java %}

public class DatabaseConnectionSingleton {

    private DatabaseConnectionSingleton dbInstance;
    
    private DatabaseConnectionSingleton(){
        
    }
    
    
    public DatabaseConnectionSingleton getInstance(){
        
        if(dbInstance == null){
            dbInstance = new DatabaseConnectionSingleton();
            return dbInstance;
        }
        
        else
            return dbInstance;
        
    }

}

{% endhighlight %}

The idea is pretty simple, if there is an instance already created, then return it, else create a new one and then return it.

We use singleton when we want only a single instance of a class present at any point of time in our application. However, the above approach is not [thread safe](http://rcardin.github.io/design/programming/2015/07/03/the-good-the-bad-and-the-singleton.html){:target="_blank"}.

There are approaches to make it thread safe, but we are not going to go into it. The example is just to illustrate the concept of a singleton rather than implementation issues.

A scala `object` is similar, except the fact that the singleton instance is taken care by the language/compiler itself rather than making the programmer explicitly do it.

We cannot create an instance of an object, there exists only one instance, and this is enforced by the language. Below is an example.

![Object instance error](/images/object_no_instance.png)

This is a compilation error, you can try this in your IDE and it would indicate an error as you type.

![Object instance error in IDE](/images/object_instance_ide_error.png)

But it is more than just a singleton. It encompasses several concepts from java into a single nice abstraction. 

<a name="Static"><u>Static and OOP</u></a>

The above examples directly accessed the method inside of the object without the `new` keyword, this is similar to what we do in `static` in java.

If you think about it, `static` in java is like mixing two things into a single concept that don't fit really well.

Below is a very simple example demonstrating why is it so.

Simple, parent class in java with a static method.

{% highlight java %}

public class Parent {

    public static void main(String[] args) {
        printHelloMsg();
    }

    public static void printHelloMsg() {
        System.out.println("Hello there !!!!");
    }

}

{% endhighlight %}

A class that inherits the parent.

{% highlight java %}
public class Child extends Parent {

    public static void main(String[] args) {
        Child t = new Child();
        t.printHelloMsg();
    }


    //Override throws an error
    @Override
    public static void printHelloMsg(){
        System.out.println("Just a test");
    }

}
{% endhighlight %}

The override throws an error. 

![Java static override error](/images/java_static_override_error.png)

What we can understand from the above naive example, is that `static` does not play well with Object oriented programming. The very purpose of inheriting a parent class is to inherit all of its functionality and then it is left to the implementation class on whether to go ahead with the default behaviour or to change it.

But again, there is no point in creating unnecessary instances of the parent class just for the sake of the functionality provided by the `printHelloMsg` method in this case.

What we really need is a singleton object i.e exactly one instance, but as we saw in the previous topic, singletons are bad at concurrency/multi-threading.

Scala does not have the `static` keyword as part of the language at all, but has something that is specific for this use case, which are called companion objects.

<a name="CompanionObj"><u>Companion objects</u></a>

We are slightly getting ahead here as I have not explained classes, but they are pretty much similar to their java counterparts.

Lets take the below class for example.

{% highlight scala %}

class Person {

  var name = "noname"

  //Instance method
  def getPersonName: String = {
      name
  }

}

object Person{

  //Static method
  def isNameSet(p:Person) : Boolean = {
    if(p.name == "noname") false else true
  }


}

{% endhighlight %}

It has a `class` named Person and also an `object` named Person. As explained in the comments, we have a instance method which returns the name of the person and a static method which tells if the name is set for a Person object or not. This could have been part of the class itself, but for simplicity's sake lets assume that it is a static utility method.

You would call the methods as below.


{% highlight scala %}

object Main extends App {

  val p = new Person()

  //Calling instance method.
  println(p.getPersonName)

  //Calling static method
  println(Person.isNameSet(p))


}
{% endhighlight %}

A java equivalent would be very similar.    

{% highlight java %}

public class Person {

    public String name = "noname";


    public String getPersonName() {
        return name;
    }
    
    public static boolean isNameSet(Person p){
        if(p.name() == "noname"){
            return false;
        }
        else{
            return true;
        }
    }
    
}

{% endhighlight %}

We are achieving the same functionality in scala, but the main difference is the code/design is much more elegant. 

Keep in mind that both the class as well as its companion object should be in the same file, otherwise there would a compilation error. In reality this makes it easier to manage the class and the associated companion object.

Now we have a compact model, which is a singleton instance and fits in well with OOP. If we want something to be object oriented i.e instance based, then we can put it inside the original class or else putting it inside an object makes much more sense.

<a name="HelloWorldReVisit"><u>Hello world revisited</u></a>

In scala, there are two ways that we can create an entry point for our application. Recall how we did the first hello world in part 1.

{% highlight scala %}
object Test {
  def main(args : Array[String]){
    println("Hello world")
  }
}
{% endhighlight %}

This is very similar to a java main method except that it is inside of an `Object`.

{% highlight java %}
public class Test {
    public static void main(String[] args) {
        System.out.println("Hello world");
    }
}
{% endhighlight %}

A subtle difference is our main method in java is declared as static. As explained earlier, everything inside an object is the static scala equivalent and hence the `def main` works similar to the java equivalent.

There is another way in which we can make an object executable and that is via a `trait`.

A trait in scala is similar to interfaces in java, but there are many differences. We will explore traits later in the series.

{% highlight scala %}
object Test extends App{
  println("Hello world!!")
}
{% endhighlight %}

Here we are extending a trait called `App`. In fact we can look at the source code of the App trait and learn many things.

A notable excerpt from the comments is "The App trait can be used to quickly turn objects into executable programs". 

It does so via inheriting the main method of the trait App.scala.

That's it for this post. In the next post, I plan to explain about classes in detail which will lead to case classes and traits. 

Stay tuned <i class="fa fa-smile-o fa-lg"></i>

