
export default class Sprite {
    constructor({ position, imageSrc, ctx }) {
      this.position = position;
      this.image = new Image();
      this.image.src = imageSrc;
      this.ctx = ctx
    }

    draw() {
      if (!this.image) return; // IF IMAGE IS NOT LOADED RETURN
      this.ctx.drawImage(this.image, this.position.x, this.position.y);
    //   console.log(this.image.src)
    }

    update() {
      this.draw();
    }
  }