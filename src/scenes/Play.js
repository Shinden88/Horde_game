import Phaser from "phaser";
import Player from "../entities/Player";
import Enemies from "../groups/Enemies";
import initAnims from "../anims";
import Collectables from "../groups/Collectables";
import Hud from "../hud";
import EventEmitter from "../events/Emitter";

class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create({gameStatus}) {
    this.score = 0;
    this.hud = new Hud(this, 0,0);


    const map = this.createMap();

    initAnims(this.anims);
    

    //background Music
    this.playBgMusic();
    // this.collectSound = this.sound.add('coin-pickup', {volume: 0.2});

    

    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);

    const player = this.createPlayer(playerZones.start);
    const enemies = this.createEnemies(
      layers.enemySpawns,
      layers.platformsColliders
    );

    //adding the collectable items to the page
    const collectables = this.createCollectables(layers.collectables);

    
    this.createBG(map);

    //the stuff the enemy collides with
    this.createEnemyColliders(enemies, {
      colliders: {
        platformsColliders: layers.platformsColliders,
        player,
      },
    });

    //stuff player colides with
    this.createPlayerColliders(player, {
      colliders: {
        platformsColliders: layers.platformsColliders,
        enemies, 
        collectables,
         traps: layers.traps
      }
    });

    this.createBackButton();
    this.createEndOfLevel(playerZones.end, player);
    this.setupFollowupCameraOn(player);

    if (gameStatus === 'PLAYER_LOSE') {return; }
    this.createGameEvents();
    
  }

  playBgMusic() {
    if (this.sound.get("theme")) {
      return;
    }

    this.sound.add("theme", { loop: true, volume: 0.01 }).play();
  }

 

  //renders the map of the level
  createMap() {
    const map = this.make.tilemap({key: `level_${this.getCurrentLevel()}`});

    map.addTilesetImage("main_lev_build_1", "tilesOne");
    map.addTilesetImage('blue_L1', 'blue_L1');
    return map;
  }

  //renders the map layers
  createLayers(map) {
    const setTiles = map.getTileset("main_lev_build_1");
    const tilesetBg = map.getTileset('blue_L1');

    map.createLayer('distance', tilesetBg).setDepth(-12);
    const platformsColliders = map.createLayer("platform_collider", setTiles);
    const location = map.createLayer("environment", setTiles).setDepth(-2);
    const platforms = map.createLayer("platforms", setTiles);
    const playerZones = map.getObjectLayer("player_zones");
    const enemySpawns = map.getObjectLayer("enemy_spawns");

    const collectables = map.getObjectLayer("collectables");
    const traps = map.createLayer('traps', setTiles)

    //Phaser executes that any tiles larger than 0 will collide
    platformsColliders.setCollisionByProperty({ collides: true });
    traps.setCollisionByExclusion(-1)

    return {
      location,
      platforms,
      platformsColliders,
      playerZones,
      enemySpawns,
      collectables,
      traps
    };
  }


// createHud(){
//   new Hud(this, 0, 0);
// }

createCollectables(collectableLayer) {
  const collectables = new Collectables(this).setDepth(-1);
  // const potionImage = this.add.image('potionPurple');

  collectables.addFromLayer(collectableLayer);
  
  // collectables.playAnimation('potionPurple');

  return collectables;
}

createBG(map) {
  const bgObject = map.getObjectLayer('distance_bg').objects[0];
  // this.add.tileSprite(bgObject.x, bgObject.y, this.config.width, bgObject.height, 'bg-cave1')
  this.spikesImage = this.add.tileSprite(bgObject.x, bgObject.y, this.config.width, bgObject.height, 'bg-cave1')
    .setOrigin(0, 1)
    .setDepth(-10)
    .setScrollFactor(0, 1)

    // this.add.tileSprite(0, 0, this.config.width, 250, 'sky-play')
    this.skyImage = this.add.tileSprite(0, 0, this.config.width, 180, 'sky-play')
      .setOrigin(0, 0)
      .setDepth(-11)
      .setScale(1.1)
      .setScrollFactor(0, 1)
}

createBackButton() {
  const btn = this.add.image(this.config.rightBottomCorner.x, this.config.rightBottomCorner.y, 'back')
    .setOrigin(1)
    .setScrollFactor(0)
    .setScale(2)
    .setInteractive()

  btn.on('pointerup', () => {
    this.scene.start('MenuScene');
  })

}
 
  createGameEvents() {
    EventEmitter.on("PLAYER_LOSE", () => {
      console.log('you lost');
      this.scene.restart({gameStatus: 'PLAYER_LOSE'});
    });
  }

  
  createPlayer(start) {
    return new Player(this, start.x, start.y, this.range);
  }

  createEnemies(creationLayer, platformsColliders) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();

    creationLayer.objects.forEach((creationPoint, i) => {
      if (i === 1) {
        return;
      }
      const enemy = new enemyTypes[creationPoint.type](
        this,
        creationPoint.x,
        creationPoint.y
      );
      enemy.setPlatformColliders(platformsColliders);
      enemies.add(enemy);
    });

    return enemies;
  }

  onPlayerCollision(enemy, player) {
    player.takesHit(enemy);
  }

  enemyCollision(player, enemy) {
    enemy.takesHit(player);
  }

  onHit(entity, source) {
    entity.takesHit(source);
  }

  onCollect(entity, collectable) {
    this.score += collectable.score;
    // console.log(this.score);
    this.hud.updateScoreboard(this.score);

    //disableGameObject ==this will deactivate the object, default: false 
    // hideGameObject =>this will hide the game object Default false 
    collectable.disableBody(true, true);
    
  }



  createEnemyColliders(enemies, { colliders }) {
    enemies
      .addCollider(colliders.platformsColliders)
      .addCollider(colliders.player, this.onPlayerCollision)
      .addCollider(colliders.player.projectiles, this.onHit);
  }

  createPlayerColliders(player, { colliders }) {
    player
      .addCollider(colliders.platformsColliders)
      .addCollider(colliders.projectiles, this.onHit)
      .addCollider(colliders.traps, this.onHit)
      .addOverlap(colliders.collectables, this.onCollect, this)
     // this.enemyCollision
  }

  setupFollowupCameraOn(player) {
    const { height, width, mapOffset, zoomFactor } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
    this.cameras.main
      .setBounds(0, 0, width + mapOffset, height)
      .setZoom(zoomFactor);
    this.cameras.main.startFollow(player);
  }

  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects;
    return {
      start: playerZones.find((zone) => zone.name === "startZone"),
      end: playerZones.find((zone) => zone.name === "endZone"),
    };
  }

  getCurrentLevel() {
    return this.registry.get('level') || 1;
 }

  createEndOfLevel(end, player) {
    const endOfLevel = this.physics.add
      .sprite(end.x, end.y, "end")
      .setAlpha(0)
      .setSize(5, 30)
      .setOrigin(0.5, 1);

    const endOverlap = this.physics.add.overlap(player, endOfLevel, () => {
      endOverlap.active = false;
      this.registry.inc('level', 1);
      this.scene.restart({gameStatus: 'LEVEL_COMPLETED'})
      
    });
  }
  update() {
    this.spikesImage.tilePositionX = this.cameras.main.scrollX * 0.3;
    this.skyImage.tilePositionX = this.cameras.main.scrollX * 0.1;
  }
}
export default Play;
