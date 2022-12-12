---
title: How to lighten/darken a page and background gradients with pure CSS
author: Greg Robleto
date: 2022-10-02
tags: ["post"]
image: /img/blog/darken-bg-css.png
imageAlt: Ipads showing the progression of darkening the background using pure CSS
length: 5
lede: Finding pure CSS solutions to animate the darkening of both the foreground elements on a page and the background gradients too.
---

Finding CSS tricks that will darken both the foreground elements and the background gradients too

I should have emphasized “pure CSS. The fastest and easiest way to accomplish this effect is using an SCSS preprocessor. It has the `darken` feature built in, which will take care of about 85% of your needs.

![](https://cdn-images-1.medium.com/max/800/1*3IRVwTx9wOHw35uJXbWflw.png)

Examples of “darken” as found on the sass-lang website

But for me, that strategy didn’t meet two conditions that I needed, and I had to come up with an alternative solution.

* * *

### 1\. Darken in Pure CSS

💡 TL;DR Use the CSS filter: brightness attribute, set below 1.0

The first condition was that I was writing pure CSS. That meant the `darken` feature was unavailable for me to use, but the CSS `filter` attribute was.

The `filter` attribute has loads of potential game-changing features to bring more of your favorite design tool features into your code, including `blur`, `contrast`, `invert`, `saturate`, `sepia`, and even `opacity` is recycled here to give you another means of increasing transparency. But the one that is most relevant for darkening and lightening is the `brightness` feature.

Brightness runs on the same scale as opacity, `1.0` being the baseline and scaling up to raise the brightness of all colors. The inverse is also true; scaling down the number in decimals between `1.0` and `0.0` will deliver darkening capability within pure CSS.

I was animating a sunset, with the land and sky both darkening as the sun dips beyond the horizon line.

![](https://cdn-images-1.medium.com/max/800/1*kMYbzCvmv7SrG0mLNOkt3g.png)

This is all the HTML in the Divtober challenge. This day’s theme was “dry.

This was part of the [Divtober challenge](https://a.singlediv.com/divtober2022/) of making single-div CSS Art. Because the entire page was confined to being pieces of one `div`, it did have the desired effect of updating the whole image, everything on the page… except the background gradient.

* * *

### 2\. Darken the Background Gradient

💡 TL;DR Use a dark overlay and adjust opacity with keyframes.

The `filter: brightness` was darkening everything on the page except the background image on the body tag, which stayed vibrant and bright.

![](https://cdn-images-1.medium.com/max/800/1*bXGbq5qrKmyTqfyL5L77jQ.gif)

Filter: brightness was darkening the foreground items but not adjusting the background gradient

This is not how sunsets work. The first solution I attempted was to set up different gradients at different keyframes, like this:

![](https://cdn-images-1.medium.com/max/800/1*j8NqzCeXyMg6KcCnS6Mt5g.png)

Attempting to use keyframes to move from lighter to darker gradients was unsuccessful.

This is not a usable solution because there is no graceful transition between gradients; the background just abruptly jumps from one to the next at the point in time of the keyframe.

![](https://cdn-images-1.medium.com/max/800/1*GurDF6isdJ7jRRnTAeQf1Q.gif)

There is no graceful transition; the background just jumps between gradients.

I also tried using two background gradients and adjusting the opacity of the color layer. I converted my hex colors to rgba and set the alpha to decrease at each keyframe.

![](https://cdn-images-1.medium.com/max/800/1*wJRPcSJrv5mo5UDz-qQaYw.png)

Reducing opacity with RGBA, and attempting to let the darker 2nd background show through also failed.

This still was making abrupt cuts and was not providing the intended results:

![](https://cdn-images-1.medium.com/max/800/1*3i83t8ha0dJEUE0hxSLCfA.gif)

Keyframes with reduced opacity on the RGBA colors still jumped instead of transitioning.

I realized that `opacity` was the right direction, but as I had it applied within the RGBA, linear gradients just wouldn’t work. So I went with an approach I didn’t love but suspected could work; making a masking layer with a dark color on it set to transparent and then increasing the opacity of that layer with each keyframe.

![](https://cdn-images-1.medium.com/max/800/1*UiQYzTmL64kaEDo6Ygd2aQ.png)

Success when focused just on opacity, not trying to adjust the background itself.

This solution did indeed prove successful.

![](https://cdn-images-1.medium.com/max/800/1*HjgiShZF0mf_GSac9m3A2g.gif)

\`The successful version darkened both the foreground and the background together.

And not that this is relevant if you aren’t trying to adhere to the rules of Divtober, but I was still able to keep from adding a second `<div>` and by using the `:after` psuedo-class for the masking layer.

* * *

### 2\. Darken the Background Gradient (2nd option)

💡 TL;DR Transform one long linear-gradient.

I had this whole article finished here and was looking up source links when I discovered that [Keith J. Grant](https://keithjgrant.com/posts/2017/07/transitioning-gradients/) addressed this very solution, and [Chris Coyier CSS-Tricks post](https://css-tricks.com/transitioning-gradients/) built upon that work and offered alternative approaches, one of which stood out to me.

The 2nd option he shared in [this Codepen](https://codepen.io/chriscoyier/pen/eRbLWP) — use one long background that transforms — felt like the way a sunset works. I went back to work and adjusted my Figma templates to explore the colors of the sunset.

![](https://cdn-images-1.medium.com/max/800/1*f0_pTrOTT10LrowsBjkzDQ.png)

Adding in one long background gradient that will animate transform

then I added a minor update to my background gradient and a new animation:

![](https://cdn-images-1.medium.com/max/800/1*BD2O2lPdzi9PX5R-HzTyiw.png)

Adding to the linear-gradient and adding a transform animation.

Now the background image was moving with the sun as it set. This was looking how I wanted it. I made this my final solution.

![](https://cdn-images-1.medium.com/max/800/1*KYbs1BiZPWDiDyAcrYvpKg.gif)

The final solution has both foreground and background darkening as the sun sets.

* * *

If you want to see the project referenced throughout this article, you can find it in my Codepen collection here:
[https://codepen.io/robleto/pres/BaxYwwd](https://codepen.io/robleto/pres/BaxYwwd)

And I made a time-lapse video of building out this project available on my YouTube channel here:
[https://www.youtube.com/user/gregrobleto/featured](https://www.youtube.com/user/gregrobleto/featured)

* * *

_Disclosures: All thoughts and explanations — the accurate ones and especially the inaccurate ones — are all my own and do not reflect my employer, who does not pay me to participate in and write about CSS Art challenges. Big thanks to Jim Nielsen, Keith Grant, and Chris Coyier, the giants whose shoulders I stood on connecting their concepts into this treatment. If you want to participate in #divtober, there is a lengthy sign-up form to fill out… I’m kidding; just do it. Make something, post something, and share it with me; I’d love to see it._

> [**_Thanks For Reading, Follow Me For More_**](https://medium.com/@robleto/about)

![](https://cdn-images-1.medium.com/max/800/1*D0TUmEWRg40vXA8pqcXB_A.png)
