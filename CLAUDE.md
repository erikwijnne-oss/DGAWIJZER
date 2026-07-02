# DGAWijzer projectinstructie voor Claude Code

## Projectcontext

DGAWijzer is een Nederlands online platform voor DGA's, ondernemers met een BV, accountants en fiscalisten.

Het doel is om DGAWijzer uit te bouwen tot de beste online toolbox en kennisbank voor DGA-vraagstukken in Nederland.

De website draait om praktische fiscale tools, calculators, kennisbankartikelen en later documentgeneratoren en AI-agents.

## Doelgroep

De primaire doelgroep bestaat uit:

- DGA's
- Ondernemers met een BV
- Accountants
- Fiscalisten

## Belangrijkste thema's

De website is opgebouwd rond vier hoofdthema's:

- DGA Salaris
- DGA Dividend
- DGA Auto
- DGA Beleggen

Belangrijke bestaande tools:

- DGA salaris calculator
- Bruto/netto DGA salaris calculator
- Salaris versus dividend calculator
- Bruto/netto dividend calculator
- Beleggen privé versus BV calculator
- BV versus eenmanszaak calculator
- Vergelijkbaar loon zoeker
- Bijtelling calculator op basis van kenteken

## Strategische prioriteiten

Bij alle wijzigingen geldt deze volgorde:

1. Meer gebruikers
2. Meer calculatorgebruik
3. Meer terugkerende bezoekers
4. Meer e-mailinschrijvingen
5. Meer organisch verkeer
6. Meer AI-vindbaarheid / GEO
7. Verdienmodellen

Directe advertentie-inkomsten hebben lage prioriteit.

## Productfilosofie

DGAWijzer moet zich onderscheiden door:

- Praktische tools boven algemene content
- Calculators boven blogs
- Documentgeneratoren boven standaard templates
- AI-agents boven statische informatie
- Praktijkvoorbeelden boven theorie
- Duidelijke fiscale uitleg boven algemene marketingtekst

Nieuwe functionaliteiten moeten zoveel mogelijk aansluiten op bestaande calculators en fiscale vraagstukken van DGA's.

Voordat nieuwe functies worden ontwikkeld, beoordeel eerst:

- Is hier daadwerkelijk vraag naar?
- Verhoogt dit het gebruik van de website?
- Verhoogt dit terugkerend bezoek?
- Levert dit een concurrentievoordeel op?
- Kan dit later worden gemonetiseerd?
- Is de ontwikkeltijd in verhouding tot de gebruikerswaarde?

Focus op impact boven complexiteit.

## Werkwijze bij codewijzigingen

DGAWijzer wordt beheerd via GitHub.

Werk alsof iedere wijziging één afzonderlijke Git-commit is.

### Algemene regels

- Wijzig nooit onnodig bestaande bestanden.
- Wijzig zo lokaal mogelijk.
- Maak geen volledige herbouw van de website als een kleine wijziging voldoende is.
- Behoud bestaande URL's, tenzij expliciet anders gevraagd.
- Raak calculatorlogica niet aan zonder expliciete toestemming.
- Wijzig fiscale bedragen of wetsteksten alleen als de opdracht daar expliciet om vraagt.
- Voeg geen externe libraries of scripts toe zonder toestemming.
- Maak geen nieuwe pagina's tenzij expliciet gevraagd.
- Overschrijf geen werkende onderdelen die niet relevant zijn voor de opdracht.
- Controleer altijd eerst de bestaande structuur voordat je wijzigingen doet.

### Grote wijzigingen

Bij grotere functionaliteiten eerst een wijzigingsplan tonen met:

- betrokken bestanden
- nieuwe bestanden
- verwachte impact
- risico's
- testpunten

Voer grote wijzigingen pas uit na bevestiging.

Een wijziging die met 3 bestanden kan worden uitgevoerd heeft de voorkeur boven een wijziging die 30 bestanden aanpast.

## Oplevering na iedere wijziging

Lever altijd op in dit format:

### Nieuwe bestanden

- bestand1.html
- bestand2.js

### Gewijzigde bestanden

- index.html
- css/style.css

