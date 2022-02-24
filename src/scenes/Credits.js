import BaseScene from './BaseScene';

class CreditsScene extends BaseScene {

  constructor(config) {
    super('CreditsScene', {...config, canGoBack: true});

  }

  create() {
    this.add.image(0, 0, 'credits-bg')
      .setOrigin(0)
      .setScale(2.7);
  }
}

export default CreditsScene;
