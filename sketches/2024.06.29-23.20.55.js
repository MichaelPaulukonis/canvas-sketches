// from https://github.com/mattdesl/canvas-sketch/issues/132#issuecomment-2093335634

const canvasSketch = require("canvas-sketch");
const p5 = require("p5");

var sound;
const preload = (p5) => {
  // You can use p5.loadImage() here, etc...
};

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5, preload },
  // Turn on a render loop
  animate: true,
};

canvasSketch(({ p5 }) => {
  let anim = 0.5;

  // Here is how to attach interactivity to a sketch
  p5.mouseMoved = () => {
    anim = p5.mouseX / p5.width;
  };

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    p5.background(0);
    p5.fill('red');
    p5.noStroke();

    p5.rect(0, 0, width * anim, height);
  };
}, settings);