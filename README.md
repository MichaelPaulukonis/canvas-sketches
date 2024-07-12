# sketches using ... canvas-sketch

- https://github.com/mattdesl/canvas-sketch
- https://github.com/mattdesl/canvas-sketch/blob/master/docs/README.md

`npx canvas-sketch-cli sketches/index.js --output=output/ --stream`

`npx canvas-sketch-cli sketches/sketch.js --new --template=p5`


## insidious-motorcycle

- manually inc/dec vectors/vector amounts
- zoom in/out of source
- rewind - go forward/backward with the vectors
- https://www.gorillasun.de/blog/a-guide-to-making-gifs-in-p5js-and-processing/ noise loops
- work from center or other locations instead of just "upper-left"
- image inset offsets like this book design:

![image inset offsets](beliefs_in_society_book_cover.jpeg)

## image-shaper

- originally @ https://editor.p5js.org/MichaelPaulukonis/sketches/cg_LK7asX
- used to create a zipped pair of a cutout image with the vectors of that cutout
- the file is then imported by another collage-program of mine

### roadmap

- standard shapes
- rotation
- edit vectors once drawn (prior to render)
- load existing vectors onto image
- better handling of in/out sizes
