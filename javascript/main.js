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
const lifesDOM = document.querySelector("#lifes span");
const punctuationDOM = document.querySelector("#punctuation");
const lifesBoxDOM = document.querySelector("#lifes");
const soundDOM = document.querySelector("#sound");
const soundOnBtnDOM = document.querySelector("#soundOn-btn");
const soundOffBtonDOM = document.querySelector("#soundOff-btn");

let game;

// * STATE MANAGEMENT FUNCTIONS

const startGame = () => {
  console.log("inicia el juego");
  splashScreenDOM.style.display = "none";
  gameOverDOM.style.display = "none";
  soundDOM.style.display = "flex";
  canvas.style.display = "block";
  punctuationDOM.style.display = "flex";
  lifesBoxDOM.style.display = "flex";
  lifesDOM.innerText = 3;
  scoreDOM.innerText = 0;
  //...aquí empezaría el juego.
  game = new Game();
  console.log(game);
  game.gameLoop();
};

const playMusic = () => {
  game.gameMusic.play();
};

const stopMusic = () => {
  game.gameMusic.pause();
};


// * ADD EVENT LISTENERS
startBtnDOM.addEventListener("click", startGame);
restartBtnDOM.addEventListener("click", startGame);
soundOnBtnDOM.addEventListener("click", playMusic);
soundOffBtonDOM.addEventListener("click", stopMusic);

//adeventlistener para movimiento de Wanda
window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft" && game.wanda.x >= 0) {
    game.wanda.directionX = -1;
    game.wanda.image.src = "./images/wanda-happy-left.png";
  } else if (event.code === "ArrowRight" && game.wanda.w < canvas.width) {
    game.wanda.directionX = 1;
    game.wanda.image.src = "./images/wanda-happy-right.png";
  } else if (event.code === "ArrowUp" && game.wanda.y >= 0) {
    game.wanda.directionY = -1;
  } else if (event.code === "ArrowDown" && game.wanda.y < canvas.height) {
    game.wanda.directionY = 1;
  }
});
