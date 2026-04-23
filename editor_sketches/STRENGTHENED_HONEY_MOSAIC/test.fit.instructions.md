To create a p5.js sketch (in instance mode) that optimally fits a given text string within a 600x600 pixel square canvas, maximizing the use of space while adhering to specific text formatting rules.

Core Requirements & Clarifications:

Instance Mode: The sketch must be written in p5.js instance mode (using new p5(sketch)).

Canvas Size: The canvas size is fixed at 600x600 pixels.

Text Input: The sketch will receive a text string as input. This text can be of any length and contain multiple words.

Text Fitting Algorithm: The algorithm should be smart about fitting the text, with the goal of filling the canvas space as much as possible.

Horizontal Fill: Text should stretch from the left edge to the right edge of the canvas.
Vertical Fill: Text should extend from the top edge to the bottom edge as much as possible.
Word Wrapping: If a line of text is too long to fit horizontally, it should be broken at word boundaries to the next line.
Justification (Full, Including Last Line): Every line of text should be fully justified. This means:
If a line contains multiple words, the spaces between words are adjusted to make the line fill the entire width.
If a line contains only a single word, the font size of that single word will be scaled up so that the word fills the entire width of the canvas.
Font Size Adjustment: The font size should be dynamically increased or decreased to achieve the optimal fit.
No Font Distortion: The text must not be condensed or stretched either horizontally or vertically. Only the font size can change. The aspect ratio of the font must remain consistent.
Prioritization: The algorithm should prioritize increasing font size first, then add line breaks as needed to fill more vertical space.
Font:

Default Font: There should be a fallback default font if no other font is specified.
Font Specifying: There should be a way to change the font, if desired, perhaps by passing it as an argument to the setup function.
Libraries:

Prefer Existing: The instructions encourage the use of existing p5.js or JavaScript libraries to handle text layout, measurement, and justification, if such libraries exist. If there isn't a suitable library then native p5js code is ok.
Single Sketch:

The deliverable will only be the p5js sketch, no associated HTML or CSS, as it will be run in editor.p5js.com
Step-by-Step Breakdown of the Algorithm (with updated Justification logic):

Initial Setup:

Initialize the canvas to 600x600.
Set an initial font and font size.
Begin with the full text string on a single line.
Horizontal Fit (First Pass):

Increase the font size until the text string, if kept on one line, extends beyond the canvas's width.
Then, decrease the font size slightly, so the text fits within the canvas width.
Vertical Fit (Iterative Refinement):

Split into Lines: If vertical space remains, try to break the text into multiple lines at word boundaries.
Justify Each Line (Including Last):
For lines with multiple words, justify by adjusting the space between words so the line fills the width.
For single-word lines, scale the font size of the word until it fills the width.
Re-evaluate Font Size: After splitting the text into lines, try increasing the font size again for all the lines collectively. If it exceeds the available vertical space, decrease it until all lines fit.
Repeat: Continue the process of splitting lines, justifying, and adjusting font size until either:
The canvas is fully filled both horizontally and vertically
No more word breaks are possible.
Draw to Canvas:

Once the algorithm has determined the optimal fit, render the text to the canvas using text().
Edge Cases & Considerations:

Very Long Words: Handle cases where a single word is longer than the width of the canvas. In these cases, even the single word will be shown, but overflowing the bounds of the canvas.
Empty Text: Handle an empty text string gracefully.
Very Short Text: Ensure short text still fills the available space as much as possible.
Font size bounds: Handle cases where the font size is too large to fit a single letter in the canvas.
What is NOT required

No user interaction.
No file inputs.
No color considerations.
No drawing anything other than the formatted text.
Key Changes & Emphasis:

Justification of Last Line: The most important change is the explicit instruction that the last line, even if a single word, should be justified by scaling the word's font size.
Single-Word Justification: It's been clarified how a single-word line is handled (scaling up font size).
Overflowing words: It's been clarified how words that overflow the bounds should be shown.