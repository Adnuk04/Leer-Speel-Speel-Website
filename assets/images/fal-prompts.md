# fal.ai artwork log

Every crayon doodle and illustration added in the Round 2 edits (9 October 2026) was generated through the fal.ai MCP. This file records the models and prompts so any image can be regenerated or extended in the same style.

This is a working note, not site content: leave it out of the Cloudflare upload folder.

**Round 3 (11 October 2026):** the school's real photos replaced eight of the ten illustrations, and those files were deleted. Only `illustration-playground.webp` and `illustration-classroom.webp` stayed on, until photos of the buildings arrived.

**Session 4 (17 October 2026):** the real campus photos replaced those last two, and the files were deleted. No fal.ai illustrations remain on the site; only the doodles do. The prompts below are kept in case any are needed again.

## Models

| Use | Model | Listed rate | Images |
|---|---|---|---|
| Drafts (all 26 images) | `fal-ai/flux/schnell` | $0.003 per megapixel | 26 |
| Finals | `fal-ai/nano-banana-2` (1K, PNG) | $0.08 per image | 17 |

Estimated spend from the listed rates: about $0.07 on drafts and $1.36 on finals, roughly $1.45 in total. The fal dashboard has the actual figure.

Every draft was reviewed before anything was re-run. Eleven doodles and the map pin were good enough at draft quality and were kept as they are. Four doodles and all ten illustrations were re-run once on the higher-quality model. Three of those illustrations needed one more corrected run (see "Corrections").

## Background removal

The doodles were generated on white paper and cut out locally, not with a fal background-removal model. The script samples the paper colour from the image border and turns it transparent, keeping coloured wax (by chroma) and dark outlines (by darkness). This keeps the gaps between crayon strokes see-through, which a subject-segmentation model would fill in white, and it costs no credits. Each cut-out is trimmed, sized to 512px on its longest side and saved as WebP with alpha.

## Crayon doodles (`assets/doodles/doodle-*.webp`)

Shared prompt pattern, from the brief:

> single crayon drawing of [SUBJECT], thick waxy crayon texture, very bright saturated colours, child's drawing style, centred, plain white background, no text

Kept from the `fal-ai/flux/schnell` drafts (`image_size: square_hd`, PNG):

| File | Subject in the prompt |
|---|---|
| `doodle-sun.webp` | a smiling sun with wobbly rays, sunny yellow and orange |
| `doodle-star.webp` | a five-point star, bright orange |
| `doodle-flower.webp` | a daisy flower with bubblegum pink petals, a yellow centre and a green stem |
| `doodle-heart.webp` | a heart, tomato red |
| `doodle-butterfly.webp` | a butterfly with purple and pink wings |
| `doodle-kite.webp` | a diamond kite with a tail of little bows, orange and sky blue |
| `doodle-apple.webp` | an apple with a small green leaf, tomato red |
| `doodle-snail.webp` | a happy snail with a big spiral shell, purple shell and orange body |
| `doodle-handprint.webp` | "single child's painted handprint, bubblegum pink, thick waxy crayon and paint texture, …" |
| `doodle-abc.webp` | "crayon drawing of the three capital letters A B C side by side, the A in red, the B in blue, the C in green, … child's handwriting style, centred, plain white background, nothing else" |
| `doodle-123.webp` | "crayon drawing of the three numbers 1 2 3 side by side, the 1 in purple, the 2 in orange, the 3 in pink, … nothing else" |
| `doodle-map-pin.webp` | "Child's crayon drawing of a big red map location pin standing on a simple hand-drawn map with winding roads, tiny houses and little trees, thick waxy crayon texture, very bright saturated colours, playful, plain white paper background, no text" |

Re-run on `fal-ai/nano-banana-2` (`aspect_ratio: 1:1`) because the draft missed the prompt:

| File | What was wrong with the draft | Final prompt |
|---|---|---|
| `doodle-cloud.webp` | Crayons and a coloured-in background in the frame | A single child's wax crayon drawing of one fluffy cloud, coloured in with sky-blue crayon scribble strokes and a darker blue wobbly outline, thick waxy crayon texture, very bright saturated colour, drawn by a five-year-old. The cloud is alone and centred on a completely plain pure white background with lots of empty space around it. No crayons, no table, no other objects, no shadow, no text. |
| `doodle-balloon.webp` | Yellow instead of green, extra strokes | A single child's wax crayon drawing of one party balloon, coloured in with bright grass-green crayon scribble strokes, with a wiggly dark green string hanging below it, … No ground, no other strokes, no other objects, no shadow, no text. |
| `doodle-scribble.webp` | Two neat circles, not a scribble | A single child's wax crayon scribble: one messy, energetic tangle of looping, overlapping curly lines like a ball of wool, drawn in one continuous sky-blue crayon line, … drawn by a three-year-old. … No other objects, no shadow, no text. |
| `doodle-tree.webp` | Too detailed, not childlike | A single child's wax crayon drawing of a simple lollipop-shaped tree: a round blob of leaves coloured in with bright grass-green crayon scribble strokes on a short thick brown trunk, with three small red apples, … No ground, no grass, no other objects, no shadow, no text. |

No rainbow doodles were generated: the client ruled them out.

