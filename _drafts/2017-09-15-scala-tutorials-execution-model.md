---
layout: post
title: "Scala Tutorials Part #22 - Substitution model of evaluation"
permalink: blog/why-scala-tutorials-part-22-substitution-model-in-scala/
tags: [Scala]
---

Substitution model of evaluation
--------------------------------

This is part 22 of the Scala tutorial series. Check [here](/tags/#Scala) for the full series.

In [part 19](/blog/scala-tutorials-part-19-lambda-calculus/) we saw how lambda calculus was the motivation behind functional programming and many 
concepts were adapted from it. In this part we are going to see what strategy Scala uses to evaluate expressions and functions which also was 
formulated in lambda calculus.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Expression evaluation](#ExpressionEvaluation)
- [Function evaluation](#FunctionEvaluation)
- [Conclusion](#Conclusion)


<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

Program expressions are evaluated in the same way we would evaluate a mathematical expression. It goes roughly like below,

- Consider operator precedence 
- Evaluation starts from left to right.
- Apply the operators to the operands based on precedence.

<h3><b><a name = "ExpressionEvaluation" class="inter-header">Expression evaluation</a></b></h3>

Let's take a very simple expression.

` (2*10) + (9*4) `

If you trace the execution flow, it will probably be something like below.

-> `20 + (9*4)`

-> `20 + 36`

-> `56`

The `()` braces come first, and hence the `+` is not calculated till `9*4` is evaluated and then finally add up with `20` and the result is `56`. 
Let's do one more which is slightly complicated with variables.

{% highlight scala %}

val x = 20

val y = 30

(10*8)/x+y

{% endhighlight %}

-> `80/x+y`

-> `80/20+y`

-> `4+y`

-> `4+30`

->  `34`

<h3><b><a name = "FunctionEvaluation" class="inter-header">Function evaluation</a></b></h3>

We already saw how evaluation takes place in functions in [part 3](/blog/scala-tutorials-part-3-methods/#CallByNamevsValue), so I will not
be going over it again. But there is one quirky detail that I will be explaining below. (Example adapted from Functional Programming Principles in 
Scala — Coursera)

Let's consider a method that calls itself recursively.

{% highlight scala %}

 def loop:Int = loop 

{% endhighlight %}

Another method which just returns one of the arguments passed in.

{% highlight scala %}

def test(x: Int, y: Int) = x

{% endhighlight %}

Under normal evaluation calling the `loop` method will lead to infinite loop. But what will happen if we call the `test` method?

Since Scala uses call-by-value as default, it would lead to infinite loop even though the second argument does not play 
any role in it. `test(1,loop)` will keep on running. We can fix this by making the `test` method's second parameter as call by name.

{% highlight scala %}

def test(x: Int, y : => Int) = x

{% endhighlight %}

We [already saw](/blog/scala-tutorials-part-19-lambda-calculus/#FirstClass) how functions can be passed in as parameters. This is nothing
but a function which expects another function i.e `y` as a parameter. These are called 
[Higher Order Functions](https://en.wikipedia.org/wiki/Higher-order_function) which we will see later.

Now when we call `test(1,loop)`, it evaluates to 1.

<h3><b><a name = "Conclusion" class="inter-header">Conclusion</a></b></h3>

This evaluation strategy is buried deep under the depths of the Scala compiler. There is a not more to it than what is mentioned in this article.
But let's summarize.

- Scala's evaluation strategy is modeled from lambda calculus
- Expressions are evaluated from left to right and follow operator precedence
- Functions are evaluated using Call by Value, but can also be changed to use Call by Name depending on where it is necessary

This knowledge is immensely useful if you are designing libraries in Scala. In a general day to day programming, it is good to know
but really necessary to worry about it too much.