import Phaser from "phaser";
import Player from "../entities/Player";
import Enemies from "../groups/Enemies";
import initAnims from "../anims";
import Collectables from "../groups/Collectables";
import Hud from "../hud";
// import Hud from "../hud/HealthBar";
// import EventEmitter from "../events/Emitter";

class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create() {
    this.score = 0;
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


    new Hud(this, 0, 0);

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

    // this.createGameEvents();
    this.createEndOfLevel(playerZones.end, player);
    this.setupFollowupCameraOn(player);
    
  }

  playBgMusic() {
    if (this.sound.get("theme")) {
      return;
    }

    this.sound.add("theme", { loop: true, volume: 0.01 }).play();
  }

 

  //renders the map of the level
  createMap() {
    const map = this.make.tilemap({ key: "map" });

    map.addTilesetImage("main_lev_build_1", "tilesOne");
    return map;
  }

  //renders the map layers
  createLayers(map) {
    const setTiles = map.getTileset("main_lev_build_1");
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
// createCollectables(collectableLayer) {
//   const collectables = this.physics.add.staticGroup().setDepth(-1);

//   collectableLayer.objects.forEach(collectableO => {
//     collectables.add(new Collectable(this, collectableO.x, collectableO.y, 'potionPurple'));
//   })

//   return collectables;
// }

  // createCollectables(collectableLayer) {
  //   const collectables = this.physics.add.staticGroup().setDepth(-1);

  

  //   // collectableLayer.objects.forEach(collectableO => {
  //   //   collectables.add(new Collectable(this, collectableO.x, collectableO.y, 'potionPurple'));
  //   // })

  //   return collectables;
  // }
  // createGameEvents() {
  //   EventEmitter.on("PLAYER_LOSE", () => {
  //     alert("Player lost!");
  //   });
  // }

  // functiondistanceSq(object, target) {
  //   var xDif = object.x - target.x;
  //   var yDif = object.y - target.y;

  //   return xDif * xDif + yDif * yDif;
  // }
  // range() {

  //   this.player.x = x1;
  //    this.player.y = y1
  //   for (let enemy in this.enemies) {
  //     const x2 = enemy.x;
  //     const y2 = enemy.y
  //    const inRange = Between(x1, y1, x2, y2);
  //    if (inRange < 10) {
  //    enemy.takesHit(this.player);
  //   }

  // }
  // }

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

  onWeaponHit(entity, source) {
    entity.takesHit(source);
  }

  onCollect(entity, collectable) {
    this.score += collectable.score;
    // this.collectSound.play();
    console.log(this.score);
    //disableGameObject ==this will deactivate the object, default: false 
    // hideGameObject =>this will hide the game object Default false 
    collectable.disableBody(true, true);
    
  }



  createEnemyColliders(enemies, { colliders }) {
    enemies
      .addCollider(colliders.platformsColliders)
      .addCollider(colliders.player, this.onPlayerCollision)
      .addCollider(colliders.player.projectiles, this.onWeaponHit);
  }

  createPlayerColliders(player, { colliders }) {
    player
      .addCollider(colliders.platformsColliders)
      .addCollider(colliders.projectiles, this.onWeaponHit)
      .addCollider(colliders.traps, () => { console.log('we got hit!') })
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

  createEndOfLevel(end, player) {
    const endOfLevel = this.physics.add
      .sprite(end.x, end.y, "end")
      .setAlpha(0)
      .setSize(5, 30)
      .setOrigin(0.5, 1);

    const endOverlap = this.physics.add.overlap(player, endOfLevel, () => {
      endOverlap.active = false;
      console.log("You win!");
    });
  }
}
export default Play;
