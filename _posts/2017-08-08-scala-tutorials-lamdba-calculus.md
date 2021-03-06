---
layout: post
title: "Scala Tutorials Part #19 - Lambda Calculus "
permalink: blog/scala-tutorials-part-19-lambda-calculus/
tags: [Scala]
---

This is part 19 of the scala tutorial series, check [here](/blog/scala-articles-index/) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [History](#History)
- [The notion of turing completeness](#TuringCompleteness)
- [Church-Turing thesis](#ChurchTuring)
- [Revisiting call by name](#CallByName)
- [Intro to Functions](#Functions)
- [Functions as first class citizens](#FirstClass)
- [Functions as values](#FunctionsAsValues)
- [Anonymous functions](#AnonymousFunctions)
- [Wrapping up](#WrapUp)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

There was a little sneak peek into the world of functional programming in [part 9](/blog/scala-tutorials-part-9-intro-to-functional-programming/). In 
this article we are going to dig deep into what functional programming is really all about, how it came into use and its significance.

[Lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus){:target="_blank"} is a formal system in mathematical logic
to express computations in the form of functions. In this article, we will take a high level view of what lambda calculus is and more importantly
how it applies to functional programming.

<h3><b><a name = "History" class="inter-header">History</a></b></h3>

If you have a CS background or been programming for some time, you might have heard about 
[turing machine](https://en.wikipedia.org/wiki/Turing_machine){:target="_blank"}, which is kind of more famous in the computing world in comparison
to lambda calculus and is also a formal system to express computation. Turns out that [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) 
the one who invented the turing machine was Alonzo Church's PhD Student. [Alonzo church](https://en.wikipedia.org/wiki/Alonzo_Church) 
was the one who formulated lambda calculus. 

Till today, these two systems are equal in terms of power in expressing computability and computational power (see church turing thesis below).
There are very good courses which teach these theoretical foundations of computer science and one such course is
[introduction to theoretical computer science](https://udacity.com/course/intro-to-theoretical-computer-science--cs313/){:target="_blank"}.

<h3><b><a name = "TuringCompleteness" class="inter-header">The notion of turing completeness</a></b></h3>

[Turing completeness](https://en.wikipedia.org/wiki/Turing_completeness){:target="_blank"} tells us whether a programming language
will be able to simulate functionality of a turing machine. We can only simulate the functionality of the turing machine and cannot practically 
develop it since it is a theoretical model.
 
Common programming languages such as

- Scala
- Java
- Python
- Haskell
- C & C++

are examples of turing complete languages. 	Domain specific languages such as 

- JSON
- YAML
- XML

are not turing complete since it is very difficult/impossible to express general purpose computability in such languages. An example
is we cannot add two numbers using JSON.

Turing and Church worked on the same problem independently. In fact there were many other mathematicians who presented models for computation.
Some of them were,

- [Stephen Kleene](https://en.wikipedia.org/wiki/Stephen_Cole_Kleene){:target="_blank"} - Recursive Function Theory 
- [Noam Chomsky](https://en.wikipedia.org/wiki/Noam_Chomsky){:target="_blank"} - Universal grammar
- [Raymond Smullyan](https://en.wikipedia.org/wiki/Raymond_Smullyan){:target="_blank"} - Logic

Lambda calculus as a system is turing complete even though it pre-dates turing machine and that is where the Church-Turing thesis comes in.

<h3><b><a name = "ChurchTuring" class="inter-header">Church-Turing thesis</a></b></h3>

Some years after they were formulated, several mathematical theories came out which proves that lambda calculus and turing machines are essentially 
equivalent in terms of power/expressiveness. These were collectively known as 
[church-turing thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis){:target="_blank"}.

This theoretical base is important since most of the modern imperative languages used today are based on turing machines. Even the von-neumann
model which we saw earlier is based on turing machines. Whereas, most functional languages such as haskell, f# and scala are based on lambda calculus.
Functional languages do not natively fit within von-neumann architectures and that was
[addressed by john backus](/blog/scala-tutorials-part-9-intro-to-functional-programming/#WrongVonNeumann).

In the next sections we will explore how we can write code which respects the principles behind lambda calculus using the different constructs which 
scala offers.

<h3><b><a name = "CallByName" class="inter-header">Revisiting call by name</a></b></h3>

The `=>` symbol has many different meanings in scala all related to its mathematical meaning as implication. We saw in 
[part 3](/blog/scala-tutorials-part-3-methods/#CallByNamevsValue) that this means calling by name as opposed to call by value. Next we saw 
how this operator was used in [pattern matching](/blog/scala-tutorials-part-16-the-option-type/) where it was used to separate the pattern and the
optional guard from the resultant expression.

We will explore more on its usage as and when we come across situations. The important takeaway is that we should not have a fixed 
meaning/understanding of the `=>` operator as they change depending upon the places where it is being used.

<h3><b><a name = "Functions" class="inter-header">Intro to Functions</a></b></h3>

Functions are the building block of functional programming (duh !!) and the definition of functions is sort of hazy and 
methods are also similar to functions in scala. According to lambda calculus, any program can be represented as a combination of functions. 
We already saw pure functions in [part 9](/blog/scala-tutorials-part-9-intro-to-functional-programming/#PureFunctions).

Let's consider a simple example and compare their imperative and functional counterparts.

<i class="fa fa-hashtag" aria-hidden="true"></i> Iterative factorial

{% highlight scala %}

  def factorial_iter(n:Int) : Int = {

     var fact = 1

     for(i<-1 until n+1) {
       fact = fact * i
     }

     fact
   }

{% endhighlight %}

As we can see that the above implementation is not pure since there is mutation. Let's take a look at a recursive version

<i class="fa fa-hashtag" aria-hidden="true"></i> Recursive factorial

{% highlight scala %}

def factorial_recursive(n:Int) : Int = {

  if(n==0) 1 else n * factorial_recursive(n-1)

}

{% endhighlight %}

The recursive version is more functional as it avoids mutation (mutation done on the method call stack is different). 
One would typically convert the above recursive call to a tail-recursive one, but that is a topic for a separate post. 
The point is that we can write code which emulates the principles behind lambda calculus through various programming level constructs. 
Some languages give very good support for this e.g Haskell, Scala and some give partial support e.g Javascript. 
This difference of how much a language is functional is important while writing code since we must make maximum use of them.

As explained earlier in [part 7](/blog/scala-tutorials-part-7-objects-everywhere/#Operations), 
even fundamental operations inside scala are functions/methods (we will get to the difference later). 
For example the addition operator i.e `+` is actually a method inside the type classes. This is a classic example of the duality in which scala 
code can be represented i.e both functional and object oriented.

<h3><b><a name = "FirstClass" class="inter-header">Functions as first class citizens</a></b></h3>

In functional languages there are a set of ideas that are considered the core/foundations of it. A well accepted definition of this is 
present in the [sicp book](https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-12.html#call_footnote_Temp_121){:target="_blank"}

- They may be named by variables.
- They may be passed as arguments to procedures.
- They may be returned as the results of procedures.
- They may be included in data structures.

These properties make functions special in scala and that differentiates them from methods. We will deal with each and every one of the above in the 
following sections.

<h3><b><a name = "FunctionsAsValues" class="inter-header">Functions as values</a></b></h3>

Functions can be expressed as values in scala. An example would be like below.

{% highlight scala %}

  val square = (n:Int) => n * n

{% endhighlight %}

Can be called as a regular function like `square(10)` and it would print `100`. If you call this without a parameter i.e just `square` then it would
prints out `<function1>`. This extends a root trait called `FunctionN` which we will explore after learning generics.

<h3><b><a name = "AnonymousFunctions" class="inter-header">Anonymous functions</a></b></h3>

Functions share the same level of flexibility as strings for example. We can make use of something called function literals to create anonymous 
functions i.e functions which have no name.

Let's create a list from a range of numbers.

{% highlight scala %}

val x = List.range(1,10)

{% endhighlight %}

We can then pass a filter to this list in the form of a function.

{% highlight scala %}

x.filter((i:Int) => i%2==0)

{% endhighlight %}

Which prints `List(2, 4, 6, 8)`. The part `(i:Int) => i%2==0` is an anonymous function which filters only even numbers as you would expect.

This is also an example where the `filter` function can take in functions as a parameter. These are called higher order functions which we will 
explore in a later dedicated article.

Anonymous functions are also called as lambda expressions, although in other functional languages they can mean more.

<h3><b><a name = "WrapUp" class="inter-header">Wrapping up</a></b></h3>

The ability to apply functions is also an important feature of functional languages. We already saw how this can be done in 
[part 15](/blog/scala-tutorials-part-15-the-apply-method/). 

To summarize, we have seen

- A high level overview of lambda calculus
- We saw how turing machines and lambda calculus relate to each other
- What makes a language functional and the notion of functions as first class citizens
- Basic overview of functional constructs in scala

I have left out several concepts from this article for the sake of brevity and also the left out ones take an entire post of their own. Topics which 
were left out are,

- Higher order functions
- How functions work behind the scenes, i.e understanding the generated byte code
- Lambda expressions and more advanced concepts

Understanding lambda calculus is a long and complex journey, in this article I tried to give an intuition behind it and how it has influenced 
programming. We can start comparing OOP and FP starting with simple code examples and then slowly approach to solve bigger problems. 




