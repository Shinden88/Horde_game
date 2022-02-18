import Phaser from "phaser";

class Play extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
   const map = this.createMap();

      this.createLayers(map);

   
    
  }
  //renders the map of the level
  createMap() {
    const map = this.make.tilemap({key: 'map'});
    map.addTilesetImage('main_lev_build_1', 'tilesOne')
    return map;
  }
  //renders the map layers
  createLayers(map) {
    const setTiles = map.getTileset('main_lev_build_1');
    map.createLayer('environment', setTiles)
    map.createLayer('platforms', setTiles)

  }
}
export default Play;
