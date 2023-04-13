// HITBOX COLLISION FUNCTION
function CollideCollision(object1, object2) {
  if (
    object1.hitbox &&
    object2.hitbox &&
    object1.hitbox.position.x <
      object2.hitbox.position.x + object2.hitbox.width &&
    object1.hitbox.position.x + object1.hitbox.width >
      object2.hitbox.position.x &&
    object1.hitbox.position.y <
      object2.hitbox.position.y + object2.hitbox.height &&
    object1.hitbox.height + object1.hitbox.position.y >
      object2.hitbox.position.y
  ) {
    return true;
  } else {
    return false;
  }
}

export default CollideCollision;
