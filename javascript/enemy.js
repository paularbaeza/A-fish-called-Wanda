class Enemy {
    constructor(yParam, srcParam, hParam, wParam) {
        //aqui todas las propiedades de los enemigos
        this.image = new Image();
        this.image.src = srcParam;
        this.x = canvas.width; //eje x
        this.y = yParam;
        this.w = wParam; 
        this.h = hParam; 
        this.speed = 3;
      }

    //aqui todos los metodos de los enemigos

    drawEnemy = ()=> {
        ctx.drawImage (this.image, this.x, this.y, this.w, this.h);
    }

    enemyMovement = () => {
        this.x = this.x - this.speed
    }
}