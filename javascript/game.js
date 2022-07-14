class Game {
  constructor() {
    //todas las propiedades del juego
    this.background = new Image();
    this.background.src = "./images/fondo-mar.jpg";
    this.isGameOn = true;
    this.wanda = new Wanda();
    this.sharksArr = [];
    this.dolphinsArr = [];
    this.medusaArr = [];
    this.piranaArr = [];
    this.foodArr = [];
    this.specialBoneArr = [];
    this.canCollide = true;
    this.isGameOn = true;
    this.showFlash = false;
    this.gameMusic = new Audio("./sounds/bajo-del-mar.mp3");
    this.gameMusic.volume=0.3
    this.winLife = new Audio("./sounds/woo-hoo.mp3");
    this.winLife.volume = 0.2
    this.loseLife = new Audio("./sounds/pierde-vida.mp3");
    this.loseLife.volume = 0.2
    this.eatsBone = new Audio("./sounds/points.mp3");
    this.eatsBone.volume = 0.2
    this.canPlaySound = true;
  }

  // todos los métodos del juego

  gameOver = () => {
    this.isGameOn = false;
    canvas.style.display = "none";
    gameOverDOM.style.display = "flex";
    lifesBoxDOM.style.display = "none";
    maxScoreDOM.style.display = "flex";
    game.gameMusic.pause();

    //guardar informacion del score en el local storage
    //let maxScore = Number(maxScoreNumberDOM.innerText)
    //let actualScore = Number (scoreDOM.innerText)
    
    this.maxScore();

    localStorage.setItem("highscore", Number(maxScoreNumberDOM.innerText));
    if (Number (scoreDOM.innerText) > localStorage.getItem("highscore")) {
      localStorage.setItem("highscore", Number (scoreDOM.innerText))
    }
  };

  drawFlash = () => {
    ctx.fillStyle = "rgba(251, 0, 0, 0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  flashOut = () => {
    this.showFlash = false;
  };

  addEnemy = () => {
    if (
      this.sharksArr.length === 0 ||
      this.sharksArr[this.sharksArr.length - 1].x < canvas.width / 2
    ) {
      let randomPositionShark = Math.random() * (canvas.height - 120);
      let newEnemyShark = new Enemy(
        randomPositionShark,
        canvas.width,
        "./images/shark.png",
        120,
        250
      );
      this.sharksArr.push(newEnemyShark);
    } else if (
      (this.dolphinsArr.length === 0 ||
        this.dolphinsArr[this.dolphinsArr.length - 1].x < canvas.width / 4) &&
      scoreDOM.innerText >= 80
    ) {
      let randomPositionDolphin = Math.random() * (canvas.height - 130);
      let newEnemyDolphin = new Enemy(
        randomPositionDolphin,
        canvas.width,
        "./images/dolphin.png",
        130,
        300
      );
      this.dolphinsArr.push(newEnemyDolphin);
    } else if (
      (this.medusaArr.length === 0 ||
        this.medusaArr[this.medusaArr.length - 1].x < canvas.width * 0.4) &&
      scoreDOM.innerText >= 40
    ) {
      let randomPositionMedusa = Math.random() * (canvas.height - 130);
      let newEnemyMedusa = new Enemy(
        randomPositionMedusa,
        canvas.width,
        "./images/medusa.png",
        130,
        90
      );
      this.medusaArr.push(newEnemyMedusa);
    } else if (
      (this.piranaArr.length === 0 ||
        this.piranaArr[this.piranaArr.length - 1].y > canvas.height*2) &&
      scoreDOM.innerText >= 120
    ) {
      let positionPiranaX = canvas.width / 2;
      let newEnemyPirana = new Enemy(
        0,
        positionPiranaX,
        "./images/pirana-left.png",
        70,
        110,
      );
      this.piranaArr.push(newEnemyPirana);
    }
  };

  piranaMovementTowardsWanda = () => {
    this.piranaArr.forEach((eachPirana) => {
      if (eachPirana.x > this.wanda.x) {
        eachPirana.directionX = -1;
        eachPirana.image.src = "./images/pirana-left.png"
      } else if (eachPirana.x < this.wanda.x) {
        eachPirana.directionX = 1;
        eachPirana.image.src = "./images/pirana-rigth.png"
      }
    });
  };

  cleanEnemyArr = () => {
    if (this.sharksArr[0].x + this.sharksArr[0].w < 0) {
      this.sharksArr.shift();
    } else if (this.dolphinsArr[0].x + this.dolphinsArr[0].w < 0) {
      this.dolphinsArr.shift();
    } else if (this.medusaArr[0].x + this.medusaArr[0].w < 0) {
      this.medusaArr.shift();
    }
  };

  addFood = () => {
    if (this.foodArr.length === 0) {
      let randomPositionYFood = Math.random() * (canvas.height - 45);
      let randomPositionXFood = Math.random() * (canvas.width - 90);
      let food = new Food(
        randomPositionXFood,
        randomPositionYFood,
        "./images/bone.png",
        90,
        45
      );
      this.foodArr.push(food);
    }
  };

  addSpecialBone = () => {
    if (this.specialBoneArr.length === 0 && this.wanda.canGainLife === true) {
      let randomPositionYSpecialBone = Math.random() * (canvas.height - 55);
      let randomPositionXSpecialBone = Math.random() * (canvas.width - 85);
      let specialBone = new Food(
        randomPositionXSpecialBone,
        randomPositionYSpecialBone,
        "./images/special-bone.png",
        85,
        55
      );
      this.specialBoneArr.push(specialBone);
      this.wanda.canGainLife = false;

      setTimeout(() => {
        this.specialBoneArr.shift();
      }, 5000);
    }
  };

  wandaEnemyCollision = () => {
    this.sharksArr.forEach((eachShark) => {
      if (
        eachShark.x < this.wanda.x + this.wanda.w &&
        eachShark.x + eachShark.w > this.wanda.x &&
        eachShark.y < this.wanda.y + this.wanda.h &&
        eachShark.h / 2 + eachShark.y > this.wanda.y &&
        this.wanda.canCollide === true
      ) {
        lifesDOM.innerText = Number(lifesDOM.innerText) - 1;
        this.wanda.canCollide = false;
        this.wanda.canGainLife = false;
        this.wanda.canMove = false;
        this.showFlash = true;
        if (this.canPlaySound === true) {
          this.loseLife.play();
        }
        this.wanda.faceSickWanda();
        setTimeout(this.flashOut, 2000);
        setTimeout(this.wanda.afterWandaLoseLife, 2000);
        if (lifesDOM.innerText === "0") {
          this.gameOver();
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
    this.dolphinsArr.forEach((eachDolphin) => {
      if (
        eachDolphin.x < this.wanda.x + this.wanda.w &&
        eachDolphin.x + eachDolphin.w > this.wanda.x &&
        eachDolphin.y < this.wanda.y + this.wanda.h &&
        eachDolphin.h / 2 + eachDolphin.y > this.wanda.y &&
        this.wanda.canCollide === true
      ) {
        lifesDOM.innerText = Number(lifesDOM.innerText) - 1;
        this.wanda.canCollide = false;
        this.wanda.canMove = false;
        this.wanda.canGainLife = false;

        if (this.canPlaySound === true) {
          this.loseLife.play();
        }
        this.showFlash = true;
        this.wanda.faceSickWanda();
        setTimeout(this.flashOut, 1000);
        setTimeout(this.wanda.afterWandaLoseLife, 2000);
        if (lifesDOM.innerText === "0") {
          this.gameOver();
        }
      }

      if (
        eachDolphin.x < this.wanda.x + this.wanda.w &&
        eachDolphin.x + eachDolphin.w > this.wanda.x &&
        eachDolphin.y < this.wanda.y + this.wanda.h &&
        eachDolphin.h / 2 + eachDolphin.y > this.wanda.y &&
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
        eachMedusa.h / 2 + eachMedusa.y > this.wanda.y &&
        this.wanda.canCollide === true
      ) {
        lifesDOM.innerText = Number(lifesDOM.innerText) - 1;
        if (this.canPlaySound === true) {
          this.loseLife.play();
        }
        this.wanda.canCollide = false;
        this.wanda.canMove = false;
        this.wanda.canGainLife = false;

        this.showFlash = true;
        this.wanda.faceSickWanda();
        setTimeout(this.flashOut, 1000);
        setTimeout(this.wanda.afterWandaLoseLife, 2000);
        if (lifesDOM.innerText === "0") {
          this.gameOver();
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
    this.piranaArr.forEach((eachPirana) => {
      if (
        eachPirana.x < this.wanda.x + this.wanda.w &&
        eachPirana.x + eachPirana.w > this.wanda.x &&
        eachPirana.y < this.wanda.y + this.wanda.h &&
        eachPirana.h / 2 + eachPirana.y > this.wanda.y &&
        this.wanda.canCollide === true
      ) {
        lifesDOM.innerText = Number(lifesDOM.innerText) - 1;
        if (this.canPlaySound === true) {
          this.loseLife.play();
        }
        this.wanda.canCollide = false;
        this.wanda.canGainLife = false;
        this.wanda.canMove = false;
        this.showFlash = true;
        this.wanda.faceSickWanda();
        setTimeout(this.flashOut, 1000);
        setTimeout(this.wanda.afterWandaLoseLife, 2000);
        if (lifesDOM.innerText === "0") {
          this.gameOver();
        }
      }

      if (
        eachPirana.x < this.wanda.x + this.wanda.w &&
        eachPirana.x + eachPirana.w > this.wanda.x &&
        eachPirana.y < this.wanda.y + this.wanda.h &&
        eachPirana.h / 2 + eachPirana.y > this.wanda.y &&
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
        eachFood.h + eachFood.y > this.wanda.y &&
        this.wanda.canCollide === true
      ) {
        if (this.canPlaySound === true) {
          this.eatsBone.play();
        }
        this.foodArr.shift();
        scoreDOM.innerText = Number(scoreDOM.innerText) + 10;
      }
    });
  };

  wandaSpecialBoneCollision = () => {
    this.specialBoneArr.forEach((eachSpecialBone) => {
      if (
        eachSpecialBone.x < this.wanda.x + this.wanda.w &&
        eachSpecialBone.x + eachSpecialBone.w > this.wanda.x &&
        eachSpecialBone.y < this.wanda.y + this.wanda.h &&
        eachSpecialBone.h + eachSpecialBone.y > this.wanda.y
      ) {
        this.specialBoneArr.shift();
        if (this.canPlaySound === true) {
          this.winLife.play();
        }
        lifesDOM.innerText = Number(lifesDOM.innerText) + 1;
      }
    });
  };

  maxScore = () => {
    if (Number (scoreDOM.innerText) > Number (maxScoreNumberDOM.innerText)){
      maxScoreNumberDOM.innerText=scoreDOM.innerText
    }
  }

  /*maxScore = () => {
    let currentScore = scoreDOM.innerText;
    if (Number(currentScore) > localStorage.getItem("highscore")) {
      maxScoreNumberDOM.innerText = localStorage.getItem("highscore");
    }
  };*/

  gameLoop = () => {
    //1. limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //2. movimientos y acciones de los elementos

    this.addEnemy();
    //this.cleanEnemyArr()
    this.sharksArr.forEach((eachShark) => {
      eachShark.enemyMovement();
    });
    this.dolphinsArr.forEach((eachDolphin) => {
      eachDolphin.enemyMovement();
    });
    this.medusaArr.forEach((eachMedusa) => {
      eachMedusa.enemyMovement();
    });
    this.piranaArr.forEach((eachPirana) => {
      eachPirana.piranaMovement();
    });
    this.piranaMovementTowardsWanda();
    this.wanda.moveWanda();
    this.wanda.wandaCanvasCollision();
    this.addFood();
    this.addSpecialBone();
    this.wandaEnemyCollision();
    this.wandaFoodCollision();
    this.wandaSpecialBoneCollision();


    //3. dibujar los elementos
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
    this.wanda.drawWanda();
    this.sharksArr.forEach((eachShark) => {
      eachShark.drawEnemy();
    });
    this.dolphinsArr.forEach((eachDolphin) => {
      eachDolphin.drawEnemy();
    });
    this.medusaArr.forEach((eachMedusa) => {
      eachMedusa.drawEnemy();
    });
    this.piranaArr.forEach((eachPirana) => {
      eachPirana.drawEnemy();
    });
    this.foodArr.forEach((eachFood) => {
      eachFood.drawFood();
    });

    this.specialBoneArr.forEach((eachSpecialBone) => {
      eachSpecialBone.drawFood();
    });

    if (this.showFlash === true) {
      this.drawFlash();
    }

    //4. efecto de recursión
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
