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
    // this.load.spritesheet('player', 'assets/player/moves_1.png', {frameWidth: 60, frameHeight: 37
    // })
//if time will change to this player
    this.load.spritesheet('player', 'assets/Character_Sprite_Sheet.png', {frameWidth: 83, frameHeight: 64
    })
    //fix this find out actual dimensions/spacing
    // this.load.spritesheet('wizard', 'assets/enemy/wizard_moves1.png', {frameWidth: 250, frameHeight: 250
    // })

    this.load.spritesheet('birdman', 'assets/enemy/enemy_sheet.png', {frameWidth: 32, frameHeight: 64, spacing: 32})
    this.load.spritesheet('player', './assets/Character_Sprite_Sheet.png', {frameWidth: 52, frameHeight: 32, spacing: 32})
    
    
  

    this.load.audio('theme', "assets/music/TheBard'sTale.wav");

    
  }

  create() {

    
    this.scene.start('PlayScene');
  }


  
  
}





export default Preload;
