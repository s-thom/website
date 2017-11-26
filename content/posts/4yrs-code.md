---
title: Four Years of Code
layout: Post
bgcolor: '#15181A'
date: 2017-11-26T14:25
---

This is a look back at some of the code I have written over the past four years, while I have been at university. Before going, I knew the absolute basic of Javascript: self taught from investigating a website that I took charge of. Now I have a deeper knowledge of how software works, and understand why it is the way it is.

I've tried to include one example program from each semester at the university, as well as something I did in my spare time. Some semesters weren't as filled with intersting projects as others, so I don't have one from everywhere.

# First Year

## Enigma Machine Simulator

**Assignment, Semester A, COMP103**

[Repository](https://github.com/s-thom/uni-14A-103-Enigma)

One of the weekly assignments in COMP103 (the introductory course to programming) was to create a version of the infamous [Enigma Machines](https://en.wikipedia.org/wiki/Enigma_machine). It had to read in the rotor values from a CSV file, then cyphertext from a text file, and convert it to plaintext, as well as the reverse.

![Minimal UI design of the Enigma simulator](/assets/posts/4yrs-code/enigma.png)

One of the tutors gave us an encrypted file. Its contents were "THE FIRST PERSON TO SEE &lt;name of the tutor&gt; AND SAY PEANUT SLAB WILL GET [A PEANUT SLAB](https://www.whittakers.co.nz/en_NZ/products/#trigger--slabs)". I don't like Peanut Slabs, so I ended up giving it to a friend.

## "Get Bit!"

**Assignment, Semester B, COMP104**

Based off the card game [Get Bit!](https://www.maydaygames.com/collections/get-bit/products/get-bit-original).

This was the final assignment of COMP104, and was set to show our understanding of Object-Oriented design. All students had to create their own version of the card game, and implement various AI player types.

![The game screen of Get Bit!](/assets/posts/4yrs-code/get-bit.png)

We also had to do an extra on top of just creating the game. I created a primitive XML-based save format, so games could be saved and then loaded. This used the .NET XML library to do the conversion, and taught me how to do serialization in a strongly typed environment.

## Waiting Game

**Personal Project**

[Download (.exe)](/assets/posts/4yrs-code/WaitingGame.exe)

This was just a random thing I made to troll friends. It features a loading bar, which <Spoiler text="doesn't ever finish"></Spoiler>, and plays music (<Spoiler text="the 'troll song'"></Spoiler>).

Unfortunately, I've lost the code for it. No great loss, though it was how I learned to include resources into the executable (which was very useful for [Get Bit!](#get-bit)).

# Second Year

## Tilt Game

**Assignment, Semester B, COMP204**

*[Repository](https://github.com/s-thom/uni-15B-204-BallGame/)*

This assignment was set to assess many different things:

1. **Object-Oriented program design**  
  That was the focus of COMP204
1. **Programming in groups**  
  This assignment was set for pairs of people. I worked with someone I met in the halls the previous year: [Tim](http://tmh.nz). I knew a little about git at this point, so decided to use it for this project, allowing us to work on different areas of the app at the same time. Not quite classic pair programming, but it still turned out well.
1. **Android's lifecycle**  
  Always an important thing to learn. This paper touched on why it was important, but more explanation came in COMP548.
1. **Using sensors**  
  Sensors are what set mobile development apart from normal development. Thre's a weath of device information that can be gathered. This game needed to use the gyroscope to determine device orientation, and use that in the game.

Tim and I were able to complete our task, and create a game where a ball moves with gravity. So did everyone else in the class, of course. Theat was the goal of the assignment. It was interesting to look at other groups' apps and see how they were different.

## NMS Information Repository

**Personal Project**

*[Repository (#1)](https://github.com/SecretOnline/NMS-Info/)*  
*[Repository (#2)](https://github.com/SecretOnline/Info-Repo/)*

It was around this time that the video game [No Man's Sky](https://www.nomanssky.com/). Information on the game was relatively scarce, but work had been done on the [subreddit](https://www.reddit.com/r/NoMansSkyTheGame/) to collect it all. However, it was a bit of an annoyance to search through and provide links to. I set out to create an easily linkable and searchable collection of all the information about the game, complete with the sources for the information.

![The first version of the Info Repo](/assets/posts/4yrs-code/nmsir1.png)

The website ended up being relatively popular throughout the community, which was fantastic. I kept it open source and ad-free, and worked with another group who were building their own NMS-related website. I also completely rewrote it, which allowed me to experiment with server side rendering for the first time.

![The updated version of the Info Repo](/assets/posts/4yrs-code/nmsir2.jpg)

I learned two major things in making the Info Repo:

1. **UI/UX Design**  
  While I had the basics before, this provided me with an opportunity to try new things, and really focus on how a website looked and felt. This ended up being my go-to look for all web projects I did for the next year. Inspiration from it still exists in most of my later projects.  
  By doing this, I learned that I actually liked design. Thinking about how users interact with software, and how we can reinforce the right behaviours, is an interesting subject. This project made me realise how important design (visual, application, user experience) is to software.
1. **The React framework**  
  Version 1 of the website was created without any libraries. Just pure Javascript. It showed me how I could create a full interactive single-page website. I learned a lot about DOM manipulation and trying to keep a larger file organised.  
  Version 2 was written using the React framework. This meant that I didn't have to directly worry about the DOM, and instead just declare the structure of the application.  
  The Info Repo proved to be a valuable practical lesson in using the React library, which I have used in many of my personal projects since.

# Third Year

## Functional Pathfinding

**Assignment, Semester A, COMP316**

[Repository](https://github.com/s-thom/uni-16A-316-Pathfinding/)

This paper was taught using the functional language [Clojure](https://clojure.org/). The goal of this particular assignment was to implement pathfinding through an ASCII maze using [Breath First Search](https://en.wikipedia.org/wiki/Breadth-first_search), [Depth First Search](https://en.wikipedia.org/wiki/Depth-first_search), and [A*](https://en.wikipedia.org/wiki/A*_search_algorithm).

I ended up finding that working in a functional way was quite satisfying, and I started to use some of the ideas in other projects. It also helped me understand how to do state management better, which has saved me a lot of time, especially in larger projects.

## Modification of MINIX

**Assignment, Semester B, COMP301**

[Repository](https://github.com/s-thom/uni-16B-301-MINIX/)

This is the most techinically challenging work I have done so far. COMP301 was about operating systems, and was taught using [MINIX](https://en.wikipedia.org/wiki/MINIX). For the final assignment, we split into groups of 2 or 3, and were given a long list of options. Only one group could take each, so I quickly searched through the list to find the ones that were most achieveable given the time. I teamed up with [Jayden](https://wand.net.nz/user/jfh13) for this assignment, which benefited us both quite well.

The project we settled on was to extend the [IPC](https://en.wikipedia.org/wiki/Inter-process_communication) server to allow processes to subscribe to chaneels and receive updates, or to create channels to push updates to. Originally, we started by creating an entirely new server, but after spending 2 weeks trying to get it to start on boot we decided to instead attach it to the FS (because that's always active).

Our solution, in the end, involved storing subscribers in three linked lists in each channel:

1. Waiting for a message (subscriber's process is blocked)
1. Received the message (to avoid duplicate sending)
1. Haven't received the message, but haven't requested it (don't send message immediately, or will block the FS)

It wasn't until we had submitted that we realised that we could have done it wihtout having to deal with transferring items between lists. Time pressure makes spaghetti code ~~possible~~ *probable*.

In the end, I believe we were one of the few groups to finish that assignment, and we are one of the last. This assignment has since been removed from the course. I understand the reasons why, but it was a great challenge, one you could be proud of. This work in C was important to us both, especially to Jayden as his honours project was entirely C-based.

## bot

**Personal Project**

[Repository (#1)](https://github.com/SecretOnline/NMS-irc-bot/)  
[Repository (#2)](https://github.com/SecretOnline/secret_bot/)  
[Repository (#3)](https://github.com/SecretOnline/bo/t)

bot is probably the single project I have kept going for the longest period of time. What started off as a simple IRC bot has evolved into a bit more than a simple bot. This project was actually started around the same time as the [NMS Info Repo](#nms-information-repository), but it took a little longer to get off the ground.

One of its major features is recursive command processing, where commands can be chained together. For example, `~youtube` searches YouTube for a video, and `~request` adds a video link to the music playlist. Putting the two together, `~request ~youtube mahna mahna` will add [this video](https://www.youtube.com/watch?v=8N_tupPBtWQ) to the music playlist.

The bot has gone through many versions, often with major changes to its internal working. In its current version, the bot is able to connect through various methods (at the moment it only uses [Discord](https://discordapp.com/), though it has used IRC in the past). It continues to be an interesting project to work on, as the are always improvements to be made or ne features to add.

# Fouth Year

## Image Recognition

**Assignment, Semester A, COMP548**

*[Repository](https://github.com/s-thom/uni-17A-548-ImageRecognition/)*

The second assignment for the mobile apps paper was to create an app that could request something using the network, store in in a database, share it to another application, and provide some additional functionality beyond requesting, storing, and sharing.

Since I knew the next one would involve using one the Google APIs, I thought I'd get a bit of practice in and have a better understanding of the process. Google had announced their [Cloud Vision API](https://cloud.google.com/vision/), and I wanted to play around with it.

So I did. The app allows you to take photos (or pick from the gallery), send them off to Google, who sends back a list of what was recognised in the image.

*Note to anyone wanting to use Cloud Vision: Pictures of flowers, cars, and animals are the fastest to process. Probably because of the large amout of training data available to the neural network.*

## eBook Reader

**Honours Project, COMP520**

*[Repository](https://github.com/s-thom/520-reader/)*

This was made as part of my Honours project. I plan to write a fair bit more on that when I'm ready. I'm still thinking about exactly how I'll write about it.
