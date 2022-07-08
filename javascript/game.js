class Game {
  constructor() {
    //todas las propiedades del juego 

    //imagen de fondo
    this.background = new Image();
    this.background.src = "./images/fondo-mar.jpg";
    this.isGameOn = true;
    this.wanda = new Wanda();
    this.enemyArr = [];
    this.enemy = new Enemy ();
  }

  // todos los métodos del juego
  /*addEnemy = () => {
    if (
      this.enemyArr.length === 0 ||
      this.enemyArr[this.enemyArr.length - 1].x < canvas.width / 2
    ) {
      //let randomEnemyPosition = Math.random() * 100;

      let newEnemy = new Enemy(randomEnemyPosition);
      this.enemyArr.push(newEnemy);
    }
  };*/

  gameLoop = () => {
    //console.log("juego andando")
    //1. limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //2. movimientos y acciones de los elementos
    this.wanda.wandaCanvasCollision();
   /* this.enemyArr.forEach((eachEnemy) => {
      eachEnemy.enemyMovement();
    });*/
    this.enemy.enemyMovement()
    this.wanda.moveWanda()

    //3. dibujar los elementos
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
    this.wanda.drawWanda ()
    this.enemy.drawEnemy()

    /*this.enemyArr.forEach((eachEnemy) => {
      eachEnemy.drawEnemy();
    });*/

    //4. efecto de recursión
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}


