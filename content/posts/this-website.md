---
title: How this website is built
layout: Post
img: /assets/posts/this-website/banner.png
date: 2017-06-01T21:10
edited: 2017-11-23T14:13
---

Knowing how to write code gives a certain luxury: being able to make your own website. It is simple enough to go with a WYSYWG editor (there are certainly many of those these days), or to get a template-based website with hundreds of PHP plugins. However, there's something missing with those. I like to get my hands into code, to play around and experiment. If everything is hidden behind a drag/drop interface or a 1-click button, then there's no way for me to get stuck in.

This post is an overview of the parts that make up this website. I've talked about some of these areas in other posts, which I will provide links to in those sections.

# React

I had played with the [React framework](https://facebook.github.io/react/) and [react-router](https://github.com/ReactTraining/react-router) for a [different project](https://github.com/SecretOnline/Info-Repo) in the past. Being able to declare the UI inside Javascript turned out to be very useful when building a page based on a dataset that could change at any time. Being relatively new to development, I hold no pre-existing negative feelings towards Javascript, especially with the additions that came with ES6.

The advantage of using React is the large developer community around it, with plenty of libraries available. It's certainly not a perfect framework, but it is good enough to do the job. React can also be statically rendered, generating an HTML file so users can still view the website without Javascript enabled.

Perhaps in the future I will investigate moving to a different (more light-weight) framework. React is quite heavy, both in filesize and performance. With a lot of focus going towards optimising the web for slow connections and hardware, reducing the load may pay off in the long run. Even so, it is important to be experimenting with new things.

# Markdown

[Markdown](https://en.wikipedia.org/wiki/Markdown) is a markup format that is used in many popular places on the internet, such as [Reddit](https://reddit.com) and [GitHub](https://github.com). Markdown aims to be a human-readable markup format that is easily translated into XML/HTML. The text of this website has all been written in Markdown. For more information on how I use Markdown with React, then have a read of this post:

<Link url="/posts/react-in-markdown/" title="React in Markdown"></Link>

# Typescript

I first heard of [Typescript](https://www.typescriptlang.org/) a few years ago, and thought it to be a strange idea. At the time I was liking the type un-safety of Javascript, and how you didn't have to worry about types at all. However, that attitude started changing.

Typescript's safety is especially useful for mid to large-sized projects, as it means you don't need to worry about incorrect types being passed through, or objects that are missing properties. Combine this with editor support (I'm currently using [VS Code](https://code.visualstudio.com/)), and you end up with a fantastic developer experience.

# React Static Framework

Previous versions of this website used [Phenomic](https://github.com/phenomic/phenomic) as a generator, but it turned out to not quite work out for me in the end. After some researching and trying out, I settled on [React Static](https://github.com/nozzle/react-static).

At a higher level, the two frameworks are quite similar. They both use React, statically render pages, and run the application dynamically in the browser. Internally, they're a little differnt and have different focuses. I found that Phenomic didn't quite do the things I wanted to as easily, so I moved to React Static

I've written more about how I generate the pages using React Static in another post:

<Link url="/posts/react-static-markdown/" title="Using Markdown with React Static"></Link>

# Why this website is open source

*(In case you haven't clicked any of the relevant links on the page yet, here's [a link to the repository](https://github.com/s-thom/website/))*

"Stuart, ", you might ask, "why is your website open? What purpose could that possibly hold?".

It comes down to the fact that if something has been done before, it will be done again. I have spent several hours typing away, modifying, adding bugs, and fixing those bugs again that I want to show how I solved those problems. There have been many times where I have referenced other people's code (and sometimes a *little more* than referencing) to figure ot a solution.

Since I have come across issues in creating this website, I wanted to share my solutions, and have them there for those who need them. If you have any questions about any part of the website's repository and why I've made some of the decisions I have, ask away. If you have any suggestions as to how it can be improved, then let me know. Collaboration is what open source software is about.
