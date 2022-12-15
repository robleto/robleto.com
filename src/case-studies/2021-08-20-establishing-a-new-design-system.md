---
title: Establishing a New Design System
author: Greg Robleto
date: 2021-08-20
tags: ["case-study", "featured"]
image: /img/case-studies/tokens-and-elements.png
imageAlt: Tokens and elements from the Design Library
length: 6
lede: A case study in finding an entirely new style and installing a custom design pattern library in the process
---

**My Role:** Concept, Creative Direction, Product & UX/UI Design Strategy, Design Systems Strategy, and Architecture  
**From:** September 2020 - July 2021


### The Challenge

Senior leadership was dissatisfied with the design look and feel. Further details were not explicit.

* * *

### The Opportunity

Years of tight deadlines and limited resources resulted in barely keeping afloat with a system loose Bootstrap-based patterns. The vague but pointed direction for improvement provided the window to document the system as we reimagined the styles and designs to meet leadership’s preferences.

* * *

### The Drawback

The primary audience we were serving with this project was not our paying members. The metric of success was not aligned with serving their needs.

![](https://cdn-images-1.medium.com/max/800/1*xanIetlVnkZOygGiMXBF5w.png)

Style tiles from past redesigns

* * *

### My Role and Process

I orchestrated the end-to-end strategy of running parallel tracks to deliver the stakeholders the refresh they sought while at the same time setting up the infrastructure to capture all the resulting changes in a Design Pattern System that would become a shared resource for designers and developers.

#### Track One — Finding the New Design

1. **Brainstorming Sessions  
    **I set up committees of trusted voices in Product, Tech, Editorial, Investing, Business Intelligence, and Marketing. This collective explored what was working and problematic in our current system. Our team met with regularity, diverging and converging, again and again, finding the best path forward.
2. **Competitive Research  
    **I directed the UX Research team’s investigation into reverse engineering the design patterns of other finance and media companies, the preferred favorites of our leadership team. We documented where each thrived or was lacking and what were the distinctive features of each product.
3. **Customer Interviews  
    **My team conducted user research with key stakeholders to better understand what the key senior leaders were thinking in calling for a redesign. (The leaders were not made available). Their insights helped to establish guardrails and prioritization based on their known issues and pet peeves. We further did connect with active users of the site, members from new to advanced investors, to understand their UI and UX pain points and try to find alignment.
4. **Mood Boards  
    **Seeking a low-fidelity approach to gauge if the designs were moving in the right direction, I directed the Designers to create Mood Boards (or Style Tiles) to provide a motif of the different approaches. The established committees provided feedback; the Designers refined their concepts. The resulting deliverable was rejected and believed to be too abstract to share with senior leadership.
5. **High-Fidelity Design  
    **Returning to the drawing board, I had my Designers convert their motifs into a sample set of high-fidelity mockups. I provided an assortment of five sample pages reflective of major tentpoles of the site experience. I captured each as a control version and then had each Designer provide mockups of their updated versions. All mockups were folded into Google Slides, creating a portfolio of ideas to share with senior leadership.
6. **Demoing to Stakeholders  
    **Senior leaders surprised us by selecting the approach that was the envelope-pushing and most contrarian to the feedback of what he would approve. They did not provide the rationale for the decision.
7. **Evaluative Testing  
    **Leveraging a rapid-feedback development process, I would lead demoing the new design multiple times a week. Each new demo included new pages to visualize and refinements based on previous feedback. This process continued until all site styles and components had been reviewed and approved to be part of the new site redesign.

_At this point, these stages intersect with the parallel Design System track._

![](https://cdn-images-1.medium.com/max/800/1*3Pm16y3m5TxJ7UGwdBKU4w.png)

One of the more graphical submissions for the redesign

* * *

#### Track Two — Establishing the Design System

1. **Process Brainstorming  
    **Collaborating with Design and Development stakeholders and the CTO, I proposed recording all-new design elements in Sketch (later adopted into Figma). Those design elements would then be kept in sync with the coded versions in Storybook used for development. We hammered out the pros and cons of the concept and settled on a process.
2. **Flow Diagrams  
    **I crafted the plan for the flow of information between the Design library with the Developer’s storybook library to align stakeholders and establish a canonical source of truth.
3. **Design Tokens**  
    Recognizing that Storybook would need a core config file with the key atomic elements, I led the Designers and Developers in establishing Design Tokens. These tokens were the simplest of style elements: such as primary colors, fonts, padding and margin proportions. These Design tokens became the first piece of the Figma library and the .config file that Storybook components would reference.
4. **Testing a Prototype**  
    Working with a team of lead Designers and Developers, I guided the setup of a working prototype to test the process for pulling elements out of the new redesign high-fidelity mockups and incorporating them into reusable design patterns in Figma and matching Vue.js code components in Storybook.
5. **Library Building**  
    With each consecutive prototype demo of a new page, tool, or template (uncovered through the Testing the other track), we introduced new design features to be captured, categorized, and incorporated into the growing Design System library in Figma.

_At this point, these stages intersect with the parallel New Design track._

![](https://cdn-images-1.medium.com/max/800/1*XSNg2-4u4fsrjq3RhTfRBA.png)

Libraries in Figma

* * *

#### The Tracks Connect — Site Redesign with a matching Design System

1. **Development Process  
    **As the redesign met final approval and was ready to move to code, I met routinely with Design and Development leads to oversee converting the Figma library to Storybook. I regularly collaborated with Tech and Product Management team leaders to step through the designs and break into iterative work the team could accomplish in Sprints and stories.
2. **QA and Visual Testing  
    **When near launch, I led the design team in visual testing each page to see that each component matched the original treatment in the Figma library. Further, I ensured the whole equaled the sum of the parts and that the developed page on the redesigned site met the expectations approved in the Figma prototypes.
3. **Improvements and Additional Features  
    **Following the launch, I monitored the incoming feedback channels for insight into where users found fault with the new redesign to try to make minor improvements to serve their needs. I had check-ins with the cross-functional committee to ensure the redesign successfully served their part of the business. I met routinely with the designers and developers closest to the Design Systems to check in on new developments and curation needs.

![](https://cdn-images-1.medium.com/max/800/1*LghFnifzl9psK_TGFoLxIg.png)

Page snippets from the approved redesign approach

* * *

### The Solution

What started out seemingly vague and subjective became an opportunity to allow the bright talent in the Design department to provide new concepts and fresh ideas to the company and provide an overdue upgrade to the UI of the websites. All the while, we set up the company’s first Design System library.

* * *

### The Impact

The new redesign had a short but successful tenure bringing a fresh new approach to the website UI. It wasn’t long before senior leaders noted it was also now dissatisfying, and we would need another subsequent redesign.

However, the Design System created in parallel during that overhaul outlived the first and now even the second design iteration. Having the Design System in place has expedited the ability to make adjustments to the UI and quickly incorporate redesigned components into the overarching system.

When not redesigning, the Design System has also proven invaluable in taking the burden off the individual designers and developers. Following the launch of the component-based system, the time to market and resource costs required for new product development dropped by a staggering 92%.

![](https://cdn-images-1.medium.com/max/800/1*U3HJ00wJ0DeEU5WLwkEI5g.png)

Updated Find Stocks page concept to build with Design System components

* * *

[Get in touch](https://robleto.typeform.com/to/cN9h6m) for more details.