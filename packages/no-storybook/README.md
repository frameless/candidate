# No Storybook

Het doel van dit project om de kennis die beschikbaar is in het Storybook ecosysteem van NL Design System, beschikbaar te maken buiten Storybook. Dan kan de kennis in een simpelere layout gedeeld kan worden op de NL Design System website.

De aanpak is om web components te maken waarmee informatie uit Storybook op nieuwe manieren getoond kan worden. De web components moeten veel minder complex zijn dan Storybook, zodat de documentatiepagina's snel kunnen laden.

Er moeten veel kleine web componenten gemaakt worden, zodat makkelijk experimenten gedaan kunnen worden om de informatie op verschillende manieren te tonen.

## Web Componenten

### `<story-canvas>`

...

### `<story-list-preact>`

...

### `<args-table-preact>`

...

## User story

- Als NL Design System wil ik developers informeren op welke manier ze de component toegankelijk kunnen inzetten, in situaties die vaak mis gaan
- Als NL Design System wil ik voorkomen dat gebruikers een design gebruiken dan ontoegankelijk is
- Als NL Design System wil ik developers overtuigen om bepaalde componenten te vervangen, omdat de NL Design System implementatie vaak toegankelijker is.
  - Migreren vanwege forced colors support: Icon, Button, Utrecht Listbox, Color Sample
- Als NL Design System wil dat mensen geen all caps gebruiken ("ALL CAPS") in het label, zodat de toegankelijkheid goed is.

- Als designer/developer wil ik dat de icon meeschaalt als ik een grote font-size instelt

- Als developer wil ik voor me zien of mijn instellingen de component opleveren die ik voor ogen heb
- Als gebruiker wil ik een functioneel Icon kunnen gebruiken uit iconset die NL Design System aanraad: tabler.
- Als gebruiker wil ik een Toptaak Icon kunnen gebruiken uit iconset die NL Design System aanraad: gemeente iconen.

- Als HTML template developer, wil ik weten welke CSS class names er zijn.
- Als HTML developer wil ik weten wanneer ik welke class names moet gebruiken.
- Als HTML developer wil ik weten welke semantisch HTML element, en welke HTML en ARIA ik het best kan gebruiken.

- Als React developer wil weten welke `npm install` ik moet doen
- Als React developer wil ik alleen de JSX broncode zien
- Als React developer wil ik een component
- Als React + TypeScript developer wil ik weten welke Type ik kan importeren
- Als React developer wil ik de button namaken die ik nodig heb, en dan de JSX code kopieëren naar mijn eigen project.

- Als bezoeker van de documentatie wil ik een linkje kunnen delen naar:
  - een component, zoals Button
  - een property, zoals `toggle` van Button
  - een variant, zoals "Primary Action" van Button
  - een design token
- Als bezoeker die een link maakt vanuit eigen documentatie, wil ik de link blijft werken voor langere tijd.

- Als gebruiker van de UI editor wil ik alle checkbox opties bij elkaar zien
- Als gebruiker van de UI editor wil ik de meestgebruikte opties als eerste zien
- Als gebruiker van de UI editor wil ik de meestgebruikte opties als eerste zien

Later:

- Als gebruiker van een component wil ik een icoon gebruiken dat getest is met gebruikers
- Als gebruiker van een component wil ik een label gebruiken dat getest is met gebruikers
- Als gebruiker wil ik weten of het label dat ik nu gebruik, minder goed uit gebruikerstesten is gekomen

- Als tester / component developer van een button wil ik weten wat de verwachtte keyboard support is
- Als developer/designer wil ik de component in mijn eigen huisstijl zien
- Als developer wil ik dat de documentatie even goed werkt als wat ik gewend ben
  - Ik ben PrimeNG gewend
  - Ik ben Primer gewend
  - Ik ben Material UI gewend
  - Ik ben Ant Design
- Als developer wil ik weten in welke situatie ik beter een community component kan gebruiken
- Als developer heb ik al veel componenten, maar ik wil met name enkele moeilijke componenten van NL Design System gebruiken:
  - Date Picker
  - Combobox
- Als gebruiker wil ik begrijpen waarom bepaalde onderdelen zo zijn genoemd.
  - Bijvoorbeeld: "hint" van Button
  - Bijvoorbeeld: "purpose" van Paragraph en Button
  - Bijvoorbeeld: "block-size" ipv height
  - Bijvoorbeeld: ""

Als developer wil ik de button precies zo groot maken als de icon:

```css
.my-small-button {
  --nl-button-min-block-size: var(--nl-button-icon-size);
  --nl-button-min-inline-size: var(--nl-button-icon-size);
  --nl-button-icon-size: 24px;
  --nl-button-icon-only-padding-inline-start: 0;
  --nl-button-icon-only-padding-inline-end: 0;
  --nl-button-icon-only-padding-block-end: 0;
  --nl-button-icon-only-padding-block-start: 0;
}
```

## Button User Story

- Als gebruiker van een icon button wil ik een tooltip met het label tonen tijdens hover en tijdens focus
- Als gebruiker van een toggle button wil ik de pressed state koppelen aan de state in mijn applicatie
- Als gebruiker van een toggle button wil ik een ander icon instellen voor pressed en not pressed
- Als gebruiker van een toggle button wil ik een ander label instellen voor pressed en not pressed
- Als gebruiker wil ik weten hoe ik een extra grote of een extra kleine button kan maken

## Theme Wizard user stories

Inspiratie: https://primeui.store/designer

- Als ik meerdere kleuren kan instellen (bijvoorbeeld: `background-color`, `color` en `border-color`) dan wil ik de kleuren kunnen zien en herkennen in het design token overzicht, zodat ik geen tekst hoef te lezen om te weten welke ik aan moet passen.

### Component token user stories
