import Phaser from "phaser";

class Play extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
   const map = this.createMap();

     const setLayer =  this.createLayers(map);

     const player = this.createPlayer();

     this.physics.add.collider(player,setLayer.platformsColliders )


    
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
    const location = map.createLayer('environment', setTiles)
    const platforms = map.createLayer('platforms', setTiles)

    const platformsColliders = map.createLayer('platform_collider', setTiles)

    //Phaser executes that any tiles larger than 0 will collide
    platformsColliders.setCollisionByExclusion(-1, true)

    return { location, platforms, platformsColliders }

  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 250, 'player');
    player.body.setGravityY(500);
    player.setCollideWorldBounds(true);
    return player;
  }
}
export default Play;
