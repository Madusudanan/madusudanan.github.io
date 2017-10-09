---
layout: post
title: "Scala Tutorials Part #24 - Exception Handling"
permalink: blog/scala-tutorials-part-24-exception-handling/
tags: [Scala]
---

Exception Handling
-----------------

This is part 24 of the Scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [The case of Checked Exceptions](#CheckedExceptions)
- [Handling exceptions with try-catch](#TryCatch)
- [Conclusion](#Conclusion)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

Exceptions occur when normal flow of execution gets disrupted. It is usually handled in a try-catch block with an optional finally block. They are 
created from the root class `Exception` and an instance of the `Throwable` class is used to throw exception messages.

Below is a visual representation of how the class hierarchy is designed in the JVM.

![Exception hierarchy](/images/exceptions.png)

And then it branches into checked exceptions which needs to be handled by the caller, ones such as `FileNotFoundException`, 
`OperationNotSupportedException` etc., and unchecked exceptions such as `OutOfMemoryException`, `NullPointerException` etc., It is a common 
confusion that checked exceptions are compile time and unchecked exceptions happen at run time. The truth is that there is no such thing as compile time
exception and everything happens at run time. The difference between both is how they are handled. Checked exceptions are forced by the compiler
to be handled during compile time/build time while unchecked exceptions aren't.

![Checked exception](/images/file_checked_exception.png)  

Scala handles exceptions in a slightly different manner and for a good reason.

<h3><b><a name = "CheckedExceptions" class="inter-header">The case of Checked Exceptions</a></b></h3>

Scala does not have checked exceptions. The compiler does not enforce exceptions to be handled. For example, the below code which is a direct translation
of the above java code block compiles just fine. 

{% highlight scala %}

  readFile("somefile.txt")
  
  
  def readFile(path:String) = {
    
    val file = new File(path)
    
    val fileInputStream = new FileInputStream(file)
    
    println(fileInputStream.read())
    
  } 

{% endhighlight %}

It will throw an error if there is no such file is present only at the run time. Checked exceptions have always been a topic of controversy.
[Here](https://testing.googleblog.com/2009/09/checked-exceptions-i-love-you-but-you.html){:target="_blank"} is a good article on why checked exceptions are bad. This feature is at least controversial if not bad and hence the language developers decided to drop this.

<h3><b><a name = "TryCatch" class="inter-header">Handling exceptions with try-catch</a></b></h3>

Like java, Scala has try/catch to handle exceptions. Let's take a look at the same file read example.


{% highlight scala %}

readFile("somefile.txt")


  def readFile(path:String) = {

    try {
      val file = new File(path)

      val fileInputStream = new FileInputStream(file)

      println(fileInputStream.read())
    }

    catch {

      case f : FileNotFoundException => println("File not found")
      case e : IndexOutOfBoundsException => e.printStackTrace()
      case _ : Throwable => println("Unknown exception")

    }
    
    finally {
         println("Inside finally block")
    }

  }

{% endhighlight %}

`try` is similar to Java which contains code that could cause an Exception. The `catch` block however is different and it uses pattern matching.
The `_` operator here is used as a wildcard operator which matches other than the ones above it. Everything else should be similar to its Java counterpart including the 
`finally` block.    

<h3><b><a name = "Conclusion" class="inter-header">Conclusion</a></b></h3>

What we have explored in this article is just a beginning. Scala being a multi-paradigm language has many ways to deal with scenarios that could
cause errors. We already saw some of those in part 1 where we cannot leave a variable [uninitialized](/blog/scala-tutorials-part-1-getting-started/#Initialize)
preventing null pointer to a certain degree and also the [Option/Some/None pattern](/blog/scala-tutorials-part-16-the-option-type/) to deal with 
undecidable situations.

General best practices such as giving descriptive error messages, not to catch `Error`, not to ignore exceptions etc., still apply. 