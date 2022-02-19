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
     const playerZones = this.getPlayerZones(setLayer.playerZones);
     
     const player = this.createPlayer(playerZones);
      // this.playerSpeed = 200;
    //  this.cursors = this.input.keyboard.createCursorKeys();
    
    this.createPlayerColliders(player, {
      colliders: {
          platformsColliders: setLayer.platformsColliders
    }});
    this.createEndOfLevel(playerZones.end);
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

    const playerZones = map.getObjectLayer('player_zones');
    

    

    //Phaser executes that any tiles larger than 0 will collide
    platformsColliders.setCollisionByProperty({collides: true})

    return { location, platforms, platformsColliders, playerZones }

  }
  
  createPlayer({start}) {
    // const player = this.physics.add.sprite(100, 250, 'player');
    
    return new Player(this, start.x, start.y);
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

  getPlayerZones(playerZonesLayer) {
      const playerZones = playerZonesLayer.objects;
      return {
        start: playerZones.find(zone => zone.name === 'startZone'),
        end: playerZones.find(zone => zone.name === 'endZone')
      }
  }
createEndOfLevel(end) {
  this.physics.add.sprite(end.x, end.y, 'end')
  .setAlpha(0)
  .setSize(5, 200)
  .setOrigin(0.5, 1)
}
      
}
export default Play;