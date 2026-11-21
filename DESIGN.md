---
name: Luqman Haqeem
description: A full-stack developer's record, read against one painted river staff gauge.
colors:
  enamel: "#f6f7f4"
  plate: "#ffffff"
  ink: "#141816"
  water: "#3d6e6a"
  water-pale: "#9dbcb8"
  on-water: "#e2edeb"
  level-ok: "#2f8f4e"
  level-alert: "#f2b318"
  level-danger: "#d7322a"
  danger-ink: "#b3241d"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 7.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.025em"
    fontVariation: "\"wdth\" 118"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.015em"
    fontVariation: "\"wdth\" 110"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.25
    fontVariation: "\"wdth\" 110"
  lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 2.3vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  reading:
    fontFamily: "Barlow Condensed, Arial Narrow, Roboto Condensed, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.04em"
    fontFeature: "\"tnum\" 1"
  reading-figure:
    fontFamily: "Barlow Condensed, Arial Narrow, Roboto Condensed, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.04em"
    fontFeature: "\"tnum\" 1"
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, Roboto Condensed, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    letterSpacing: "0.06em"
rounded:
  none: "0px"
spacing:
  gutter-sm: "20px"
  gutter: "40px"
  row: "40px"
  section-sm: "96px"
  section: "128px"
components:
  section-head:
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    padding: "20px 0 0"
  reading:
    textColor: "{colors.ink}"
    typography: "{typography.reading}"
  water-band:
    backgroundColor: "{colors.water}"
    textColor: "{colors.plate}"
    padding: "12px 40px 32px"
  gauge-plate:
    backgroundColor: "{colors.plate}"
    width: "64px"
    rounded: "{rounded.none}"
  gauge-level-tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.enamel}"
    typography: "{typography.label}"
    padding: "0 4px"
  record-row:
    textColor: "{colors.ink}"
    padding: "40px 0"
  link-inline:
    textColor: "{colors.ink}"
  link-inline-hover:
    textColor: "{colors.water}"
  link-reach:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.enamel}"
  link-reach-hover:
    textColor: "{colors.level-alert}"
  screenshot-frame:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.none}"
  reach-field:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.enamel}"
    padding: "128px 40px 40px"
---

# Design System: Luqman Haqeem

> **Source of truth.** Tokens live in the `@theme` block of `app/globals.css`; Tailwind v4 generates utilities from it. The root `tokens.css` is an obsolete extract of the retired dark "observability dashboard" system. Do not read it, import it, or copy values from it.

## Overview

**Creative North Star: "The River Gauge Board"**

The page is read against one painted river staff gauge, the white enamel plate a drainage authority bolts to a bridge pier. Each section is one metre on that plate, and the water rises as the reader goes down. Everything in the system comes from that object: an off-white ground read in daylight, black graduations and rules, teal water fields, and a few paint colours that only appear when they mean something on a gauge (the current reading, a high-water mark, the metre numerals).

Density is editorial rather than dashboard. A few very large wide-set statements, then long ruled records with condensed figures in a left column and prose on the right. Depth is flat: hard rules, square corners, solid fields. The only things that move are the water and its reading.

The world deliberately rejects the developer-portfolio default it replaced: no dark terminal, no hero card, no avatar, no badge wall, no card grid.

**Key Characteristics:**
- Daylight enamel ground, never a dark theme; ink and water are the only large dark fields.
- 2px ink rules separate everything; there are no boxes with shadows and no rounded corners.
- Two faces with fixed jobs: wide heavy Archivo states, condensed Barlow measures.
- Colour from the gauge's paint carries meaning, never decoration.
- One moving system: the water level and its reading, 300ms ease-out.

## Colors

A cold daylight palette of enamel, ink and river teal, with gauge paint used as sparse, meaningful marks.

### Primary
- **River Teal** (water): the water. Fills the first-viewport reading band and the gauge's rising water (at 80-85% opacity, multiply-blended over the plate), colours outcome figures and status readings, and is the hover colour for every link on light ground. Carries white text.
- **Shallow Water** (water-pale): the lighter water step, used only as an era fill in the language-bytes chart. Carries ink text, never white.
- **Spray** (on-water): secondary text and hairline dividers on the water band (labels, detail readings, 50% opacity rules).

### Secondary
- **Current Green** (level-ok): the open, current reading. A short solid bar on the rule of the current role and the current rewrite in a lineage. Never text, never a fill behind text.
- **Gauge Red** (level-danger): the painted metres on the gauge plate (every other metre of E-blocks) and the 3px line of a high-water mark. A mark, never text.
- **Red Ink** (danger-ink): Gauge Red darkened to carry small text: metre numerals, the "High-water mark" reading, the "Note" tag on a caveat.

### Tertiary
- **Warning Amber** (level-alert): appears only on dark fields (ink or water). It is the focus-ring colour inside `.on-dark` regions and the underline and hover colour of the reach links on the ink field. Never used on enamel.

