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
- image inset offsets like this book design:
  ![image inset offsets](beliefs_in_society_book_cover.jpeg)

- https://github.com/VadimGouskov/pretty-grid

### fade-in/fde-out option

Built by shriking the image dow to 0, w/ a black/white bakoground

FADE - diretions are in/out

has a number of frames, that we track
since we have to draw on subsequent frames
but we can't count on global framecounts. because of pauses, help screens, or whatever
So inc/dec (whichever we pick) on each draw loop

I'm thinkning the effect draws a black background, then makes the frame smaller.

By either insets/margine, or by using a scale-transform?

DONE: as POC, settings and checks for on/off are not done yet
Only implemented simple "active" which sets it to loop
Need more of an absolute in/out
Also, possible bug when on a low frame-count (forces a zoom???)


### filters/FX in general

what would this lookk like?
pre/post draw of the square?
pre/post calculation of values sent to square?

I don't even know what I'd want, so I'm not going to even designs it yet

literally, a decorator


## image-shaper

- originally @ https://editor.p5js.org/MichaelPaulukonis/sketches/cg_LK7asX
- used to create a zipped pair of a cutout image with the vectors of that cutout
- the file is then imported by another collage-program of mine

### roadmap

- shape "library"
  - see the thing used for .... that other thing.
  - the one that was mostly dumb html
- load existing vectors onto image
- standard shapes
  - including text <https://erraticgenerator.com/blog/p5js-texttopoints-function/>
- bezier curves, wooo!
- ~~rotation~~
- ~~edit vectors once drawn (prior to render)~~
- better handling of in/out sizes
  - semi-handled, but we should display size and allow shrinking
- some semblance of a UI
- https://programmingdesignsystems.com/shape/custom-shapes/index.html
  - https://programmingdesignsystems.com/shape/procedural-shapes/index.html
  - contours are the p5js term for "holes" in a shape
- shapes https://github.com/gaba5/p5.shape.js
- https://c2js.org/examples.html?name=Chromosome3


## nova.zombie.simulator

Moved on to it's own repo: <https://github.com/MichaelPaulukonis/nova-zombie-simulator.git>


## Agressive Text Waves

If I told you this bore a resemblance to XRAYSMONALISA would that mean anything to you?

