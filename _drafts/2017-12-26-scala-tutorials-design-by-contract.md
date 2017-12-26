---
layout: post
title: "Scala Tutorials Part #29 - Design By Contract"
permalink: blog/scala-tutorials-part-29-design-by-contract/
tags: [Scala]
---

Design By Contract
------------------

This is part 29 of the Scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [High Level Overview](#Overview)
- [Assert and Assume](#AssertAssume)
- [Require and Ensuring](#RequireEnsuring)
- [Conclusion](#Conclusion)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

[Design by contract](https://en.wikipedia.org/wiki/Design_by_contract){:target="_blank"} is a programming approach where there are preconditions and post-conditions to a code block and if these conditions are not satisfied an exception is thrown to the caller. This was originally designed by [Betrand Mayer](https://en.wikipedia.org/wiki/Bertrand_Meyer){:target="_blank"} who was the creator of the [Eiffel programming language](https://en.wikipedia.org/wiki/Eiffel_(programming_language)){:target="_blank"}.

Some languages do not have first class support, some have support through external libraries. Scala has some support through the language itself and that is what this post is all about.

<h3><b><a name = "Overview" class="inter-header">High Level Overview</a></b></h3>

Scala has four methods `assert`, `assume`, `require` and `ensuring` which are present in the `Predef.scala` package and they are available by default and no library import is required.

Before understanding these, it is necessary to understand what is a static checker. A static checker is basically a compiler tool i.e to check if the code is well-designed, variable naming conventions etc., 

Of these `assert`, `assume` and `require` are preconditions and `ensuring` is a post-condition. Preconditions are meant to be guards before entering a code block while a post condition happens happen after execution i.e like a `do while` construct. Code examples below will make them clear.

<h3><b><a name = "AssertAssume" class="inter-header">Assert and Assume</a></b></h3>

The `assert` keyword would be familiar if you have done unit testing before. It takes in a boolean condition as a parameter and checks if it is true else throws an exception.

{% highlight scala %}

val age = 20

assert(age>20)

{% endhighlight %}

This will throw an exception.

{% highlight scala %}

Exception in thread "main" java.lang.AssertionError: assertion failed
	at scala.Predef$.assert(Predef.scala:156)
	.....

{% endhighlight %}

`assume` is very similar.

{% highlight scala %}

 grantLicense(16)

 def grantLicense(age:Int): Unit = {
   assume(age>18)

 //Business logic

{% endhighlight %}

This also throws an exception.

{% highlight scala %}

Exception in thread "main" java.lang.AssertionError: assumption failed
	at scala.Predef$.assume(Predef.scala:185)
	.....

{% endhighlight %}

In fact, it throws the same exception `java.lang.AssertionError` only with the name changed such as assertion failed or assumption failed depending on what we use. Even the source code is almost identical.

{% highlight scala %}

//Taken from Predef.scala

//Assert
def assert(assertion: Boolean) {
    if (!assertion)
      throw new java.lang.AssertionError("assertion failed")
  }

//Assume
 def assume(assumption: Boolean) {
    if (!assumption)
      throw new java.lang.AssertionError("assumption failed")
  }

{% endhighlight %}

So why the almost identical ones? The answer lies in how they should be used.

`assert` is kind of like attempting to prove something. It can be regarded as a predicate in a mathematical sense i.e which needs to be checked by the static checker. `assume` on the other hand is like an axiom in the sense that the code can rely upon the static checker to throw an error if its not true. So they are in some sense just syntactic sugar.

<h3><b><a name = "RequireEnsuring" class="inter-header">Require and Ensuring</a></b></h3>

Methods `require` and `ensure` often work in tandem. Let's look at an example.

{% highlight scala %}

def squareEvenNumbersWithLimit(num:Int,limit:Int) : Int = {

    require(num%2==0)

    num * num

} ensuring(num * num < limit)

{% endhighlight %}

This can fail in two ways i.e the passed number is not an even number and also when the squared result is greater than the result.

Calling it with the below parameters,

{% highlight scala %}

squareEvenNumbersWithLimit(3,200)

{% endhighlight %}

Causes a `java.lang.IllegalArgumentException`. This blames the caller for giving a value that is termed illegal as per the contract. Notice how this is different from the `java.lang.AssertionError`. One is an exception and another is an error. I have already explained this in a previous blog - [exception handling in Scala](/blog/scala-tutorials-part-24-exception-handling/#Intro)

{% highlight scala %}

Exception in thread "main" java.lang.IllegalArgumentException: requirement failed
	at scala.Predef$.require(Predef.scala:212)
    ....

{% endhighlight %}

If we try to break the ensuring condition,

{% highlight scala %}

Exception in thread "main" java.lang.AssertionError: assertion failed
	at scala.Predef$.assert(Predef.scala:156)
    ....

{% endhighlight %}

Turns out that `ensuring` calls `assert` internally. One more thing to note is that `ensuring` cannot access variables inside of the method block. Its scope is limited to the method parameters.

![Ensuring error](/images/ensuring-error.png)

<h3><b><a name = "Conclusion" class="inter-header">Conclusion</a></b></h3>

We have briefly seen what these methods can do. These can be combined to form complex design patterns such as Design by Contract, Defensive Programming etc., An important thing to note is that `assert` and `assume` can be removed using a compiler flag `-Xdisable-assertions` during compile time. This is useful when you don't want such statements to enter into production.

There are advanced patterns possible. Notice that all of these functions in `Predef.scala` have another signature where functions can be passed in i.e they are higher order functions. 

When you browse open source codebases and other Scala soure code repository, you would find these preconditions are not extensively used. This is because they throw an exception during run time. There are better design patterns possible where we can encode such conditions during compile time. We have already seen the [Option type](/blog/scala-tutorials-part-16-the-option-type/) which is one way of encoding invariant. There are other ways such as `Either`, `Try` etc., We will take a look at those in later tutorials.



