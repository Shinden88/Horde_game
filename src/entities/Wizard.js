import Phaser from "phaser";
import collidable from "../mixins/collidable";

class Wizard extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "wizard");

    scene.add.existing(this);
    scene.physics.add.exisitng(this);

    Object.assign(this, collidable);

    this.init();
  }

  init() {
    this.gravity = 500;
    this.speed = 150;

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
  }
}

export default Wizard;
