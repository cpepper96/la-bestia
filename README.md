# The Anatomy of La Bestia

[Open the live site](https://cpepper96.github.io/la-bestia/)

An interactive look at Ronald Acuña Jr.’s batting kit, inspired by [Human Atlas](https://github.com/ashemag/human-atlas).

Select equipment to see product details, drag the explosion slider to separate the layers, or isolate a piece. The page includes nine selectable layers, visibility controls, pan/zoom, animation, and a responsive layout.

## Run locally

From this directory:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. No build step, package install, or API key is required.

## Files

- `index.html`: page structure and title
- `style.css`: layout and appearance
- `app.js`: interactions and SVG rendering
- `layers.js`: equipment contours and explosion positions
- `parts.js`: product descriptions, material stats, estimates, and sources
- `assets/`: equipped image, matching underlay, and reference photo

## Publishing

GitHub Pages serves the root of the `main` branch. Push changes to `main` to update the website automatically. `.nojekyll` keeps these static files unprocessed.

## Artwork and references

The player artwork is an AI-generated photographic reconstruction in a navy Braves jersey, with highlighter-yellow gear and a classic 13 pendant. Every moving piece clips pixels from the same master image so the assembled view stays aligned. A matching underlay appears beneath removed pieces. A separately clipped portrait correction gives the helmetless view a natural short fade and expression; its generation prompt is recorded in `IMAGE-PROMPTS.md`.

Product cards use documented best matches and comparable Nike retail specifications. Jewelry purity and weight are labeled estimates. The page’s Sources & image notes dialog contains references and the supplied equipment photograph.

Unofficial fan project. Team marks and referenced photography belong to their respective owners.
