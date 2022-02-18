import Phaser from "phaser";

class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/cyrstal_world_map.tmj')
    this.load.image('tilesOne', 'assets/main_lev_build_1.png')
    this.load.image('tilesTwo', 'assets/main_lev_build_2.png')
  }
  create() {

    
    this.scene.start('PlayScene');
  }


  
  
}





export default Preload;
