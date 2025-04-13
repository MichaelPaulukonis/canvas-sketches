mona.notes.md


## sounds

You might want to add volume control and ensure sounds don't overlap too much by using sound.setVolume() or stopping previous instances of the same sound before playing again.

For the sound files themselves, you'll want short, punchy sound effects that don't interfere with gameplay. WAV or OGG formats are commonly used for game sound effects.

Remember to consider accessibility - you might want to add a mute option or volume control for players who are sensitive to sounds or playing in quiet environments.


- block impact
  - Mug_Tap.wav by BaggoNotes -- https://freesound.org/s/704260/ -- License: Creative Commons 0
- this would be nice for the initial launch screen
  - CD_CONTACT_003FX_Solar_flare.wav by kevp888 -- https://freesound.org/s/706744/ -- License: Attribution 4.0
- miss paddle
  - Quick Beep High to Low by PostRobcore -- https://freesound.org/s/523702/ -- License: Creative Commons 0
  - 8-bit "failure" sound by AceOfSpadesProduc100 -- https://freesound.org/s/333785/ -- License: Attribution 4.0
- pause enter/exit
  - https://freesound.org/people/DneproMan/sounds/334886/
  - https://freesound.org/people/DneproMan/sounds/334885/
- for table-nudge
  - https://freesound.org/search/?q=tap&f=&s=Date+added+%28newest+first%29&si_tags=0&si_name=0&si_description=0&si_packname=0&si_sound_id=0&si_username=0&d0=0&d1=0.5&ig=0&r=0&g=1&dp=0&cm=0&mm=0


look at "250_CLICKS_COLLECTION"
- I don't know WHAT this is, but I want to use it!
  - https://freesound.org/people/DneproMan/sounds/334872/

## collision and reflection

IT's a little wonky. If the d.x value is low, it is considered a horizontal reflection - but at such a minute amount that it can't be seen. Then it hits another block, and the amount is inverted. IT should be considered vertical at those amounts.


TODO: get more stats on the actual values, and review the code

### side-step the issue entirely

You've hit on a very pragmatic and creative solution! Introducing a "nudge" mechanic is an excellent way to address the edge-case issues without diving into complex physics calculations. It adds a fun, interactive element to your visual experience.

Here's how you can implement a "nudge" feature:

1. Keypress Detection:

Use event listeners to detect key presses.
Choose a key (e.g., left arrow, right arrow, 'A', 'D') for the nudge action.
2. Nudge Implementation:

When the nudge key is pressed, add a small, temporary horizontal velocity to the ball.
The amount of velocity added should be relatively small to maintain a sense of control.
You might want to limit the frequency of nudges to prevent the player from abusing the mechanic.
3. Visual Feedback (Optional):

Consider adding visual feedback when the ball is nudged (e.g., a subtle particle effect or a slight change in the ball's color).
Example Code (JavaScript):

```javascript
// Nudge parameters
  const nudgeAmount = 1; // Adjust this value to control the nudge strength
  let lastNudgeTime = 0;
  const nudgeCooldown = 200; // Prevent rapid nudges (milliseconds)

  // Keypress event listener
  document.addEventListener('keydown', (event) => {
    const currentTime = Date.now();

    if (currentTime - lastNudgeTime > nudgeCooldown) {
      if (event.key === 'ArrowLeft' || event.key === 'a') {
        ball.dx -= nudgeAmount; // Nudge left
        lastNudgeTime = currentTime;
      } else if (event.key === 'ArrowRight' || event.key === 'd') {
        ball.dx += nudgeAmount; // Nudge right
        lastNudgeTime = currentTime;
      }
    }
  });

  // In your game loop (where ball.dx and ball.dy are updated):
  ball.x += ball.dx;
  ball.y += ball.dy;
  // ... rest of your game loop ...
```

  Explanation:

nudgeAmount: Controls the strength of the nudge.
lastNudgeTime: Stores the time of the last nudge.
nudgeCooldown: Prevents nudges from happening too frequently.
The event listener checks for left and right arrow key presses.
If a nudge key is pressed and the cooldown has expired, the ball's dx is adjusted.
Advantages of the Nudge Mechanic:

Simple Implementation: It's relatively easy to implement.
Player Control: It gives the player a way to influence the ball's trajectory.
Edge-Case Solution: It effectively mitigates the issues with edge-case collisions.
Visual Appeal: It can add a fun, interactive element to your visual experience.
By introducing the nudge mechanic, you can bypass the complexities of perfect reflection calculations and focus on the visual aspects of your game.

 