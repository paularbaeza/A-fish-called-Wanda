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
    this.medusaArr = [];
    this.foodArr = [];
    this.canCollide = true;
    this.isGameOn = true;
    this.showFlash = false;
  }

  // todos los métodos del juego

  gameOver = () => {
    this.isGameOn = false;
    canvas.style.display = "none";
    lifesBoxDOM.style.display ="none";
    gameOverDOM.style.display = "flex";
  };

  drawFlash = () => {
    ctx.fillStyle = "rgba(251, 0, 0, 0.3)";
    ctx.fillRect (0,0,canvas.width,canvas.height)
  }

  flashOut =() => {
    this.showFlash=false
  }

  addEnemy = () => {
    if (
      this.sharksArr.length === 0 ||
      this.sharksArr[this.sharksArr.length - 1].x < canvas.width / 2
    ) {
      let randomPositionShark = Math.random() * (canvas.height - 120);
      let newEnemyShark = new Enemy(
        randomPositionShark,
        "./images/shark.png",
        120,
        250
      );
      this.sharksArr.push(newEnemyShark);
    } else if (
      (this.whalesArr.length === 0 ||
        this.whalesArr[this.whalesArr.length - 1].x < canvas.width / 3) &&
      scoreDOM.innerText >= 80
    ) {
      let randomPositionWhale = Math.random() * (canvas.height - 130);
      let newEnemyWhale = new Enemy(
        randomPositionWhale,
        "./images/whale2.png",
        130,
        250
      );
      this.whalesArr.push(newEnemyWhale);
    } else if (
      (this.medusaArr.length === 0 ||
        this.medusaArr[this.medusaArr.length - 1].x < canvas.width / 2) &&
      scoreDOM.innerText >= 40
    ) {
      let randomPositionMedusa = Math.random() * (canvas.height - 150);
      let newEnemyMedusa = new Enemy(
        randomPositionMedusa,
        "./images/medusa.png",
        150,
        120
      );
      this.medusaArr.push(newEnemyMedusa);
    }
  };

  cleanEnemyArr = () => {
    if (this.sharksArr[0].x + this.sharksArr[0].w < 0 ){
      this.sharksArr.shift()
    }else if (this.whalesArr[0].x + this.whalesArr[0].w < 0 ){
      this.whalesArr.shift()
    }else if (this.medusaArr[0].x + this.medusaArr[0].w < 0 ){
      this.medusaArr.shift()
    }
  }

  addFood = () => {
    if (this.foodArr.length === 0) {
      let randomPositionYFood = Math.random() * (canvas.height - 70);
      let randomPositionXFood = Math.random() * (canvas.width - 70);
      let food = new Food(randomPositionXFood, randomPositionYFood);
      this.foodArr.push(food);
    }
  };
 
  wandaEnemyCollision = () => {
    this.sharksArr.forEach((eachShark) => {
      if (
        eachShark.x < this.wanda.x + this.wanda.w &&
        eachShark.x + eachShark.w > this.wanda.x &&
        eachShark.y < this.wanda.y + this.wanda.h &&
        eachShark.h / 2 + eachShark.y > this.wanda.y 
        && this.wanda.canCollide === true
      ) {
        lifesDOM.innerText = Number(lifesDOM.innerText) - 1;
        this.wanda.canCollide = false;
        this.showFlash =true;
        this.wanda.faceSickWanda();
        setTimeout(this.flashOut, 1000)
        setTimeout(this.wanda.afterWandaLoseLife, 2000);
        if (lifesDOM.innerText==="0"){
          this.gameOver()
        }
      }

      if (
        eachShark.x < this.wanda.x + this.wanda.w &&
        eachShark.x + eachShark.w > this.wanda.x &&
        eachShark.y < this.wanda.y + this.wanda.h &&
        eachShark.h / 2 + eachShark.y > this.wanda.y &&
        this.wanda.canCollide === false
      ) {
        lifesDOM.innerText = lifesDOM.innerText;
      }

    });
    this.whalesArr.forEach((eachWhale) => {
      if (
        eachWhale.x < this.wanda.x + this.wanda.w &&
        eachWhale.x + eachWhale.w > this.wanda.x &&
        eachWhale.y < this.wanda.y + this.wanda.h &&
        eachWhale.h / 2 + eachWhale.y > this.wanda.y 
        && this.wanda.canCollide === true
      ) {
        lifesDOM.innerText = Number(lifesDOM.innerText) - 1;
        this.wanda.canCollide = false;
        this.wanda.faceSickWanda();
        setTimeout(this.wanda.afterWandaLoseLife, 2000);
        if (lifesDOM.innerText==="0"){
          this.gameOver()
        }
      }

      if (
        eachWhale.x < this.wanda.x + this.wanda.w &&
        eachWhale.x + eachWhale.w > this.wanda.x &&
        eachWhale.y < this.wanda.y + this.wanda.h &&
        eachWhale.h / 2 + eachWhale.y > this.wanda.y &&
        this.wanda.canCollide === false
      ) {
        lifesDOM.innerText = lifesDOM.innerText;
      }

    });
    this.medusaArr.forEach((eachMedusa) => {
      if (
        eachMedusa.x < this.wanda.x + this.wanda.w &&
        eachMedusa.x + eachMedusa.w > this.wanda.x &&
        eachMedusa.y < this.wanda.y + this.wanda.h &&
        eachMedusa.h / 2 + eachMedusa.y > this.wanda.y 
        && this.wanda.canCollide === true
      ) {
        lifesDOM.innerText = Number(lifesDOM.innerText) - 1;
        this.wanda.canCollide = false;
        this.wanda.faceSickWanda();
        setTimeout(this.wanda.afterWandaLoseLife, 2000);
        if (lifesDOM.innerText==="0"){
          this.gameOver()
        }
      }

      if (
        eachMedusa.x < this.wanda.x + this.wanda.w &&
        eachMedusa.x + eachMedusa.w > this.wanda.x &&
        eachMedusa.y < this.wanda.y + this.wanda.h &&
        eachMedusa.h / 2 + eachMedusa.y > this.wanda.y &&
        this.wanda.canCollide === false
      ) {
        lifesDOM.innerText = lifesDOM.innerText;
      }
    });
  };

  wandaFoodCollision = () => {
    this.foodArr.forEach((eachFood) => {
      if (
        eachFood.x < this.wanda.x + this.wanda.w &&
        eachFood.x + eachFood.w > this.wanda.x &&
        eachFood.y < this.wanda.y + this.wanda.h &&
        eachFood.h + eachFood.y > this.wanda.y
      ) {
        this.foodArr.shift();
        scoreDOM.innerText = Number(scoreDOM.innerText) + 10;
      }
    });
  };

  gameLoop = () => {
    //1. limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //2. movimientos y acciones de los elementos

    this.addEnemy();
    //this.cleanEnemyArr()
    this.sharksArr.forEach((eachShark) => {
      eachShark.enemyMovement();
    });
    this.whalesArr.forEach((eachWhale) => {
      eachWhale.enemyMovement();
    });
    this.medusaArr.forEach((eachMedusa) => {
      eachMedusa.enemyMovement();
    });
    this.wanda.moveWanda();
    this.wanda.wandaCanvasCollision();
    this.addFood();
    this.wandaEnemyCollision();
    this.wandaFoodCollision();

    //3. dibujar los elementos
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
    this.wanda.drawWanda();
    this.sharksArr.forEach((eachShark) => {
      eachShark.drawEnemy();
    });
    this.whalesArr.forEach((eachWhale) => {
      eachWhale.drawEnemy();
    });
    this.medusaArr.forEach((eachMedusa) => {
      eachMedusa.drawEnemy();
    });
    this.foodArr.forEach((eachFood) => {
      eachFood.drawFood();
    });
    if (this.showFlash===true){
      this.drawFlash()
    }


    //4. efecto de recursión
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
