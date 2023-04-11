import React, { useRef, useEffect } from "react";
import BackgroundImage2 from "../../Assets/Background/newMapper.png"
import Data2 from "../../MapData/newMapUpdated.json"
import Player from "../../Classes/Player";
import Sprite from "../../Classes/Sprite";
// import Enemy from "../../Classes/Enemy";
import CollisionBlock from "../../Classes/CollisionBlock";
// import KnightIdle from "../../Assets/Enemies/Knight/Idle.png";
import PlayerIdle from "../../Assets/warrior/Idle.png";
import playerAnimations from "../../Utils/PlayerAnimations";
// import enemyAnimations from "../../Utils/EnemyAnimations";
import "./Canvas.scss";
// import PlayerHealth from "../../Utils/PlayerHealth";

function Canvas() {
  const canvasRef = useRef(null);
  const floorCollisionData = Data2.layers[5].data;
  const platformCollisionData = Data2.layers[4].data;
  const gravity = 0.1;
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 576;

    const scaledCanvas = {
      width: canvas.width / 3,
      height: canvas.height / 3,
    };


    // CREATE AND PARSE 2D DATA FROM JSON
    const floorCollisions2D = [];
    for (let i = 0; i < floorCollisionData.length; i += 100) {
      const floorCollision = floorCollisionData.slice(i, i + 100);
      floorCollisions2D.push(floorCollision);
    }

    const collisionBlocks = [];
    floorCollisions2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 5735) {
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
    for (let i = 0; i < platformCollisionData.length; i += 100) {
      const platformCollision = platformCollisionData.slice(i, i + 100);
      platformCollisions2D.push(platformCollision);
    }
    const platformCollisionBlocks = [];
    platformCollisions2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 5735) {
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
    const backgroundImageHeight = 500;

    const camera = {
      position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height,
      },
    };

    const player = new Player({
      position: {
        x: 0,
        y: 400,
      },
      ctx,
      canvas,
      camera,
      collisionBlocks,
      platformCollisionBlocks,
      gravity,
      imageSrc: PlayerIdle,
      frameRate: 8,
      playerAnimations,
      attackDamage: 10,
      hitbox: {
        width: 10,
        height: 10,
      },
    });

    // const enemy = new Enemy({
    //   position: {
    //     x: 0,
    //     y: 400,
    //   },
    //   ctx,
    //   collisionBlocks,
    //   platformCollisionBlocks,
    //   gravity,
    //   imageSrc: KnightIdle,
    //   frameRate: 11,
    //   enemyAnimations,
    // });

    //BACKGROUND IMAGE WITH SPRITE CLASS
    const background = new Sprite({
      position: {
        x: 0,
        y: 0,
      },
      imageSrc: BackgroundImage2,
      ctx: ctx,
    });

    // ANIMATE FUNCTION
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.fillStyle = "black";
      ctx.fillRect(camera.position.x, 0, canvas.width, canvas.height);

      //THIS WILL STOP THE ANIMATION FROM SCALING THE BACKGROUND CONTINUOUSLY
      ctx.save();
      ctx.scale(3, 3);
      ctx.translate(camera.position.x, camera.position.y);
      background.update();

      player.checkForHorizontalCanvasCollision();
      player.update();
      
        
      ctx.restore();
    };
    animate();

  }, []);

  return (
    <div className="game">
    {/* <PlayerHealth /> */}
      <div className="game-container">
        <canvas ref={canvasRef}></canvas>
        <div className="btn-canvas">{/* <MusicBtn /> */}</div>
      </div>
    </div>
  );
}

export default Canvas;
