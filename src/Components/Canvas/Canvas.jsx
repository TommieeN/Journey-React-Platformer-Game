import React, { useRef, useEffect } from "react";
import BackgroundImage from "../../Assets/background.png";
import Data from "../../MapData/platformer-map.json";
// import Player from "../Player/Player";
// import Sprite from "../../Classes/Sprite";
import FloorCollision from "../../Utils/FloorCollision";
// import PlatformCollision from "../../Utils/PlatformCollision";
import "./Canvas.scss";

function Canvas() {
  const canvasRef = useRef(null);
  const floorCollisionData = Data.layers[7].data;
  const platformCollisionData = Data.layers[8].data;
  const gravity = 0.5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d"); //C STANDS FOR CONTEXT
    canvas.width = 1024;
    canvas.height = 576;

    const scaledCanvas = {
      width: canvas.width / 4,
      height: canvas.height / 4,
    };

    // COLLISION BLOCKS
    class CollisionBlock {
      constructor({ position, height = 16 }) {
        this.position = position;
        this.width = 16;
        this.height = height;
      }
      draw() {
        c.fillStyle = "rgba(255, 0, 0, 0.5)";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
      }

      update() {
        this.draw();
      }
    }

    // GRABBING FLOOR AND PLATFORM DATA FROM JSON
    const floorCollisions2D = [];
    for (let i = 0; i < floorCollisionData.length; i += 36) {
      const floorCollision = floorCollisionData.slice(i, i + 36);
      floorCollisions2D.push(floorCollision);
    }

    const collisionBlocks = [];
    floorCollisions2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 202) {
          collisionBlocks.push(
            new CollisionBlock({
              position: {
                x: x * 16,
                y: y * 16,
              },
            })
          );
        }
      });
    });

    const platformCollisions2D = [];
    for (let i = 0; i < platformCollisionData.length; i += 36) {
      const platformCollision = platformCollisionData.slice(i, i + 36);
      platformCollisions2D.push(platformCollision);
    }
    const platformCollisionBlocks = [];
    platformCollisions2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 202) {
          platformCollisionBlocks.push(
            new CollisionBlock({
              position: {
                x: x * 16,
                y: y * 16,
              },
            })
          );
        }
      });
    });

    class Sprite {
      constructor({ position, imageSrc }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
      }

      draw() {
        if (!this.image) return; // IF IMAGE IS NOT LOADED RETURN
        c.drawImage(this.image, this.position.x, this.position.y);
      }

      update() {
        this.draw();
      }
    }
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
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
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

    const player = new Player({
      position: {
        x: 100,
        y: 300,
      },
      collisionBlocks,
      platformCollisionBlocks,
      c,
      gravity,
      FloorCollision,
    });

    // KEYS FOR PLAYER MOVEMENT
    const keys = {
      d: {
        pressed: false,
      },
      a: {
        pressed: false,
      },
    };

    //BACKGROUND IMAGE WITH SPRITE CLASS
    const background = new Sprite({
      position: {
        x: 0,
        y: 0,
      },
      imageSrc: BackgroundImage,
    });

    // ANIMATE FUNCTION
    const animate = () => {
      requestAnimationFrame(animate);
      c.fillStyle = "black";
      c.fillRect(0, 0, canvas.width, canvas.height);

      //THIS WILL STOP THE ANIMATION FROM SCALING THE BACKGROUND CONTINUOUSLY
      c.save();
      c.scale(4, 4);
      c.translate(0, -background.image.height + scaledCanvas.height);
      background.update();

      collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.update();
      });
      platformCollisionBlocks.forEach((block) => {
        block.update();
      });

      player.update();

      player.velocity.x = 0;
      if (keys.d.pressed) player.velocity.x = 3;
      else if (keys.a.pressed) player.velocity.x = -3;
      c.restore();
    };

    animate();

    // PLAYER MOVEMENT
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "d":
          keys.d.pressed = true;
          break;
        case "a":
          keys.a.pressed = true;
          break;
        case "w":
          player.velocity.y = -8;
          break;
        default:
      }
    });
    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "d":
          keys.d.pressed = false;
          break;
        case "a":
          keys.a.pressed = false;
          break;
        default:
      }
    });
  }, []);

  return (
    <>
      {/* <div className="game-container"> */}
      <canvas ref={canvasRef}></canvas>
      {/* </div> */}
    </>
  );
}

export default Canvas;

