---
layout: post
title: "What exactly is scalability ?"
permalink: blog/what-exactly-is-scalability
---

##Understanding scalability from the inside

We often hear about these terms like scalability,elastic scaling,scaling in the cloud and the likes.Apart them being marketing buzzwords, they have some meaning behind them.
Let's understand them, in particular scalability.

> Scalability is the ability to meet demands/growth of your application in terms of users/traffic/features or anything else which leads to a increase in usage of computing resources

P.S : This article is from a hardware perspective rather than from a programmer's perspective, although some of them might overlap.

To put it in simple terms, you have a e-commerce website and you have around 50 customers shopping per day on average.This will spike depending upon the timing of the day
such as morning and night.

Now your website becomes suddenly famous and you have a 1000 customers visiting your website at peak time,you are all happy and make good money.

It's festive season and you decide to give offers and your website is more famous than ever before and as soon as the sale kicks off you have 10000 people visiting your 
website and buying stuff.All of a sudden,boom your server crashes and all of your customers are now really disappointed and they switch to a competitor's website,after all
why do they care,all they want is to buy good stuff whoever gives them.Apart from losing business,your brand now has also got a bad name.

This is a true story by the way, of a famous e-commerce company which shall remain nameless.

Now the aftermath, investigation begins.What happened and why did the server crash ?

After analysis you find that your application/server could not handle the traffic.Notice that I have ignored all the nitty-gritty details of the system such as the
language/platform in which it was developed,performance of the code etc., which are all assumed to be top notch.They are of course not needed for the problem we are going to
deal with.

Now the million dollar question comes in.

>How do I scale my application ?

The root of the problem is how do I handle so much scale of growth.

For the prediction/testing part, there are loads of testing tools that you have such as [Jmeter](http://jmeter.apache.org/){:target="_blank"} and [Gatling](http://gatling.io/#/){:target="_blank"}.The real challenge lies in how to scale.

Time for some theory,there are two types of scaling as described below.

- Vertical scaling - Add more RAM,CPU (Multiprocessor architecture) etc and buy a big machine.
- Horizontal scaling - Add more COTS(Commercial Off the Shelf) machines which are readily available in the market,cheap and add more computing power.

Theoretically both vertical and horizontal scaling mean the same, i.e break down tasks and run simultaneously.But from a programmer's perspective, they could mean many things.
For beginner's vertical scaling targets concurrent programming and multi-threading to split up tasks, while horizontal scaling uses distributed programming.Note that both
of them are different from parallel programming, which is a completely different topic.

These two scaling models can be compared/contrasted in a variety of different ways.

- [Cost](#Cost)
- [Single point of failure/Fault tolerance](#Spof)
- [Predictability of resources](#Predict)
- [Global Presence](#Global)
- [Ease of maintenance](#Mgmt)
- [Elastic/On-Demand scaling](#Elastic)

<a name = "Cost"><u>Cost</u></a>

Remember when I said above that horizontal scaling is usually done with off the shelf hardware is pretty cheap.Yes it has a lifetime lesser than its costly counterparts ,
but hey we are scaling out and not scaling up,if they fail we can replace them easily with readily available hardware.

Vertical scaling on the other hand is very costly, you can get smaller 8 GB RAM sticks rather than getting a 32 GB RAM and you will also need specialized hardware to accomodate
a 32 GB stick i.e specialized motherboard or something like that.This example is pretty trivial, but you get the idea.

<a name = "Spof"><u>Single Point of failure/Fault Tolerance</u></a>

With a big machine,you have got all of your computational abilities put into that single machine.If it goes down, then you have to have a backup readily available.
In a day to day business setting,you don't get failures all day with sophisticated hardware, but you should be prepared.The problem is not only having a backup
machine is very costly but also it sits idle most of them time except when the main server fails.

In a distributed setting, this can be handled by adding machines on demand and even if one fails, your whole application does not go down and there is very little
or no downtime involved.

<a name = "Predict"><u>Predictability of resources</u></a>

This is probably the greatest advantage with horizontal scaling.You know exactly how much resources you need and cost/speed of acquiring them should not affect your business
at all.On the other hand,upgrading a big machine is not an easy job and again there is the downtime involved with upgrades as well.

<a name = "Global"><u>Global Presence</u></a>

For a service provider such as a Content Distribution Network(CDN),there is absolutely no choice of having vertical scaling.In a general case where you would require
the physical server to be region based, then horizontal scaling is the way to go.

<a name = "Mgmt"><u>Ease of Maintenance</u></a>

This is one place where Vertical scaling wins.In a distributed computing environment, failure is the norm rather than the exception.But of course there are other trade
offs to make.

<a name = "Elastic"><u>Elastic/On-Demand scaling</u></a>

Cloud computing services such as Amazon AWS give something called on-demand scaling, i.e the application needs grow as needed.This is possible only with horizontal scaling.
Simply add a few more clusters to your computation and then you are ready to use them.

We have looked at the differences between both of these terminologies from a theoretical standpoint.But in reality the world is actually in need of both.

Scale vertically if you can and horizontally when needed.Initially adding more power to your machines such as more RAM,SSD drives etc can bring in immediate difference
to which the application behaves/performs.There will be surely a wall you will hit beyond which you cannot keep adding more power and you have to scale out to meet the needs and
demands of the business.

It also highly depends on what kind of application you are running.

In an application similar to MapReduce,it is important how many systems are there in the cluster with minimal dependency of the performance of these single machines.
Relational databases can be greatly benefited from adding more RAM and or SSD drives, but scaling them horizontally is not easy (this is a completely different topic that can be dealt with greater depth,hopefully I will do it someday).

Remember the following points when making decisions

- Always test,test, and test and let metrics guide the way.
- Premature optimization is the root of all evil.
- Don't fall prey to hypes,there is no easy way to success.
- Don't re-invent the wheel, thoroughly research before building something from the ground up.

<hr>
# Categorized Under
<br>
<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-1" onClick="nav()">Miscellaneous</a>













