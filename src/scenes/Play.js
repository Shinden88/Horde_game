import Phaser from "phaser";

class Play extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const map = this.make.tilemap({key: 'map'});
    const tileset1 = map.addTilesetImage('tilesspritesheet', 'tiles-1');
    const tileset2 = map.addTilesetImage('objectsspritesheet', 'tiles-2');
    map.createStaticLayer('enviroment', tileset2);
    map.createStaticLayer('platform', [tileset1, tileset2]);

    
    
  }
  
}
export default Play;
