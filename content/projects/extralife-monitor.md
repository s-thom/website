---
title: Extra Life Monitor
layout: Project
bgcolor: '#1d4574'
github: s-thom/extralife-monitor
date: 2017-11-04T15:23
---

[Extra Life](https://www.extra-life.org/) is a yearly charity event hosted by people playing games. Often it's done as a 24 hour marathon, raising money for [Children's Miracle Hospitals](https://childrensmiraclenetworkhospitals.org/home/). This year, I participated in a livestream, though my internet speed did not allow me to stream it myself. Instead, I wanted to help those who were streaming by reading out the donations they received, taking the pressure off them and allowing them to focus on playing the game.

The problem was going to be keeping many tabs open and periodically refreshing them to see if any new donations had arrived, and having to remember which oneshad already been read out. If we were going to hold raffles for prizes for donations, then it would be nice to have a system to takle care of that. I decided to write a web app to track donations for me.

![The web app in action](/assets/projects/extralife-monitor/screen.png)

The idea is to add all of the people you want to keep track of, then just leave it open to the side (or on another screen). Every 2 minutes the application requests the donations everyone has received, checks for duplicates, then adds new donations to the page. This makes it easy to tell when a new donation has come in.

Each raffle adds any new donation that matches the pattern. The time the raffle runs for is configurable, as well as the "ticket" size. When the time is up a winner can be selected from the raffle, selecting one of the donations.

---

This was relatively quick 4 day project, as the deadline was getting closer. If I had a bit more time, then I would have tidied it up a bit, and made the UI a bit more self-explanatory. I'll likely participate in Extra Life again next year, so maybe I'll be making those improvements after all.