## Illustrations (`assets/images/illustration-*.webp`)

All finals are `fal-ai/nano-banana-2`, 1K, exported to WebP at quality 80 with the painted paper edge trimmed (hero 1140px wide, the rest 900px).

Shared opening:

> Bright cheerful children's book illustration in thick wax crayon and watercolour texture, full-bleed scene filling the whole frame edge to edge.

Shared ending:

> Very bright saturated colours […]. Playful. No people. No text, letters, numbers, signs or watermark anywhere.

| File | Ratio | Scene in the prompt |
|---|---|---|
| `illustration-school.webp` (hero) | 4:3 | A small single-storey nursery school building with a red roof, completely plain cream walls and a bright blue door, with a sandy playground beside it with a swing and a yellow slide, flat-topped acacia trees and two tall makalani palm trees, a low colourful picket fence, a big friendly sun in a clear sky-blue sky with two fluffy white clouds, northern Namibia setting. |
| `illustration-story-time.webp` | 4:3 | In a cosy nursery classroom, a friendly young cartoon teacher with brown skin sits on a low blue chair holding an open picture book, and five cartoon Namibian children sit cross-legged on a colourful round rug listening to her. Simple flat cartoon characters with dot eyes and small curved smiles, clearly drawn, not realistic. Toy shelves and a sunny window behind them. The book cover is a plain solid colour with only a simple yellow star shape on it. |
| `illustration-building-blocks.webp` | 16:9 | Colourful wooden building blocks stacked into a wobbly tower and an arch, with a scatter of wax crayons, on a pale wooden classroom table, a sky-blue wall behind. The blocks are plain coloured shapes: cubes, cylinders, triangles in red, orange, yellow, green, blue and purple. |
| `illustration-finger-painting.webp` | 4:3 | Top-down view of a big sheet of white paper covered in colourful finger-painted handprints, swirls and dots, with four small simple cartoon children's hands with brown skin reaching in from the edges, fingertips covered in paint, and little round paint pots in red, yellow, blue and green. The hands are flat, simple, clearly drawn cartoon shapes with crayon outlines, not realistic, not a photo. No faces. |
| `illustration-playground.webp` | 4:3 | A sunny school playground on sandy ground: a colourful jungle gym with a red slide, two swings, a seesaw and a painted tyre, shady flat-topped acacia trees, a low colourful fence, clear sky-blue sky with a smiling sun, northern Namibia setting. |
| `illustration-classroom.webp` | 4:3 | A tidy, bright nursery classroom corner: low toy shelves with baskets of toys, a teddy bear and a toy truck, a reading corner with soft cushions, a small bookshelf of picture books with plain covers, colourful triangle paper bunting, a sunny window, a round rug. |
| `illustration-lunchbox.webp` | 1:1 | An open green lunchbox on a sunny yellow table with a sandwich, a red apple, a banana, orange slices and carrot sticks, next to a blue water bottle and a small bowl of fruit salad. No faces on the food. |
| `illustration-art-table.webp` | 4:3 | Art supplies on a classroom craft table: little pots of poster paint, paintbrushes in a jar, wax crayons, child-safe scissors, glue stick, sheets of coloured paper and a child's painting of a flower and a butterfly drying on the table. A bubblegum pink wall behind. Clearly a drawn illustration, not a photo. |
| `illustration-petting-zoo.webp` | 4:3 | Friendly cartoon animals at a school petting zoo: two white bunnies, a brown-and-white baby goat and three fluffy yellow chicks behind a low wooden fence on green grass with small flowers, a little wooden hutch behind them, sunny sky-blue sky. Simple cute cartoon animals with dot eyes. |
| `illustration-fun-day.webp` | 4:3 | A school fun day in a sandy school yard: bunches of balloons, strings of colourful triangle bunting flags between two acacia trees, a table with cupcakes, juice and a bowl of fruit, a small bouncy castle with plain red, yellow and blue turrets, hula hoops and a spotty ball on the ground, a low school building behind, sunny sky-blue sky. No rainbows or rainbow arches anywhere. |

## Corrections

Three finals were re-run once because the first attempt broke a rule. The prompts in the table above are the corrected ones.

| Image | Problem in the first final | What changed in the prompt |
|---|---|---|
| School (hero) | A "KINDER GARTEN" sign was painted on the building | Opened with "A wordless children's book illustration"; added "completely plain cream walls" and "The building has no sign, no nameplate, no board and no writing on it." |
| Story time | A block of garbled text appeared in the top-left corner | Opened with "A wordless children's book illustration"; dropped the "Story time" label from the scene description; added "Absolutely no text, captions, letters, words or numbers anywhere in the picture, including on the walls, the book and the corners." |
| Fun day | The bouncy castle had a rainbow arch | Described the castle as having "plain red, yellow and blue turrets"; added "No rainbows or rainbow arches anywhere." |

## Tips for more images in this style

- Start illustration prompts with "A wordless children's book illustration". It was more reliable at keeping text out than a "no text" line at the end.
- Describe labels or scene names in plain words inside the scene, never as a title: the model may paint a title onto the picture.
- For doodles, say "alone and centred on a completely plain pure white background" and list what must not appear (crayons, table, shadow).
- Check each result for stray text, signs, watermarks and rainbows before using it.
