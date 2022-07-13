class Enemy {
    constructor(yParam, xParam, srcParam, hParam, wParam) {
        //aqui todas las propiedades de los enemigos
        this.image = new Image();
        this.image.src = srcParam;
        this.x = xParam; 
        this.y = yParam;
        this.w = wParam; 
        this.h = hParam; 
        this.speed = 3;
        this.directionX = 1
        this.directionY =1
      }

    //aqui todos los metodos de los enemigos

    drawEnemy = ()=> {
        ctx.drawImage (this.image, this.x, this.y, this.w, this.h);
    }

    enemyMovement = () => {
        this.x = this.x - this.speed
    }
    piranaMovement = () => {
        this.x = this.x + (this.speed -1.5) * this.directionX;
        this.y = this.y + (this.speed -1.5) * this.directionY
    }

}