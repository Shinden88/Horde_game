import Phaser from "phaser";

class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/cyrstal_world_map.tmj');
    this.load.image('tilesOne', 'assets/main_lev_build_1.png');
    this.load.image('tilesTwo', 'assets/main_lev_build_2.png');
    // this.load.image('player', 'assets/player/movements/idle100.png');
    this.load.spritesheet('player', 'assets/player/moves_1.png', {frameWidth: 60, frameHeight: 37
    })
    //fix this find out actual dimensions/spacing
    this.load.spritesheet('wizard-idle', 'assets/enemy/Idle.png', {frameWidth: 250, frameHeight: 250
    })
    this.load.spritesheet('wizard-run', 'assets/enemy/Run.png', {frameWidth: 250, frameHeight: 250
    })
    this.load.spritesheet('wizard-attack1', 'assets/enemy/Attack1.png', {frameWidth: 250, frameHeight: 250
    })
    this.load.spritesheet('wizard-attack2', 'assets/enemy/Attack2.png', {frameWidth: 250, frameHeight: 250
    })
    this.load.spritesheet('wizard-die', 'assets/enemy/Death.png', {frameWidth: 250, frameHeight: 250
    })
    
  }
  create() {

    
    this.scene.start('PlayScene');
  }


  
  
}





export default Preload;