### Verwijderde bestanden

- geen

### Korte toelichting

- Beschrijf per bestand kort wat is aangepast.
- Vermeld of calculatorlogica wel of niet is geraakt.
- Vermeld welke pagina's handmatig getest moeten worden.

## Verplichte QA-controle

Voordat wijzigingen worden opgeleverd, controleer minimaal:

1. Elk HTML-bestand begint met:

```html
<!DOCTYPE html>
```

2. Elk HTML-bestand bevat slechts één keer:

- `<html`
- `<head`
- `<body`

3. JSON-LD staat uitsluitend binnen:

```html
<script type="application/ld+json">
```

4. Er is geen zichtbare broncode, losse template-output of kapotte meta-tag zichtbaar in de browser.

5. Er staat geen losse tekst vóór de header/navigatie.

6. Print-, PDF- of exporttemplates zijn niet zichtbaar in de normale webweergave.

7. Donkere blokken hebben voldoende tekstcontrast.

8. Advertentieblokken staan niet boven de eigenlijke pagina-intro, tenzij expliciet bedoeld.

9. De pagina opent lokaal zonder duidelijke HTML- of layoutfouten.

10. Header, logo en navigatie blijven consistent op desktop en mobiel.

## Visuele kwaliteit

Controleer bij UI-wijzigingen altijd op:

- professionele uitstraling
- goede uitlijning
- geen rare witruimte
- geen tekst die buiten containers valt
- geen donkere tekst op donkere achtergrond
- geen lichte tekst op lichte achtergrond
- geen horizontale overflow op mobiel
- consistente knoppen
- consistente cards
- consistente header/logo/menu
- duidelijke CTA's

Belangrijke pagina's om visueel te controleren:

- index.html
- dga-salaris.html
- dga-dividend.html
- dga-auto.html
- dga-beleggen.html
- calculators.html
- tarieven-2026.html
- vergelijkbaar-loon.html
- calculators-optimaal-salaris.html
- calculators-bruto-netto.html
- calculators-salaris-vs-dividend.html
- calculators-bv-vs-eenmanszaak.html
- kennisbank-dividend-uitkeren.html
- kennisbank-gebruikelijk-loon-2026.html

## SEO- en GEO-uitgangspunten

Optimaliseer altijd voor:

- duidelijke zoekintentie per pagina
- stabiele URL's
- unieke title tags
- unieke meta descriptions
- precies één duidelijke H1 per pagina
- logische H2/H3-structuur
- sterke interne links naar calculators
- duidelijke themaclusters
- bronvermeldingen bij fiscale onderwerpen
- FAQ's waar relevant
- structured data waar passend
- korte samenvattingen die ook bruikbaar zijn voor AI-systemen

Belangrijke themaclusters:

### DGA Salaris

- gebruikelijk loon
- bruto/netto DGA salaris
- optimaal salaris
- vergelijkbaar loon
- loonheffing
- Zvw
- art. 12a Wet LB 1964

### DGA Dividend

- dividend uitkeren
- box 2
- dividendbelasting
- uitkeringstoets
- salaris versus dividend
- dividendbesluit
- notulen AVA

### DGA Auto

- bijtelling
- bijtelling op kenteken
- netto bijtelling
- elektrische auto
- youngtimer
- auto zakelijk of privé
- kilometeradministratie
- btw-correctie privégebruik

### DGA Beleggen

- beleggen in de BV of privé
- box 3
- vennootschapsbelasting
- aanmerkelijk belang
- holding
- overtollige liquiditeiten
- privé versus BV calculator

## Fiscale kwaliteit

DGAWijzer moet betrouwbaar zijn. Controleer fiscale bedragen en beweringen zorgvuldig.

Bij fiscale pagina's:

- gebruik actuele Nederlandse wetgeving en Belastingdienst-tarieven
- wees voorzichtig met absolute claims
- geef nuance waar uitzonderingen bestaan
- vermeld jaartal expliciet bij tarieven
- voorkom verouderde bedragen
- verwijs waar relevant naar officiële bronnen
- gebruik geen vage of te commerciële formuleringen bij fiscale risico's

