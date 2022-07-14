class Food {
  constructor(xParam, yParam, srcParam, wParam, hParam) {
    //aqui todas las propiedades de los enemigos
    this.image = new Image();
    this.image.src = srcParam;
    this.x = xParam;
    this.y = yParam;
    this.w = wParam;
    this.h = hParam;
  }

  //aqui todos los metodos de los enemigos

  drawFood = () => {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  };
}
