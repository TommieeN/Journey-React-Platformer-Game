import Sprite from "./Sprite";

export default class Enemy extends Sprite {
  constructor({
    position,
    ctx,
    canvas,
    imageSrc,
    frameRate,
    scale = 0.1,
    width,
    height,
    currentFrame = 0,
  }) {
    super({ imageSrc, frameRate, scale, currentFrame });
    this.ctx = ctx;
    this.position = position;
    this.canvas = canvas;
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 200,
      height: 200,
    };
    this.width = width;
    this.height = height;

    // ENEMY MOVEMENT
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.speed = Math.random() * 5 - 2;
    this.angle = Math.random() * 400;
    this.angleSpeed = Math.random() * 0.01 - 0.5;
    this.curve = Math.random() * 200 + 100;
  }

  update() {
    this.updateFrames();
    this.draw();
    this.updateHitbox();

    this.position.x =
      this.curve * Math.sin((this.angle * Math.PI) / 325) +
      (this.canvas.width / 2 - this.width / 2);
    this.position.y =
      this.curve * Math.cos((this.angle * Math.PI) / 325) +
      (this.canvas.height / 2 - this.height / 2);

    this.angle -= this.angleSpeed;

    if (this.x + this.width < 0) this.x = this.canvas.width;
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 26.5,
      height: 19,
    };
  }
}
