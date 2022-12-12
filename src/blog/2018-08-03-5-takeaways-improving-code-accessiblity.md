---
title: Five Practical Takeaways for Improving Your Code’s Accessibility
author: Greg Robleto
date: 2018-05-03
tags: ["post"]
image: /img/blog/headphones.jpeg
imageAlt: Five Practical Takeaways for Improving Your Code’s Accessibility
length: 2
lede: I had the opportunity to hear a presentation by Aaron Gustafson at Accessibilty DC running through some very hands-on ways to improve your code to be more suitable to screen-reading.
---


I had the opportunity to hear a presentation by Aaron Gustafson at Accessibilty DC running through some very hands-on ways to improve your code to be more suitable to screen-reading. Here’s are five practical takeaways that I am implementing based off the notes I took from that talk.

**1\.** `**<b>**` **tags for names**  
I have no use at all of the `<b>` tag at this point, so repurposing it for adding impact for a name (or in the case of Motley Fool articles, a company name and stock ticker) makes sense as those don’t need the full impact that a <strong> tag provides, but there are still intended to stand out within the paragraph.

**2\.** `**class="hidden"**` **text for context**  
An `<input type="submit">` button as viewed on the screen has and rightly should have a short phrase like “Bookmark” as the button text but leveraging hidden `<span>` or again `<b>` tags provides the opportunity to give more context to the screen reader such that it could hear “_Click here to_ bookmark _this article_”

**3\.** `**download**`  
This is a standalone attribute name in the anchor tag that I was unfamiliar with, but you can see just simply download on an `<a>` tag to alert that the linked item is a file that will be saved to your computer.

**4\.** `**hreflang**`  
Another attribute name I had not used before. This one requires a value setting of a language code (e.g. `hreflang=”fr”`) that indicates that the resulting content will be in French, so the screen reader is aware of which language it will be interpreting.

**5\.** `**aria-invalid**` **and** `**aria-describedby**`  
I took for granted how visual the form error messaging can be, so leveraging the `aria-invalid` attribute to target the specific form field that is erroring, and connecting it with the `aria-describedby` attribute to reference the error messaging providing context about what is incorrect greatly boosts the ability to overcome the error on a screen reader.

**BONUS: “No one wants to submit to you.”**  
This was not a code tip but a note I took that I thought was very well phrased. I had already thought that using “Submit” as the text in a form button is pretty unintuitive and bland to begin with, but hadn’t considering the greater etymology of the word submit and the power inference that denotes.

I recommend if you have an opportunity to attend an [Accessibility DC](https://twitter.com/AccessibilityDC) event to attend, and if you have the change to watch/hear [Aaron Gustafson](https://twitter.com/AaronGustafson) discuss accessibility, you consider doing so. I am grateful for having attended and will be a better more empathetic coder for it.

Primary Photo by [Lee Campbell](https://unsplash.com/photos/GI6L2pkiZgQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/headphones?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
