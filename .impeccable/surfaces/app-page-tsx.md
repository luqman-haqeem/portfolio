---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Surface brief: home (/)

Scope: the whole one-page portfolio at `/`. Mode: Experience. The visitor's success is leaving knowing who Luqman is and how he thinks.

Audience: broad (peers, collaborators, recruiters). Job: understand him and what he has actually built, and reach him through GitHub or LinkedIn.
Must keep: builds list (live GitHub data). Showcase, not résumé (owner, 2026-11-22): order is intro → experience (one line per role, never the projects done inside a company) → side projects → contact; the languages section is removed. May cut or rework: session console, skill→usage links, plain-text toggle, print résumé.
Avoid: generic dev template, too gimmicky, too corporate, dark hacker look.
Chosen via: the /prototype comparison (variant A).

## Direction contract

THESIS: A person who measures before he claims. The page is read against one painted river staff gauge, with each section a level on it. It refuses the dev-portfolio default: no hero card, no avatar, no badge wall, no card grid, no dark terminal.

OWN-WORLD: Daylight enamel white (#f6f7f4) as the ground, gauge black (#141816) graduations and rules, river teal (#3d6e6a) water fields, and JPS paint used only as marks with a meaning: metres painted alternately ink and red, green for the open/current reading, red for a high-water mark, amber only as the focus and link colour on dark fields. There is no alert-band strip, because these readings have no thresholds to claim. Archivo, a wide heavy grotesk, for statements; Barlow Condensed for readings and figures. Hard 2px black rules, square corners, no shadows, no gradients.

STORY: The visitor reads his voice first, then where the work happened with dates and named systems, then how sure he is of each language (mark weight) and how his stack moved (GitHub bytes by year), then what he built outside work, then how to reach him.

FIRST VIEWPORT: Desktop has a sticky staff-gauge rail on the left (plate with E-pattern blocks, one per 10 cm, metres alternately ink and red; section labels as levels; a live water level and its x.xx m reading tied to scroll). Beside it are a top rule carrying the name/role and the base/timezone, then "I work at both ends of the stack." at about 8vw in heavy wide Archivo, then the strengths line at about 2vw. At the foot sits the teal water band with three readings: Now (role, company, since), Based, Last push (repo, when). On narrow screens the gauge lies flat as a sticky strip at the very top edge (section tabs plus a tick strip with the water fill, no numeric reading), so it stays reachable while scrolling; the top rule follows it. The primary action is the gauge navigation, with the reach links one level down.

FORM: River Gauge Board, position 4 of the ordered grounded list (assigned), seed:112f069df7624aa4. Signature interaction: scroll raises the water on the gauge and the reading label follows it; section labels are the navigation. Motion grammar: only the water level and its reading move, easing at 300ms ease-out; nothing else transitions. Under reduced motion the level still tracks scroll but jumps without easing.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
