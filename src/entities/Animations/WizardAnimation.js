export default (anims) => {
  anims.create({
    key: "wizard-idle",
    frames: anims.generateFrameNumbers("wizard", { start: 27, end: 35 }),
    frameRate: 6,
    repeat: -1,
  });
  anims.create({
    key: "wizard-run",
    frames: anims.generateFrameNumbers("wizard", { start: 36, end: 42 }),
    frameRate: 7,
    repeat: -1,
  });

  // anims.create({
  //   key: "wizard-attack1",
  //   frames: anims.generateFrameNumbers("wizard", { start: 1, end: 8 }),
  //   frameRate: 7,
  //   repeat: -1,
  // });
  anims.create({
    key: "wizard-attack2",
    frames: anims.generateFrameNumbers("wizard", { start: 9, end: 16 }),
    frameRate: 7,
    repeat: -1,
  });

  anims.create({
    key: "wizard-die",
    frames: anims.generateFrameNumbers("wizard", { start: 17, end: 26 }),
    frameRate: 2,
    repeat: -1,
  });
};

// Attack 1 frames: 1 - 8
// Attack 2 frames: 9 - 16
// Death frames: 17 - 26
// Idle frames: 27 - 35
// run frames: 36 - 42