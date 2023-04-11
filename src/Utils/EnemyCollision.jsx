export function enemyCollision({ object1, object2 }) {
  if (
    object2.hitbox &&
    object1.hitbox &&
    object2.hitbox.position.x <
      object1.hitbox.position.x + object1.hitbox.width &&
    object2.hitbox.position.x + object2.hitbox.width >
      object1.hitbox.position.x &&
    object2.hitbox.position.y <
      object1.hitbox.position.y + object1.hitbox.height &&
    object2.hitbox.height + object2.hitbox.position.y >
      object1.hitbox.position.y
  ) {
    console.log("player taking damage")
  }
}

