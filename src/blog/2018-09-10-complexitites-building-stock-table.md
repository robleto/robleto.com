---
title: The complexities of building a stock table using International data
author: Greg Robleto
date: 2018-09-10
tags: ["post"]
image: /img/blog/stock-table.png
imageAlt: The complexities of building a stock table using International data
length: 6
lede: Recently I had the opportunity to help build out a stock data table that included a series of both US and International exchanges. That turned out to be a lot more complicated than a US only stock table. 
---

Recently I had the opportunity to help build out a stock data table that included a series of both US and International exchanges. That turned out to be a lot more complicated than a US only stock table. Here’s my assembled list of vexing issues when working a feed or series of feeds that is a mixed set of US-based and International data.

* * *

### **Price**

The first issue that may come up when working with international data is that you are now beyond just dollars and any formatting of the currency that hard-codes or injects “$” is not just incorrect but is mostly likely inaccurate. The resulting price could appear correct and may pass any smoke or even sight tests, but the resulting number infers a conversion of (say) price in Ywan to price in dollars, but really you are just incorrectly showing the Ywan price with a dollar sign.

Ideally the data provider is also providing the currency, but if not, there may be an opportunity to develop a small dictionary or tag that can pull in the exchange and glean (read: guess) the right currency from that. So if the stock data shows it’s on the Hong Kong index, you can map it to the CNY instead of the USD.

The once you have a currency, there is the vexing UI issue of how to display it. The Ywan, Yen, Pound, Euro, all have single-character symbols like dollar, but they are not necessarily always expected in the same place before the numeric digits.

You could refine your mapping to set a target placement of the symbol (before or after the digits), but the result would be a data cell that would not line up to read cleanly down the column. I can’t prescribe a “right” solution here, but my take was to pull in the currency shorthand (CNY, JPY, GBX, EUR, USD) and display it after the number. It reads a little strange for US numbers, but it can standardize the table to render in a predictable way no matter what currency is provided.

* * *

### **Exchange**

Surely, any stock data feed will include the name of the exchange, so displaying the data in the Exchange column should not be the issue even for International stocks. The complexity comes if you have to use exchange + ticker as the key to pull in from a second provider. Then it’s imperative the exchange be provided in a way that’s predictable.

In my experience this is less standardized than I would expect. The Hong Kong exchange can come in as SEHK or HK. The Japanese exchange TYO may also be rendered as the JASDAQ. So, it may be necessary to have to map together the different ways of setting exchange in order to be able to properly pull in and display data.

* * *

### **Dividends**

As best I have been able to understand this, European stocks generally pay dividends once a year and in a specific amount (95 cents or 30 cents) where American stocks pay mostly quarterly and at a rate (3% or 4.2%). So any assumptions about dividends (such as displaying it in a percent, or doing the calculation of the yield to produce the amount) have all sorts of ways the resulting data can be wrong.

* * *

### **Market Cap**

It’s not unprecedented for, say, a smaller growth company to have a major stake owned by a larger blue-chip company. As I understand it, that blue-chip company’s shares in the growth company are not tradable as publicly tradable shares, but they are still shares.

I’ve seen this before when there are different share classes within a US company (a private class and a public class or shares). The private shares are also not publicly tradable but they are still shares.

I don’t know if this used to be uncommon and now is more frequently occurring, but my experience is that it’s hit-or-miss if a feed provider is showing the tradable shares as the Market Cap, and as seen above, that is not necessarily correct. It can be. Those two numbers can be the same, but if there are private shares in the mix, then the number coming through may look right and may pass smoke tests but could very well be factually inaccurate.

* * *

### **Pounds and Pence**

After a long day of tracking down discrepancies with international stock data this one can be just infuriating. It’s not unexpected for feed A to display data on the London Stock Exchange in pounds and feed B bringing in the LSE data in pence. This is so bizarre to me, but it can happen, and may require a check and recalculation after the feed in brought in to make sure the adjacent columns of data from different feeds are either all displaying pounds or pence.

* * *

### **Numeric Tickers**

Finally, to round out this list of learnings, I wanted to make a note for myself that it’s presumptuous to assume that all stock tickers will be alphabetized. The Tokyo and Hong Kong exchanges both use numeric ticker symbols. So code validating on a series of letters will error with these Asian exchanges.

* * *

Wow, that got really in the weeds. Thanks for sticking with me.

Recognizing these subtle elements you need to account for will hopefully help you decide on what to look for in your data feed provider, or perhaps my experience can help you scope the level of complexity you’ll undertake in designing and developing a stock table that includes a mix of US and International stocks. Thanks for reading.
