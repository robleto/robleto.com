---
title: How to get SnagIt to convert to PNG images automatically.
author: Greg Robleto
date: 2022-11-22
tags: ["post"]
image: /img/blog/snagit-to.png
imageAlt: Converting SnagIt to PNG images
length: 4
lede: In short, it can’t be done seamlessly; the default file types, snagproj and snagx are proprietary and only operate within the Snagit tool.
---

In short, **it can’t be done seamlessly**; the default file types, `snagproj` and `snagx` are proprietary and only operate within the Snagit tool.

On my Mac, I cannot pull these file types into Preview, Photoshop, or any other conversion, so this limitation takes automation tools like Hazel off the table.

All is not entirely lost, though. There are a few alternative workarounds that at least reduce some of the steps.

* * *

### Workaround 1 — Setting a \`to File\` Preset

At the bottom of the SnagIt popup is the Presets bar, allowing the user to set up their own custom conditions. The [documentation](https://www.techsmith.com/blog/?post_type=tutorial&p=145411&utm_source=product&utm_medium=snagit&utm_campaign=sm21) shows examples such as making a `200x200 image with border`, a `panoramic scrolling capture`, and `web image to folder`. That last one matches up with where we want to go. On my Mac, I set up a new Preset and labeled it `Image to File`.

![](https://cdn-images-1.medium.com/max/800/1*6ECHsdcgaSGBgSCC4NB9_w.png)

I am utilizing the `Share` setting in SnagIt, which has many options of where to share, including Slack, Youtube, Dropbox, or most of Microsoft Office. For the needs of just trying to get to a saved PNG file, I am using the`File` share destination.

![](https://cdn-images-1.medium.com/max/800/1*ckYxTuGh_fx8S54r7oKgxQ.png)

In the `File` settings, I have it set to automate the name as SnagiIt typically does with date-based naming. Then I have it send the rendered file to a specific location on my machine. (for my needs, the images are going to a folder under the Mac `Pictures` directory called `Snagit as Images` that I set up as a sibling to the SnagIt default `Autosaved Captures` folder that stores all the `snagproj` files.

![](https://cdn-images-1.medium.com/max/800/1*r5oudyOYmUtxuiDrEAyrNQ.png)

Viewing the saved PNG files in the Snagit as Images directory.

So, since this Preset involves moving a file out of the SnagIt app and into the file system, it will follow the rules in `Settings > Advanced > Drag and Save format` and automatically convert the `snagproj` file to a `png` format.

* * *

### Workaround 2 — Using Yoink

The above approach is practical for automating the conversion to a local PNG file, provided I know to start with that and use the Preset when beginning the screen capture. But what if I forgot or already have the image in the Recent Captures tray? How to proceed.

Typically this ends up being a two-step process of dragging the image from SnagIt to my desktop and then dragging it again into Slack or Figma or whichever application I need the screen capture in.

![](https://cdn-images-1.medium.com/max/800/1*gPp9yUUCr-WrsTJPpA8q0A.gif)

The 2-step of moving a file out of SnagIt and into Slack leaves a file on the Desktop

The fallout of this process is that it leaves residue. I find images on my Desktop and in my Downloads and other folders that I didn’t intend to keep.

The solution here is [**Yoink**](https://eternalstorms.at/yoink/mac/index.html), the Mac-based tool that temporarily stores clipboard items.

The tool Yoink works like a boosted-up clipboard for copy/paste. It solves the current issue because I can drag the `snagproj` file over to Yoink, which will convert to a png or jpg as intended. However, the file is only temporarily stashed in Yoink, so I’m not leaving residue around my machine.

* * *

### Workaround 3 — Exporting

The previous two options were saving a single Snagit. If you want to convert multiple `snagproj` or `snagx` files at once, then the Export feature in Snagit can do batch conversions.

Click on any and all images you want and choose `File > Export Items` from the top menu. This will open a screen allowing you to provide a common naming convention, set a destination folder, and select conversion to PNG, JPG, GIF, or other options.

![](https://cdn-images-1.medium.com/max/800/1*NGytE5CXfkgAdqtt3sZZFw.gif)

Using Export Items to batch conversions to PNG

* * *

### Conclusion

While I cannot find a direct and automated means of getting SnagIt to produce PNG files, multiple approaches are just a few extra clicks to get the images you need.

But please tell me if I am wrong and if you know an alternative method to automate the process better.

Thanks for reading

* * *

_Disclosures: All thoughts and explanations — the accurate ones and especially the inaccurate ones — are all my own and do not reflect my employer, who likely has never heard of the tool SnagIt. Has this been helpful? Reach out and let me know, and follow for more similar posts about design, coding, and more.