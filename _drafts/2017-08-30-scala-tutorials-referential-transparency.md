---
layout: post
title: "Scala Tutorials Part #21 - Referential transparency"
permalink: blog/scala-tutorials-part-21-referential-transparency/
tags: [Scala]
---

Referential Transparency
------------------------

This is part 21 of the scala tutorial series. Check [here](/tags/#Scala) for the full series.

<i class="fa fa-list-ul fa-lg space-right"></i> Index

- [Introduction](#Intro)
- [Referential transparency in action](#InAction)
- [Substitution principle](#Substitution)
- [Advantages](#Advantages)

<h3><b><a name = "Intro" class="inter-header">Introduction</a></b></h3>

[Referential transparency](https://en.wikipedia.org/wiki/Referential_transparency){:target="_blank"} originally comes from mathematics and got adopted 
into functional programming. Its main goal is to enable the programmer to reason about program behaviour. In common programmer speak this can be like
where did this bug come from, what change broke this functionality etc.,

This concept is related to [pure functions](/blog/scala-tutorials-part-9-intro-to-functional-programming/#PureFunctions). In fact, referential 
transparency can be achieved only when the function is pure and does not have any side effect.

 
