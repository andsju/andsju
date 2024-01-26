---
layout: post
title:  "Robots and Humans"
date:   2015-11-10 13:00:00
categories: web
---

Lite info om textfiler som kan placeras i root-katalogen för en viss webbplats.

### Robots.txt
Filen robots.txt använder man för att för att ange hur sökrobotar / spindlar ska hantera en webplats.
Det är enkla instruktioner som skrivs efter en speciell syntax. Målet kan ex vara att undvika att en
spindel analyserar sidor i speciella kataloger, eller att berätta för en viss agent vad som ska undvikas.
Filen `robots.txt` placeras i webbplasens root-katalog.
Konfigurerar man inte en `robotx.txt` så har sökrobotar fritt fram att analsyera och ev indexera sidor som sökmotorn hittar.

Meddela alla sökspindlar att förhindra analys av katalogen `myfolder`

`User-agent: *`

`Disallow: /myfolder/`

### Humans.txt
En fil som kan placeras i root-katalogen och ge en viss merinformation till aktuell sajt.
Initiativ-tagare till filen har som slogan "We Are People, Not Humans. Den här filen är lite kuriosa,
men tanken är god  - att visa textinformation om en websajt. Kanske ASCI inspirerade humans.txt är lite trevligare...

[×º°°º× internet med versalt I ×º°°º×](/humans.txt)

Kolla ex [Netflix](https://www.netflix.com/se/humans.txt) som har en ASCI inspirerad fil.
