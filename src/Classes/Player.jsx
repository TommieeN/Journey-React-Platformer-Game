import FloorCollision from "../Utils/FloorCollision";
import PlatformCollision from "../Utils/PlatformCollision";
import playerAnimations from "../Utils/PlayerAnimations";
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
    frameRate = 1,
    scale = 0.5,
    playerAnimations,
  }) {
    super({ imageSrc, frameRate, scale });
    this.enemy = null;
    this.position = position;
    this.gravity = gravity;
    this.collisionBlocks = collisionBlocks;
    this.platformCollisionBlocks = platformCollisionBlocks;
    this.ctx = ctx;
    this.canvas = canvas;
    this.animations = playerAnimations;
    this.lastDirection = "right";
    this.camera = camera;
    this.isAlive = true;
    this.isPlayerOnGround = false;
    this.scaledCanvas = { width: canvas.width / 3, height: canvas.height / 3 };
    this.backgroundImageHeight = 500;

    // PLAYER CONTROLS
    this.keys = {
      arrowright: {
        pressed: false,
      },
      arrowleft: {
        pressed: false,
      },
    };
    this.movements = () => {
      window.addEventListener("keydown", (event) => {
        if(this.position.x > 1502) {
          return
        }
        switch (event.key) {
          case "ArrowRight":
            this.keys.arrowright.pressed = true;
            break;
          case "ArrowLeft":
            this.keys.arrowleft.pressed = true;
            break;
          case "ArrowUp":
            if (event.key === "ArrowUp") {
              this.Jump();
            }
            break;
          default:
        }
      });
      window.addEventListener("keyup", (event) => {
        switch (event.key) {
          case "ArrowRight":
            this.keys.arrowright.pressed = false;
            break;
          case "ArrowLeft":
            this.keys.arrowleft.pressed = false;
            break;
          default:
        }
      });
    };
    this.movements();
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };
    this.camerabox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    };


    // CREATE NEW IMAGE FOR ANIMATIONS
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;

      this.animations[key].image = image;
    }
  }


  // SWITCH SPRITE FUNCTION
  switchSprite(key) {
    if (this.image === this.animations[key].image) return;

    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameRate = this.animations[key].frameRate;
    this.frameBuffer = this.animations[key].frameBuffer;
  }


// PLAYER MOVE SPEED/ANIMATIONS
  checkMovement() {
    this.velocity.x = 0;

    if (this.keys.arrowright.pressed) {
      this.switchSprite("Run");
      this.velocity.x = 2;
      this.lastDirection = "right";
      this.shouldPanCameraToTheLeft();

    } else if (this.keys.arrowleft.pressed) {
      this.switchSprite("RunLeft");
      this.velocity.x = -2;
      this.lastDirection = "left";
      this.shouldPanCameraToTheRight();

    } else if (this.velocity.y === 0) {
      if (this.lastDirection === "right") this.switchSprite("Idle");
      else this.switchSprite("IdleLeft");
    }

    if (this.velocity.y < 0) {
      this.shouldPanCameraDown();
      if (this.lastDirection === "right") this.switchSprite("Jump");
      else this.switchSprite("JumpLeft");
    } else if (this.velocity.y > 0) {
      this.shouldPanCameraUp();
      if (this.lastDirection === "right") this.switchSprite("Fall");
      else this.switchSprite("FallLeft");
    }


    // LOSE CONDITION
    if (this.position.y > this.canvas.height) {
      this.position.x = 0;
      this.position.y = 400;
      this.camera.position.x = 0;
      this.camera.position.y =
        -this.backgroundImageHeight + this.scaledCanvas.height;
    }
  }

// CAMERA PANNING
  updateCamerabox() {
    this.camerabox = {
      position: {
        x: this.position.x - 100,
        y: this.position.y,
      },
      width: 300,
      height: 100,
    };
  }
  shouldPanCameraToTheLeft() {
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width;
    const scaledDownCanvasWidth = this.canvas.width / 2.5;

    if (cameraboxRightSide >= 1600) return;

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

    if (this.camerabox.position.y <= Math.abs(this.camera.position.y - 50)) {
      this.camera.position.y -= this.velocity.y;
    }
  }
  shouldPanCameraUp() {
    if (
      this.camerabox.position.y + this.camerabox.height + this.velocity.y >=
      520
    )
      return;

    const scaledCanvasHeight = this.canvas.height / 2.5;

    if (
      this.camerabox.position.y + this.camerabox.height >=
      Math.abs(this.camera.position.y + 50 ) + scaledCanvasHeight
    ) {
      this.camera.position.y -= this.velocity.y;
    }
  }
  
  // HITBOX FOR PLAYER
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

// CHECK FOR CANVAS COLLISION FOR PLAYER
checkForHorizontalCanvasCollision() {
    if (
      this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 1600 ||
      this.hitbox.position.x + this.velocity.x <= 0
    ) {
      this.velocity.x = 0;
    }
  }

  // CHECK FOR HORIZONTAL COLLISIONS FOR PLAYER
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

  // GRAVITY
  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  // CHECK FOR VERTICAL COLLISIONS FOR PLAYER
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
          this.isPlayerOnGround = true;
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
          this.isPlayerOnGround = true;
          break;
        }
      }
    }
  }

  // CHECK FOR JUMP
  Jump() {
    if (this.isPlayerOnGround) {
      this.velocity.y = -4;
      this.isPlayerOnGround = false;
    }
  }


  update() {
    this.updateFrames();
    this.updateHitbox();
    this.updateCamerabox();

    this.draw();

    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.CheckForHorizontalCollisions();
    this.applyGravity();
    this.updateHitbox();
    this.CheckForVerticalCollisions();
    this.checkMovement();
    this.checkForHorizontalCanvasCollision()
  }
}
