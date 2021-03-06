# NAME OF YOUR PROYECT

## [See the Game](https://paularbaeza.github.io/A-fish-called-Wanda/)

# Description

A fish called Wanda is a game in which the player has to move a fish freely in the ocean (in all directions), avoiding all the creatures that appear from all the sides (each creature collision will cost 1 life). Each time the fish eats a normal bone, the score will increment in 10, and each time the fish eats an special bone, it will win a life. The game ends when the player has no lifes left.

# Main Functionalities

- The game has a fish as the main character.
- The game has 4 different types of enemies (sharks, jellyfishes, dolphins and piranhas)
- Each enemy collision with the player will take 1 life, will show a red flash screen, will stop Wanda movement and will change Wanda's face.
- The enemies appear in different moments of the game, depending on the score.
- The game has 2 different types of bones, the normal that grows the score, and the special that adds a life to the lifes counter.
- The special bone appears every 20 seconds and can only be eaten during 5 seconds.
- The max. score is stored and shown in future games.

# Backlog Functionalities

- Add different game modes.
- Add different player skins.
- Add player control with the mouse.

# Proyect Structure

## main.js

- startGame() {}
- restartGame () {}
- playMusic() {}
- stopMusic () {}
- DOM manipulation
- addEventListeners

## game.js

- gameOver () {}
- drawFlash () {}
- flashOut () {}
- addEnemy () {}
- cleanEnemyArr () {}
- addFood () {}
- addSpecialBone () {}
- wandaEnemyCollision () {}
- wandaFoodCollision () {}
- wandaSpecialBoneCollision () {}
- maxScore () {}
- gameLoop () {}

## wanda.js

- Wanda () {
  this.image;
  this.x;
  this.y;
  this.w;
  this.h;
  this.speed;
  this.directionX;
  this.directionY;
  this.canCollide;
  this.canMove;
  this.canGainLife;
  }
- drawWanda () {}
- moveWanda () {}
- faceSickWanda () {}
- afterWandaLoseLife () {}
- wandaCanvasCollision () {}

## food.js

- Food () {
  this.image;
  this.x;
  this.y;
  this.w;
  this.h;
  }
- drawFood () {}

## enemy.js

- Enemy () {
  this.image;
  this.x;
  this.y;
  this.w;
  this.h;
  this.speed;
  this.directionX;
  this.directionY;
  }
- drawEnemy () {}
- enemyMovement () {}
- medusaMovement () {}
- piranaMovement () {}

# States and Transitions

- Start Screen
- Game Screen
- Game Over Screen

### Slides 

(https://slides.com/d/venM9kY/live)
