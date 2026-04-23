// inspired by https://bsky.app/profile/leedoughty.bsky.social/post/3ldh2esstd22h
// https://leedoughty.com/

/** TODO:
  size an element down from max size by maybe 20% at random
  play with larger, too?
  square image plus square image are max v max and a kinda boring
**/

const imgs = [
  "5mg.logo.01.png",
  "asteroids.png",
  "cats.00.png",
  "butter.00.png",
  "butter.01.png",
  "butter.02.png",
  "butter.03.png",
  "butter.05.png",
  "butter.06.png",
  "buttermilk.png",
  "cowboy.00.png",
  "cowboy.02.png",
  "cows.00.png",
  "cows.duo.01.png",
  "damien.hirst.01.png",
  "dawn.00.png",
  "dc.logo.png",
  "do.not.remove.png",
  "fire.door.png",
  "flower.00.jpeg",
  "frog.00.jpeg",
  "gottlieb.01.png",
  "gottlieb.02.png",
  "green.beans.01.png",
  "haloperidol.png",
  "hamburglar.01.png",
  "hep.patter.00.png",
  // "interlocking.pieces.png",
  "jagermeister.jpeg",
  "john.deere.00.png",
  "keep.on.00.png",
  "misfits.png",
  "mona.dots.01.png",
  "nancy.sluggo.hep.patter.png",
  "nancy.sluggo.idea.png",
  "nancy.tell.him.off.png",
  "napster.png",
  "outside.greenery.png",
  "pbs.png",
  "peanuts.lucy.00.png",
  "peanuts.song.01.png",
  "peanuts.torn.01.png",
  "pez.00.png",
  "please.switch.off.png",
  "sluggo.dope.png",
  "space.invaders.png",
  "splat.00.png",
  "splat.01.png",
  "splat.02.png",
  "splat.03.png",
  "techno.00.png",
  "text.00.png",
  "text.01.png",
  "text.02.png",
  "text.03.png",
  "think.big.png",
  "thumbprint.01.png",
  "tow.zone.png",
  "tri.sum.logo.00.png",
  "tv.issues.png",
  "tv.robot.png",
  "unicum.png",
  "vcs.01.png",
  "warhol.last.supper.png",
  "watch.01.png",
  "watch.more.tv.png",
  "whipping.cream.duo.png",
];

