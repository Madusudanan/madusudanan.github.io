---
layout: post
title: "Scala Tutorials Part #22 - Substitution model of evaluation"
permalink: blog/why-scala-tutorials-part-22-substitution-model-in-scala/
tags: [Scala]
---

Substitution model of evaluation
--------------------------------

This is part 22 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

In [part 19](/blog/scala-tutorials-part-19-lambda-calculus/) we saw how lambda calculus was the motivation behind functional programming and many concepts were adapted from it. In this part we are going to see 
what strategy scala uses to evaluate expressions and functions which also was formulated in lambda calculus.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Expression evaluation](#ExpressionEvaluation)


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

The `()` braces come first, and hence the `+` is not calculated till `9*4` is evaluated and then finally add up with `20` and the result is `56`. Let's do one more which is slightly complicated with variables.

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

Notice how the value y is evaluated only at the end. This is sort of a lazy evaluation.




