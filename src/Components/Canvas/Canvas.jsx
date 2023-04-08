import React, { useRef, useEffect } from "react";
import BackgroundImage from "../../Assets/background.png";
import Data from "../../MapData/platformer-map.json";
import Player from "../../Classes/Player";
import Sprite from "../../Classes/Sprite";
import Enemy from "../../Classes/Enemy";
import CollisionBlock from "../../Classes/CollisionBlock";
import KnightIdle from "../../Assets/Enemies/Knight/Idle.png";
import PlayerIdle from "../../Assets/warrior/Idle.png";
import PlayerIdleLeft from "../../Assets/warrior/IdleLeft.png";
import PlayerRun from "../../Assets/warrior/Run.png";
import PlayerRunLeft from "../../Assets/warrior/RunLeft.png";
import PlayerJump from "../../Assets/warrior/Jump.png";
import PlayerJumpLeft from "../../Assets/warrior/JumpLeft.png";
import PlayerFall from "../../Assets/warrior/Fall.png";
import PlayerFallLeft from "../../Assets/warrior/FallLeft.png";
// import MusicBtn from "../MusicBtn/MusicBtn";
import "./Canvas.scss";

function Canvas() {
  const canvasRef = useRef(null);
  const floorCollisionData = Data.layers[7].data;
  const platformCollisionData = Data.layers[8].data;
  const gravity = 0.1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 576;

    const scaledCanvas = {
      width: canvas.width / 4,
      height: canvas.height / 4,
    };

    // CREATE AND PARSE 2D DATA FROM JSON
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
              height: 4,
            })
          );
        }
      });
    });
    const backgroundImageHeight = 432;

    const camera = {
      position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height,
      },
    };

    const player = new Player({
      position: {
        x: 0,
        y: 300,
      },
      ctx,
      canvas,
      camera,
      collisionBlocks,
      platformCollisionBlocks,
      gravity,
      imageSrc: PlayerIdle,
      frameRate: 8,
      animations: {
        Idle: {
          imageSrc: PlayerIdle,
          frameRate: 8,
          frameBuffer: 3,
        },
        IdleLeft: {
          imageSrc: PlayerIdleLeft,
          frameRate: 8,
          frameBuffer: 3,
        },
        Run: {
          imageSrc: PlayerRun,
          frameRate: 8,
          frameBuffer: 5,
        },
        RunLeft: {
          imageSrc: PlayerRunLeft,
          frameRate: 8,
          frameBuffer: 5,
        },
        Jump: {
          imageSrc: PlayerJump,
          frameRate: 2,
          frameBuffer: 3,
        },
        JumpLeft: {
          imageSrc: PlayerJumpLeft,
          frameRate: 2,
          frameBuffer: 3,
        },
        Fall: {
          imageSrc: PlayerFall,
          frameRate: 2,
          frameBuffer: 3,
        },
        FallLeft: {
          imageSrc: PlayerFallLeft,
          frameRate: 2,
          frameBuffer: 3,
        },
      },
      hitbox: {
        width: 10,
        height: 10,
      },
    });

    const enemy = new Enemy({
      position: {
        x: 100,
        y: 350,
      },
      ctx,
      collisionBlocks,
      platformCollisionBlocks,
      gravity,
      imageSrc: KnightIdle,
      frameRate: 11,
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
      ctx: ctx,
    });

    // ANIMATE FUNCTION
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.fillStyle = "black";
      ctx.fillRect(camera.position.x, 0, canvas.width, canvas.height);

      //THIS WILL STOP THE ANIMATION FROM SCALING THE BACKGROUND CONTINUOUSLY
      ctx.save();
      ctx.scale(4, 4);
      ctx.translate(camera.position.x, camera.position.y);
      background.update();

      // collisionBlocks.forEach((collisionBlock) => {
      //   collisionBlock.update();
      // });
      // platformCollisionBlocks.forEach((block) => {
      //   block.update();
      // });

      player.checkForHorizontalCanvasCollision();
      player.update();
      enemy.update();

      player.velocity.x = 0;
      if (keys.d.pressed) {
        player.switchSprite("Run");
        player.velocity.x = 2;
        player.lastDirection = "right";
        player.shouldPanCameraToTheLeft();
      } else if (keys.a.pressed) {
        player.switchSprite("RunLeft");
        player.velocity.x = -2;
        player.lastDirection = "left";
        player.shouldPanCameraToTheRight();
      } else if (player.velocity.y === 0) {
        if (player.lastDirection === "right") player.switchSprite("Idle");
        else player.switchSprite("IdleLeft");
      }

      if (player.velocity.y < 0) {
        player.shouldPanCameraDown();
        if (player.lastDirection === "right") player.switchSprite("Jump");
        else player.switchSprite("JumpLeft");
      } else if (player.velocity.y > 0) {
        player.shouldPanCameraUp();
        if (player.lastDirection === "right") player.switchSprite("Fall");
        else player.switchSprite("FallLeft");
      }


      // Can refactor
      if (
        player.attackBox.position.x + player.attackBox.width >=
          enemy.hitbox.position.x &&
        player.attackBox.position.x <= enemy.hitbox.position.x + enemy.hitbox.width &&
        player.attackBox.position.y + player.attackBox.height >=
          enemy.hitbox.position.y &&
        player.attackBox.position.y <= enemy.hitbox.position.y + enemy.hitbox.height &&
        player.isAttacking
      ) {
        player.isAttacking = false
        console.log("go");
      }

      // if (
      //   enemy.hitbox &&
      //   player.hitbox &&
      //   enemy.hitbox.position.x <
      //     player.hitbox.position.x + player.hitbox.width &&
      //   enemy.hitbox.position.x + enemy.hitbox.width >
      //     player.hitbox.position.x &&
      //   enemy.hitbox.position.y <
      //     player.hitbox.position.y + player.hitbox.height &&
      //   enemy.hitbox.height + enemy.hitbox.position.y > player.hitbox.position.y
      // ) {
      //   // player.takeDamage(1);
      //   console.log("taking damage: ")
      // }

      ctx.restore();
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
          player.velocity.y = -4;
          break;
        case " ":
          player.attack();
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
      <div className="game-container">
        <canvas ref={canvasRef}></canvas>
        <div className="btn-canvas">{/* <MusicBtn /> */}</div>
      </div>
    </>
  );
}

export default Canvas;