const RISOCOLORS = [
  { name: "APRICOT", color: [246, 160, 77] },
  { name: "AQUA", color: [94, 200, 229] },
  // { name: "BLACK", color: [0, 0, 0] },
  { name: "BLUE", color: [0, 120, 191] },
  { name: "BRICK", color: [167, 81, 84] },
  { name: "BRIGHTGOLD", color: [186, 128, 50] },
  { name: "BRIGHTOLIVEGREEN", color: [180, 159, 41] },
  { name: "BRIGHTRED", color: [241, 80, 96] },
  { name: "BROWN", color: [146, 95, 82] },
  { name: "BUBBLEGUM", color: [249, 132, 202] },
  { name: "BURGUNDY", color: [145, 78, 114] },
  { name: "CHARCOAL", color: [112, 116, 124] },
  { name: "COPPER", color: [189, 100, 57] },
  { name: "CORAL", color: [255, 142, 145] },
  { name: "CORNFLOWER", color: [98, 168, 229] },
  { name: "CRANBERRY", color: [209, 81, 122] },
  { name: "CRIMSON", color: [228, 93, 80] },
  { name: "DARKMAUVE", color: [189, 140, 166] },
  { name: "EMERALD", color: [25, 151, 93] },
  { name: "FLATGOLD", color: [187, 139, 65] },
  { name: "FLUORESCENTGREEN", color: [68, 214, 44] },
  { name: "FLUORESCENTORANGE", color: [255, 116, 119] },
  { name: "FLUORESCENTPINK", color: [255, 72, 176] },
  { name: "FLUORESCENTRED", color: [255, 76, 101] },
  { name: "FLUORESCENTYELLOW", color: [255, 233, 22] },
  { name: "FOREST", color: [81, 110, 90] },
  { name: "GRANITE", color: [165, 170, 168] },
  { name: "GRAPE", color: [108, 93, 128] },
  { name: "GRASS", color: [57, 126, 88] },
  { name: "GRAY", color: [146, 141, 136] },
  { name: "GREEN", color: [0, 169, 92] },
  { name: "HUNTERGREEN", color: [64, 112, 96] },
  { name: "INDIGO", color: [72, 77, 122] },
  { name: "IVY", color: [22, 155, 98] },
  { name: "KELLYGREEN", color: [103, 179, 70] },
  { name: "LAGOON", color: [47, 97, 101] },
  { name: "LAKE", color: [35, 91, 168] },
  { name: "LIGHTGRAY", color: [136, 137, 138] },
  { name: "LIGHTLIME", color: [227, 237, 85] },
  { name: "LIGHTMAUVE", color: [230, 181, 201] },
  { name: "LIGHTTEAL", color: [0, 157, 165] },
  { name: "MAHOGANY", color: [142, 89, 90] },
  { name: "MARINERED", color: [210, 81, 94] },
  { name: "MAROON", color: [158, 76, 110] },
  { name: "MEDIUMBLUE", color: [50, 85, 164] },
  { name: "MELON", color: [255, 174, 59] },
  { name: "METALLICGOLD", color: [172, 147, 110] },
  { name: "MIDNIGHT", color: [67, 80, 96] },
  { name: "MINT", color: [130, 216, 213] },
  // { name: "MIST", color: [213, 228, 192] },
  { name: "MOSS", color: [104, 114, 77] },
  { name: "ORANGE", color: [255, 108, 47] },
  { name: "ORCHID", color: [170, 96, 191] },
  { name: "PAPRIKA", color: [238, 127, 75] },
  { name: "PINE", color: [35, 126, 116] },
  { name: "PLUM", color: [132, 89, 145] },
  { name: "PUMPKIN", color: [255, 111, 76] },
  { name: "PURPLE", color: [118, 91, 167] },
  { name: "RAISIN", color: [119, 93, 122] },
  { name: "RASPBERRYRED", color: [209, 81, 122] },
  { name: "RED", color: [255, 102, 94] },
  { name: "RISOFEDERALBLUE", color: [61, 85, 136] },
  { name: "SCARLET", color: [246, 80, 88] },
  { name: "SEABLUE", color: [0, 116, 162] },
  { name: "SEAFOAM", color: [98, 194, 177] },
  { name: "SKYBLUE", color: [73, 130, 207] },
  { name: "SLATE", color: [94, 105, 94] },
  { name: "SMOKYTEAL", color: [95, 130, 137] },
  { name: "SPRUCE", color: [74, 99, 93] },
  { name: "STEEL", color: [55, 94, 119] },
  { name: "SUNFLOWER", color: [255, 181, 17] },
  { name: "TEAL", color: [0, 131, 138] },
  { name: "TOMATO", color: [210, 81, 94] },
  { name: "TURQUOISE", color: [0, 170, 147] },
  { name: "VIOLET", color: [157, 122, 210] },
  // { name: "WHITE", color: [255, 255, 255] },
  { name: "WINE", color: [145, 78, 114] },
  { name: "YELLOW", color: [255, 232, 0] },
  // { name: "BISQUE", color: [242, 205, 207] },
  // { name: "CLEARMEDIUM", color: [242, 242, 242] },
];

function getRandomUniqueItem(arr, excludeItems) {
  let filteredArr = arr.filter((item) => !excludeItems.includes(item));
  if (filteredArr.length === 0) {
    throw new RangeError("getRandomUniqueItem: no available items to select");
  }
  let randomIndex = Math.floor(Math.random() * filteredArr.length);
  return filteredArr[randomIndex];
}

