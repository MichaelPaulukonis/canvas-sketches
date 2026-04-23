// originally https://editor.p5js.org/kjhollen/sketches/DZGVyhOby

let maskImage;
let confettiGraphics;
let a, a3;
let mouseDirty = true;
let tempTestImage;

function preload() {
  testTempImage = loadImage("picasso.jpeg");
}

function setup() {
  createCanvas(400, 400);

  let maskGraphics = createGraphics(width, height);
  maskGraphics.clear();
  maskGraphics.stroke(255); // extra pixel to leave no gaps
  a = width / 2;
  a3 = a * sqrt(3);
  maskGraphics.triangle(0, height - a3, 2 * a, height - a3, a, height);
  maskImage = createImage(width, height);
  maskImage.copy(maskGraphics, 0, 0, width, height, 0, 0, width, height);

  confettiGraphics = createGraphics(width, height);
  confettiGraphics.image(testTempImage, 0, 0);

  imageMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  if (!mouseDirty) {
    mouseDirty = false;
    return;
  }
  background(0);
  let img = confettiGraphics.get();
  img.mask(maskImage);
  img = img.get();

  translate(width / 2, height / 2);
  for (let i = 0; i < 3; i++) {
    image(img, 0, -height / 2);
    push();
    rotate(60);
    scale(-1, 1);
    image(img, 0, -height / 2);
    pop();
    rotate(120);
  }
}

function mouseMoved() {
  confettiGraphics.image(testTempImage, mouseX-240, mouseY-120);
  mouseDirty = true;
}
