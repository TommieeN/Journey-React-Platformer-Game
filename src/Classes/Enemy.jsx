import Sprite from "./Sprite";
// import EnemySprite from "../Assets/Enemies/enemy_bat_3.png"

export default class Enemy extends Sprite {
  constructor({ position, ctx, canvas, imageSrc, frameRate, scale = 0.1 }) {
    super({ imageSrc, frameRate, scale });
    this.ctx = ctx;
    this.position = position;
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speed = Math.random() * 4 - 2;
    this.width = 100
    this.height = 100
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 200,
      height: 200,
    };
  }

  update() {
    this.updateFrames();
    this.draw();
    this.updateHitbox();
    this.x += this.speed;
    this.y += this.speed;



    this.ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    this.ctx.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );
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
