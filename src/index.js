import Phaser from "phaser";

import PlayScene from "./scenes/Play";
import PreloadScene from "./scenes/Preload";

const MAP_WIDTH = 1600;

const WIDTH = document.body.offsetWidth;
const HEIGHT = 600;
//healthbar
const ZOOM_FACTOR = 1.5;
//healthbar

const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: 1.5,
  debug: false
};


const Scenes = [PreloadScene, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
 ...SHARED_CONFIG,
 pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
     debug: SHARED_CONFIG.debug,
     // gravity: { y: 200 },
    },
  },
  scene: initScenes()
};

//healthbar
// zoomFactor: ZOOM_FACTOR,
//   debug: false,
//   leftTopCorner: {
//     x: (WIDTH - (WIDTH / ZOOM_FACTOR)) / 2,
//     y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2
//   },
//   rightTopCorner: {
//     x: ((WIDTH / ZOOM_FACTOR) + ((WIDTH - (WIDTH / ZOOM_FACTOR)) / 2)),
//     y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2
//   }
// }
//healthbar

new Phaser.Game(config);
