import Phaser from "phaser";

import PlayScene from "./scenes/Play";
import PreloadScene from "./scenes/Preload";


const WIDTH = 1280;
const HEIGHT = 600;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  
};


const Scenes = [PreloadScene, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'yourgamediv',
    mode: Phaser.Scale.RESIZE,
    width: 600,
    height: 800
},
 ...SHARED_CONFIG,
 pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
     // debug: true,
     // gravity: { y: 200 },
    },
  },
  scene: initScenes()
};

new Phaser.Game(config);