Bij twijfel: markeer het punt als controlepunt in plaats van zelf iets stellig te wijzigen.

## Belangrijke fiscale aandachtspunten 2026

Controleer bij wijzigingen onder meer:

- Gebruikelijk loon 2026: minimaal €58.000, tenzij lager loon aannemelijk is.
- Box 2 2026: 24,5% tot €68.843 per persoon en 31% over het meerdere.
- Met fiscaal partner: grens eerste box 2-schijf samen €137.686.
- VPB 2026: 19% tot en met €200.000 winst en 25,8% daarboven.
- Box 3 2026: controleer forfaits en tegenbewijsregeling zorgvuldig.
- Bijtelling 2026 reguliere elektrische auto's: 18% over eerste €30.000 cataloguswaarde en 22% over het meerdere.
- Alleen waterstofauto's en kwalificerende zonnecelauto's vallen volledig onder het 18%-tarief.
- Dividendbelasting: spreek over aangifte dividendbelasting, niet over formulier OB.

## Conversie-uitgangspunten

DGAWijzer moet meer calculatorgebruik, terugkerend bezoek en later omzet opleveren.

Goede CTA-richtingen:

- Bereken uw DGA-salaris
- Bereken bruto/netto salaris
- Vergelijk salaris en dividend
- Bereken dividend
- Bereken bijtelling
- Vergelijk privé en BV beleggen
- Onderbouw gebruikelijk loon
- Bekijk tarieven 2026
- Ga naar alle calculators

Voeg geen e-mailformulier, betaalfunctie of lead capture toe zonder expliciete opdracht.

## Documentgeneratoren en premium functionaliteiten

Mogelijke toekomstige producten:

- Dividendbesluit
- Uitkeringstoets
- Notulen AVA dividenduitkering
- Rekening-courantovereenkomst
- Managementovereenkomst
- Gebruikelijk-loon onderbouwing
- Auto zakelijk/privé dossier
- Beleggingsbesluit BV

Bouw dit niet zonder aparte opdracht. Denk bij voorstellen aan schaalbaarheid, praktische waarde en monetisatie.

## Specifieke instructies voor Claude Code

Als je Claude Code gebruikt:

1. Start altijd met:

```bash
git status
```

2. Als er bestaande wijzigingen zijn, waarschuw de gebruiker.

3. Maak bij analyse-opdrachten eerst alleen een rapport en wijzig niets.

4. Vraag bevestiging voordat je meer dan 3 bestanden wijzigt.

5. Gebruik waar nodig:

```bash
git diff
```

6. Lever nooit automatisch een volledige ZIP of complete website op.

7. Minimaliseer het aantal gewijzigde bestanden.

8. Controleer lokale HTML-structuur na wijzigingen.

9. Meld duidelijk welke bestanden zijn aangepast.

## Standaardprompt voor veilige analyse

Gebruik bij twijfel deze aanpak:

```text
Controleer de websitebestanden op het gevraagde probleem. Wijzig nog niets. Maak eerst een lijst met bevindingen, vermoedelijke oorzaken, betrokken bestanden en een voorstel voor minimale aanpassingen.
```

## Standaardprompt voor kleine bugfix

```text
Los alleen het beschreven probleem op. Wijzig zo weinig mogelijk bestanden. Raak geen calculatorlogica, fiscale inhoud of bestaande URL's aan. Behoud header/logo/menu en algemene layout. Geef daarna alleen nieuwe, gewijzigde en verwijderde bestanden terug met korte toelichting.
```

## Niet doen

- Geen volledige redesigns zonder opdracht.
- Geen massale herstructurering van HTML.
- Geen URL-wijzigingen zonder 301-plan.
- Geen fiscale bedragen aanpassen zonder controle.
- Geen calculatorlogica aanpassen zonder opdracht.
- Geen onnodige nieuwe CSS-frameworks.
- Geen dubbele pagina's met dezelfde zoekintentie.
- Geen print/PDF-template zichtbaar maken in gewone paginaweergave.
- Geen advertentieblokken boven de primaire pagina-inhoud plaatsen tenzij expliciet bedoeld.
