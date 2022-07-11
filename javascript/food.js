class Food {
    constructor(xParam, yParam) {
        //aqui todas las propiedades de los enemigos
        this.image = new Image();
        this.image.src = "./images/bone.png";
        this.x = xParam; //eje x
        this.y = yParam;
        this.w = 75; 
        this.h = 40; 
        this.speed = 3;
      }

    //aqui todos los metodos de los enemigos

    drawFood = ()=> {
        ctx.drawImage (this.image, this.x, this.y, this.w, this.h);
    }

}