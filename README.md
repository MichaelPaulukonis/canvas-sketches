# sketches using ... canvas-sketch

- https://github.com/mattdesl/canvas-sketch
- https://github.com/mattdesl/canvas-sketch/blob/master/docs/README.md

`npx canvas-sketch-cli sketches/index.js --output=output/ --stream`

`npx canvas-sketch-cli sketches/sketch.js --new --template=p5`

`npx canvas-sketch-cli sketches/sketch.js --dir dist --build`

## insidious-motorcycle

- manually inc/dec vectors/vector amounts
- zoom in/out of source
- rewind - go forward/backward with the vectors
- https://www.gorillasun.de/blog/a-guide-to-making-gifs-in-p5js-and-processing/ noise loops
- work from center or other locations instead of just "upper-left"
- "observer" option to see where the current section is on source image
  - in "delay" mode the current section is... weird. waaaaay off.
  - would be nice to manually nudge it

- https://github.com/VadimGouskov/pretty-grid

### fade-in/fde-out option

Built by shrinking individual cells down to 0, w/ a black/white background

- possible bug when on a low frame-count (forces a zoom???)
- Code is related to making an inset frame - either all identical, or offset based on a distance or perlin noise.
 - like this book design:
  ![image inset offsets](beliefs_in_society_book_cover.jpeg)

### filters/FX in general

what would this lookk like?
pre/post draw of the square?
pre/post calculation of values sent to square?

I don't even know what I'd want, so I'm not going to even designs it yet

literally, a decorator


## Agressive Text Waves

If I told you this bore a resemblance to XRAYSMONALISA would that mean anything to you?


## tools

Fiddling with a p5js-global-to-instance-mode converter
People have done this before.
But has anybody ever used a real code parser?
Maybe they have.
**But I have not!**

Goal: something that can convert an editor.p5js.org sketch into a canvas-sketch-ready file.


## image-shaper

**ARCHIVED** - has moved into [computational collage](https://github.com/MichaelPaulukonis/computational-collage.git)


## nova.zombie.simulator

Moved on to it's own repo: <https://github.com/MichaelPaulukonis/nova-zombie-simulator.git>