let currentBlendModeIndex = 0; // Start with the first blend mode

const backgroundModes = [
  {
    color: [0, 0, 0],
    blendModes: ["ADD", "EXCLUSION", "SCREEN", "DIFFERENCE", "LIGHTEST"],
  },
  {
    color: [255, 255, 255],
    blendModes: [
      "MULTIPLY",
      "EXCLUSION",
      "DIFFERENCE",
      "DARKEST",
      "HARD_LIGHT",
    ],
  },
];
let currentBackgroundModeIndex = 0; // Start with the first background mode

let sketch = function (p) {
  let img1, img2;
  let threshold = 128; // Adjust this value for different threshold levels
  let backgroundColor;
  let currentPair = 0; // Track which image-color pair to update next
  let pause = false;
  let autoSave = false;

  let imageColorPairs = [
    { img: null, color: null, buffer: null },
    { img: null, color: null, buffer: null },
  ];

  p.setup = function () {
    p.pixelDensity(2)
    const c = p.createCanvas(p.windowWidth, p.windowHeight);
    c.elt.focus();
    p.imageMode(p.CENTER);
    setBlendModeAndBackground();
    initializeImageColorPairs(); // Initialize both pairs initially
    updateImageColorPair(0);
    updateImageColorPair(1);
  };

  p.mousePressed = function () {
    loadNewImagesAndColors(); // Update one pair at a time
  };

  p.keyPressed = function () {
    if ((p.keyIsDown(p.CONTROL) || p.keyIsDown(91)) && p.key === "s") {
      p.saveCanvas(generateFilename());
      return false; // Prevent default browser behavior
    } else if (p.key === "b") {
      toggleBackgroundColor();
      regenerateBuffers();
    } else if (p.key === "m") {
      cycleBlendMode();
    } else if (p.key === "p") {
      pause = !pause;
    } else if (p.key === "S") {
      autoSave = !autoSave;
      console.log(`autoSave: ${autoSave}`)
    } else {
      console.log(`NADA! ${p.key}`)
    }
  };

  p.draw = () => {
    if (!pause && p.frameCount % 30 === 0) {
      loadNewImagesAndColors();
      if (autoSave) {
         p.saveCanvas(generateFilename());
      }
    }
  };

  function setBlendModeAndBackground() {
    const currentBackgroundMode = backgroundModes[currentBackgroundModeIndex];
    backgroundColor = p.color(...currentBackgroundMode.color);
    p.blendMode(p[currentBackgroundMode.blendModes[currentBlendModeIndex]]);
    p.background(p.color(...currentBackgroundMode.color));
  }

  function toggleBackgroundColor() {
    currentBackgroundModeIndex =
      (currentBackgroundModeIndex + 1) % backgroundModes.length;
    currentBlendModeIndex = 0; // Reset to the first blend mode for the new background
    setBlendModeAndBackground();
    updateScreen();
  }

  function regenerateBuffers() {
    imageColorPairs.forEach((pair, index) => {
      if (pair.img && pair.color) {
        p.loadImage("./images/" + pair.img, function (img) {
          imageColorPairs[index].buffer = p.createMonochromeImage(
            img,
            p.color(pair.color.color)
          );
          updateScreen();
        });
      }
    });
  }

  function cycleBlendMode() {
    const currentBackgroundMode = backgroundModes[currentBackgroundModeIndex];
    currentBlendModeIndex =
      (currentBlendModeIndex + 1) % currentBackgroundMode.blendModes.length;
    p.blendMode(p[currentBackgroundMode.blendModes[currentBlendModeIndex]]);
    updateScreen();
  }

  function generateFilename() {
    let d = new Date();
    return (
      "two_tone_image." +
      d.getFullYear() +
      "." +
      (d.getMonth() + 1) +
      "." +
      d.getDate() +
      "." +
      d.getHours() +
      d.getMinutes() +
      d.getSeconds() +
      ".png"
    );
  }

  function initializeImageColorPairs() {
    imageColorPairs[0].img = getRandomUniqueItem(imgs, []);
    imageColorPairs[0].color = getRandomUniqueItem(RISOCOLORS, []);
    imageColorPairs[1].img = getRandomUniqueItem(imgs, [
      imageColorPairs[0].img,
    ]);
    imageColorPairs[1].color = getRandomUniqueItem(RISOCOLORS, [
      imageColorPairs[0].color,
    ]);
  }

  function loadNewImagesAndColors() {
    updateImageColorPair(currentPair);
    currentPair = (currentPair + 1) % 2; // Toggle between 0 and 1
  }

  function updateImageColorPair(pairIndex) {
    const selectedImage = getRandomUniqueItem(
      imgs,
      imageColorPairs.map((pair) => pair.img)
    );
    const selectedColor = getRandomUniqueItem(
      RISOCOLORS,
      imageColorPairs.map((pair) => pair.color)
    );

    imageColorPairs[pairIndex].img = selectedImage;
    imageColorPairs[pairIndex].color = selectedColor;

    p.loadImage("./images/" + selectedImage, function (img) {
      imageColorPairs[pairIndex].buffer = p.createMonochromeImage(
        img,
        p.color(selectedColor.color)
      );
      updateScreen();
    });

    // console.log(selectedImage, selectedColor.name);
  }

  function updateScreen() {
    p.clear();
    const currentBackgroundMode = backgroundModes[currentBackgroundModeIndex];
    p.background(currentBackgroundMode.color);
    p.blendMode(p[currentBackgroundMode.blendModes[currentBlendModeIndex]]);
    imageColorPairs.forEach((pair) => {
      if (pair.buffer) p.image(pair.buffer, p.width / 2, p.height / 2);
    });
    // console.log(currentBackgroundMode.blendModes[currentBlendModeIndex]);
    // imageColorPairs.forEach((pair) => {
    //   console.log(pair.img, pair.color.name);
    // });
  }

  p.createMonochromeImage = function (img, monoColor) {
    const scaleRatio = p.calculateScaleRatio(img);
    const scaledWidth = Math.round(img.width * scaleRatio);
    const scaledHeight = Math.round(img.height * scaleRatio);

    const buffer = p.createGraphics(scaledWidth, scaledHeight);
    buffer.image(img, 0, 0, scaledWidth, scaledHeight);
    buffer.loadPixels();

    for (let y = 0; y < scaledHeight * p.pixelDensity(); y++) {
      for (let x = 0; x < scaledWidth * p.pixelDensity(); x++) {
        let index = (x + y * scaledWidth * p.pixelDensity()) * 4;
        let r = buffer.pixels[index];
        let g = buffer.pixels[index + 1];
        let b = buffer.pixels[index + 2];
        let a = buffer.pixels[index + 3];
        let avg = (r + g + b) / 3;
        let bw = avg > threshold ? 255 : 0;

        if (a === 0 || bw === 255) {
          // Transparent pixel or white, set to background color
          buffer.pixels[index] = p.red(backgroundColor);
          buffer.pixels[index + 1] = p.green(backgroundColor);
          buffer.pixels[index + 2] = p.blue(backgroundColor);
        } else {
          buffer.pixels[index] = p.red(monoColor);
          buffer.pixels[index + 1] = p.green(monoColor);
          buffer.pixels[index + 2] = p.blue(monoColor);
        }
        buffer.pixels[index + 3] = 255; // Set alpha to fully opaque
      }
    }
    buffer.updatePixels();
    return buffer;
  };

  p.calculateScaleRatio = function (img) {
    const maxCanvasSize = Math.min(p.width, p.height) * 0.8;
    const maxImgSize = Math.max(img.width, img.height);
    return maxCanvasSize / maxImgSize;
  };
};

new p5(sketch);
