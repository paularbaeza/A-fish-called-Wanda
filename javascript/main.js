// * GLOBAL VARIABLES
//sección de canvas y ctx
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");

//elementos de DOM
const splashScreenDOM = document.querySelector("#splash-screen");
const startBtnDOM = document.querySelector("#start-btn");
const gameOverDOM = document.querySelector ("#gameover-screen")

let game;

// * STATE MANAGEMENT FUNCTIONS

const startGame = () => {
    console.log("inicia el juego");
    splashScreenDOM.style.display = "none";
    gameOverDOM.style.display ="none"
    canvas.style.display = "block";
  
    //...aquí empezaría el juego.
    game = new Game();
    console.log(game);
    game.gameLoop();
  };



// * ADD EVENT LISTENERS
startBtnDOM.addEventListener("click", startGame);


//adeventlistener para movimiento de Wanda
window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft" && game.wanda.x>=0){
        game.wanda.directionX = -1
    }else if(event.code ==="ArrowRight" && game.wanda.w < canvas.width){
        game.wanda.directionX =1
    
    }else if (event.code ==="ArrowUp" && game.wanda.y>=0) {
        game.wanda.directionY = -1
    }else if (event.code ==="ArrowDown" && game.wanda.y< canvas.height){
        game.wanda.directionY = 1
    }
})
