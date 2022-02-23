import Phaser from "phaser";
import Player from "../entities/Player";
import Enemies from "../groups/Enemies";

class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create() {
    this.playBgMusic();


    const map = this.createMap();

    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);

    const player = this.createPlayer(playerZones.start);
    const enemies = this.createEnemies(layers.enemySpawns, layers.platformsColliders);
    // this.player = player;
    // this.enemies = enemies;

    
    this.createEnemyColliders(enemies, {
      colliders: {
      platformsColliders: layers.platformsColliders, player
      }
    });

    this.createPlayerColliders(player, {
      colliders: {
        platformsColliders: layers.platformsColliders, enemies
      }
    });

    this.createEndOfLevel(playerZones.end, player);

    this.setupFollowupCameraOn(player);

    
  }

  playBgMusic() {
    if (this.sound.get('theme')) { return; }

    this.sound.add('theme', {loop: true, volume: 0.03}).play();
    }

  finishDrawing(pointer, layer) {
    this.line.x2 = pointer.worldX;
    this.line.y2 = pointer.worldY;

    this.graphics.clear();
    this.graphics.strokeLineShape(this.line);

    this.tileHits = layer.getTilesWithinShape(this.line);

    if (this.tileHits.length > 0) {
      this.tileHits.forEach(tile => {
        tile.index !== -1 && tile.setCollision(true)
      })
    }

    this.drawDebug(layer);

    this.plotting = false;
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
    const location = map.createLayer("environment", setTiles);
    const platforms = map.createLayer("platforms", setTiles);
    const playerZones = map.getObjectLayer("player_zones");
    const enemySpawns = map.getObjectLayer('enemy_spawns');

    

    //Phaser executes that any tiles larger than 0 will collide
    platformsColliders.setCollisionByProperty({ collides: true });


    return { location, platforms, platformsColliders, playerZones, enemySpawns };

  }
  
  range() {
    const x1 = this.player.x;
    const y1  = this.player.y;
    for (let enemy in this.enemies) {
      const x2 = enemy.x;
      const y2 = enemy.y
     const inRange = Between(x1, y1, x2, y2);
     if (inRange < 10) {
     enemy.takesHit(this.player);
    } 

  }
  }

  createPlayer(start) {


    return new Player(this, start.x, start.y, this.range);
  }

  createEnemies(creationLayer, platformsColliders) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();

    creationLayer.objects.forEach((creationPoint, i) => {
     if (i === 1) { return; }
      const enemy = new enemyTypes[creationPoint.type](this, creationPoint.x, creationPoint.y);
      enemy.setPlatformColliders(platformsColliders)
      enemies.add(enemy);
    })

    return enemies;
  }

  onPlayerCollision(enemy, player) {

    player.takesHit(enemy);
  }

  enemyCollision(player, enemy ) {

    enemy.takesHit(player);
  }


  createEnemyColliders(enemies, { colliders }) {
    enemies
      .addCollider(colliders.platformsColliders)
      .addCollider(colliders.player, this.onPlayerCollision);
  }

  createPlayerColliders(player, { colliders }) {
    player
      .addCollider(colliders.platformsColliders)
      .addCollider(colliders.enemies, this.enemyCollision);
  }



  
  setupFollowupCameraOn(player) {
    const { height, width, mapOffset, zoomFactor } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor);
    this.cameras.main.startFollow(player);
  }

  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects;
    return {
      start: playerZones.find(zone => zone.name === "startZone"),
      end: playerZones.find(zone => zone.name === "endZone"),
    };
  }


  createEndOfLevel(end, player) {
    const endOfLevel = this.physics.add.sprite(end.x, end.y, "end")
      .setAlpha(0)
      .setSize(5, 30)
      .setOrigin(0.5, 1);

    const endOverlap = this.physics.add.overlap(player, endOfLevel, () => {
      endOverlap.active = false;
      console.log("You win!");
    })
  }



  
 }
export default Play;
