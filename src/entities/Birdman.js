import Enemy from './Enemy';
import initializeAnimations from './Animations/BirdmanAnimation.js';

class Birdman extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "birdman");

    initializeAnimations(scene.anims);
  }

  init() {
    super.init();
    this.setSize(20, 45);
    this.setOffset(7, 20);
  }

  update(time, delta) {
    super.update(time,delta);
    // this.play('wizard-idle', true);
    this.play('birdman-idle', true);

  }
}

export default Birdman;
