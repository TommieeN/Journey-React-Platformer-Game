// import Data from "../MapData/platformer-map.json";

//  const floorCollisionData = Data.layers[7].data;
//  const platformCollisionData = Data.layers[8].data;


export default class CollisionBlock {
  constructor({ ctx, position, height = 16 }) {
    this.ctx = ctx;
    this.position = position;
    this.width = 16;
    this.height = height;
  }

  draw() {
    this.ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
  }
}
//     // GRABBING FLOOR AND PLATFORM DATA FROM JSON
//     const floorCollisions2D = [];
//     for (let i = 0; i < floorCollisionData.length; i += 36) {
//       const floorCollision = floorCollisionData.slice(i, i + 36);
//       floorCollisions2D.push(floorCollision);
//     }

//     const collisionBlocks = [];
//     floorCollisions2D.forEach((row, y) => {
//       row.forEach((symbol, x) => {
//         if (symbol === 202) {
//           collisionBlocks.push(
//             new CollisionBlock({
//               position: {
//                 x: x * 16,
//                 y: y * 16,
//               },
//             })
//           );
//         }
//       });
//     });

//     const platformCollisions2D = [];
//     for (let i = 0; i < platformCollisionData.length; i += 36) {
//       const platformCollision = platformCollisionData.slice(i, i + 36);
//       platformCollisions2D.push(platformCollision);
//     }
//     const platformCollisionBlocks = [];
//     platformCollisions2D.forEach((row, y) => {
//       row.forEach((symbol, x) => {
//         if (symbol === 202) {
//           platformCollisionBlocks.push(
//             new CollisionBlock({
//               position: {
//                 x: x * 16,
//                 y: y * 16,
//               },
//               height: 4,
//             })
//           );
//         }
//       });
//     });