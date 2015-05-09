---
layout: post
title: "IDE vs Text Editor"
permalink: blog/why-you-should-use-ides-instead-of-text-editors-for-coding
---

## IDE Vs Text Editor

Yeah well !! Of all the posts out there why another of the same flavour? I try to keep this one factual,non-opinionated and filled with real time examples.

<a class="image" href="http://imgs.xkcd.com/comics/real_programmers.png">
<img src="http://imgs.xkcd.com/comics/real_programmers.png" alt="XKCD Real programmers"/>
</a>

The Internet is full of opinions.Some of them are good, but most of them [useless](/blog/hey-this-sucks-am-I-right).If you are one of them who wonder whether using a text editor will make you a better programmer, then read on.

Stop !! This blog post consists of Sarcasm and Constructive criticism, if you are a person that cannot handle them, then you should not be reading this.

First off lets do some mythbusting and then compare IDEs vs text editors and what exactly is the problem of using either of them.

- <a href="#TEBetterProgrammer">Myth #1: Using a text editor makes you a better programmer</a>
- <a href="#TEProductivity">Myth #2: Using a text editor improves programmer productivity</a>
- <a href="#TECustomization">Myth #3 : Text editors are highly extensible/customizable.IDEs are not</a>
- <a href="#TEIDESlow">Myth #4 : IDEs are slow</a>
- <a href="#TEIDEMouse">Myth #5 : IDEs are mouse oriented</a>
- <a href="#TEPolyglot">Myth #6 : IDEs are not suited for Polyglot programming environments</a>
- <a href="#TEDynamic">Myth #7 : Dynamically typed languages do not require IDE</a>

<a name = "TEBetterProgrammer"><u>Myth #1: Using a text editor makes you a better programmer</u></a>

This is one of the most often heard.There is so much more to do about programming than there is about typing stuff.Many say that IDE usually comes in your way and a text editor is just barebone to get you started.Well, I kind of think the opposite, an IDE will help you get your codebase up and running pretty quickly and you can just compile your code within the same place rather than jumping terminals/command prompts.It is actually faster even for newer people who can learn the ins and outs pretty quickly and which will help them in the longer run.

<a name = "TEProductivity"><u>Myth #2: Using a text editor improves programmer productivity</u></a>

If you find anyone who says fast typing and the number of lines of code(LOC) that you type in a day is programmer productivity, run in the other direction.They do not know a thing about programmer productivity,a rather kind of overused term in the Software industry I would say.

<a name = "TECustomization"><u>Myth #3 : Text editors are highly extensible/customizable.IDEs are not</u></a>

With people putting the ideology of religion in all aspects of life, programming is no exception.People from Vim/Emacs religion know this.Their environment is highly customizable and every developer has his/her own development environment customized.Probably this might be true to some extent, they are very much more customizable from IDEs, but step back and think a little bit.Does every developer need such customization, yes they might need a different theme/skin/look and feel, but do they want their menus or options in a different fashion.I would say no, in fact it is the opposite, we get used to certain kind of setting and sticking to it seems to make much more sense rather than meaninglessly changing/customizing each and every part of your development environment.And there are definitely ways of customizing your IDE, several IDEs such as the Scala IDE, Spring Tools Suite (STS) have been customized/built from the Eclipse platform.

Whatever part of Vim/Emacs they say can be extended, is already part of the standard IDE distribution and you can focus doing your job rather than writing plugins IMHO.

<a name = "TEIDESlow"><u>Myth #4 : IDEs are slow</u></a>

Gone are the days when people used to say Eclipse is really slow.It is usually butter smooth on any machine with decent configuration and there are many ways in which you can speed it up.If it is too slow on your machine, then there is something probably wrong with the OS itself.

This is not just limited to Eclipse, there are other IDEs such as products from Jetbrains which are really kickass.(I am not affiliated with them in any way.I just really love their tools). And they are a company which makes a living out of developing such tools, you will not wonder why after you use them.

<a name = "TEIDEMouse"><u>Myth #5 : IDEs are mouse oriented</u></a>

Being an IDE user myself I hate using my mouse.Guess what, if you are used to Vim key bindings, you can find a plugin which emulates those for the IDEs that you use.At least Eclipse and Intellij has them and I am sure you can find some for other ones as well.Even without them, the key bindings are fully customizable in case if you do not want to touch your mouse.

<a name = "TEPolyglot"><u>Myth #6 : IDEs are not suited for Polyglot programming environments</u></a>

With the current trend in the industry turning more and more in favour of multiple programming languages, IDEs have also evolved in this aspect.We can make the call in different ways,either you can have a master IDE with all the plugins installed (Intellij works this way) or you can multiple setups of the same IDE with plugins configured to work for one specific language such as Eclipse although you can make it work the first way also.

<a name = "TEDynamic"><u>Myth #7 : Dynamically typed languages do not require IDE</u></a>

I am not a fan of dynamically typed languages.Read [here](/blog/static-vs-dynamic-typing-why-you-should-care) why.There seems to be more programmers nowadays who think they are Software engineers just by learning to code from reading a blog post of even from just trial and error.They form an ecosystem of things they think that are correct and they do not even attempt to know whether it is right or wrong.This seems to be common in the dynamically typed programming world.There might be some cases where many features of an IDE will not be useful,but still there are many other cases where it helps.

Mythbusting comes to an end here, and hopefully I think I would have made some sense.

## What IDEs offer?

This is a huge list,I have consolidated in the best way I can think of.For people who think Vim/Emacs/Sublime can do this, please use an IDE and then decide for youself.

- Intellisense - far more sophisticated and better than text editor counterparts
- Code completion - very much like intellisense and actually does code completion to what you intended such as a function name/function variable, not just text matching
- Refactoring - find/replace is a joke
- Error checking - this is not just syntax checking,it actually sees whether you have misspelled any words/phrases that the compiler/interpreter cannot make out
- Integrated Compiler - just one command to see the output
- Integrated Debugger - mark breakpoints and step through without having to leave the IDE.Saves a lot of time
- Code navigation - Ctrl + Click usually works everywhere
- File templates - Your IDE/Plugin environment gives you file templates for almost all kinds of files you require,these are not just file extensions
- GUI Builders - Good GUI systems are often hand crafted, but there are many cases where GUI builder can speed up work
- Other boiler plate code generation - Getters/Setters,Constructors,Library imports etc
- Other useful integrations - Version control systems,Database integration,In built terminal/command line,Build tool integration,Emulator integration(Android),Application server/Web server integration to name a few

There is lot more but the idea is everything at a single place, and the quality of these integrations and how they work together actually make up the quality of the IDE itself.

So what is the point here? Just use an IDE and never use a text editor.Definitely not,there are places where you might still use a text editor.I use Vim sometimes for working on small C/C++ Projects and I use Brackets for web development.But when it comes to a full blown commercial project and collaborating with many developers, IDEs are the way to go.Finally it comes to a matter of choice, but keep those myths in mind and make your choice.

<hr>
# Categorized Under
<br>
<a id="category" href="/blog-list?item-1" onClick="nav()">Miscellaneous</a>