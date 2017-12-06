---
layout: post
title: "Scala Tutorials Part #3 - Methods"
permalink: blog/scala-tutorials-part-3-methods/
tags : Scala
last_updated: 2017-01-10
---

Methods in scala
----------------

It has been a long time since I wrote the last article on scala which was back in December 2015. 
Hopefully I should be writing more  <i class="fa fa-smile-o fa-lg"></i> 

This is part 3 of the scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.

This entire post is about dealing with methods in scala. 
Most of them are about style, but very important to know as we get into the world of functional programming.

<i class="fa fa-language fa-lg space-right"></i> : This article has been translated to chinese by 
[ChanZong Huang](http://www.linkedin.com/in/chanzong-huang-716ba261){:target="_blank"}, 
you can check it out [here](http://www.itran.cc/2017/02/23/yin-du-peng-you-shou-ba-shou-jiao-ni-xue-scala-3-fang-fa-2/){:target="_blank"}

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Primer](#Primer)
- [Syntax of methods](#Syntax)
- [The Unit type](#Unit)
- [Immutable method parameters](#MethodParameters)
- [Note on the return keyword](#Return)
- [Heterogeneous return types](#Heterogeneous)
- [Call by name vs Call by value](#CallByNamevsValue)
- [Default values for method parameters](#DefaultValues)
- [Stubbing out methods](#Stubbing)

<h3><b><a name = "Primer" class="inter-header">Primer</a></b></h3>

Back in the days of assembly programming, there was something called [sub-routines](https://en.wikipedia.org/wiki/Subroutine){:target="_blank"} 

The same ideas evolved to what methods are today. A simple way to organize programs into little chunks of code that do something unique.

Sub-routines, Procedures , Functions, Methods may or may not mean the same thing and it is really hard to give a generalized difference since has different meanings depending upon the programming language under consideration.

In scala, we care only about Functions and Methods.

<h3><b><a name = "Syntax" class="inter-header">Syntax of methods</a></b></h3>

There are several ways of declaring and using methods. Below are examples just to get familiar with the syntactic sugar.

- [Method which takes two parameters and returns a value](#Method1)
- [Method without curly braces](#Method2)
- [Method which does not take any parameters](#Method3)
- [Method with no return type, parameters](#Method4)
- [Method with return type not mentioned](#Method5)

<i class="fa fa-hashtag" aria-hidden="true"></i> <a name="Method1" class="inter-header">Method which takes two parameters and returns a value</a>

{% highlight scala %}
def max(x:Int, y:Int) : Int = {
	if (x>y) x else y
}
{% endhighlight %}

Above is a simple method that takes in two variables x,y and returns the bigger variable among the two.

All methods start with the `def` keyword, followed by the method name. Then comes the optional parameters and return type.

How do x and y get returned ? Hold on to that question , we will get there.

<i class="fa fa-hashtag" aria-hidden="true"></i> <a name="Method2" class="inter-header">Method without curly braces</a>

Similar to java, method declarations come within the curly braces, but this is optional.

{% highlight scala %}
def max(x:Int, y:Int):Int= if (x>y) x else y
{% endhighlight %}

This is purely for simplicity's sake, when the method is smaller then we can ignore the braces. But when it gets big, it is better to put inside a curly brace code block.

<i class="fa fa-hashtag" aria-hidden="true"></i> <a name="Method3" class="inter-header">Method which does not take any parameters</a>

As mentioned before, method parameters can be optional.

{% highlight scala%}
def getValueOfPi: Double = 3.14159
{% endhighlight %}

Note that I have omitted the circular braces for readablity. It can also be empty as below.

{% highlight scala%}
def getValueOfPi (): Double = 3.14159
{% endhighlight %}

<i class="fa fa-hashtag" aria-hidden="true"></i> <a name="Method4" class="inter-header">Method with no return type, parameters</a>

Prints a hello world message to the console.

{% highlight scala %}
def printHelloMsg = println("Hello there !!!!")
{% endhighlight %}

An important point about declaring in this way is the calling code cannot use something like `printHelloMsg()`, it can only call by using `printHelloMsg` i.e without the circular brace. 

When calling it with the circular brace, it means that we are passing in a empty parameter rather than no parameter.

This is called a 0-arity method which is explained in the [method invocation docs](http://docs.scala-lang.org/style/method-invocation.html){:target="_blank"}

<i class="fa fa-hashtag" aria-hidden="true"></i> <a name="Method5" class="inter-header">Method with return type not mentioned</a>

{% highlight scala %}
def greetPerson(msg :String) = "Hello " + msg + "!!!"
{% endhighlight %}

This returns "Hello" concatenated with whatever string that you passed in.

In all of the examples, wherever type information is required, scala uses [type inference](/blog/scala-tutorials-part-2-type-inference-in-scala/).

One thing to note is that if we omit the `=` symbol, the compiler treats it as a `Unit` type method even if we return something from that method.

For example,

{% highlight scala %}

def whichIsGreater (a : Int , b: Int)  {

    if(a>b) a else b

}

{% endhighlight %}

![Method with no equals](/images/no_return.png)

In functional programming terms a method which does not return any value i.e which returns `Unit` are called procedures. These are methods which have no side effects and 
are independent of state.

Summarizing the above in a picture.

![Scala methods](/images/scala_methods.png)

<h3><a name="Unit" class="inter-header">The Unit type</a></h3>

If we run the below example in the scala REPL, 

{% highlight scala %}
def printHelloMsg = println("Hello there !!!!")
{% endhighlight %}

We can see that the method type is of Unit.

An equivalent example of the above method in java would be something like below.

{% highlight java %}
void printHelloMsg() {
	System.out.println("Hello there !!!!");
}
{% endhighlight %}

This should gives us an idea about the Unit type. But is it actually equivalent to void?

They are similar, but not the same. `Unit` is actually a [class](http://www.scala-lang.org/api/2.12.0/scala/Unit.html){:target="_blank"} in the type system hierarchy in scala. Below example should illustrate why this difference is important.

{% highlight scala %}
def someMethod(): Unit = {
    return 200
 }
{% endhighlight %}

If we call this method, nothing gets printed/returned. 

{% highlight scala %}
 val t = someMethod()
 println(t)
{% endhighlight %}

The compiler will throw a warning such as below.

<cite> warning: enclosing method someMethod has result type Unit: return value discarded </cite>

Assigning the return type to a variable will give an output as `()`. Can be understood from the [runtime boxed unit](https://github.com/scala/scala/blob/05016d9035ab9b1c866bd9f12fdd0491f1ea0cbb/src/library/scala/runtime/BoxedUnit.java#L34){:target="_blank"} which is called from [Unit.scala unboxing](https://github.com/scala/scala/blob/v2.12.0/src/library/scala/Unit.scala#L46){:target="_blank"}. This is nothing but a `toString` representation of the type `Unit`.

<h3><a name="MethodParameters" class="inter-header">Immutable method parameters</a></h3>

By default method parameters that are passed into methods are immutable and cannot be changed. The below image shows an example.

![Immutable method parameters](/images/immutable_method_param.png)

Remember that scala embraces immutability more than java. The equivalent java method would be something like

{% highlight java %}
public void calculateInterest(final int interestAmount){
        interestAmount = interestAmount % 10;
}
{% endhighlight %}

Re-writing it to not change the method parameters is pretty straighforward, but the reason why it is designed such a way is again because of functional programming and getting rid of mutable state and favoring [immutable objects](http://www.yegor256.com/2014/06/09/objects-should-be-immutable.html){:target="_blank"}.

We will learn more about immutability once we start to explore the functional programming side of scala.

<h3><a name="Return" class="inter-header">Note on the return keyword</a></h3>

The scala compiler is built in a way to take the last statement and return it in the absence of a return statement. 

But, in situations where the last statement is not intended to be the output of the method, then the results could be different from what we might expect.

{% highlight scala %}
def whichIsGreater (a : Int , b: Int)  = {

    if (a>b) a else b

    //This was intentional
    "Some String"

}
{% endhighlight %}

We can call this method with whatever integer parameters, it would return `Some String`. Remember that scala has limited type inference and in this particular situation this is the best it can come up with.

If you are using an IDE, you can see a warning on hovering over these variables.

![Type warning](/images/type_warning_methods.png)

Which expands to "<cite>Highlights expression if it has no side effects and does not affect on any variable value or function return. It may be either removed or converted to a return statement
</cite>"

This tells us that the statements have no effect since we have a string variable declared below.

If we use the same code, now with the return keyword, the compiler promptly complains.

![Method return error](/images/return_error_methods.png)

The reason for this error is because, we are immediately cutting down the flow of execution and then returning from that point. 
If the we were to infer the type, it would involve traversing the entire call stack, so the compiler resorts to a safer way of making the programmer explicitly mention the return type.

Here is one more example.

{% highlight scala %}
  def whichIsGreater (a : Int , b: Int)  = {

    if (a>b) a

  }
{% endhighlight %}

This would return `a` if it is greater than `b`, else it would return the `Unit` type deduced at compile time. 
Notice that the method return type is `AnyVal`, since the `else` part is `Unit` and the `if` part is an `Int`, it promotes to the next available type available in the hierarchy.

We can infer the following points from our analysis.

- Sub-typing is used to promote types up the order.
- If you use the `return` keyword, you must mention type compulsorily.
- The last statement will be used for the return type, if you give a wrong type, then the compiler will not be able to identify it.
- All type errors are in compile time, hence full type safety is ensured.
- Types of method parameters should always be mentioned. Since scala uses local type inference, it will not be able to deduce them at compile time. 

> When doing pure functional programming you would not use the return keyword at all.
 
Avoiding the return keyword might seem bizarre at first, but will sink in once we learn more about functional programming.
  
<h3><a name="Heterogeneous" class="inter-header">Heterogeneous return types</a></h3>

Sub-typing enables us to do a lot of things. One of them is mixing up types in heterogeneous way.

Consider the below example.

{% highlight scala %}
def whichIsGreater (a : Int , b: Int)  = {

    if (a>b) a else "a is lesser"

}
{% endhighlight %}


The type qualifies to the `Any` type, which is at the top level. If you are a Java programmer then you would quickly use `instanceof` to guess the type.

Using `instanceof` is an anti-pattern and considered bad programming practice. In scala you would use the [Either](http://www.scala-lang.org/api/rc2/scala/Either.html){:target="_blank"} type. But that is a topic
of another blog post.

<h3><a name="CallByNamevsValue" class="inter-header">Call by name vs Call by value</a></h3>

When you are calling methods, it is imperative to understand how the compiler treats it. In scala, there are two ways a method can treat its parameters.

- Call by value
- Call by name

Call by value is the regular execution strategy where the value is reduced before it is evaluated, where as in Call by name the expression is not evaluated 
until it is used somewhere in the code.

{% highlight scala %}

def multiply(x : Int, y: Int) : Int ={
    x * x
}

{% endhighlight %}

If we call the method by `multiply(6 + 4,3)`, below is what happens.

Note : The values inside the method name depict the computations and not calls to the actual method.

Call by value -> multiply(10,3) -> multiply(10 * 10) -> 100   
Call by name -> multiply(6+4,3) -> multiply(10,3) -> multiply(10 * 10) -> 100 

In call by name, the expression `6+4` is evaluated only after it enters the call stack, whereas in call by value it is evaluated beforehand.
 
Alternatively, if we call using  `multiply(10,4+3)`

Call by value -> multiply(10,7) -> multiply(10 * 10) -> 100    
Call by name -> multiply(10*10) -> 100 

Call by name is shorter in this case, since the second variable is not evaluated at all as it is not necessary. 

We can see that both strategies yield the same result.

Scala uses Call by value strategy by default because in a general use case it is better than its counterpart, but also supports Call by name if forced.

Below is a real world example.

{% highlight scala %}

  println(callByValue(2 + 2))
  println(callByName(2 + 2))


  def callByValue(value: Int): Int = {
    value + 1

  }


  def callByName(value: => Int): Int = {
    value + 1
  }
  
{% endhighlight %}

The `=>` is used to depict that the variable should be called by name.

If we debug the values using intellij, then we can see that callByValue has the variable `value` computed to 4 already.

![Call by value](/images/debug_call_by_value.png)

But whereas in callByName it is not.

![Call by name](/images/debug_call_by_name.png)

Both the examples lead to the same result if executed, the difference is in the way the parameters are called.

The example makes it even more clearer on when the value is evaluated.

Ok, but in what situations we need to call by name and where do we need to call by value ? 

That question requires further understanding of functional programming which will be dealt with in the following posts. Usually you would call by value, but there are situations where call by name would be a better choice.

<h3><a name="DefaultValues" class="inter-header">Default values for method parameters</a></h3>

When declaring methods, we can also specify the default value of the parameters in case the caller does not provide any.

{% highlight scala %}

  def isAllowedURl(url: String = "default"): String = {
      if(url.equals("default"))
        "No URL provided"
      else
        "Access allowed"
  }
  
{% endhighlight %}

This can be consumed as `println(isAllowedURl())` which prints `No URL provided` or as `println(isAllowedURl("google.com"))` 
printing `Access allowed`.

<h3><a name="Stubbing" class="inter-header">Stubbing out methods</a></h3>

A general widely used programming practice is to declare methods as stubs i.e without their logic implemented. 
There might be several reasons where one would choose to do this and it depends upon the developer to use it at the right places.

In java you would typically use `java.lang.UnsupportedOperationException` to add stubbed methods, which is kind of
obscure, given that a missing implementation is presented as unsupported operation.

Scala uses `???` to indicate that the method is not yet implemented which is declared as below.
 
{% highlight scala %}
 
//Stubbed method 
def getID(): String = ??? 

{% endhighlight %}

When calling these methods we can see a more clearer stack trace exception.

    Exception in thread "main" scala.NotImplementedError: an implementation is missing
        at scala.Predef$.$qmark$qmark$qmark(Predef.scala:230)
        at Child.getAge(Child.scala:7)
        at Runnable$.delayedEndpoint$Runnable$1(Runnable.scala:8)
        at Runnable$delayedInit$body.apply(Runnable.scala:4)
        at scala.Function0$class.apply$mcV$sp(Function0.scala:34)
        at scala.runtime.AbstractFunction0.apply$mcV$sp(AbstractFunction0.scala:12)
        at scala.App$$anonfun$main$1.apply(App.scala:76)
        at scala.App$$anonfun$main$1.apply(App.scala:76)
        at scala.collection.immutable.List.foreach(List.scala:381)
        at scala.collection.generic.TraversableForwarder$class.foreach(TraversableForwarder.scala:35)
        at scala.App$class.main(App.scala:76)
        at Runnable$.main(Runnable.scala:4)
        at Runnable.main(Runnable.scala)



Most of what I have explained here is about understanding the object oriented side of scala. 
In my experience it is better to understand this side first and then step into functional programming.

Stay tuned for the my next article on Objects and Classes.