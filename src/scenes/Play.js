import Phaser from "phaser";
import Player from "../entities/Player";

class Play extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;
  }
    
  create() {
   const map = this.createMap();

     const setLayer =  this.createLayers(map);

     const player = this.createPlayer();
      // this.playerSpeed = 200;
    //  this.cursors = this.input.keyboard.createCursorKeys();
    
    this.createPlayerColliders(player, {
      colliders: {
          platformsColliders: setLayer.platformsColliders
    }});

    this.setupFollowupCameraOn(player);


    
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
    
  
    const platformsColliders = map.createLayer('platform_collider', setTiles)
    const location = map.createLayer('environment', setTiles)
    const platforms = map.createLayer('platforms', setTiles)

    

    //Phaser executes that any tiles larger than 0 will collide
    platformsColliders.setCollisionByProperty({collides: true})

    return { location, platforms, platformsColliders }

  }
  
  createPlayer() {
    // const player = this.physics.add.sprite(100, 250, 'player');
    
    return new Player(this, 100, 250);
  }

  createPlayerColliders(player, { colliders }) {
    player
    .addCollider(colliders.platformsColliders);
  }

  setupFollowupCameraOn(player) {
    const { height, width, mapOffset, zoomFactor } = this.config;
    this.physics.world.setBounds(0,0, width + mapOffset, height + 200);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor);
    this.cameras.main.startFollow(player);
  
  }

      
}
export default Play;