### Neutral
- **Enamel** (enamel): the page ground, the flat mobile gauge strip, and text on the ink field.
- **Plate White** (plate): the gauge plate itself, the language section's raised panel, screenshot frames, the tick strip. Also the text colour on water.
- **Gauge Ink** (ink): all text on light ground, every rule and graduation, the reach field, the level tag. Secondary text is ink at 60-75% opacity rather than a separate grey.

### Named Rules
**The Paint Means Something Rule.** Green, red and amber are a gauge's paint. Green marks what is current, red marks metres and a high-water era, amber marks focus and reach on dark fields. If a use cannot be read as one of those, it does not get the colour.

**The No Threshold Strip Rule.** There is no green/amber/red alert-band strip. These readings have no thresholds, so the bands would claim a meaning the content does not have.

**The Ink Opacity Rule.** Hierarchy in text on enamel is ink at 100%, 75%, 70% or 60%. Do not introduce a separate grey token.

## Typography

**Display Font:** Archivo (variable on width and weight; Helvetica Neue, Arial fallback)
**Reading Font:** Barlow Condensed 500/600/700 (Arial Narrow, Roboto Condensed fallback)

**Character:** Archivo, stretched on its width axis, speaks in statements; Barlow Condensed, uppercase and tabular, reads like figures painted on a plate. One talks, the other measures.

### Hierarchy
- **Display** (800, clamp 2.9rem-6rem, 0.92, width 118%): the single first-viewport statement and the reach heading (5.4vw variant). Max about 13-16ch, balanced.
- **Headline** (800, clamp 2.1rem-3.6rem, 0.98, width 110%): section heads, max 22ch.
- **Title** (700, clamp 1.6rem-2rem, width 110%): company and build names in record rows. The lineage problem title steps up to 800 at clamp 1.8rem-2.5rem.
- **Lede** (500, clamp 1.3rem-2rem, 1.2): the strengths line under the display statement, max 32ch.
- **Body** (400, 17px, 1.625): prose, max 58-64ch. Supporting prose steps down to 15.5-16.5px.
- **Reading** (Barlow Condensed 600, 15px, +0.04em, uppercase, tabular): every date, count, duration, status and stack line. Stack lines and relative times keep normal case. Figures in the left column of a record step up to 22px 700; lineage generation labels to 28px.
- **Label** (Barlow Condensed 700, 14-15px, +0.06em, uppercase): gauge navigation labels and the level tag.

### Named Rules
**The Measure Not Prose Rule.** Anything that is a number, a date, a period or a status is set as a Reading in Barlow Condensed. Sentences are never set in it.

**The Stretch Not Track Rule.** Big Archivo is made wide on the width axis (110% or 118%) and tightened slightly (-0.015em to -0.025em). It is never letter-spaced out.

**The Beside Not Above Rule.** A section's reading sits on the heading's baseline to the right, as a measurement of the section. Nothing small and uppercase sits above a heading.

## Layout

Desktop (from 1024px) is a two-column grid: a 12.5rem sticky gauge rail on the left at full viewport height, and the content column beside it. Content gutters are 20px on phones and 40px from 640px, with the right gutter growing to 64px at 1024px and 96px at 1280px. Sections pad 96px vertically on phones and 128px from 640px.

The first viewport fills the screen: a top rule carrying name and role against the base and timezone, the display statement centred in the remaining space, and the water band at the foot with three readings in three columns from 640px.

Records are ruled rows (2px ink top rule, 40px vertical padding). Work rows use a fixed 12.5rem figure column against the prose column from 768px, the same width as the rail, so figures line up down the page. Builds rows split into two equal halves from 1024px. The languages section is a 1.1fr / 1fr pair from 1280px.

Under 1024px the gauge lies flat as a sticky strip at the top edge: section tabs, then a 10px tick strip with the water filling it left to right. Scroll padding is 4.5rem on narrow screens and 1.5rem on desktop so anchors land below the strip.

**The One Column Of Figures Rule.** Dates and durations live in the 12.5rem left column of a record; prose lives to the right. Do not put figures inline at the start of prose.

## Elevation & Depth

The system is completely flat. There are no shadows and no gradients that suggest light. Depth comes from three things only: solid fields (the plate-white languages panel, the teal water band, the ink reach field), 2px ink rules and frames, and the water itself, which is semi-transparent teal multiply-blended over the gauge face so the graduations show through it.

**The Flat Plate Rule.** Nothing casts a shadow or lifts on hover. A surface is distinguished by its fill and its rule, the way paint sits on enamel.

## Shapes

