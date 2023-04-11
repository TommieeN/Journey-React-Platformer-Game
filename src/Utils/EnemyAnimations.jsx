import KnightIdle from "../Assets/Enemies/Knight/Idle.png";
import KnightRun from "../Assets/Enemies/Knight/Run.png";
import KnightJump from "../Assets/Enemies/Knight/Jump.png";
import KnightFall from "../Assets/Enemies/Knight/Fall.png";
import KnightDeath from "../Assets/Enemies/Knight/Death.png";


const enemyAnimations = {
    Idle: {
      imageSrc: KnightIdle,
      frameRate: 11,
      frameBuffer: 3,
    },
    Run: {
      imageSrc: KnightRun,
      frameRate: 8,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: KnightJump,
      frameRate: 2,
      frameBuffer: 3,
    },
    Fall: {
      imageSrc: KnightFall,
      frameRate: 2,
      frameBuffer: 3,
    },
    Death: {
        imageSrc: KnightDeath,
        frameRate: 11,
        frameBuffer: 8,
    }
  }

  export default enemyAnimations;