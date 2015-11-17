---
layout: post
title:  "Blog posts and Open Graph"
date:   2015-11-09 15:05:00
categories: web
---

#Blog posts#

För att publicera blogg inlägg på en jekyll sajt beöver du skapa dina inlägg efter en speciell struktur.

Inläggen skapas i mappen `_posts`och namnges enligt följande:

`YYYY-mm-dd-sidans-titel.MARKUP`

Jag utgick från exempelfilen, kopierade den och skrev mina inlägg. För tillfället har jag endast en kategori.

#Open Graph#

Open Graph protocol lägger till viss funktionalitet för webbsidor för hur de kan integreras i sociala medier.
Exempelvis hur ska länken till en sida visas visuellt när länken delas på Facebook.

Protokollet beygger på att ange speciell information i meta-taggar. Protokollet skapades av Facebook.

{% highlight html %}
<meta property="og:title" content="{{ page.title }}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="{{ site.url }}" />
<meta property="og:image" content="{{ site.url }}/img/andsju.jpg" />
{% endhighlight %}

