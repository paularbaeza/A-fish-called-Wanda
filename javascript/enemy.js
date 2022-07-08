class Enemy {
    constructor(/*yParam*/) {
        //aqui todas las propiedades de los enemigos
        this.image = new Image();
        this.image.src = "./images/shark.png";
        this.x = canvas.width; //eje x
        this.y = 200;
        this.w = 350; 
        this.h = 160; 
        this.speed = 2;
      }

    //aqui todos los metodos de los enemigos

    drawEnemy = ()=> {
        ctx.drawImage (this.image, this.x, this.y, this.w, this.h);
    }

    enemyMovement = () => {
        this.x = this.x - this.speed
    }
}