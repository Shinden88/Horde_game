import Phaser from "phaser";

class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/level_example.json');
    this.load.image('tiles-1', 'assets/Tile_Set/tilesspritesheet.png');
    this.load.image('tiles-2', 'assets/Objects/objectsspritesheet.png');
  }

  create() {

    
    this.scene.start('PlayScene');
  }


  
  
}





export default Preload;
