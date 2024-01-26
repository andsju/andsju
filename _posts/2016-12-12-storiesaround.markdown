---
layout: post
title:  "Storiesaround"
date:   2017-08-25 10:00:00
categories: web
---

Storiesaround är ett CMS - Content Management System. Det är en relativt stor applikation som jag framförallt kodade mellan åren 2017-2020. 


Dessförinnan kodade jag ett par mindre CMS, men kom fram till att det vore intressant att utveckla ett större system. Det var helt enkelt mer intressant att koda ett system från scratch än att koda plugins till Wordpress.

Jag lärde mig mycket under utvecklingsarbetet, och kan se på applikationen med stolthet. Det finns en mängd funktionalitet inbyggd, och det finns stöd för plugins och widgets. Systemet används på några få publika webbplatser. 

Applikationen hanterar WYSIWYG editor - kommer med TinyMCE, har kalenderfunktionalitet och bildhantering och annat...  

**Applikationens namn - Storiesaround - baseras till viss del på de sätt finns i systemet för att *puffa* fram sidor. Applikationen kan referera till olika *stories*, där kortare sammanfattningar av artiklar (sidor) hanteras som puffar.  Begreppet "puff" används inom journalistik, ursrpungligen inom tidningsvärlden.** 

Möjligheter till att puffa stories

- Promoted stories (taggade)
- Child stories (hierarki)
- Event stories (datum, kalender)
- Selected stories (selektivt utvalda)


Här kommer ett tips som jag kan dela med mig till andra som vill ge sig på att utveckla publiceringssystem. Hitta en avvägning då det gäller att implementera funktionalitet kontra dokumentera systemet för användare som ska hantera systemet. Om man är flera utvecklare tvingas man att dokumentera för varandra. Är man ensam utvecklare är det lätt att koda på, och därmed missa att det gränssnittet som man skapar kanske inte är lika glasklart som man själv upplever :)


*Applikationen är uppdaterad i början av januari 2024 (stöd för PHP8)*

![image](/../images/posts/storiesaround-1.png)

![image](/../images/posts/storiesaround-2.png)

![image](/../images/posts/storiesaround-3.png)

![image](/../images/posts/storiesaround-4.png)

---

Teknik
- PHP
- MySQL MariaDB
- jQuery
- TinyMCE

Webbplats:

<a href="https://storiesaround.com" target="_blank">Storiesaround - webbplats</a>


Git repo:

<a href="https://github.com/andsju/Storiesaround"  target="_blank">Storiesaround GitHub</a>

Licensierad som GPL3
