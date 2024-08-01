const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const t = require('@babel/types')
const fs = require('fs')

const p5tokens = require('./p5.internals.js')

const jsCode = fs.readFileSync('./sketch.global.js', 'utf8')

const varName = 'sketch'
const instanceName = 'p5'

const timestamp = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  const secs = String(d.getSeconds()).padStart(2, '0')
  return `${year}${month}${day}${hour}${min}${secs}`
}

function renameVariablesAndPrefixFunctionsAndConstants (
  jsCode,
  functionSet,
  constantSet,
  propertySet
) {
  // Parse the code into an AST
  const ast = parser.parse(jsCode, {
    sourceType: 'module'
  })

  // Traverse the AST and rename variables, prefix functions, or prefix constants
  traverse(ast, {
    Identifier (path) {
      if (
        propertySet.has(path.node.name) &&
        !t.isMemberExpression(path.parent)
      ) {
        path.replaceWith(t.memberExpression(t.identifier(instanceName), path.node))
      }
      // Prefix constants
      if (
        constantSet.has(path.node.name) &&
        !t.isMemberExpression(path.parent)
      ) {
        path.replaceWith(t.memberExpression(t.identifier(instanceName), path.node))
      }
    },
    CallExpression (path) {
      const callee = path.node.callee
      if (t.isIdentifier(callee) && functionSet.has(callee.name)) {
        path.node.callee = t.memberExpression(t.identifier(instanceName), callee)
      }
    },
    FunctionDeclaration (path) {
      console.log(`FunctionDeclaration: ${path.node.id.name}`)
      if (functionSet.has(path.node.id.name)) {
        path.node.id = t.memberExpression(t.identifier(instanceName), path.node.id)
      }
    }
  })

  // Generate the new code from the modified AST
  const output = generate(ast, {}, jsCode)
  return output.code
}

// Wrap the transformed code in an instance mode function
const wrappedCode = (instanceName, instanceCode) => `
(function() {
  var ${instanceName} = function(p) {
      ${instanceCode}
  };
  new p5(${instanceName});
})();
  `

const functionSet = new Set(p5tokens.functions)
const constantSet = new Set(p5tokens.constants)
const propertySet = new Set(p5tokens.properties)

const newCode = renameVariablesAndPrefixFunctionsAndConstants(
  jsCode,
  functionSet,
  constantSet,
  propertySet
)

let wrapped = wrappedCode(varName, newCode)

fs.writeFileSync(`sketch.instance.${timestamp()}.js`, wrapped)
