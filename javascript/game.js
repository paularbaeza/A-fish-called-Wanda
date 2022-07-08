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
    //this.enemy = new Enemy ();
    this.isGameOn = true;
  }

  // todos los métodos del juego
  addEnemy = () => {
    if (
      this.sharksArr.length === 0 ||
      this.sharksArr[this.sharksArr.length - 1].x < canvas.width / 2
    ) {
      let randomPositionShark = Math.random() * (canvas.height - 160);
      let newEnemyShark = new Enemy(
        randomPositionShark,
        "./images/shark.png",
        160
      );
      this.sharksArr.push(newEnemyShark);
    } else if (
      this.whalesArr.length === 0 ||
      this.whalesArr[this.whalesArr.length - 1].x < canvas.width / 2
    ) {
      let randomPositionWhale = Math.random() * (canvas.height - 160);
      let newEnemyWhale = new Enemy(
        randomPositionWhale,
        "./images/whale.png",
        220
      );
      this.whalesArr.push(newEnemyWhale);
      //setTimeout(whalesArr,600);
    }
  };

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

    //3. dibujar los elementos
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
    this.wanda.drawWanda();
    this.sharksArr.forEach((eachShark) => {
      eachShark.drawEnemy();
    });
    this.whalesArr.forEach((eachWhale) => {
      eachWhale.drawEnemy();
    });

    //4. efecto de recursión
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
