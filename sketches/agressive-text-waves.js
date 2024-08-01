const canvasSketch = require('canvas-sketch')
import p5 from 'p5'

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

canvasSketch(({ p5, canvas, resize, update }) => {
  const p = p5
  let cols, rows
  let scl = 20
  let w, h
  let words
  let grid = []
  let zoff = 0
  let wordObjects = []
  let letters =
    // "..........,,,,,:::::;;;;;'''''\"\"\"abcdefghijklmnopqrstuvwxyz".split('')
    "..........,,,,,:::::;;;;;'''''".split('')

  w = p.width
  h = p.height
  cols = p.floor(w / scl)
  rows = p.floor(h / scl)
  p.textSize(scl - 4)
  p.textAlign(p.CENTER, p.CENTER)

  class Cell {
    constructor (x, y) {
      this.x = x
      this.y = y
      this.letter = ' '
    }

    clear () {
      this.letter = ' '
    }

    setLetter (letter) {
      this.letter = letter
    }

    display () {
      p.fill(0)
      p.text(this.letter, this.x * scl + scl / 2, this.y * scl + scl / 2)
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
    }

    update (yoff, zoff, words) {
      const orig = { x: this.x, y: this.y}
      let moved = false
      // avoid other words
      for (let word of words) {
        if (word !== this) {
          this.x += this.touches(word)
          if (this.x !== orig.x) {
            moved = true
            break
          }
        }
      }
      if (!moved) {
        this.x = this.ctx.floor(this.ctx.noise(this.xoff) * cols)
      }
      this.y = this.ctx.floor(this.ctx.noise(this.yoff) * rows)

      if (isNaN(this.x) || isNaN(this.y)) debugger

      this.xoff += 0.01
      this.yoff += 0.01
    }
  
    // works more like a comparator
    // if no touch, returns 0
    // if overlap, returns 1|-1 depending on which way
    // this should move away from other
    touches (other) {
      // if y is different, exit false
      if (this.y !== other.y) return 0
      // if word with min.x + length >= max.x then they overlap
      // min/max here refer to the positions w/in the row, not word length
      let { minWord, maxWord } =
        this.x < other.x
          ? { minWord: this, maxWord: other }
          : { minWord: other, maxWord: this }
      const overlap = maxWord.x - (minWord.x + minWord.text.length)
      // if overlap is negative, they DO overlap
      return overlap >= 0 
        ? 0
        : this === minWord
          ? -1
          : 1
    }

    assignToGrid (grid) {
      for (let i = 0; i < this.text.length; i++) {
        let x = (this.x + i) % cols
        let y = this.y % rows
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
          grid[y][x].setLetter(this.text.charAt(i))
        }
      }
    }
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

  words = p.splitTokens(sourceText.toUpperCase(), ' ,.;\n')
  // words = ['victorious']

  for (let y = 0; y < rows; y++) {
    let row = []
    for (let x = 0; x < cols; x++) {
      row.push(new Cell(x, y))
    }
    grid.push(row)
  }

  // Initialize wordObjects with random positions
  for (let i = 0; i < words.length; i++) {
    let x = p.floor(p.random(cols))
    let y = p.floor(p.random(rows))
    wordObjects.push(new Word(words[i], x, y, p))
  }

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    let p = p5
    p.background(255)
    let yoff = 0

    // Clear the grid and fill with random letters
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        grid[y][x].clear()
        let n = p.noise(x * 0.1, y * 0.1, zoff)
        let char = letters[p.floor(n * letters.length)]
        grid[y][x].setLetter(char)
      }
    }

    // Update word positions and assign characters to the grid
    for (let i = 0; i < wordObjects.length; i++) {
      wordObjects[i].update(yoff, zoff, wordObjects)
      wordObjects[i].assignToGrid(grid)
    }

    // Display the grid
    for (let y = 0; y < rows; y++) {
      let xoff = 0
      for (let x = 0; x < cols; x++) {
        grid[y][x].display()
        xoff += 0.1
      }
      yoff += 0.1
    }

    zoff += 0.01
  }
}, settings)
