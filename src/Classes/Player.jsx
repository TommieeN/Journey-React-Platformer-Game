// import Canvas from "../Components/Canvas/Canvas";
import FloorCollision from "../Utils/FloorCollision";
import PlatformCollision from "../Utils/PlatformCollision";
import Sprite from "./Sprite";

export default class Player extends Sprite {
  constructor({
    position,
    ctx,
    canvas,
    camera,
    collisionBlocks,
    platformCollisionBlocks,
    gravity,
    imageSrc,
    frameRate,
    scale = 0.5,
    animations,
    health = 100,
    isAttacking
  }) {
    super({ imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.isAttacking = isAttacking
    this.gravity = gravity;
    this.collisionBlocks = collisionBlocks;
    this.platformCollisionBlocks = platformCollisionBlocks;
    this.ctx = ctx;
    this.canvas = canvas;
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };
    this.animations = animations;
    this.lastDirection = "right";
    this.camera = camera;
    this.health = health

    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;

      this.animations[key].image = image;
    }

    this.camerabox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    };
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 35,
      height: 20,
    };
    
  }



  // draw() {
  //   this.ctx.fillStyle = "red"
  //   this.ctx.fillRect(this.position.x, this.position.y, 50, this.height)

  //   this.ctx.fillStyle = "green"
  //   this.ctx.fillRect(
  //     this.attackBox.position.x,
  //     this.attackBox.position.y,
  //     this.attackBox.width,
  //     this.attackBox.height
  //   )
  // }

  takeDamage(damageAmount) {
    this.health -= damageAmount;
    if(this.health <= 0){
      this.health = 0
    }
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;

    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameRate = this.animations[key].frameRate;
    this.frameBuffer = this.animations[key].frameBuffer;
  }

  updateCamerabox() {
    this.camerabox = {
      position: {
        x: this.position.x - 50,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    };
  }

  checkForHorizontalCanvasCollision() {
    if (
      this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
      this.hitbox.position.x + this.velocity.x <= 0
    ) {
      this.velocity.x = 0;
    }
  }

  shouldPanCameraToTheLeft() {
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width;
    const scaledDownCanvasWidth = this.canvas.width / 4;

    if (cameraboxRightSide >= 576) return;

    if (
      cameraboxRightSide >=
      scaledDownCanvasWidth + Math.abs(this.camera.position.x)
    ) {
      this.camera.position.x -= this.velocity.x;
    }
  }
  shouldPanCameraToTheRight() {
    if (this.camerabox.position.x <= 0) return;
    if (this.camerabox.position.x <= Math.abs(this.camera.position.x)) {
      this.camera.position.x -= this.velocity.x;
    }
  }
  shouldPanCameraDown() {
    if (this.camerabox.position.y + this.velocity.y <= 0) return;

    if (this.camerabox.position.y <= Math.abs(this.camera.position.y)) {
      this.camera.position.y -= this.velocity.y;
    }
  }
  shouldPanCameraUp() {
    if (
      this.camerabox.position.y + this.camerabox.height + this.velocity.y >=
      432
    )
      return;

    const scaledCanvasHeight = this.canvas.height / 4;

    if (
      this.camerabox.position.y + this.camerabox.height >=
      Math.abs(this.camera.position.y) + scaledCanvasHeight
    ) {
      this.camera.position.y -= this.velocity.y;
    }
  }

  update() {
    this.updateFrames();
    this.updateHitbox();

    this.updateCamerabox();
    // this.ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
    // this.ctx.fillRect(
    //   this.camerabox.position.x,
    //   this.camerabox.position.y,
    //   this.camerabox.width,
    //   this.camerabox.height
    // );

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
    if (this.isAttacking) {
    this.ctx.fillStyle = "green"
    this.ctx.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    )
    }

    this.draw();

    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.CheckForHorizontalCollisions();
    this.applyGravity();
    this.updateHitbox();
    this.CheckForVerticalCollisions();
    this.updateAttackbox();
  }
  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
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
  updateAttackbox() {
    this.attackBox = {
      position: {
        x: this.position.x + 40,
        y: this.position.y + 29,
      },
      width: 35,
      height: 20,
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
}
