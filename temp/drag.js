// https://editor.p5js.org/MichaelPaulukonis/sketches/99iMKW8DC

function sketch(p) {
  let img;
  let xOffsets = [0, 0, 0];
  let yOffsets = [0, 0, 0];
  let easing = 0.3;
  let dragging = false;
  let dragStart = null; // vector
  let needsRedraw = true;
  let autoSave = false;

  p.preload = function () {
    img = p.loadImage("images/mona.png");
  };

  p.setup = function () {
    img.resize(600, 0);
    p.createCanvas(img.width, img.height);
  };

  p.draw = function () {
    if (needsRedraw) {
      const processedImg = shiftImage(img, xOffsets, yOffsets);
      p.image(processedImg, 0, 0);
      if (autoSave) p.saveCanvas(`supershiftrosethief.${p.frameCount}.png`);
      needsRedraw = false;
    }

    if (!dragging) {
      if (!isEasingDone(xOffsets) || !isEasingDone(yOffsets)) {
        // Ease back to 0
        for (let i = 0; i < 3; i++) {
          xOffsets[i] -=
            Math.sign(xOffsets[i]) * easing * Math.abs(xOffsets[i]);
          yOffsets[i] -=
            Math.sign(yOffsets[i]) * easing * Math.abs(yOffsets[i]);
        }
        needsRedraw = true;
      } else {
        autoSave = false;
      }
    }
  };

  p.mousePressed = function () {
    dragStart = new p5.Vector(p.mouseX, p.mouseY);
  };

  p.mouseDragged = function () {
    dragging = true;
    autoSave = true;
    let dx = p.mouseX - dragStart.x;
    let dy = p.mouseY - dragStart.y;
    xOffsets = [dx * 0.8, dx * 1.2, dx * 1.8];
    yOffsets = [dy * 0.8, dy * 1.2, dy * 1.8];
    needsRedraw = true;
  };

  p.mouseReleased = function () {
    dragging = false;
  };

  const shiftImage = (img, xOffsets = [0, 0, 0], yOffsets = [0, 0, 0]) => {
    let processedImg = p.createImage(img.width, img.height);
    img.loadPixels();
    processedImg.loadPixels();

    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        for (let c = 0; c < 3; c++) {
          let xOffset = Math.round(xOffsets[c]);
          let yOffset = Math.round(yOffsets[c]);
          let newX = (x + xOffset + img.width) % img.width;
          let newY = (y + yOffset + img.height) % img.height;
          let newIndex = (newX + newY * img.width) * 4;
          let index = (x + y * img.width) * 4;
          processedImg.pixels[newIndex + c] = img.pixels[index + c];
        }
        processedImg.pixels[(x + y * img.width) * 4 + 3] =
          img.pixels[(x + y * img.width) * 4 + 3]; // Copy alpha channel
      }
    }

    processedImg.updatePixels();
    return processedImg;
  };

  const isEasingDone = (arr) => arr.every((val) => Math.abs(val) <= 1);
}

new p5(sketch);
