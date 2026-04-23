;(function () {
  var sketch = function (p5) {
    let words
    let wordObjects = []
    let scl = 80
    let zoff = 0
    p5.setup = () => {
      p5.createCanvas(800, 800)
      p5.textSize(20)
      p5.textAlign(p5.CENTER, p5.CENTER)

      // this is the text we are splitting up
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
      words = p5.splitTokens(sourceText, ' ,.;\n')
      for (let i = 0; i < words.length; i++) {
        let x = p5.random(p5.width)
        let y = p5.random(p5.height)
        wordObjects.push(new Word(words[i], x, y))
      }
    }
    p5.draw = () => {
      p5.background(255)
      let yoff = 0
      for (let y = 0; y < p5.height / scl; y++) {
        let xoff = 0
        for (let x = 0; x < p5.width / scl; x++) {
          let index = p5.floor(x + y * (p5.width / scl))
          if (index < wordObjects.length) {
            let word = wordObjects[index]
            let xPos = x * scl + scl / 2
            let yPos = y * scl + scl / 2
            word.update(xoff, yoff, zoff)
            word.display(xPos, yPos)
          }
          xoff += 0.1
        }
        yoff += 0.1
      }
      zoff += 0.01
    }
    class Word {
      constructor (text, x, y) {
        this.text = text
        this.x = x
        this.y = y
      }
      update (xoff, yoff, zoff) {
        this.x = p5.noise(xoff, yoff, zoff) * p5.width
        this.y = p5.noise(xoff + 100, yoff + 100, zoff + 100) * p5.height
      }
      display (xPos, yPos) {
        p5.fill(0)
        p5.text(this.text, this.x, this.y)
      }
    }
  }
  new p5(sketch)
})()
