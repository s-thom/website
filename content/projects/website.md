---
title: website
layout: Project
img: /assets/img/banner.jpg
github: website
date: 2017-06-03T13:40
edited: 2017-11-26T12:43
---

It's the website you're looking at! Yes, this one.

I've talked a bit more on the creation of it [in another post](/posts/this-website/). I also go over a couple of the features I added over the top of the framework I used. You'll probably want to read that post before continuing.

This website was an oppportunity for me to play around with something I hadn't used before. It will likely end up as one of those projects I piece away at over time, adding little bits here and there.

# Collections

React Static provides a way of getting a list of all pages in the website. This list is actually served with the page, and attached to `window.__routesList`. Unlike the framework I was using previously ([Phenomic](https://phenomic.io/)), only the URL of these routes are added instead of the full props. Only the props for the current page are embedded in the HTML response, reducing the size of every page by a fair margin.

# Navigation

Navigation on every website sucks. Especially this one. I have yet to find a website that does navigation right. There's a core problem here: humans are lazy. We come to a website to get information. We don't care about the stuff in the sidebar, we don't care about the header/footer, and we certainly don't care about ads. We want the information, and that's it.

As such, I initially kept navigation space to a minimum. There is no navigation under the page header. There is no slide-out drawer on mobile whose button takes up space. There's just a page. I used ListPages (discussed in the section above) to allow readers to click directly to the post they want to read.

After using the site myself while testing, I realised that no navigation is as much a bad idea as too much.

I decided to add breadcrumbs, a little trail to get you back to the start. Since the website has a tree structure (`/`, `/projects/`, `/projects/website/` for example) it is easy to construct a series of links that go to each step back up the tree.

I also added a bar at the bottom of the page, which links to the next and previous posts (or project, if you're looking at a project like this one). The bottom navigation also includes a link to the category page of that type, so the full list of posts/projects is only a click away.

# Metadata

*[Relevant xkcd](https://xkcd.com/927/).*

Seriously, why are there all these standards for metadata and icons. I have defnintely gone overboard by producing icons at the commonly used sizes, but creating 13 differently shaped and sized icons to conform wil platform standards is rediculous.

For metadata, Phenomic adds metadata for Facebook's OpenGraph and Twitter's Cards, as well as some other miscelaneous tags. Overall, there's a lot of information duplication that is unncessary. Google has its own metadata syntax, but it's not as necessary since Google has put more time into extracting this information automatically.
