Project Goal: Dynamic Text Fitting in p5.js

The goal of this project is to create a p5.js sketch (in instance mode) that dynamically fits a given text string within a fixed 600x600 pixel square canvas. The text should be formatted to maximize the use of available space while adhering to specific formatting rules, including full justification, dynamic font sizing, and word wrapping.

Core Requirements:

p5.js Instance Mode: The entire sketch must be written in p5.js instance mode (using new p5(sketch)).

Canvas Dimensions: The canvas size is fixed at 600x600 pixels.

Text Input: The sketch will receive a text string as input. This text string can be of any length and may contain multiple words.

Text Formatting Rules:

Horizontal Fill: The text should extend from the left edge to the right edge of the canvas, filling the horizontal space as completely as possible.
Vertical Fill: The text should extend from the top edge to the bottom edge of the canvas as much as possible, using as much vertical space as is available.
Word Wrapping: If a line of text is too long to fit horizontally, it should be broken at word boundaries and wrapped to the next line.
Full Justification (All Lines): Every line of text, including the last line, must be fully justified.
Multi-Word Lines: In lines with multiple words, the spaces between words must be adjusted so that the line's text stretches to fill the entire width of the canvas.
Single-Word Lines: In lines with only a single word, the font size of that word should be scaled up so that the word's text fills the entire width of the canvas.
Dynamic Font Sizing: The font size must be dynamically adjusted to achieve the optimal fit, maximizing both horizontal and vertical space utilization.
No Font Distortion: The font must never be stretched or condensed (squashed) horizontally or vertically. The aspect ratio of the font must remain consistent; only the font size may change.
Prioritization: The algorithm should prioritize increasing font size first, then add line breaks as needed to fill more vertical space.
Font Handling:

Default Font: The sketch must use a default font if no other font is specified.
Custom Font Support: The sketch must support the loading and use of custom fonts (e.g., .ttf files). The custom font should be loaded using p5.js's loadFont() function in the preload function.
Changeable Font: The font should be changeable by a public function.
Libraries:

p5.js Core: Only p5.js core libraries should be used. No third party libraries.
Deliverable:

Single p5.js Sketch: The final deliverable will be a single p5.js sketch file (text.fit.js). No other files (HTML, CSS) are required, as the sketch will be run directly in the p5.js online editor.
Public Functions:

changeFont: should take a string to specify the name of a font.
changeText: should take a string and change the formatted text.
myCustomRedrawAccordingToNewDimensions: this is a function that should redraw the formatted text.
Text-Fitting Algorithm:

The algorithm must dynamically adjust the text to fit the canvas and fill as much space as possible. The core logic involves an iterative refinement process:

Initialization:

Set the canvas to 600x600.
Load the default font.
Start with each word in the input text on a separate line (one word per line).
Iterative Refinement Loop:

Line Sizing:
For each line of text:
Calculate the maximum font size that allows the line to fill the canvas's width.
If the line contains multiple words, perform full justification by adjusting the space between words to stretch the line to fill the width.
If the line contains only a single word, scale the font size of the word to fill the entire width of the canvas.
Store the maximum font size for each line.
Calculate the total height needed to display all lines with their current font sizes.
Height Check:
If the total height is less than the canvas's height:
try to increase the font size of every line by one pixel.
Go to Line Sizing.
If the total height is greater than or equal to the canvas's height:
Combine the two shortest lines (lines with the fewest words) into a single line.
Go to Line Sizing.
Loop Termination:
If there is only one line left, stop the loop.
If there are more than one line left, but all the lines are the same height, stop the loop.
Draw to Canvas: Once the loop has terminated, draw the formatted text to the canvas, with the calculated font sizes and justification for each line.

Edge Cases and Special Considerations:

Very Long Words: If a single word is longer than the canvas width, it should be displayed, but it will overflow the canvas's bounds.
Empty Text: The sketch should gracefully handle an empty input text string (e.g., by not drawing anything).
Very Short Text: Short text should be scaled to fill as much of the available canvas space as possible, both horizontally and vertically.
Font size bounds: handle cases where the word is so large that it does not fit on the canvas at all.
What is NOT Required:

User interaction (no keyboard or mouse input required).
File inputs (the text is provided directly to the sketch).
Color considerations (text color, background color, etc., are not part of the requirements).
Drawing anything other than the formatted text.`