export default (anims) => {
  anims.create({
    key: "wizard-idle",
    frames: anims.generateFrameNumbers("wizard", { start: 8, end: 13 }),
    frameRate: 6,
    repeat: -1,
  });
  anims.create({
    key: "wizard-run",
    frames: anims.generateFrameNumbers("wizard", { start: 20, end: 23 }),
    frameRate: 7,
    repeat: -1,
  });

  anims.create({
    key: "wizard-attack1",
    frames: anims.generateFrameNumbers("wizard", { start: 20, end: 23 }),
    frameRate: 7,
    repeat: -1,
  });
  anims.create({
    key: "wizard-attack2",
    frames: anims.generateFrameNumbers("wizard", { start: 20, end: 23 }),
    frameRate: 7,
    repeat: -1,
  });

  anims.create({
    key: "wizard-die",
    frames: anims.generateFrameNumbers("wizard", { start: 15, end: 18 }),
    frameRate: 2,
    repeat: 1,
  });
};
