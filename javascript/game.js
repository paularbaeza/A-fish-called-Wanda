class Game {
  constructor() {
    //todas las propiedades del juego

    //imagen de fondo
    this.background = new Image();
    this.background.src = "./images/fondo-mar.jpg";
    this.isGameOn = true;
    this.wanda = new Wanda();
    this.sharksArr = [];
    this.whalesArr = [];
    this.foodArr = [];
    //this.enemy = new Enemy ();
    this.isGameOn = true;
  }

  // todos los métodos del juego
gameOver = () =>{
  this.isGameOn = false
  canvas.style.display = "none";
  gameOverDOM.style.display = "flex";
}

  addEnemy = () => {
    if (
      this.sharksArr.length === 0 ||
      this.sharksArr[this.sharksArr.length - 1].x < canvas.width / 2
    ) {
      let randomPositionShark = Math.random() * (canvas.height - 140);
      let newEnemyShark = new Enemy(
        randomPositionShark,
        "./images/shark.png",
        140
      );
      this.sharksArr.push(newEnemyShark);
    } else if (
      this.whalesArr.length === 0 ||
      this.whalesArr[this.whalesArr.length - 1].x < canvas.width / 2
    ) {
      let randomPositionWhale = Math.random() * (canvas.height - 200);
      let newEnemyWhale = new Enemy(
        randomPositionWhale,
        "./images/whale.png",
        200
      );
      this.whalesArr.push(newEnemyWhale);
      //setTimeout(whalesArr,600);
    }
  };

  addFood = () => {
    if (this.foodArr.length === 0) {
      let randomPositionYFood = Math.random() * (canvas.height - 70);
      let randomPositionXFood = Math.random() * (canvas.width - 70);
      let food = new Food(randomPositionXFood, randomPositionYFood);
      this.foodArr.push(food);
    }
  };

  wandaEnemyCollision = () => {
    this.sharksArr.forEach ((eachShark) => {
      if(
        eachShark.x < this.wanda.x + this.wanda.w &&
        eachShark.x + eachShark.w > this.wanda.x &&
        eachShark.y < this.wanda.y + this.wanda.h &&
        eachShark.h + eachShark.y > this.wanda.y 
      ){
        this.gameOver ()
      }
    })
    this.whalesArr.forEach((eachWhale)=> {
      if(eachWhale.x < this.wanda.x + this.wanda.w &&
        eachWhale.x + eachWhale.w > this.wanda.x &&
        eachWhale.y < this.wanda.y + this.wanda.h &&
        eachWhale.h + eachWhale.y > this.wanda.y){
          this.gameOver ()
        }
    })
  }

  wandaFoodCollision = () => {
    this.foodArr.forEach ((eachFood)=>{
      if(eachFood.x < this.wanda.x + this.wanda.w &&
        eachFood.x + eachFood.w > this.wanda.x &&
        eachFood.y < this.wanda.y + this.wanda.h &&
        eachFood.h + eachFood.y > this.wanda.y){
        this.foodArr.shift()
        }
    })
  }

  gameLoop = () => {
    //console.log("juego andando")
    //1. limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //2. movimientos y acciones de los elementos
    this.wanda.wandaCanvasCollision();
    this.addEnemy();

    this.sharksArr.forEach((eachShark) => {
      eachShark.enemyMovement();
    });
    this.whalesArr.forEach((eachWhale) => {
      eachWhale.enemyMovement();
    });
    this.wanda.moveWanda();
    this.addFood();
    this.wandaEnemyCollision()
    this.wandaFoodCollision()
    //3. dibujar los elementos
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
    this.wanda.drawWanda();
    this.sharksArr.forEach((eachShark) => {
      eachShark.drawEnemy();
    });
    this.whalesArr.forEach((eachWhale) => {
      eachWhale.drawEnemy();
    });
    this.foodArr.forEach((eachFood) => {
      eachFood.drawFood();
    });

    //4. efecto de recursión
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
