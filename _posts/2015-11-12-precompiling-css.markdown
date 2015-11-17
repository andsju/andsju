---
layout: post
title:  "Precompiling CSS"
date:   2015-11-12 10:00:00
categories: web
---


Precompiling CSS... först lite generellt kring formgivning. Jag har hållit på med layout under många år, både för tryck och webb.
Grafisk formgivning är i sina bästa stunder ögongodis - vackert för ögat.
Arbetar man med formgivning för webb & tryck så gör man klokt i att hålla utkik efter ordet som "format", "mall", "lager" etc.
Det är själva nyckeln till att bland annat testa olika varianter på formgivning, kunna hantera större projekt.

För trycksaker brukar det handla om styckeformat, teckenformat, tabellformat, mallsidor etc.
I programmering kan man lite grovt (kanske mkt) dra en parallel till variabler, subrutiner, funktioner.
Typ DRY - Don't repeat yourself.

Så har vi ett språk som CSS. I sin egen form lysande – vi kan skilja på struktur och layout.
Vi kan i de flesta fall skippa inline style och låta ett antal sidor formsättas efter enstaka css-filer.

Men i större projekt, eller komplexare sidor så kan CSS filerna både vara stora och många. Det är här precompilng CSS kommer
in i bilden. Färgsättning exempelvis, det kan kodas för diverse html element och samma färg upprepas då i en stilmall
på flera ställen via CSS selektorer.
Variabler och operatorer som finns i tekniken underlättar layoutarbetet.

Det finns förstås en och annan baksida också, webbläsare kräver ren CSS. Det blir ett mellansteg som måste till -
implementering av ett verktyg som tar hand om kompileringen.

