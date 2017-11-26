---
title: Mars
layout: Project
bgcolor: '#BD4A2E'
github: s-thom/MarsAndroid
date: 2017-06-18T12:00
edited: 2017-11-23T09:41
---

Sometimes I feel like dropping what I'm working on, and taking up another project for a weekend. That's exactly what sparked the creation of Mars.

Mars is an experiment into [Microsoft's Project Rome](https://blogs.windows.com/buildingapps/2016/10/11/cross-device-experience-with-project-rome/#co1zlpQ31R9Lvvkx.97). Project Rome allows you to send URIs between Windows devices, and they recently opened it up so you can send from Android and iOS as well. You can find the docuemntation for Project Rome's API [on GitHub](https://github.com/Microsoft/project-rome). 

I use an app on my phone to send links to my laptop if I want to check it out on a larger screen (good for longer videos). I wanted to see what it would be like to build a similar app, but using Project Rome as the platform. 

# Why the name Mars?

In Ancient Roman mythology, Mars is the father of Romulus and Remus. Since this is based on Project Rome, I wanted to name it something in Roman mythology. Also, I suck at names.

# How does it work?

The vast majority of Mars' UI is in a single activity. Mars is not an overly complex app, so there was little point in splitting it up. The bottom navigation has three entries: to show a list of devices, to show a single device, and settings. These are implemented using Android's Fragment system, because there really isn't any other way of doing it.

However, UI isn't all that important in Mars. It's there to provide something more substantial than just the login screen. The vast majority of Mars works in the background. A background service is started that actually interacts with the Project Rome library, which updates the list of connected devices. Whenever that list is needed, such as when the list of devices is shown in the [Direct Share](/posts/android-direct-share/) menu, it is available statically in the `DeviceStorage` class. DeviceStorage is populated when the Service starts, and updated whenever a device is added/removed. DeviceStorage can also send a callback whenever the list of devices is updated, which is used by the DeviceListFragment displayed when the app is opened.

<Post url="/posts/android-direct-share/"></Post>

Then it's just a case of waiting for the user to share data to the app, which comes into the `LaunchUriActivity`. If the uer selected a device by using Direct Share, then it is sent straight away. Otherwise, a dialog is created so the user can pick a device to send to.

# Conclusion

A lot of the heavy lifting in the app was done by the library provided by Microsoft. That handled a lot of the login and sending, which meant that this could be a weekend experiment, instead of a week-long project. 

Right now I think the Project Rome API is a little limited on its own, and to do anything more complex requires the user to install an app on the receiving devices. Perhaps if there was more native support for actions such as copying to the clipboard then it would end up being a lot more useful.
