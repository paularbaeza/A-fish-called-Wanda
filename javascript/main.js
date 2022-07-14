// * GLOBAL VARIABLES
//sección de canvas y ctx
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");

//elementos de DOM
const splashScreenDOM = document.querySelector("#splash-screen");
const startBtnDOM = document.querySelector("#start-btn");
const gameOverDOM = document.querySelector("#gameover-screen");
const restartBtnDOM = document.querySelector("#restart-btn");
const scoreDOM = document.querySelector("#score span");
const lifesBoxDOM = document.querySelector("#lifes");
const lifesDOM = document.querySelector("#lifes span");
const soundOnBtnDOM = document.querySelector("#soundOn-btn");
const soundOffBtonDOM = document.querySelector("#soundOff-btn");
const gameScreenDOM = document.querySelector("#game-screen");
const maxScoreDOM = document.querySelector("#max-score")
const maxScoreNumberDOM = document.querySelector("#max-score span")
let maxScore = Number(maxScoreNumberDOM.innerText)
let actualScore = Number (scoreDOM.innerText)

let game;

// * STATE MANAGEMENT FUNCTIONS

const startGame = () => {
  splashScreenDOM.style.display = "none";
  gameOverDOM.style.display = "none";
  gameScreenDOM.style.display = "block";
  canvas.style.display = "block";
  maxScoreDOM.style.display = "none"
  lifesDOM.innerText = 3;
  scoreDOM.innerText = 0;
  //...aquí empezaría el juego.
  game = new Game();
  playMusic();
  game.gameLoop();
};

const reStartGame = () => {
  splashScreenDOM.style.display = "none";
  gameOverDOM.style.display = "none";
  gameScreenDOM.style.display = "block";
  canvas.style.display = "block";
  maxScoreDOM.style.display = "block"
  lifesBoxDOM.style.display ="flex"
  lifesDOM.innerText = 3;
  scoreDOM.innerText = 0;
  //...aquí empezaría el juego.
  game = new Game();
  playMusic();
  game.gameLoop();
};

const playMusic = () => {
  game.gameMusic.play();
  game.canPlaySound = true;
};

const stopMusic = () => {
  game.gameMusic.pause();
  game.canPlaySound = false;
};


/*const compareScore = () => {
  const keyArr= []
  Object.keys(storage).forEach ((eachKey) => {
    console.log(eachKey)
    keyArr.push(eachKey)
  })
  if(keyArr[0] > keyArr[1]){
    keyArr.pop()
  }else {
    keyArr.shift()
  }
  scoreDOM.innerHTML= keyArr[0]
}*/

// * ADD EVENT LISTENERS
startBtnDOM.addEventListener("click", startGame);
restartBtnDOM.addEventListener("click", reStartGame);
soundOnBtnDOM.addEventListener("click", playMusic);
soundOffBtonDOM.addEventListener("click", stopMusic);
document.addEventListener('DOMContentLoaded', () => {
  maxScoreNumberDOM.innerText = (localStorage.getItem("highscore"))})

//adeventlistener para movimiento de Wanda
window.addEventListener("keydown", (event) => {
  if (
    (event.code === "ArrowLeft" || event.code ==="KeyA" )&&
    game.wanda.x >= 0 &&
    game.wanda.canMove === true
  ) {
    game.wanda.directionX = -1;
    game.wanda.image.src = "./images/wanda-happy-left.png";
  } else if (
    (event.code === "ArrowRight" || event.code === "KeyD")&&
    game.wanda.w < canvas.width &&
    game.wanda.canMove === true
  ) {
    game.wanda.directionX = 1;
    game.wanda.image.src = "./images/wanda-happy-right.png";
  } else if (
    (event.code === "ArrowUp" || event.code ==="KeyW" )&&
    game.wanda.y >= 0 &&
    game.wanda.canMove === true
  ) {
    game.wanda.directionY = -1;
  } else if (
    (event.code === "ArrowDown" || event.code === "KeyS" )&&
    game.wanda.y < canvas.height &&
    game.wanda.canMove === true
  ) {
    game.wanda.directionY = 1;
  }
});
