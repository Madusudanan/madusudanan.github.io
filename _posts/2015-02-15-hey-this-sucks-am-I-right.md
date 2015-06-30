---
layout: post
title: "Hey this sucks am I right !!"
permalink: blog/hey-this-sucks-am-I-right
---

## Hey this sucks am I right - The Irony


>The this sucks paradigm !!
>
>Basically a rant which may or may not be related to the topic, but arises nonetheless due to many reasons that may or may not exist.

That is a pretty non-intuitive definition, but apparently it is the truth.

Stop !! This blog post consists of Sarcasm and Constructive criticism, if you are a person that cannot handle them, then you should not be reading this.

Let us face it,this is probably the most famous thing that we as software developers have come across.Someone ranting about something that has nothing to actually about it.Various reasons exist why they do it.

Ranting is not bad, it allows to let out some steam, become calmer.The problem comes not because of rants, but when rants/opinions become facts.

I try to do some myth busting here that commonly come along, and finally things will become clearer of what I really intend to do.Since I am more familiar with Java that any other programming language, I tend to take that as an example, but you will get the idea.

This is how I feel when someone rants about something which is really unnecessary.

<a class="image" href="/images/code-monkeys.jpg">
<img src="/images/code-monkeys.jpg" alt="Code Monkeys"/>
</a>

<!--break-->

Yes, monkeys on a laptop, basically having no idea what is going on.

Below is a list that I have thought of why they exist.

- <a href="#LackOfKnowledge">Lack of Knowledge</a>
  - <a href="#JavaVerbose">Java is Verbose</a>
  - <a href="#JavaGUI">Java GUIs suck</a>
  - <a href="#ToughC++">C++ is a very tough/horrible language</a>
- <a href="#AppleOrangeCompare">Is X better than Y? - Comparing Apples and Oranges</a>
  - <a href="#CMSVsFramework">CMS vs Framework</a>
  - <a href="#TextEditorVSIDE">My IDE takes long time to boot up - IDE's suck and I am going to use my text editor</a>
- <a href="#BeingCoolFactor">The Being cool factor - Not being cool sucks</a>
  - <a href="#XNewTechnology">X technology is used by big companies,it sucks.Let's use something new and shiny</a>
  - <a href="#GoogleTech">We need to develop our own versions of tools because google does that</a>
  
<a name = "LackOfKnowledge"><u>Lack of Knowledge</u></a>

