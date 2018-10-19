---
title: Simple Run-time Type Checker
layout: Project
github: s-thom/srttc
date: 2018-09-17T00:00
bgcolor: '#CB3837'
---

srttc is a Javascript library for checking the types of object during run time. It was born out of the want to check the validity of API call responses during development, so that the responses were verified to be valid (or at least identical to the specification). I built it so that it was easy to use, defining the structure of objects naturally, as you would in normal Javascript. As such, it ends up being extremely fast to use.

```js
const matches = srttc(
  {
    foo: 5,
    bar: {
      baz: [
        new CoolObject(),
        new CoolObject(),
      ],
      quz: {
        quux: 'some weird string',
      },
    },
  },
  {
    foo: 'number',
    bar: {
      baz: srttc.arrayOf(CoolObject),
      quz: {
        quux: 'string',
      },
    },
  },
);
```

One of the issues that I came across was that of circular references. If uncaught, this would lead the library into infinite recursion, eventually causing a stack overflow. The solution to this was to pass the list of parent nodes through each layer of the checking, ensuring that the current node had not been checked before.

This project was also an opportunity for me to investigate different unit test libraries for Javascript. In this case, I chose to go with Mocha. I ended up writing quite a few tests for srttc, as I wanted to make sure that it was doing what I wanted it to. As such, there is more code testing the library than the library itself. This was really useful at times, as I was able to confirm that any changes I made during development did not affect the existing functionality.

<Link url="https://www.npmjs.com/package/srttc" title="NPM Package"></Link>
