---
title: How to Screenshot
layout: Project
github: s-thom/howtoscreenshot
date: 2018-01-01T13:36
bgcolor: '#050610'
---

There is a reasonably common, and very minor, problem on the internet: people taking photos of their screens using a camera/phone. This leads to a loss of image quality, blurriness, over-exposure, and a horde of angry internet commenters at their tail.

I thought I'd do something about it. Half a month later, I bought the domain ([`screenshot.help`](https://screenshot.help)), and pushed the first version.

This project had a little bit of many areas, from developing a Service Worker to designing diagrams.

# Service Workers

I also used this project as an opportunity to play around with [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), specifically being able to access web content while offline. While there are a lot of tutorials and help pages for Service Workers (as they are a new, and pretty exciting, technology), it took a while to get used to the concepts and finally get one working. Due to the nature of Service Workers, getting it wrong can lead to your website refusing to load because the worker intercepts every network request.

As this website would be rarely visited, it's important to have the latest information immediately. The method to take a screenshot may change with an OS update or new hardware (e.g. iPhone X without the Home button). I decided to go with a "network first" caching strategy, where the Worker attempts to request the resource before anything else. If that request times out or fails, then it will try the cache. If that fails, then the request was doomed in the first place. Since the cache is part of the request chain this website will work offline (after visited once).

# Optimising SVG

As one of the main principles with this project was keeping it small, I made all of the images and diagrams on the site inline [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics). Using vector graphics allowed me to keep detail while reducing network transmission. Keeping it inline with the HTML meant that no other network requests (including TCP/TLS handshake overhead) were required. However, each of the images themselves had to be optimised.

The first stage was to reduce the number of objects in each SVG image. I created each of the images in Adobe Iluustrator, which has direct export to SVG. In order to keep information, this export has each path or shape in the image as its own object. To reduce the number of objects in each image I selected all of the similar objects (e.g. white outline, no fill) and combined them into a single path (`Object` > `Compound Path` > `Make` in Illustrator).

Secondly, I used Jake Archibald's [SVGOMG](https://jakearchibald.github.io/svgomg/) wrapper around [svgo](https://github.com/svg/svgo). It will remove any unnessecary whitespace, combine paths (if it can), rewrite attributes, and inline styles if it can reduce the size by doing so.

I'm sure a few more bytes could be cut off by rearranging the objects in each group so the numbers in each path are smaller, but that's not something I wanted to do for the 1.0 release of the website.

# Conclusion

Overall, this has been an interesting project to work on over the holiday season. It even made a good excuse to sneak away from the dinner table and do something more engaging. There are still things to work on (more platforms, redo diagrams, extra features), so this is not the last time I will be working on it.

As with most of my projects, the [source code is available](https://github.com/s-thom/howtoscreenshot), so if you want to learn/contribute, go ahead.
