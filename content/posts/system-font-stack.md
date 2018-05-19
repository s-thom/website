---
title: The "system" font stack
layout: Post
bgcolor: '#15181A'
date: 2018-05-19T18:39
---

```css
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

# What is the system font stack

First, it is important to know why font stacks are important in CSS. 

Fonts tell the renderer (in this case the browser) how to display each character in the text. The problem comes in when fonts don't have every character (there are [over 136000](https://en.wikipedia.org/wiki/List_of_Unicode_characters) characters currently in the Unicode standard). Google's [Noto Sans](https://www.google.com/get/noto/) aims to support every character, which is no small task.

If a font does not contain a glyph for the given character, the renderer needs to find a backup to render instead. The CSS standard allows multiple fonts to be specified in the `font-family` property. If the first typeface does not contain the character, then the browser will fall back to the next one, and so on.

This means that the user will see the best font available, without needing to download any font externally. This website uses the system font stack for the main body text and headings. Try it out on different devices to see it in action.

## Parts of the stack

* `system-ui`  
  Chrome 56 added [support for system-ui](https://www.chromestatus.com/feature/5640395337760768), which acts like the rest of the system font stack, but won't need to change if system manufacturers update their design in the future.
* `-apple-system`  
  Apple added their own keyword for using the system font: `-apple-system`.  
  Why not just `system`? Well, that's because Windows has its own font named `system` in older versions of Windows.  
  There's an interesting [post by the Medium design team](https://medium.design/system-shock-6b1dc6d6596f) on this as they were looking at updating their design.
* `BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue'`  
  These are the default fonts on most systems.
* `sans-serif`  
  Finally, if neither of the previous items matched, then use the default sans-serif font of the browser.

If no glyph was found, then the browser will display � instead.

# Why should I use the system font stack

There are two main advantages to using the system font stack:

1. Users do not need to download any new fonts when they visit your page  
  Font imports are render-blocking in CSS, and will pause the loading of your page until they are downloaded.  
  This can be a major problem when on mobile networks, as this costs users more data and causes slower load times.
2. The font fits in with the rest of the device's visual style  
  Using the system default typeface means that the user is already familiar with the style of characters on your website, making it fit in with the rest of the device.  
  The user does not need to spend time deciphering the new typeface, which is especially important for people with reading disabilities like dyslexia.

![Even if that font is one of Samsung's...](https://core0.staticworld.net/images/article/2014/04/newfonts-100261130-medium.idge.png)

# When shouldn't I use it

If your brand uses typography as part of its identity, then the system font stack is probably not for you.

However, consider using the system font stack for main body text, and reserving your brand's typeface for headings. This still shows your brand, but still assists readability.
