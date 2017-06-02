---
title: OnAThemeJSONGen
layout: Project
github: OnAThemeJSONGen
img: /assets/projects/on-a-theme-json/lilypads.jpg
date: 2017-06-02T15:40
---

When Minecraft added a way of adding variant textures into the game, I wanted to play with it. I created a resource pack named "On a Theme". I have lost most of the screenshots that I took while using it, but I did find one demonstrating it on lilypads.

![Showing flowers on some lilypads, and a large lilypad in the center. What each one looks like is pseudo-random based on its position in the world](/assets/projects/on-a-theme-json/lilypads.jpg)

I ended up having variants for each flower (and there's quite a lot of those too), and added variations to a lot of other blocks. Chiseled sandstone is known for having a creeper face inside it, but I added other creatures to it (and a secret).

However, there was more work to do than just creating textures. Minecraft uses a JSON-based declaration system in its resource packs. This got extremely tedious to do by hand (which I did for the first version). Since I was learning how to write code, I thought that I'd put those skills to good use. Add blocks, add variants, add names, and generate. Really, it just ended up being a GUI on top of the JSON, but it ended up saving me a lot of time, and allowed me to continue to add new variants to the pack.

This was the first project I ever put on GitHub. It is also a snapshot of my early code. It's nice to look back and see how I thought about problems before, and see how that has changed over time.
