import React, { useRef, useEffect, useState } from "react";
import BackgroundImage2 from "../../Assets/Background/newMapper.png";
import Data2 from "../../MapData/newMapUpdated.json";
import Player from "../../Classes/Player";
import Sprite from "../../Classes/Sprite";
import Enemy from "../../Classes/Enemy";
import CollisionBlock from "../../Classes/CollisionBlock";
import PlayerIdle from "../../Assets/warrior/Idle.png";
import playerAnimations from "../../Utils/PlayerAnimations";
import "./Canvas.scss";
import EnemySprite from "../../Assets/Enemies/enemy_bat_3.png";
import WinScreen from "../../Components/WinScreen/WinScreen";

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
      width: canvas.width / 3,
      height: canvas.height / 3,
    };

    const enemiesArray = [];
    const hordeEnemies = 15;

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
      hitbox: {
        width: 10,
        height: 10,
      },
    });

    for (let i = 0; i < hordeEnemies; i++) {
      const enemy = new Enemy({
        position: {
          x: 100,
          y: 400,
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

    if (playerWin) {
      canvasRef.current.focus();
    }

    // ANIMATE FUNCTION
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.fillStyle = "black";
      ctx.fillRect(camera.position.x, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(3, 3);
      ctx.translate(camera.position.x, camera.position.y);

      background.update();

      enemiesArray.forEach((enemy) => {
        enemy.update();
      });

      if (player.position.x > 1503) {
        setPlayerWin(true);
        return;
      }
      player.checkForHorizontalCanvasCollision();
      player.update();

      ctx.restore();
    };

    animate();
  }, [playerWin]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      window.location.reload();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  };

  return (
    <div className="game">
      <div className="game-container">
         {playerWin && <WinScreen />}
        <canvas ref={canvasRef} tabIndex="0" onKeyDown={handleKeyDown}></canvas>
       
      </div>
    </div>
  );
}

export default Canvas;
