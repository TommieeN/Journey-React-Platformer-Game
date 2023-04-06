
class Player {
    constructor({ position }) {
      this.position = position;
      this.velocity = {
        x: 0,
        y: 1,
      };
      this.width = 25;
      this.height = 25;
      this.collisionBlocks = collisionBlocks;
      this.platformCollisionBlocks = platformCollisionBlocks;
    }
    draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
      this.draw();

      this.position.x += this.velocity.x;
      this.CheckForHorizontalCollisions();
      this.applyGravity();
      this.CheckForVerticalCollisions();
    }

    CheckForHorizontalCollisions() {
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i];

        if (
          FloorCollision({
            object1: this,
            object2: collisionBlock,
          })
        ) {
          if (this.velocity.x > 0) {
            this.velocity.x = 0;
            this.position.x = collisionBlock.position.x - this.width - 0.01;
            break;
          }

          if (this.velocity.x < 0) {
            this.velocity.x = 0;
            this.position.x =
              collisionBlock.position.x + collisionBlock.width + 0.01;
            break;
          }
        }
      }
    }

    applyGravity() {
      this.velocity.y += gravity;
      this.position.y += this.velocity.y;
    }

    CheckForVerticalCollisions() {
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i];

        if (
          FloorCollision({
            object1: this,
            object2: collisionBlock,
          })
        ) {
          if (this.velocity.y > 0) {
            this.velocity.y = 0;
            this.position.y = collisionBlock.position.y - this.height - 0.01;
            break;
          }

          if (this.velocity.y > 0) {
            this.velocity.y = 0;
            this.position.y =
              collisionBlock.position.y + collisionBlock.height + 0.01;
            break;
          }
        }
      }
    }
  }