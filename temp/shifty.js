function sketch(p) {
  let img;

  p.preload = function () {
    img = p.loadImage("images/mona.png");
  };

  p.setup = function () {
    p.createCanvas(img.width, img.height);
    p.noLoop();
  };

  p.draw = function () {
    const processedImg = shiftImage(img, [20, 40, 0]);
    p.image(processedImg, 0, 0);
  };

  const shiftImage = (img, offsets = [0, 20, 40]) => {
    let processedImg = p.createImage(img.width, img.height);
    img.loadPixels();
    processedImg.loadPixels();

    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        let index = (x + y * img.width) * 4;

        // Shift red channel by 20 pixels to the right
        let redIndex = (((x + offsets[0]) % img.width) + y * img.width) * 4;
        let greenIndex = (((x + offsets[1]) % img.width) + y * img.width) * 4;
        let blueIndex = (((x + offsets[2]) % img.width) + y * img.width) * 4;

        processedImg.pixels[index] = img.pixels[redIndex];
        processedImg.pixels[index + 1] = img.pixels[greenIndex];
        processedImg.pixels[index + 2] = img.pixels[blueIndex];

        // leave alpha alone!
        processedImg.pixels[index + 3] = img.pixels[index + 3];
      }
    }

    processedImg.updatePixels();
    return processedImg;
  };
}

new p5(sketch);
