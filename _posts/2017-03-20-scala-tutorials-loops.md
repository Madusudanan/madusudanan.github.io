---
layout: post
title: "Scala Tutorials Part #13 - Loops"
permalink: blog/scala-tutorials-part-13-loops-in-scala/
tags: [Scala]
last_updated: 2018-08-26
---

Loops
-----

Loops are fundamental building blocks of imperative programming languages. Since scala also supports imperative style, lets take a look at 
different variations of loops and how they work.

This is part 13 of the scala tutorial series. Check [here](/blog/scala-articles-index/) for the full series.

While loops in scala are very similar to their other language counterparts, so I am not going to explain it. 
The `for` loop however, can be used as a drop in replacement for any while loop construct.

<i class="fa fa-list-ul space-right"></i> Index

- [Concept of looping](#Concept)
- [Introduction to the Syntax](#SyntaxIntro)
- [Controlling both indexes](#BothIndexes)
- [Controlling only the starting index](#StartingIndex)
- [No Index for expressions](#NoIndex)
- [For loop with guards](#LoopGuards)
- [Yield construct](#Yield)
- [Multiple Generators](#MultipleGen)


<h3><b><a name = "Concept" class="inter-header">Concept of looping</a></b></h3>

The concept of looping came up in early languages such as the assembly language. Several variations exist with different instruction sets.

Taken from [here](http://stackoverflow.com/questions/28665528/while-do-while-for-loops-in-assembly-language-emu8086){:target="_blank"}, a few examples below in
several languages.

<i class="fa fa-hashtag" aria-hidden="true"></i> For loops in assembly

            xor cx,cx   ; cx-register is the counter, set to 0
    loop1   nop         ; Whatever you wanna do goes here, should not change cx
            inc cx      ; Increment
            cmp cx,3    ; Compare cx to the limit
            jle loop1   ; Loop while less or equal




<i class="fa fa-hashtag" aria-hidden="true"></i> Do while in C

{% highlight c %}

int x=1;
do{
    //Do something!
    //Increment the counter so that you avoid infinite loops
    x++;
    
}
while(x<10)

{% endhighlight %}

The concept is the same immaterial of the language i.e doing something repetitively.

<h3><b><a name = "SyntaxIntro" class="inter-header">Introduction to the Syntax</a></b></h3>

Loops in Scala do not have a three part structure like Java. A typical for loop in Java would like below,

{% highlight java %}

for(int i=0;i<10;i++){
//Some code
}

{% endhighlight %}

A typical Scala for loop on the other hand does not have the increment part and also the variable declaration is slightly different.

{% highlight scala %}

for(i <- 1 to 10){
    println(i)
}

{% endhighlight %}

Scala does not really have anything that is similar to Java for loops. If you take a closer look, the `to` is actually a method on the `RictInt` class which gives back a `Range` collection from 1 to 10. But notice that we are using these directly from the `Int` class. This is because the class `RichInt` is not a normal class but something called a booster class. We will take a look at booster classes in later tutorials. For now, it is sufficient to understand that the `for` is not something native to Scala, but it is just syntactic sugar over iterating a `Range`.

The `i <- 1 to 10` part is called a loop generator. In below sections we will see how we can combine multiple generators to create a nested for loop.

<h3><b><a name = "BothIndexes" class="inter-header">Controlling both indexes</a></b></h3>

In any for loop, there are two indexes involved i.e the beginning index and the ending one. We can use different constructs 
if we want to control either of these indexes.

{% highlight scala %}

val array = Array(10,12,23,44)

for(i<-0 to array.length-1){
    println(array(i))
  }
  
{% endhighlight %}

Starting from `i = 0` we loop till array length -1. As in many languages, arrays are indexed from 0. In this style of writing, we need to be careful in both the 
beginning and end index. Typically one would make mistakes by starting at index 0 and then ending at `array.length` which would cause `ArrayIndexOutOfBoundsException`.

<h3><b><a name = "StartingIndex" class="inter-header">Controlling only the starting index</a></b></h3>

If we are worried about only the starting index then scala has a special construct for that.

{% highlight scala %}

for(i<-0 until array.length) {
    println(array(i))
}
  
{% endhighlight %}

The `until` keyword makes sure that the loop iterates until the last element without us having to deal with the end index. Similar to `to`, `until` is also a method in the `RichInt` class.

<h3><b><a name = "NoIndex" class="inter-header">No Index for expressions</a></b></h3>

In java there are `Iterators` in which you can loop through arrays without worrying about indexes and there are for loops in which we need not worry
about the indexes.

{% highlight java %}
 
 int a[] = {10,12,23,44};

 for(int i:a){
  System.out.println(i);
 }

{% endhighlight %}

The scala version of the above would be quite similar,

{% highlight scala %}

for(i<- array) {
    println(i)
}
  
{% endhighlight %}

There are reasons about why one would use any of the above. In the no index version there is no control over where the element is
in the array i.e there is no track of the index. In certain situations there is no need to worry about it.

<h3><b><a name = "LoopGuards" class="inter-header">For loop with guards</a></b></h3>

Many times we want to loop over something that satisfies a condition. In java we typically do so by wrapping the for loop inside of an
if statement. In scala there is a special syntax for it and they are named as `Guards` in loops. Let's look at an example.

{% highlight scala %}

 for(i<-0 to 30)
      if (i>10 && i<30) {
    println(i)
  }


{% endhighlight %}

Notice that the if condition is wrapped inside of the for construct. We can also chain complex if conditions.

{% highlight scala %}

for(i<-0 to 30)
      if (i>10 && i<30)
      if (i%2 == 0)
      if (i%4 == 0)
      {
    println(i)
  }
  
{% endhighlight %}

This is just syntactic sugar over normal if statements.

<h3><b><a name = "Yield" class="inter-header">Yield construct</a></b></h3>

For loops unlike Java generates a value in Scala. We saw this already in [part 7](/blog/scala-tutorials-part-7-objects-everywhere/) where is every expression is a value and every value is an object in Scala.

![Scala loop value](/images/scala_loop_type.png)

The variable `x` is of type `Unit` which is the equivalent of void in java, but as discussed before, this is actually a type. 
Scala has a new keyword called `yield` which produces new value out of a for loop.

{% highlight scala %}

val a = Array(1,2,3,4,5)

val b = for (i <- a) yield i*2

{% endhighlight %}

Unlike regular for loops which is of type `Unit` this actually yields as the name implies another array of 5 elements. 
We can even print out the array `b` which will turn out to be numbers `2,4,6,8,10`.
As we get deeper into functional programming, we will find out that this way of looping leads to really good and maintainable code.

<h3><b><a name = "MultipleGen" class="inter-header">Multiple Generators</a></b></h3>

We can easily create nested for loops with generator syntax.

{% highlight scala %}

for(i <- 1 to 5;j <- 1 to 5){
    println(s"i: $i j:$j")
}

{% endhighlight %}

This prints out

{% highlight java %}

i: 1 j:1
i: 1 j:2
...
i: 5 j:5

{% endhighlight %}

There are more advanced constructs possible with loops, but this should be enough to get started. As we explore more into Scala, we would find that loops can be replaced with more powerful constructs which are thread safe and safer/elegant to work with.

