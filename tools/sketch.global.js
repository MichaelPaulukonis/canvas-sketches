    let words;
    let wordObjects = [];
    let scl = 80;
    let zoff = 0;

    function setup() {
      createCanvas(800, 800);
      textSize(20);
      textAlign(CENTER, CENTER);

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
      To the lascivious pleasing of a lute.`;
      
      words = splitTokens(sourceText, ' ,.;\n');

      for (let i = 0; i < words.length; i++) {
        let x = random(width);
        let y = random(height);
        wordObjects.push(new Word(words[i], x, y));
      }
    }

    function draw() {
      background(255);
      let yoff = 0;

      for (let y = 0; y < height / scl; y++) {
        let xoff = 0;
        for (let x = 0; x < width / scl; x++) {
          let index = floor(x + y * (width / scl));
          if (index < wordObjects.length) {
            let word = wordObjects[index];
            let xPos = x * scl + scl / 2;
            let yPos = y * scl + scl / 2;

            word.update(xoff, yoff, zoff);
            word.display(xPos, yPos);
          }
          xoff += 0.1;
        }
        yoff += 0.1;
      }
      zoff += 0.01;
    }

    class Word {
      constructor(text, x, y) {
        this.text = text;
        this.x = x;
        this.y = y;
      }

      update(xoff, yoff, zoff) {
        this.x = noise(xoff, yoff, zoff) * width;
        this.y = noise(xoff + 100, yoff + 100, zoff + 100) * height;
      }

      display(xPos, yPos) {
        fill(0);
        text(this.text, this.x, this.y);
      }
    }