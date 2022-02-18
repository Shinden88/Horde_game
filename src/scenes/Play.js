import Phaser from "phaser";

class Play extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
   const map = this.createMap();

     const setLayer =  this.createLayers(map);

     this.player = this.createPlayer();

     this.physics.add.collider(this.player, setLayer.stage )


    //
    this.playerSpeed = 200;
    this.cursors = this.input.keyboard.createCursorKeys();
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
    const stage = map.createLayer('platforms', setTiles)

    //Phaser executes that any tiles larger than 0 will collide
    stage.setCollisionByExclusion(-1, true)

    return { location, stage }

  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 250, 'player');
    player.body.setGravityY(500);
    player.setCollideWorldBounds(true);
    return player;
  }
  update() {
    const { left, right } = this.cursors;

    if (left.isDown) {
      // negative is moving left
      this.player.setVelocity(-this.playerSpeed);

    } else if (right.isDown) {
      //positive is moving right
      this.player.setVelocity(this.playerSpeed);

    } else {
      //0 is not moving
      this.player.setVelocity(0);

    }
  }
}
export default Play;
