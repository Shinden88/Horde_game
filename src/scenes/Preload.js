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
    this.load.spritesheet('player', 'assets/player/move_sprite_1.png', {
      frameWidth: 32, framHeight: 38, spacing: 32
    })

    this.load.spritesheet('Wizard', 'assets/enemy/enemy_sheet.png', {
      frameWidth: 32, frameHeight: 64, spacing: 32
    })
    
  }
  
  create() {

    
    this.scene.start('PlayScene');
  }


  
  
}





export default Preload;
