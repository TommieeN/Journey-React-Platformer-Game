export default class CollisionBlock {
  constructor({ ctx, position, height = 16 }) {
    this.ctx = ctx;
    this.position = position;
    this.width = 16;
    this.height = height;
  }

  draw() {
    this.ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
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
