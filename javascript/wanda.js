class Wanda {
  constructor() {
    //aqui todas las propiedades de Wanda
    this.image = new Image();
    this.image.src = "./images/wanda-happy-right.png";
    this.x = 0; //eje x
    this.y = 0; //eje y
    this.w = 150;
    this.h = 100;
    this.speed = 3;
    this.directionX = 1;
    this.directionY = 1;
  }

  //aqui los métodos de Wanda
  drawWanda = () => {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  };

  moveWanda = () => {
    this.x = this.x + this.speed * this.directionX;
    this.y = this.y + this.speed * this.directionY;
  };

  faceSickWanda = () => {
    if (this.directionX ===1){
      this.image.src="./images/wanda-sick-right.png"
    }else if (this.directionX===-1){
      this.image.src="./images/wanda-sick-left.png"
    }
  }

  wandaCanvasCollision = () => {
    console.log(this.x)
    if (this.y >= canvas.height- this.h) { //suelo
      this.y = canvas.height- this.h;
    } else if (this.y <= 0) {//arriba
      this.y = 0 ;}
    if (this.x + this.w >= canvas.width) { //derecha
      this.x = canvas.width - this.w;
    } else if (this.x <= 0) { //izquierda
      console.log("collision izq")
      this.x = 0;
    }
  };
}
