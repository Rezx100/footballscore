# Icon generation prompts

Medal family for tab icons and 28 first-class league marks. Regenerating? Keep this style lock identical in every prompt.

## Style lock (every prompt)

Product: footballscore Medal system. App glyph, not an illustration, not a logo lockup.

Field `#0B0B0D`. Glyph ink `#F5F5F7`. Quiet `#8E8E93`. Copper `#C17A3A` only as a 1px hinge, never a fill. Rule `#2C2C2E`. Plate `#ECECEF` only when the glyph includes a plate.

Optical size: simple geometric glyph ~24px in a 32px frame with generous empty margin. Same stroke weight (~1.75) and 2px corner language across the family.

Language: split-flap / medal / board. Geometric, flat vector, no drop shadow, no 3D clay, no neon, no glow, no photorealism, no texture.

Transparent or solid field `#0B0B0D`. Square 1:1. No text. No soccer ball. No Apple green. No SF Symbols. No Lucide clones. No emoji.

Model: Higgsfield `nano_banana_pro`, `aspect_ratio` `1:1`, 2 variants per tab.

## Tab icons

| Tab | Subject |
| --- | --- |
| matches | Split-flap board cell pair — two stacked rounded rectangles like a mechanical scoreboard tile, hairline hinge between them, two short ruled bars as abstract numerals. |
| news | Ruled column / masthead bar — tall rounded rectangle like a newspaper column, thick masthead bar at the top, three horizontal rules as body lines. |
| leagues | Geometric shield sitting on a light `#ECECEF` rounded plate. Not an official crest, not a circle crop, not a soccer ball. |
| following | Board pin / watch-list tick — map-pin silhouette with a small inner circle. Not a heart, not a star. |
| more | Ellipsis of three dots inside a rounded split-flap cell / board tile. |

Winners live in `public/icons/tab/{matches,news,leagues,following,more}.png` plus `@2x`. Live tab bar uses the same Medal family as currentColor SVG in `src/components/matches/tab-icons.tsx` so active/inactive ink works at 24px.

## League marks (28 first-class)

Same shield silhouette, palette mid fill from `src/lib/league-palette.ts`, unique geometric allusion (not a traced trademark). Plate is CSS `.league-mark-plate`. Files: `public/icons/leagues/{slug}.svg` (source) and `{slug}.png`.

Generator: `python3 scripts/generate-league-marks.py`

Higgsfield wave prompt (z_image or nano_banana_pro, 1:1):

> {style lock}. League identity mark: a geometric heater shield in {mid} on a light #ECECEF plate. Motif alludes to {name} with {motif}, accent {accent}. Not the official crest. No circle crop. No text.

| Slug | Motif |
| --- | --- |
| eng.1 | crowned lion geometry |
| esp.1 | two horizontal bars |
| ger.1 | eagle chevron |
| ita.1 | three vertical bars |
| fra.1 | hexagon + bar |
| uefa.champions | eight-point star |
| uefa.europa | wing arc |
| uefa.europa.conf | leaf oval |
| uefa.super_cup | cup U |
| fifa.world | meridian globe |
| fifa.cwc | cup + disc |
| uefa.nations | four diamonds |
| eng.2 | lion head |
| eng.fa | rose geometry |
| usa.1 | bars + star |
| mex.1 | triangle + disc |
| conmebol.libertadores | sunburst star |
| bra.1 | lozenge + disc |
| arg.1 | sun rays |
| concacaf.leagues.cup | twin cups |
| ned.1 | lion geometry |
| por.1 | five discs |
| sco.1 | saltire |
| ksa.1 | crossed bars |
| jpn.1 | disc + rays |
| aus.1 | southern-cross dots |
| usa.nwsl | star + bar |
| concacaf.champions | north star |