Every corner is square (0px). Borders are 2px solid ink on frames (gauge plate, screenshots, era bars) and on section and row rules. Lighter divisions use 1px hairlines: ink at 20-25% between project lines and before caveats, Spray at 50% on the water band. Marks are short solid bars: 3px high-water lines, 3px by 16px bullet dashes, a 6px by 112px current-green bar on a row rule. The only curve in the system is the water's surface, a gentle wave drawn across the top of every water field.

**The Gauge Mark Rule.** Bullets, markers and indicators are drawn as short horizontal bars, the same marks as graduations on the plate. Not dots, not glyphs, not icons.

## Components

### Gauge Rail (signature)
The staff gauge and the page navigation in one. A 64px plate-white column with a 2px ink frame, painted with alternating E-blocks (one per 10 cm), the metres alternately ink and Gauge Red, numerals in Red Ink on small plate patches. Teal water rises from the bottom in step with scroll. Beside it, section labels sit at each metre's midpoint: a 2px ink tick (10px, widening to 20px when current) and the label at 60% opacity, full opacity on hover or when current, hover colour River Teal. An ink level tag with an enamel `x.xx m` reading rides the water surface. On narrow screens it is the flat strip described in Layout; the current tab gets a 3px ink underline.
- **Motion:** only the water's height/width and the level tag's position transition, 300ms on the water ease (`cubic-bezier(0.22, 1, 0.36, 1)`). Under reduced motion the level still tracks scroll but jumps.

### Section Head
A 2px rule in the current text colour, 20px of space, then the headline with the section's Reading on the same baseline, right-aligned and at 80% opacity, wrapping beneath on narrow screens. An optional 17px intro paragraph follows at 20px, max 62ch.

### Reading
The measurement primitive: Barlow Condensed 600, uppercase, +0.04em, tabular figures. Size, weight, colour and opacity are set where it is used.

### Water Band
The water's surface (a filled wave, 20-24px tall, in River Teal) above a solid teal field of readings. Each reading has a 1px Spray hairline on top, a Spray label, a 17px semibold white value and a Spray detail line. The region is `on-dark`, so focus rings switch to amber.

### Record Row
A ruled list item: 2px ink top rule, 40px vertical padding, figures column plus prose column. The current item carries the Current Green bar on its rule. Projects inside a role are native disclosures with a drawn plus/minus (2.5px strokes) and a River Teal outcome reading at the far right; rows are separated by ink hairlines at 20%.

### High-Water Mark
A 3px Gauge Red line filling the width, ending in a bold Red Ink reading naming the era and its years. Kept for an era on the record, not for errors.

### Mark-Weight Graduations
Language confidence drawn as ten ink graduations, every fifth tall (44px against 26px), their width set by confidence (7px, 4.5px, 2.5px, 1.25px). Not a bar, not a percentage, not a badge.

### Era Bar
A 40px row framed in 2px ink, split into language shares with 1px ink dividers. Fills come in a fixed order: ink, River Teal, Shallow Water, Plate White, never paint colours. Labels are 13px bold uppercase Readings, shown only when the share is 14% or more. Each language keeps the same fill in every year.

### Links
- **Inline:** ink, semibold, 2px underline at 0.22em offset, River Teal on hover, with a drawn outbound arrow (1.8px square-capped stroke) for external targets.
- **Reach:** on the ink field, 1.3-1.75rem semibold enamel text with a 4px Warning Amber underline at 8px offset, turning amber on hover.

### Screenshot Frame
The image inside a 2px ink frame on plate white. When it links out, the frame turns River Teal on hover.

### Reach Field
The closing ink field: a display-scale heading, a status line at 85% enamel, the reach links, and a footer behind a 2px rule at 30% enamel carrying the page's own facts and the print action.

### Print
Printing emits a black-on-white résumé: navigation and interactive regions hide, links lose their underlines, sections avoid breaking. The gauge world does not print.

## Do's and Don'ts

### Do:
- **Do** set every date, count, period and status as a Reading (Barlow Condensed, uppercase, tabular).
- **Do** separate sections and rows with 2px ink rules and keep every corner square.
- **Do** keep green for what is current, red for metres and high-water marks, and amber for focus and reach links on dark fields only.
- **Do** put a new section on the gauge: add it to the rail's levels so the water and navigation stay one system.
- **Do** keep motion to the water and its reading, 300ms on the water ease, and let reduced motion jump.
- **Do** draw markers as short solid bars matching the gauge graduations.

### Don't:
- **Don't** add shadows, gradients that model light, rounded corners, or hover lifts.
- **Don't** add a green/amber/red threshold strip or colour-code content by alert level.
- **Don't** use Warning Amber on the enamel ground, or Gauge Red for text (use Red Ink).
- **Don't** set sentences in Barlow Condensed, or track Archivo out instead of stretching it.
- **Don't** put a small uppercase label above a heading; a section's reading sits beside it.
- **Don't** use cards, badge rows, avatars, a hero card, or a dark theme.
- **Don't** take values from the root `tokens.css`; it belongs to the retired system.
