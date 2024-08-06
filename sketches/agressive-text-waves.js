const canvasSketch = require('canvas-sketch')
import p5 from 'p5'
import { Pane } from 'tweakpane'

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5 },
  dimensions: [800, 800],
  prefix: 'agressive',
  // Turn on a render loop
  animate: true,
  playbackRate: 'throttle',
  fps: 30,
  scaleToFit: true
}

let sourceText = `Now is the winter of our discontent
Made glorious summer by this sun of York;
And all the clouds that lour'd upon our house
In the deep bosom of the ocean buried.
Now are our brows bound with victorious wreaths;
Our bruised arms hung up for monuments;
Our stern alarums changed to merry meetings,
Our dreadful marches to delightful measures.
Grim-visaged war hath smooth'd his wrinkled front;
And now, instead of mounting barbed steeds
To fright the souls of fearful adversaries,
He capers nimbly in a lady's chamber
To the lascivious pleasing of a lute.`

let params = {
  stepMode: false,
  speed: 1,
  scale: 20,
  xOffsetSpeed: 0.11,
  yOffsetSpeed: 0.164,
  zOffsetSpeed: 0.001
}

const pane = new Pane()

canvasSketch(({ p5, canvas, resize, update, frame }) => {
  const p = p5
  let cols, rows
  let w, h
  let words
  let grid = []
  let wordObjects = []
  let zoff = 0
  let backgroundLetters =
    // "..........,,,,,:::::;;;;;'''''\"\"\"abcdefghijklmnopqrstuvwxyz".split('')
    "..........,,,,,:::::;;;;;'''''".split('')

  const btn = pane.addButton({
    title: 'Single Step mode',
    label: 'off' // optional
  })

  btn.on('click', (evt) => {
    params.stepMode = !params.stepMode
    btn.label = params.stepMode ? 'on' : 'off'
    // btn.controller_.view.valueElement.blur()
    canvas.focus()
  })

  pane.addInput(params, 'speed', { min: 1, max: 10, step: 1 })
  pane
    .addInput(params, 'scale', { min: 10, max: 50, step: 1 })
    .on('change', ev => {
      update()
      init()
    })
  pane.addInput(params, 'xOffsetSpeed', { min: 0.001, max: 1, step: 0.001 })
  pane.addInput(params, 'yOffsetSpeed', { min: 0.001, max: 1, step: 0.001 })
  pane.addInput(params, 'zOffsetSpeed', { min: 0.001, max: 1, step: 0.001 })

  p.textAlign(p.CENTER, p.CENTER)

  class Cell {
    constructor (x, y, scale) {
      this.x = x
      this.y = y
      this.letter = ' '
      this.scale = scale
    }

    clear () {
      this.letter = ' '
    }

    setLetter (letter) {
      this.letter = letter
    }

    display () {
      p.fill(0)
      p.text(
        this.letter,
        this.x * this.scale + this.scale / 2,
        this.y * this.scale + this.scale / 2
      )
    }
  }

  class Word {
    constructor (text, x, y, ctx) {
      this.ctx = ctx
      this.text = text
      this.x = x
      this.y = y
      this.xoff = this.ctx.random(1000)
      this.yoff = this.ctx.random(1000)
      this.zoff = this.ctx.random(1000)
      this.isVertical = Math.random() < 0.5 // 50-50 chance of being vertical
    }

    touches (other) {
      if (this.isVertical === other.isVertical) {
        if (this.isVertical) {
          if (this.x !== other.x) return 0
          let { minWord, maxWord } =
            this.y < other.y
              ? { minWord: this, maxWord: other }
              : { minWord: other, maxWord: this }
          const overlap = maxWord.y - (minWord.y + minWord.text.length)
          return overlap >= 0 ? 0 : -overlap
        } else {
          if (this.y !== other.y) return 0
          let { minWord, maxWord } =
            this.x < other.x
              ? { minWord: this, maxWord: other }
              : { minWord: other, maxWord: this }
          const overlap = maxWord.x - (minWord.x + minWord.text.length)
          return overlap >= 0 ? 0 : -overlap
        }
      } else {
        // Handle overlap between horizontal and vertical words
        if (this.isVertical) {
          if (
            other.x >= this.x &&
            other.x < this.x + 1 &&
            this.y >= other.y &&
            this.y < other.y + other.text.length
          ) {
            return 1
          }
        } else {
          if (
            this.x >= other.x &&
            this.x < other.x + other.text.length &&
            other.y >= this.y &&
            other.y < this.y + 1
          ) {
            return 1
          }
        }
        return 0
      }
    }

    resolveOverlap (words) {
      for (let word of words) {
        if (word !== this) {
          let overlap = this.touches(word)
          if (overlap > 0) {
            let moveAmount = Math.ceil(overlap / 2)
            if (this.isVertical === word.isVertical) {
              let direction = this.isVertical
                ? this.y < word.y
                  ? -1
                  : 1
                : this.x < word.x
                ? -1
                : 1
              if (this.isVertical) {
                this.y += direction
                word.y -= direction
              } else {
                this.x += direction
                word.x -= direction
              }
            } else {
              if (this.isVertical) {
                this.y += 1
              } else {
                this.x += 1
              }
            }
          }
        }
      }
    }

    update (words) {
      const orig = { x: this.x, y: this.y }
      let moved = false
      // avoid other words
      this.resolveOverlap(words)
      if (this.x !== orig.x || this.y !== orig.y) {
        moved = true
      }
      if (!moved) {
        if (!moved) {
          this.x += Math.round(
            this.ctx.map(
              this.ctx.noise(this.xoff, this.zoff),
              0,
              1,
              -params.speed,
              params.speed
            )
          )
          this.y += Math.round(
            this.ctx.map(
              this.ctx.noise(this.yoff, this.zoff),
              0,
              1,
              -params.speed,
              params.speed
            )
          )
        }
      }

      // Wrap-around logic
      if (this.x < 0) this.x = cols
      if (this.x > cols) this.x = 0
      if (this.y < 0) this.y = rows
      if (this.y > rows) this.y = 0

      // Update noise offsets
      this.xoff += params.xOffsetSpeed
      this.yoff += params.yOffsetSpeed
      this.zoff += params.zOffsetSpeed
    }

    assignToGrid (grid) {
      for (let i = 0; i < this.text.length; i++) {
        let x = this.isVertical ? this.x : (this.x + i) % cols
        let y = this.isVertical ? (this.y + i) % rows : this.y
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
          grid[y][x].setLetter(this.text.charAt(i))
        }
      }
    }
  }

  words = p.splitTokens(sourceText.toUpperCase(), ' ,.;\n')
  // .slice(0,20)

  function init () {
    w = p.width
    h = p.height
    cols = p.floor(w / params.scale)
    rows = p.floor(h / params.scale)
    p.textSize(params.scale - 4)
    grid = []
    wordObjects = []

    for (let y = 0; y < rows; y++) {
      let row = []
      for (let x = 0; x < cols; x++) {
        row.push(new Cell(x, y, params.scale))
      }
      grid.push(row)
    }

    // Initialize wordObjects with random positions
    for (let i = 0; i < words.length; i++) {
      let x = p.floor(p.random(cols))
      let y = p.floor(p.random(rows))
      wordObjects.push(new Word(words[i], x, y, p))
    }
  }

  init()

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height, pause, play }) => {
    let p = p5
    p.background(255)
    zoff += 0.01

    // Clear the grid and fill with random letters
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        grid[y][x].clear()
        let n = p.noise(x * 0.1, y * 0.1, zoff)
        let char = backgroundLetters[p.floor(n * backgroundLetters.length)]
        grid[y][x].setLetter(char)
      }
    }

    // Update word positions and assign characters to the grid
    for (let i = 0; i < wordObjects.length; i++) {
      wordObjects[i].update(wordObjects)
      wordObjects[i].assignToGrid(grid)
    }

    // Display the grid
    for (let y = 0; y < rows; y++) {
      let xoff = 0
      for (let x = 0; x < cols; x++) {
        grid[y][x].display()
        xoff += 0.1
      }
    }

    params.stepMode ? pause() : play()
  }
}, settings)
