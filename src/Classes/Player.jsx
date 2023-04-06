import FloorCollision from "../Utils/FloorCollision";
// import PlatformCollision from "../Utils/PlatformCollision";
import Sprite from "./Sprite";

export default class Player extends Sprite {
  constructor({
    position,
    ctx,
    collisionBlocks,
    platformCollisionBlocks,
    gravity,
    imageSrc,
    frameRate,
    scale = 0.5,
    animations,
  }) {
    super({ imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.gravity = gravity;
    this.collisionBlocks = collisionBlocks;
    this.platformCollisionBlocks = platformCollisionBlocks;
    this.ctx = ctx;
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };
    this.animations = animations
    this.lastDirection = "right"

    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;

      this.animations[key].image = image;
    }
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;

    this.currentFrame = 0
    this.image = this.animations[key].image;
    this.frameRate = this.animations[key].frameRate;
    this.frameBuffer = this.animations[key].frameBuffer;
  }

  update() {
    this.updateFrames();
    this.updateHitbox();

    // this.ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
    // this.ctx.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.width,
    //   this.height
    // );
    // this.ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    // this.ctx.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );

    this.draw();

    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.CheckForHorizontalCollisions();
    this.applyGravity();
    this.updateHitbox();
    this.CheckForVerticalCollisions();
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 35,
        y: this.position.y + 26,
      },
      width: 14,
      height: 27,
    };
  }

  CheckForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        FloorCollision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;

          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;

          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0;

          const offset = this.hitbox.position.x - this.position.x;

          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  CheckForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        FloorCollision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;

          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0;

          const offset = this.hitbox.position.y - this.position.y;

          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }
  }
}