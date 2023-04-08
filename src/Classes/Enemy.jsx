import Sprite from "./Sprite";
import FloorCollision from "../Utils/FloorCollision";
import PlatformCollision from "../Utils/PlatformCollision";

export default class Enemy extends Sprite {
  constructor({
    position,
    ctx,
    collisionBlocks,
    platformCollisionBlocks,
    gravity,
    imageSrc,
    frameRate,
    animations,
    scale = 0.465,
  }) {
    super({ imageSrc, frameRate,scale });
    this.position = position;
    this.ctx = ctx;
    this.collisionBlocks = collisionBlocks;
    this.platformCollisionBlocks = platformCollisionBlocks;
    this.gravity = gravity;
    this.animations = animations;
    this.velocity = {
      x: 0,
      y: 1,
    }
    this.hitbox = {
        position: {
            x: this.position.x,
            y: this.position.y,
        },
        width: 10,
        height: 10,
    }

    for (let key in this.animations) {
      const image = new Image();
      this.image.src = this.animations[key].imageSrc;

      this.animations[key].image = image;
    }
  }
  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;

    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameRate = this.animations[key].frameRate;
    this.frameBuffer = this.animations[key].frameBuffer;
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

    // PLATFORM COLLISION BLOCKS
    for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
      const platformCollisionBlock = this.platformCollisionBlocks[i];

      if (
        PlatformCollision({
          object1: this.hitbox,
          object2: platformCollisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;

          this.position.y = platformCollisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }
  update() {
    this.updateFrames();

    this.draw();

    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.CheckForHorizontalCollisions();
    this.applyGravity();
    this.updateHitbox();
    this.CheckForVerticalCollisions();

        this.ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    this.ctx.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );
  }
  
  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
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
}
