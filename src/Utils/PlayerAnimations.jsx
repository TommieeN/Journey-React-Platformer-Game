import PlayerIdle from "../Assets/warrior/Idle.png";
import PlayerIdleLeft from "../Assets/warrior/IdleLeft.png";
import PlayerRun from "../Assets/warrior/Run.png";
import PlayerRunLeft from "../Assets/warrior/RunLeft.png";
import PlayerJump from "../Assets/warrior/Jump.png";
import PlayerJumpLeft from "../Assets/warrior/JumpLeft.png";
import PlayerFall from "../Assets/warrior/Fall.png";
import PlayerFallLeft from "../Assets/warrior/FallLeft.png";
import PlayerDeath from "../Assets/warrior/Death.png";
import PlayerAttack1 from "../Assets/warrior/Attack1.png";

const playerAnimations = {
    Idle: {
      imageSrc: PlayerIdle,
      frameRate: 8,
      frameBuffer: 4,
    },
    IdleLeft: {
      imageSrc: PlayerIdleLeft,
      frameRate: 8,
      frameBuffer: 4,
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
      frameBuffer: 5,
    },
    JumpLeft: {
      imageSrc: PlayerJumpLeft,
      frameRate: 2,
      frameBuffer: 5,
    },
    Fall: {
      imageSrc: PlayerFall,
      frameRate: 2,
      frameBuffer: 5,
    },
    FallLeft: {
      imageSrc: PlayerFallLeft,
      frameRate: 2,
      frameBuffer: 5,
    },
    Death: {
      imageSrc: PlayerDeath,
      frameRate: 6,
      frameBuffer: 4,
    },
    Attack1: {
      imageSrc: PlayerAttack1,
      frameRate: 4,
      frameBuffer: 5.
    }
  }

  export default playerAnimations;