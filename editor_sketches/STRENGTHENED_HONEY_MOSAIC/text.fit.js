const sketch = (p) => {
  let textString = "";
  let currentFont;
  const canvasWidth = 600;
  const canvasHeight = 600;
  let defaultFont;

  p.preload = function () {
    defaultFont = p.loadFont('fonts/Marlboro.ttf');
  };

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.textFont(defaultFont);
    p.textAlign(p.LEFT, p.TOP); // Align text to the top-left
    currentFont = defaultFont; // initialize currentFont

    // Set default text, you can change it here
    setText("The quick brown fox jumps over the lazy fox");
  };

  // sets the text, and formats it
  const setText = (newText) => {
    textString = newText;
    formatText();
  };

  const formatText = () => {
    p.background(220);
    if (textString === "") {
      return; // Handle empty text string
    }

    // 1. Initialization - each word on own line
    let lines = textString.split(" ").map(word => [word]);
    let allLineFontSizes = []

    // 2. Iterative Refinement Loop
    while (true) {
      // 2.1 Line Sizing
      let totalHeight = 0;
      let lineFontSizes = [];
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let lineText = line.join(" ");
        let lineFontSize = calculateLineFontSize(lineText);
        lineFontSizes.push(lineFontSize);
        p.textSize(lineFontSize);
        totalHeight += p.textAscent() + p.textDescent();
      }

      allLineFontSizes = lineFontSizes

      // 2.2 Height Check
      if (totalHeight < canvasHeight) {
        // increase font size and go to 2.1
        for (let i = 0; i < lineFontSizes.length; i++) {
          lineFontSizes[i]++;
        }
      } else {
        // combine lines
        if (lines.length > 1) {
            //find shortest two
            let shortestLineIndex1 = 0;
            let shortestLineLength1 = lines[0].length;
            let shortestLineIndex2 = 1;
            let shortestLineLength2 = lines[1].length;

            for(let i = 0; i < lines.length; i++){
                let lineLength = lines[i].length;
                if(lineLength < shortestLineLength1){
                    shortestLineLength2 = shortestLineLength1;
                    shortestLineIndex2 = shortestLineIndex1
                    shortestLineLength1 = lineLength;
                    shortestLineIndex1 = i;
                } else if (lineLength < shortestLineLength2) {
                    shortestLineLength2 = lineLength;
                    shortestLineIndex2 = i
                }
            }

          //combine the two shortest lines
          let lineIndexToKeep = Math.min(
            shortestLineIndex1,
            shortestLineIndex2
          );
          let lineIndexToRemove = Math.max(
            shortestLineIndex1,
            shortestLineIndex2
          );
          lines[lineIndexToKeep] = lines[lineIndexToKeep].concat(
            lines[lineIndexToRemove]
          );
          lines.splice(lineIndexToRemove, 1);

        } else {
          break; //no more lines to combine
        }
      }

      if (lines.length === 1) {
        break; //dont combine only 1 line
      }
      if(lines.length > 1 && allLineFontSizes.every( (val, i, arr) => val === arr[0] ) ){
          break;
      }
    }
    // Draw
    drawText(lines, allLineFontSizes);
  };

  const calculateLineFontSize = (line) => {
    let testFontSize = 10;
    p.textSize(testFontSize);
    while (p.textWidth(line) < canvasWidth) {
      testFontSize++;
      if(testFontSize > canvasWidth){
          return testFontSize -1;
      }
      p.textSize(testFontSize);
    }
    return testFontSize - 1;
  };

  const drawText = (lines, fontSizes) => {
    let y = 0;
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      let lineWidth = p.textWidth(line.join(" "));
      let wordCount = line.length;
      p.textSize(fontSizes[i]);

      if (wordCount > 1) {
        // Justify multi-word lines
        let spaceWidth = p.textWidth(" ");
        let totalSpaceWidth = canvasWidth - lineWidth;
        let extraSpacePerGap = totalSpaceWidth / (wordCount - 1);

        let x = 0;
        for (let j = 0; j < wordCount; j++) {
          let word = line[j];
          p.text(word, x, y);
          x += p.textWidth(word);
          if (j < wordCount - 1) {
            x += extraSpacePerGap;
          }
        }
      } else {
        // Justify single-word lines
        let scaleFactor = canvasWidth / lineWidth;
        p.push();
        p.scale(scaleFactor, 1);
        p.text(line[0], 0, y);
        p.pop();
      }

      y += p.textAscent() + p.textDescent();
    }
  };

  p.setFont = (font) => {
    currentFont = font;
    p.textFont(currentFont);
    formatText();
  };

  // public function
  p.myCustomRedrawAccordingToNewDimensions = function () {
    formatText();
  };
};

let myp5 = new p5(sketch);

// Public functions outside the sketch
function changeFont(font) {
  myp5.setFont(font);
}

function changeText(text) {
  myp5.setText(text);
}
