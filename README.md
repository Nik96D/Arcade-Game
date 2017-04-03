## Classic Arcade Game Clone project

I recreated the classic arcade game Frogger with Object-Oriented JavaScript and HTML5 Canvas.

### How to play the game

<img src="img/menu/arrows.jpg" width="120"><br>
To play the game, use the arrow keys from your keyboard to move your player up, right, down and left.
<br><br>
<img src="img/menu/enter.jpg" width="90"><br>
Use the key Enter to change level or restart, when the game requires you to do so.

----------------------

### Udacity's instructions

You will be provided visual assets and a game loop engine; using these tools you must add a number of entities to the game including the player characters and enemies to recreate the classic arcade game Frogger.

1. If you need a refresher on Object Oriented JavaScript, review our course and OOJS Notes; if you'd like a more detailed explanation as to how the game engine works, see our HTML5 Canvas course.
2. Read the detailed instructions for the project.
3. Download the art assets and provided game engine.
4. Review the video of the completed game and take note of the game's rules.
5. Review the code and comments provided in app.js
6. Identify the various classes you will need to write.
7. Identify and code the properties each class must have to accomplish its tasks.
8. Write the functions that provide functionality to each of your class instances.

----------------------

## TO DO
 
### Basic game 
- ~~Implement Enemy function:~~ 
  - ~~set initial location and speed~~
  - ~~update method: updates position and handles collision~~
  - ~~Create several new Enemy objects and place them in allEnemies array~~
- ~~Implement Player function:~~
  - ~~handleInput method:~~
  - ~~receive user input and move Player accordingly~~
  - ~~Player cannot move off screen~~
  - ~~if the Player reaches water, the game should reset~~
  - ~~Create a new Player object~~
 
 
### Start page
- ~~Create the story~~ 
- ~~Selector to choose the hero~~
- ~~Selector to choose the difficulty: easy, normal, hard, nightmare~~
 
### Canvas
- ~~Create big canvas~~
- ~~Put trees, stones, paths, doors~~
- ~~Create top menu for: hearts, keys, gems, level and restart~~

### Items to pick
- ~~Interact: go over item --> item dissapears from screen and array --> counter goes up~~
- ~~Hearts:~~ 
  - ~~start with 5 lifes~~
  - ~~each collision subtracts a life~~
  - ~~each heart adds a life~~
  - ~~when 0 lifes --> game over --> everything freezes --> restart button~~
- ~~Keys:~~ 
  - ~~use key to open doors (to pass the level)~~
  - ~~use key to open chests (to have gems)~~
- ~~Gems:~~
  - ~~1 blue gem: to walk underwater (in the checkObstacles)~~
  - ~~1 green gem: to walk through trees (in the checkObstacles)~~

### Items to interact
- ~~Interact: try to go over door or chest --> checkObstacles --> if key --> do something~~
- ~~Chests:~~
  - ~~open chest with a key (change sprites)~~
  - ~~pick up gem inside (a wild gem has appeared!)~~
- ~~Doors:~~
  - ~~open door to pass level (in the checkObstacles) --> change level~~

### Other things
- ~~Level:~~ 
  - ~~level 1~~
  - ~~level 2~~ 
  - ~~level 3~~ 
  - ~~level 4~~ 
- Sound:
  - ~~when collision with bug~~
  - when collision with nature
  - ~~when pick up item~~

### Code
- Errors:
  - after changing levels, the bugs spend a couple of seconds not moving... no idea what to do here >.<
  - ~~Player.stop: doesn't stop properly, is moving to the previous position~~
  - ~~Fix dialog's positions~~
  - ~~dialog.show() doesn't close when changing level~~
  - ~~dialog.show() doesn't work in Mozilla: find alternative~~ 
  - ~~Game over: the Enter key doesn't work (it cannot restart)~~
  - ~~Fix checkObstacles function~~
  - ~~Gems: doesn't give power when has_gem~~
  - ~~Change level/state: implement it how?~~
  - ~~Finish level: create last level screen~~
- Improvements: 
  - ~~Implement sounds~~
  - Keep DOM Access to a minimum: use a helper method that batch-converts a dataset to HTML
  - Enemy.update: simplify code (too many repeated if's --> put in functions?) 
  - ~~Go to next level automatically with setTimeout~~
  - ~~JSHint the code~~
