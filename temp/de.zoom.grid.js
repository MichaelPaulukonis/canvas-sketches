let step = 0; 
let gridIndex = 0;
let shrinkSteps;
const gridCount = 5; // assuming a square, so really gridCount x gridCount
const targetSize = 1080; 
const tileSize = Math.floor(targetSize / gridCount);
const initialShrinkSteps = 20;
const minShrinkSteps = 5;
let img;
let pg;
let gridPositions = [];
let autoSave = true;


const timestamp = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  const secs = String(d.getSeconds()).padStart(2, '0')
  const millis = String(d.getMilliseconds()).padStart(3, '0')
  return `${year}${month}${day}.${hour}${min}${secs}.${millis}`
}

  function generateFilename () {
    return `little_suggestion_grid.${timestamp()}.png`
  }

function easeInQuad(t) {
  return t * t;
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function shrinkImage(p, gridX, gridY) {
  let t = step / shrinkSteps;
  let easedT = easeInQuad(t);
  let size = p.lerp(targetSize, tileSize, easedT);
  let x = p.lerp(targetSize / 2, gridX * tileSize + tileSize / 2, easedT);
  let y = p.lerp(targetSize / 2, gridY * tileSize + tileSize / 2, easedT);

  // Set transparency
  let alpha = p.lerp(100, 255, t);
  p.tint(255, alpha);

  p.image(img, x - size / 2, y - size / 2, size, size);

  // Reset tint to default
  p.noTint();
}

let sketch = function (p) {
  p.preload = function () {
    img = p.loadImage("images/mona.png");
  };

  p.setup = function () {
    p.createCanvas(targetSize, targetSize);
    pg = p.createGraphics(targetSize, targetSize);
    p.frameRate(4)
    
    // Initialize grid positions
    for (let y = 0; y < gridCount; y++) {
      for (let x = 0; x < gridCount; x++) {
        gridPositions.push({ x, y });
      }
    }

    gridPositions = p.shuffle(gridPositions);
    shrinkSteps = getShrinkSteps(gridIndex, gridPositions.length);
    
    p.background(255);
    if (autoSave) p.saveCanvas(generateFilename());
  };

  function getShrinkSteps(gridIndex, totalGrids) {
    let t = gridIndex / totalGrids;
    let easedT = easeInOutQuad(t);
    return Math.floor(p.lerp(initialShrinkSteps, minShrinkSteps, easedT));
  }

  p.draw = function () {
    p.background(255);
    p.image(pg, 0, 0); // Draw the completed grid squares

    if (step < shrinkSteps) {
      let { x: gridX, y: gridY } = gridPositions[gridIndex];
      shrinkImage(p, gridX, gridY);
      step++;
    } else {
      let { x: gridX, y: gridY } = gridPositions[gridIndex];
      pg.image(img, gridX * tileSize, gridY * tileSize, tileSize, tileSize); // Draw the final position in the current grid square to the PGraphics object
      p.image(pg, 0, 0);
      shrinkSteps = getShrinkSteps(gridIndex, gridPositions.length);
      step = 0; // Reset step counter
      gridIndex++; // Move to the next grid position
      if (gridIndex >= gridPositions.length) {
        p.image(pg, 0, 0);
        p.noLoop();
        gridIndex = 0; // Reset index if all positions are filled
      }
    }
    
     if (autoSave) p.saveCanvas(generateFilename());
  };
};

new p5(sketch);
