// Import necessary libraries
const acorn = require('acorn')
const estraverse = require('estraverse')
const escodegen = require('escodegen')
const fs = require('fs')

// Function to convert a global-mode p5.js sketch to instance mode
function convertToInstanceMode (globalCode) {
  // Parse the global-mode code into an AST
  const ast = acorn.parse(globalCode, { ecmaVersion: 2020 })

  // Define the instance name
  const instanceName = 'sketch'

  // Helper function to transform p5.js function names
  function transformP5Function(node) {
    if (
      node.type === 'CallExpression' &&
      node.callee.type === 'Identifier' &&
      /^(setup|draw|mousePressed|keyPressed|mouseMoved|mouseDragged|mouseReleased|mouseClicked|mouseWheel|keyTyped|keyReleased|image|rect|ellipse|line|point|quad|triangle|arc|bezier|curve|vertex|beginShape|endShape|loadImage|loadFont|text|textSize|textFont|textAlign|textLeading|textWidth|textAscent|textDescent|loadStrings|loadJSON|loadBytes|loadTable|loadXML|loadModel|modelX|modelY|ambientLight|ambientMaterial|directionalLight|pointLight|lights|lightFalloff|spotLight|noLights|loadShader|createShader|shader|resetShader|normalMaterial|texture|textureMode|textureWrap|ambientLight|emissiveMaterial|specularMaterial|shininess|loadCamera|setCamera|camera|perspective|ortho|frustum|createCamera|createCapture|createVideo|createOutput|createInput|saveCanvas|saveFrames|loadPixels|updatePixels|set|get|loadPixels|updatePixels|pixels|blend|copy|filter|loadShader|resetShader|shader|loadModel|plane|box|sphere|cylinder|cone|ellipsoid|torus|loadBinary|createStringDict|createNumberDict|saveJSON|saveStrings|saveTable|writeFile|downloadFile|httpGet|httpPost|httpDo|beginRaw|endRaw|createWriter|createReader|selectOutput|saveBytes|saveJSONObject|saveJSONArray|saveStream|saveXML|selectInput|removeElements|createDiv|createP|createSpan|createImg|createA|createButton|createCheckbox|createSelect|createRadio|createColorPicker|createInput|createFileInput|createVideo|createAudio|createCapture|createElement|createCanvas|createGraphics|createRenderer|createImage|createShape|createVector|createFont|createShader|createCamera|createCameraCapture|createOscillator|createConvolver|createEnvelope|createImpulse|createNoise|createAudioWorkletNode|createAudioContext|getAudioContext|getCurrentAudioContext|userStartAudioContext|sampleRate|freqToMidi|midiToFreq|soundFormats|getOutputVolume|outputVolume|inputSources|outputSources|enabled|scriptBundleSources|sensorSources|currentOutput|mainOutput|speakersEnabled|getSpeakersEnabled|isFileSupported|isDetectedBrowser|loadFont|loadModel|loadShader|link|loadJSON|loadStrings|loadTable|loadXML|loadImage|loadBytes|loadBinary|loadCapturedPictures|loadCapturedWebcamImages|loadCapturedWebcamData|loadCapturedWebcamOn|loadCapturedWebcamOnce|loadCapturedRenders|loadCapturedRendersIndividually|loadCapturedParticles|loadCapturedLines|loadCapturedWebgl)$/.test(
        node.callee.name
      )
    ) {
      return {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'p5'
          },
          property: node.callee
        },
        arguments: node.arguments
      };
    }
    return node;
  }
  

  // Helper function to transform variable declarations
  function transformVariableDeclaration (node) {
    if (
      node.init &&
      node.init.type === 'CallExpression' &&
      node.init.callee.name === 'createCanvas'
    ) {
      node.init.arguments.unshift({
        type: 'ThisExpression'
      })
    }
    return node
  }

  // Traverse and transform the AST
  estraverse.traverse(ast, {
    enter(node, parent) {
      if (node.type === 'VariableDeclarator') {
        node = transformVariableDeclaration(node);
      }
      if (
        node.type === 'FunctionDeclaration' ||
        node.type === 'FunctionExpression'
      ) {
        node.id = transformP5Function(node.id);
      }
      node = transformP5Function(node);
    }
  });
  

  // Generate the instance mode code from the transformed AST
  const instanceCode = escodegen.generate(ast)

  // Wrap the transformed code in an instance mode function
  const wrappedCode = `
(function() {
  var ${instanceName} = function(p) {
      ${instanceCode}
  };
  new p5(${instanceName});
})();
  `

  return wrappedCode
}

// Read the global-mode sketch file
const globalCode = fs.readFileSync(
  '/Users/michaelpaulukonis/projects/my-sketches/sketches/globalModeSketch.js',
  'utf8'
)

// Convert the global-mode sketch to instance mode
const instanceCode = convertToInstanceMode(globalCode)

// Write the instance-mode sketch to a new file
fs.writeFileSync('./instanceModeSketch.js', instanceCode)

console.log(
  'Conversion complete. Instance mode sketch written to instanceModeSketch.js'
)
