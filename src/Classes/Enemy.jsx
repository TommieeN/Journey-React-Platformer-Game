import Sprite from "./Sprite";
// import EnemySprite from "../Assets/Enemies/enemy_bat_3.png"

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
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.speed = Math.random() * - 1 - 2;
    this.width = width;
    this.height = height;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 500;
    this.angleSpeed = Math.random() * 0.41 - 0.1;
    this.curve = Math.random() * 200 + 100;
  }

  update() {
    this.updateFrames();
    this.draw();
    this.updateHitbox();

    this.position.x =
      this.curve * Math.sin(this.angle * Math.PI/200) +
      (this.canvas.width/2 - this.width / 2);
    this.position.y =
      this.curve * Math.cos(this.angle * Math.PI/200) +
      (this.canvas.height/2 - this.height/2);
    

    this.angle += this.angleSpeed;

    if (this.x + this.width < 0) this.x = this.canvas.width;

    // this.ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    // this.ctx.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );
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
