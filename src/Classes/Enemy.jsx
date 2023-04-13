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
    this.speed = Math.random() * 4 - 2;
    this.angle = Math.random() * 550;
    this.angleSpeed = Math.random() * 0.01 - 0.5;
    this.curve = Math.random() * 200 + 150;
  }

  update() {
    this.updateFrames();
    this.draw();
    this.updateHitbox();

    this.position.x =
      this.curve * Math.sin((this.angle * Math.PI) / 150) +
      (this.canvas.width - this.width );
    this.position.y =
      this.curve * Math.cos((this.angle * Math.PI) / 350) +
      (this.canvas.height / 2 - this.height / 2);

    this.angle -= this.angleSpeed;

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
