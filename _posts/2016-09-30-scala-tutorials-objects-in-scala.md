---
layout: post
title: "Scala Tutorials Part #4 - Objects"
permalink: blog/scala-tutorials-part-4-objects/
tags : Scala
last_updated: 2017-01-10
---

Objects in Scala
----------------

This is part 4 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

We are going to deal with `objects` in this article.

<i class="fa fa-language fa-lg space-right"></i> : This article has been translated to chinese by 
[ChanZong Huang](http://www.linkedin.com/in/chanzong-huang-716ba261){:target="_blank"}, 
you can check it out [here](http://www.itran.cc/2017/03/01/yin-du-peng-you-shou-ba-shou-jiao-ni-xue-scala-4-dui-xiang/){:target="_blank"}

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [What are objects?](#Intro)
- [Concept of a java singleton and comparison with object in scala](#Singleton)
- [Static and OOP](#Static)
- [Companion objects](#CompanionObj)
- [Hello world revisited](#HelloWorldReVisit)
- [Deeper understanding of main methods](#DeeperMain)

<h3><b><a name = "Intro" class="inter-header">What are objects?</a></b></h3>

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

<h3><b><a name = "Singleton" class="inter-header">Concept of a singleton and comparison with object in scala</a></b></h3>

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

Since there exists only one instance, there is no concept of object creation and this is enforced by the language. Below is an example.

![Object instance error](/images/object_no_instance.png)

This is a compilation error, you can try this in your IDE and it would indicate an error as you type.

![Object instance error in IDE](/images/object_instance_ide_error.png)

But it is more than just a singleton. It encompasses several concepts from java into a single nice abstraction. 

<h3><b><a name = "Static" class="inter-header">Static and OOP</a></b></h3>

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

<h3><b><a name = "CompanionObj" class="inter-header">Companion objects</a></b></h3>

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

<h3><b><a name = "HelloWorldReVisit" class="inter-header">Hello world revisited</a></b></h3>

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

<h3><b><a name = "DeeperMain" class="inter-header">Deeper understanding of main methods</a></b></h3>

The traditional understanding in java is every program will have a entry point with a method named `main` and it is static.

Since there is no static keyword in scala, lets dig a little bit further to understand what is going on.

We know that there are two ways to create a runnable application in scala. One would be using the main method inside of an object and other would by
extending the `App` trait. Let's look at the decompiled versions of both.

<i class="fa fa-hashtag" aria-hidden="true"></i> Object extending App trait

Actual Code :

{% highlight scala %}

object RunExample extends App{

 println("Hello World !!")
  
}
{% endhighlight %}

Decompiled : 

    public final class RunExample {
      public static void main(java.lang.String[]);
        Code:
           0: getstatic     #16                 // Field RunExample$.MODULE$:LRunExample$;
           3: aload_0
           4: invokevirtual #18                 // Method RunExample$.main:([Ljava/lang/String;)V
           7: return
    
      public static void delayedInit(scala.Function0<scala.runtime.BoxedUnit>);
        Code:
           0: getstatic     #16                 // Field RunExample$.MODULE$:LRunExample$;
           3: aload_0
           4: invokevirtual #22                 // Method RunExample$.delayedInit:(Lscala/Function0;)V
           7: return
    
      public static java.lang.String[] args();
        Code:
           0: getstatic     #16                 // Field RunExample$.MODULE$:LRunExample$;
           3: invokevirtual #26                 // Method RunExample$.args:()[Ljava/lang/String;
           6: areturn
    
      public static void scala$App$_setter_$executionStart_$eq(long);
        Code:
           0: getstatic     #16                 // Field RunExample$.MODULE$:LRunExample$;
           3: lload_0
           4: invokevirtual #30                 // Method RunExample$.scala$App$_setter_$executionStart_$eq:(J)V
           7: return
    
      public static long executionStart();
        Code:
           0: getstatic     #16                 // Field RunExample$.MODULE$:LRunExample$;
           3: invokevirtual #34                 // Method RunExample$.executionStart:()J
           6: lreturn
    
      public static void delayedEndpoint$RunExample$1();
        Code:
           0: getstatic     #16                 // Field RunExample$.MODULE$:LRunExample$;
           3: invokevirtual #38                 // Method RunExample$.delayedEndpoint$RunExample$1:()V
           6: return
    }

We can see that there is a `public static void main` method created.

<i class="fa fa-hashtag" aria-hidden="true"></i> Object with main method

Actual Code : 

{% highlight scala %}

object RunExample {

  def main(args: Array[String]) = {
    println("Hello World !!")

  }

}

{% endhighlight %}

Decompiled : 

    public final class RunExample {
      public static void main(java.lang.String[]);
        Code:
           0: getstatic     #16                 // Field RunExample$.MODULE$:LRunExample$;
           3: aload_0
           4: invokevirtual #18                 // Method RunExample$.main:([Ljava/lang/String;)V
           7: return
    }

This also generates a `public static void main`, but the difference is the decompiled code is much shorter since it does not extend the App trait. We will see the reason behind that in a later tutorial once we have explored traits.

From the above examples we can conclude why both ways of creating a runnable application works in scala. But an important point to note is that both
of them have to be objects.

As explained before, objects are treated special by the compiler as a singleton with one instance. So the concepts of creating a running application
does not really apply to classes.

Let's see what happens if we try to create a scala application with class as runnable.

<i class="fa fa-hashtag" aria-hidden="true"></i> Class with main method

Actual code :

{% highlight scala %}

class RunExample {

  def main(args: Array[String]) = {
    println("Hello World !!")

  }

}

{% endhighlight %}

Decompiled :

    public class RunExample {
      public void main(java.lang.String[]);
        Code:
           0: getstatic     #16                 // Field scala/Predef$.MODULE$:Lscala/Predef$;
           3: ldc           #18                 // String Hello World !!
           5: invokevirtual #22                 // Method scala/Predef$.println:(Ljava/lang/Object;)V
           8: return
    
      public RunExample();
        Code:
           0: aload_0
           1: invokespecial #30                 // Method java/lang/Object."<init>":()V
           4: return
    }

The generated main method is not static and hence it cannot be run.

<i class="fa fa-hashtag" aria-hidden="true"></i> Class extending the App trait

Actual Code : 

{% highlight scala %}

class RunExample extends App{

    println("Hello World !!")

}

{% endhighlight %}


Decompiled : 
    
    public class RunExample implements scala.App {
      public long executionStart();
        Code:
           0: aload_0
           1: getfield      #20                 // Field executionStart:J
           4: lreturn
    
      public java.lang.String[] scala$App$$_args();
        Code:
           0: aload_0
           1: getfield      #25                 // Field scala$App$$_args:[Ljava/lang/String;
           4: areturn
    
      public void scala$App$$_args_$eq(java.lang.String[]);
        Code:
           0: aload_0
           1: aload_1
           2: putfield      #25                 // Field scala$App$$_args:[Ljava/lang/String;
           5: return
    
      public scala.collection.mutable.ListBuffer<scala.Function0<scala.runtime.BoxedUnit>> scala$App$$initCode();
        Code:
           0: aload_0
           1: getfield      #31                 // Field scala$App$$initCode:Lscala/collection/mutable/ListBuffer;
           4: areturn
    
      public void scala$App$_setter_$executionStart_$eq(long);
        Code:
           0: aload_0
           1: lload_1
           2: putfield      #20                 // Field executionStart:J
           5: return
    
      public void scala$App$_setter_$scala$App$$initCode_$eq(scala.collection.mutable.ListBuffer);
        Code:
           0: aload_0
           1: aload_1
           2: putfield      #31                 // Field scala$App$$initCode:Lscala/collection/mutable/ListBuffer;
           5: return
    
      public java.lang.String[] args();
        Code:
           0: aload_0
           1: invokestatic  #41                 // Method scala/App$class.args:(Lscala/App;)[Ljava/lang/String;
           4: areturn
    
      public void delayedInit(scala.Function0<scala.runtime.BoxedUnit>);
        Code:
           0: aload_0
           1: aload_1
           2: invokestatic  #46                 // Method scala/App$class.delayedInit:(Lscala/App;Lscala/Function0;)V
           5: return
    
      public void main(java.lang.String[]);
        Code:
           0: aload_0
           1: aload_1
           2: invokestatic  #52                 // Method scala/App$class.main:(Lscala/App;[Ljava/lang/String;)V
           5: return
    
      public final void delayedEndpoint$RunExample$1();
        Code:
           0: getstatic     #60                 // Field scala/Predef$.MODULE$:Lscala/Predef$;
           3: ldc           #62                 // String Hello World !!
           5: invokevirtual #66                 // Method scala/Predef$.println:(Ljava/lang/Object;)V
           8: return
    
      public RunExample();
        Code:
           0: aload_0
           1: invokespecial #69                 // Method java/lang/Object."<init>":()V
           4: aload_0
           5: invokestatic  #73                 // Method scala/App$class.$init$:(Lscala/App;)V
           8: aload_0
           9: new           #75                 // class RunExample$delayedInit$body
          12: dup
          13: aload_0
          14: invokespecial #78                 // Method RunExample$delayedInit$body."<init>":(LRunExample;)V
          17: invokevirtual #80                 // Method delayedInit:(Lscala/Function0;)V
          20: return
    }

While extending the trait generates the main method there is no static modifier for it. This also cannot be used to create a runnable application.

It is also clear that a object instance creation is controlled at compile time. An object at run time is still a regular class which can be seen from the above de-compiled code. The restriction at compile time enables only one instance creation during runtime which is a pretty neat way of doing things.

This should explain how the concept of static is linked to objects in scala and a runnable application entry point can only be generated with an object.

That's it for this post. In the next post, I plan to explain about classes in detail which will lead to case classes and traits. 

Stay tuned <i class="fa fa-smile-o fa-lg"></i>

