import Sprite from "./Sprite";
// import EnemySprite from "../Assets/Enemies/enemy_bat_3.png"

export default class Enemy extends Sprite {
  constructor({ position, ctx, canvas, imageSrc, frameRate, scale = 0.1 }) {
    super({ imageSrc, frameRate, scale });
    this.ctx = ctx;
    this.position = position;
    this.canvas = canvas;
    this.x = Math.random() * canvas.width * 2;
    this.y = Math.random() * canvas.height;
    this.speed = Math.random() * 4 - 2;
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
    this.position.x += this.speed;
    this.position.y += this.speed;



    // If the enemy goes out of bounds, wrap it to the opposite side of the canvas
    if (this.position.x < 0) {
      this.position.x = this.canvas.width;
    } else if (this.position.x > this.canvas.width) {
      this.position.x = 0;
    }
    
    if (this.position.y < 0) {
      this.position.y = this.canvas.height;
    } else if (this.position.y > this.canvas.height) {
      this.position.y = 0;
    }

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
