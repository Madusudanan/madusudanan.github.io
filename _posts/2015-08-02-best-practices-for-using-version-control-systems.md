---
layout: post
title: "Best practices for using version control systems"
permalink: blog/best-practices-for-using-version-control-systems
---

## Version control systems - Best practices so that you can sleep well
    
<a class="image" href="/images/xkcd-vc.jpg">
<img src="/images/xkcd-vc.jpg" alt="XKCD Version Control"/>
</a>

When was the last time you wanted to roll back to a particular version of code but could not because of various issues.Have you ever pondered over why such issues arise in the first 
place.Of course best practices help us keep these issues at bay, but understanding these issues are more important than the ways to fix it.

> Best practices should be inside people's heads, not just on documents.

<!--break-->

The above quote is going to stay on all of my blog posts that deal with best practices.What is the point of having a practice if people don't care to follow it?

A Good maintained version control system is like having the power of the [time gem](http://www.comicvine.com/time-gem/4055-57126/){:target="_blank"} over your repository.

Well at least something close to it since you can't go the future but can very well control all aspects of the past.

I am used to Git, so I tend to give examples specific to that.But it can be translated to other ones as well.

So here is a list of things that you should adopt to make the best out of VCS.These can be adopted from a non-coder/programmer perspective as well.

- [Use a distributed version control system](#Distributed)
- [Knowledge of the tools](#Right-tools)
- [Agree upon a common workflow](#Workflow)
- [Don't commit unnecessary files](#UnnecessaryFiles)
- [Avoid big commits, commit early and commit often](#BigCommits)
- [Good commit messages, they are like history](#CommitMessages)
- [Keep commit history clean](#CleanHistory)
- [Prefer smaller repositories instead of one giant one](#SmallerRepos)
- [Never mess with the internals of a VCS](#VCSInternals)
- [Follow up/be updated with the best practices of the VCS that you are using](#FollowUp)


<a name = "Distributed"><u>Use a distributed version control system</u></a>

Using a distributed VCS gives you many advantages over a centralized one and I am not going to write down all of the advantages since it has already been dealt with.
Most of the open source projects such as Apache and others have already migrated to Git or some of the other systems and besides that migrating them is not a herculian task
anymore as many tools have come to automate them.

Below are some links that you can read up on why Distributed is better but TL;DR there are no disadvantages of using one over a centralized version control system so stop
worrying and make the move.

Good reads on centralized vs distributed

- [Atlassian centralized vs distributed](http://blogs.atlassian.com/2012/02/version-control-centralized-dvcs/){:target="_blank"}
- [Another nice blog](http://betterexplained.com/articles/intro-to-distributed-version-control-illustrated/){:target="_blank"}
- [A Stack overflow discussion](http://stackoverflow.com/questions/111031/comparison-between-centralized-and-distributed-version-control-systems){:target="_blank"}

 
<a name = "Right-tools"><u>Knowledge of the tools</u></a>

Different tools have different ways of using them.I have used Git and I find the command line to be much easier to work with, other developers might find IDE integration
to be better.The important thing is they should understand their way thought it and master it.There are situations that I have faced where one developer was not comfortable
with the IDE's integration with the VCS and practically all the files that he had experimenting with got committed.

<a name ="Workflow"><u>Agree upon a common workflow</u></a>

Workflows for version control are like coding standards for code.Agreeing upon a common one is very critical to the quality of the repository which makes maintenance easier.

Here is a [Atlassian workflow guide](https://www.atlassian.com/git/tutorials/comparing-workflows){:target="_blank"} that describes workflows and how they are used in a typical
production environment.

Another branching model which is explained well [here](http://nvie.com/posts/a-successful-git-branching-model/){:target="_blank"}.

<a name ="UnnecessaryFiles"><u>Don't commit unnecessary files</u></a>

There are a long list of things that you don't want to commit,but following are a few commonly abused ones.

- Personal user settings - If these preferences/settings file is used across, then it makes sense to commit them
- Binary files - Committing binary files are useless since you cannot see the diff/changes between one and another
- Compilation output/Dynamically generated files - There is something called .gitignore for Git and similar ones for other systems as well where folders/files can be omitted from version control.They can be legally used BTW
- Formatting/Whitespace changes - This should be done when setting up the environment.Most IDE's/code editors have these built in

<a name = "BigCommits"><u>Avoid big commits, commit early and commit often</u></a>

A commit can be regarded as a single piece of work, there is nothing wrong in splitting two commits if it makes sense to have them separate.Commits are not just 
for pushing them inside the repository,but also to help retrieve/rollback when it is necessary.

<a name = "CommitMessages"><u>Good commit messages</u></a>

Commit messages are like documentation for code.They are always better to look at instead of staring through gigantic diff files.They are like history, whenever something
goes wrong, which often happens this is the first place people look at.

Some of the anti-patterns of commit messages are like below.

- Duh!!
- fix
- Issue fix
- fixed a bug
- changes
- now it works
- wtf
- some changes

<a class="image" href="http://imgs.xkcd.com/comics/git_commit.png">
<img src="http://imgs.xkcd.com/comics/git_commit.png" alt="XKCD Commit Messages"/>
</a>

<br>

There’s a saying (source unknown), along the lines of “Write every commit message like the next person who reads it is an axe-wielding maniac who knows where you live”.

Do not turn people into axe murderers or motivate someone who is already an axe-murderer.

<a name = "CleanHistory"><u>Keep commit history clean</u></a>

This goes hand in hand with commit messages.Sometimes we end up writing lot of commit messages and it is better to prune them.

Git has something like rebasing to [squash commits](http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html){:target="_blank"}.There are similar ones for 
others as well.

<a name = "SmallerRepos"><u>Prefer smaller repositories instead of one giant one</u></a>

Smaller repos are easier to maintain and are generally faster.Something like having the front-ent part of a codebase in a different repo and the backend in another one.
That was an obvious example, but you get the idea.

<a name = "VCSInternals"><u>Never mess with the internals of a VCS</u>/<a>

As the title says it all, never mess with the internals of a VCS.You can experiment all you want in a personal fun project.But in a team, it can lead to chaos.

Remember, there is always an established way of doing it instead of doing hacks and workarounds.

<a name = "FollowUp"><u>Follow up/be updated with the best practices of the VCS that you are using</u>/<a>

I have not covered all of them, and certain things are specific to the VCS that you are using.

<u>Learning materials</u>

- There is a free book called [Git SCM](https://git-scm.com/book/en/v2){:target="_blank"} that is pretty handy.Works as a good reference as well.  
- [Gitready](http://gitready.com/){:target="_blank"} is a good site which gives excellent tips and tricks.
- [Here](https://blog.udemy.com/git-tutorial-a-comprehensive-guide/){:target="_blank"} is an excellent getting started guide for git from Udemy.
- A GUI tool for both Mercurial/Git, [free GUI](https://www.atlassian.com/software/sourcetree/overview){:target="_blank"} from atlassian which is really good.

That's all folks.Do let me know your thoughts using comments below.

<hr>
# Categorized Under
<br>
<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0" onClick="nav()">Software Engineering</a>

&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-3" onClick="nav()">Version Control Systems</a>

&nbsp;&nbsp;<i class="fa fa-folder-o"></i><a id="category" href="/blog-list?item-0&item-0-3&item-0-3-0" onClick="nav()">General</a>