[Little knowledge is a dangerous thing](http://www.quora.com/What-does-Little-knowledge-is-a-dangerous-thing-mean){:target="_blank"}

This is probably the most famous reason.Half-learning things and then making assumptions about it without even trying to understand what it is.

Below is a naive example of a Java and Ruby comparison where people say hey I can code a print statement in Ruby in one line, whereas in Java it needs five lines and saying that Java is verbose.

<a name= "JavaVerbose"><u>Java is verbose</u></a>

{% gist 4bc09fcac13f821f664a %}
    
I have seen this far too many times.I fail to understand how many print statements do projects contain and how much productivity can be gained by this simple construct.Note that the actual print statement is still a one liner in both the languages.

Let's take this apart piece by piece. 

All Java programs belong to a class, that is how the entire language is built and all execution begins with a main method,contrary to Ruby which does not have concept of a main entry point and works in a different manner.String args[] is String array which takes input, there is no compulsion on using this, it is just for method signature since it is a strongly typed language.Understanding these differences in the right sense is important rather than comparing with such a non-realistic example.

<a name="JavaGUI"><u>Java GUIs suck</u></a>

This is also pretty famous.Java is a general purpose programming language and much of its strength comes via its libraries,just because a handful of people designed poor desktop GUIs using Java doesn't mean that it is not good.I would like to bring up Intellij's family of products(IDEs) which have been wholly developed in
[Java swing](https://github.com/JetBrains/intellij-community){:target="_blank"}(GUI library of Java).Below is a picture which is just a glimpse.

<a class="image" href="/images/intellij-idea.jpg">
  <img src="/images/intellij-idea.jpg" alt="Intellij IDE"/>
</a>

If you are still not convinced, then go try it out.

<a name="ToughC++"><u>C++ is a very tough/horrible language</u></a>

C++ is one of the most powerful languages out there, and much of its power comes from the ability to control the hardware without going through a layer of abstraction.

It is still used today to design high performance systems and compilers where that low level control is necessary.If this functionality is not being used/leveraged, then C++ as a choice sucks, not the C++ language itself.

<a name = "AppleOrangeCompare"><u>Is X better than Y? - Comparing Apples and Oranges</u></a>

There are also far too many arguments which compare apples and oranges and still convince that an apple tastes better than an orange.Comparison in this aspect has no end and does not make any logical sense, step back and think,am I doing the right comparison ?

<a name="CMSVsFramework"><u>CMS vs Framework</u></a>

A classic example would be, should I be using a CMS or a framework? I would re-phrase the question and ask again like do you want to customize your website ? If yes, then to what length? A CMS provides a lot of out of the box functionality, and this is the very reason why people choose it in the first place.Let's say you want 40% of the functionality from  a CMS, and 60% custom.Then you should probably code your web application by hand.Architect it with the ground up with well known software engineering practices.When you are going the CMS route, you have to learn how customization works and tailor it accordingly, which can be sometimes really really frustrating.Every product/project have deadlines to meet, it will be more of a nightmare to have to maintain a crappy code base when the customer asks for a new feature that is critical to the business.

<a name="TextEditorVSIDE"><u>My IDE takes long time to boot up - IDE's suck and I am going to use my text editor</u></a>

This should be on top of the stupidity list.I mean how often you start and stop your IDE,lets you do it ten times a day (there is absolutely no reason that why you would do it,but lets just assume).And your IDE takes 1 minute to boot up(this is on the longer end), so the time wasted is 60 x 10 = 600 seconds which is 10 Minutes.There is one question that comes to my mind immediately, how much code can you write in those 10 mins and how much impact is it going to make ? Unless you are Chuck norris and your beard can code 400wpm.

<a class="image" href="/images/chuck-norris-code.jpg">
<img src="/images/chuck-norris-code.jpg" alt="Chuck Norris Coder"/>
</a>

There are so much IDE's have to offer and many young programmers who enter into the field get confused by these things.I have wrote a separate [blog post](/blog/why-you-should-use-ides-instead-of-text-editors-for-coding) on this, in which I hopefully make some sense.The main point is there are a gazillion other things to worry about than the IDE startup time,Software engineering is much more than just typing out stuff, there is so much thought process involved.Of course, if you think that using VIM or EMACS is cool,then go ahead, but do not advertise that it improves programmer productivity/makes you a better programmer.

<a name="BeingCoolFactor"><u>The Being cool factor - Not being cool sucks</u></a>

The term being cool in the Software world is very much tied to being different, in the sense trying out something different such as a new language/framework.This pattern can be found in many online communities such as Stack overflow where if you are asking a question about a new technology,you get upvoted pretty quickly and asking a question about an existing technology even thought it could be different than existing questions might not earn you much reputation.

But the question we should be asking is , what is new here and what it has to offer which is better?

<a name="XNewTechnology"><u>X technology is used by big companies,it sucks.Let's use something new and shiny</u></a>

This kind of attitude is common with startup culture.Of course, you need to be cool not just as a startup, but as any company.The thing I fail to see is why it makes you less cool if you use already existing technologies.Yes, experimenting and learning new things is fun,but at what cost ? Unless R&amp;D is your day job,you would be better off using something that has been battle tested and used in real world applications when a timeline and business is at stake.

<a name="GoogleTech"><u>We need to develop our own versions of tools because google does that</u></a>

This is another commonly heard thing.If Google is developing something in-house without using any open source versions of what is already out there or even paid software,then it has really good reason why to do it.Step back and think are you really at that level, and do you really need to develop it again, if yes, what does it do different ?

Rants have their place,in the internet everything has its place.But do not let it creep in into your system.But if you do really hate something,try atleast to hate it with some logical reason.

<a class="image" href="/images/keep-calm-stop-ranting.jpg">
<img src="/images/keep-calm-stop-ranting.jpg" alt="Keep calm and stop ranting"/>
</a>

>Stop ranting and start learning.

<hr>
# Categorized Under
<br>
<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-1" onClick="nav()">Miscellaneous</a>
