import Enemy from './Enemy';
import initializeAnimations from './Animations/WizardAnimations';

class Wizard extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "wizard");

    initializeAnimations(scene.anims);
  }

  init() {
    super.init();
    this.setSize(80, 100);
    this.setDisplaySize(160, 160);
   
  }

  update(time, delta) {
    super.update(time,delta);
    this.play('wizard-idle', true);
    

  }
}

export default Wizard;
