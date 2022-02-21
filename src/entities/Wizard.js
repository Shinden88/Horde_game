import Enemy from './Enemy';
import initializeAnimations from './Animations/WizardAnimation';

class Wizard extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "wizard");

    initializeAnimations(scene.anims);
  }

  update(time, delta) {
    super.update(time,delta);
    // this.play('wizard-idle', true);
    this.play('birdman-idle', true);

  }
}

export default Wizard;
