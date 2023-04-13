import React, { useRef, useEffect, useState } from "react";
import WinScreen from "../../Components/WinScreen/WinScreen";
import Player from "../../Classes/Player";
import Sprite from "../../Classes/Sprite";
import Enemy from "../../Classes/Enemy";
import CollisionBlock from "../../Classes/CollisionBlock";
import PlayerIdle from "../../Assets/warrior/Idle.png";
import EnemySprite from "../../Assets/Enemies/enemy_ghost_1.png";
import BackgroundImage2 from "../../Assets/Background/newMapper.png";
import playerAnimations from "../../Utils/PlayerAnimations";
import CollideCollision from "../../Utils/CollideCollision";
import Data2 from "../../MapData/newMapUpdated.json";
import "./Canvas.scss";

function Canvas() {
  const canvasRef = useRef(null);

  const floorCollisionData = Data2.layers[5].data;
  const platformCollisionData = Data2.layers[4].data;

  const gravity = 0.1;

  const [playerWin, setPlayerWin] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 1024;
    canvas.height = 576;

    const scaledCanvas = {
      width: canvas.width / 2.5,
      height: canvas.height / 2.5,
    };

    const enemiesArray = [];
    const hordeEnemies = 12;

    //PARSE 2D DATA FROM JSON FOR FLOOR BLOCKS
    const floorCollisions2D = [];
    for (let i = 0; i < floorCollisionData.length; i += 100) {
      const floorCollision = floorCollisionData.slice(i, i + 100);
      floorCollisions2D.push(floorCollision);
    }

    // CREATE NEW FLOOR BLOCKS
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

    //PARSE 2D DATA FROM JSON FOR PLATFORM BLOCKS
    const platformCollisions2D = [];
    for (let i = 0; i < platformCollisionData.length; i += 100) {
      const platformCollision = platformCollisionData.slice(i, i + 100);
      platformCollisions2D.push(platformCollision);
    }

    // CREATE NEW PLATFORM BLOCKS
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

    const backgroundImageHeight = 490;

    // CAMERA POSITION
    const camera = {
      position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height,
      },
    };

    // CREATE PLAYER
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
      hitbox: {
        width: 10,
        height: 10,
      },
    });

    // CREATE MULTIPLE ENEMIES
    for (let i = 0; i < hordeEnemies; i++) {
      const enemy = new Enemy({
        position: {
          x: 0,
          y: 0,
        },
        hitbox: {
          width: 100,
          height: 100,
        },
        ctx,
        canvas,
        imageSrc: EnemySprite,
        frameRate: 6,
      });
      enemiesArray.push(enemy);
    }

    //BACKGROUND IMAGE WITH SPRITE CLASS
    const background = new Sprite({
      position: {
        x: 0,
        y: 0,
      },
      imageSrc: BackgroundImage2,
      ctx: ctx,
    });

    // RESET FUNCTION
    function restart() {
      player.position.x = 0;
      player.position.y = 370;
      camera.position.x = 0;
      camera.position.y = -backgroundImageHeight + scaledCanvas.height;
    }

    // CHECK FOR COLLISIONS BETWEEN ENEMIES AND PLAYER
    function checkCollisions(player, enemiesArray) {
      for (let i = 0; i < enemiesArray.length; i++) {
        const enemy = enemiesArray[i];
        if (CollideCollision(player, enemy)) {
          restart();
        }
      }
    }

    // ANIMATE FUNCTION
    const animate = () => {
      requestAnimationFrame(animate);

      if (player.position.x > 1502) {
        setPlayerWin(true);
      }

      ctx.fillStyle = "black";
      ctx.fillRect(camera.position.x, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(2.5, 2.5);
      ctx.translate(camera.position.x, camera.position.y);

      background.update();

      checkCollisions(player, enemiesArray);
      enemiesArray.forEach((enemy) => {
        enemy.update();
      });

      player.update();

      ctx.restore();
    };

    animate();

    document.addEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      document.location.reload();
    }
  };

  return (
    <div className="game">
      <div className="game-container">
        <canvas ref={canvasRef} tabIndex="0"></canvas>
        {playerWin ? <WinScreen /> : ""}
      </div>
    </div>
  );
}

export default Canvas;
