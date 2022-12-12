---
title: How to use Codekit .kit partials on your site
author: Greg Robleto
date: 2022-01-20
tags: ["post"]
image: /img/blog/codekit-partials.png
imageAlt: How to use Codekit .kit partials on your site
length: 7
lede: I discovered the simple reason why the Codekit partials would not compile into the pages of my static site…
---

Running the native Mac app Codekit to build a small website

I scoured the Internet for clarity on why the Codekit partials I created would not compile into the pages of my static site. I found no reference, so I am writing one to help you and remind my future self.

> **TL:DR — Make sure the files importing the partials are also .kit files.**

* * *

### What is Codekit

Codekit is a lean GUI tool for building semi-sophisticated non-static websites on Macs (it’s a Mac-only app) without all the bloat and complexity of most web frameworks.

It’s not free, costing about $40 for a license after the trial expires. It may not be for everyone, but it very much suites the way I build websites.

* * *

### Why I prefer Codekit

#### Codekit has a user interface

I am just one of the rare breed of web developers that would prefer to use an app instead of typing into the Terminal. Being a designer as well, I prefer a well-designed intuitive application over memorizing a series of keywords, even if that slightly sacrifices efficiency.

#### I can code the code I need

For decades I have worked in enterprise-level codebases built on frameworks like .NET or Django and found myself learning the intricacies of each framework just to successfully avoid them. I recognize there is a lot of value to back-end engineers especially, but when looking to add to the user interface level, all that code is an obstacle course, to get around and through just to build and style a new page.

#### It is easy to set up

When using the .NET or Django frameworks at work, building my local environment typically took me more time than actually coding the project. When developing my own small sites, I want to leave those complex frameworks behind and go back to basics, (well just slightly above basics) and that’s what Codekit does pretty much out of the box. I’ll explain my setup in the next section.

![](https://cdn-images-1.medium.com/max/800/1*Td7ORxeN_jA4gEqcsYa9tg.png)

The CodeKit app Interface with a small portfolio site compiling.

_(I know there are alternatives that also meet these criteria and I am happy to explore them, but today my preference is CodeKit)._

* * *

### How I setup Codekit

If I am building a small site without a database, I just want basic HTML for structure, a little light Javascript for functionality, and a hearty helping of CSS to style the page. At times, for the sake of learning, I would like to wrap all this in React of Vue.js, but if just putting an idea to page, this is my most elementary setup.

I take that back, I would prefer to use SCSS to straight CSS. That becomes the first hurdle that requires a local compiler. I could just run Node-sass in my Command-Line to convert the changes, but I really am drawn to the structure that Codekit provides by default.

#### Source and Build folders

The structure I use in Codekit is a **Source folder** and a compiled copy of that code that is cloned to a **Build folder**. I am coding into the files or adding assets like fonts or images into the folders within the Source folder. With each change, the respective updated elements in the Source recompile and update the Build folder. The Build folder output is what I have displayed locally in my browser as I code the page. Pretty straightforward.

Since my preference for styling is **SCSS**, I write that in .scss files in the Source folder that is converted to browser-readable .css files in the Build folder. To confirm this, in the Codekit app interface under `Settings > Languages > Sass` set the Output Folder destination and see that the Output Filenames are converted to **CSS**. These are default settings, as well as the libsass compiler, so very little should need adjustment to get started.

![](https://cdn-images-1.medium.com/max/800/1*mJgpXCEMP2-mNFSkESG1Jw.png)

Setting the output folder and filetype for SCSS compiling

* * *

### The Problem with Partials

A key reason no one codes in basic HTML anymore is because of the problem with partials. In straightforward basic coding, unless you are building a single-page site, there is no good way to avoid having duplication of code on each page.

Code like the metadata in the `<head>` of the page, or the navigation or the header, logo, or footer. All of these elements are typically consistent from page to page. This means you would be writing the same code over and over and breaking the cardinal rule of software development to keeping clean code by writing it once.

The frameworks like React, Vue, Django, or .NET can offer this feature, but as I noted above, at the cost of incorporating a whole framework that you are working around if it’s not necessary for your site. That doesn’t sound like clean code either.

### How Codekit Solves for Partials

The way to set partials using Codekit is to use their .kit file type. If that sounds offputting, I do agree, but I looked up and this is not proprietary, it’s open-source and it’s actually really easy to convert back out of as necessary.

To use, you copy your code used across multiple pages, like the navigation, and save it as a .kit file. So that most of this

![](https://cdn-images-1.medium.com/max/800/1*zL9owdCINhZdHdvtUW9jtg.png)

gets moved to a partial, that is now referenced like this

![](https://cdn-images-1.medium.com/max/800/1*ChOOYwNkwB0YpCAXmohBhQ.png)

All the code in the `<nav>` is now moved to a partial file on the same level as this page called `_nav.kit` _(The convention of using underscores to designate the partials is my own, not a requirement of Codekit)_.

#### But it isn’t working

Here’s the problem that started off this whole article. This is not working. I look in my browser and now the navigation is no longer showing on the page. I return to Codekit, flip the tab on the right side of the app and it shows my `_nav.kit` partial is not being imported into any pages.

![](https://cdn-images-1.medium.com/max/800/1*G2ATpDd3oNr_yX8_cAT0yg.png)

This is where I got stuck for hours. This is where I scoured the Internet and came up empty. There are articles about using .kit partials including the documentation of Codekit itself, but there was nothing troubleshooting this particular issue. Why were the .kit files not being imported into the .html files?

#### Finding the answer

To finally resolve this, I left Google and went to GitHub and searched up sites using .kit to see if I could find one that worked and be able to spot the difference. To my surprise, the answer I was looking for was on one of my own sites that I coded up 4 years ago.

![](https://cdn-images-1.medium.com/max/800/1*_5rl2l7RcEUZnqc3f48OMQ.png)

Can you spot the difference?

The key to making this all work, (which I once knew but clearly forgot), was that the actual pages, the files _doing_ the importing, needed to be reset as .kit files as well.

![](https://cdn-images-1.medium.com/max/800/1*mDqLsL4BLFjjexUt-ZddZg.png)

Once the pages in the source folder have been changed to `.kit` files as well, then everything just starts working correctly. This seems like it shouldn’t, since browsers cannot read this file type. But just as Codekit converts `.scss` files to `.css` it also has settings for Kit Output to set the Output Folder and Filename so the `.kit` files are converted to `.html` when moved to the Build folder that the browser reads.

![](https://cdn-images-1.medium.com/max/800/1*CPqOcF7Gdiu-GegXr-T7JA.png)

Setting the output folder and filetype for KIT compiling

And with that, I have the partials I was looking for. Outside of the actual imports, all the code I write in the source is still just HTML, the code needed to build the page, not to construct a larger framework.

There is more still that can be done with these `.kit` partials including adding in variables to be able to customize the shared partial differently for different pages, but that’s a topic for another article to come later.

Thanks for reading

* * *

**_Disclosures: All thoughts and explanations — the accurate ones and especially the inaccurate ones — are all my own and do not reflect anyone else including my employer, The Motley Fool, who I’m doubtful has even heard of Codekit as a development tool. Further, I receive no compensation or benefit from Codekit for advocating for their product. I pay to use it. I just like using it. These images are screenshots from my developing an updated version of my personal website_** [**_robleto.com_**](http://robleto.com)**_. That was fun to build, check it out._**
