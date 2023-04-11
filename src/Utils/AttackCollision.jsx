
export function AttackCollision({ object1, object2 }) {
  if (
    object1.attackBox.position.x + object1.attackBox.width >=
      object2.hitbox.position.x &&
    object1.attackBox.position.x <=
      object2.hitbox.position.x + object2.hitbox.width &&
    object1.attackBox.position.y + object1.attackBox.height >=
      object2.hitbox.position.y &&
    object1.attackBox.position.y <=
      object2.hitbox.position.y + object2.hitbox.height 
      && object1.isAttacking
  ) {
    object1.isAttacking = false
    console.log("go")
  }
  
}
