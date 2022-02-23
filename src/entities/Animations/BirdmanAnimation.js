export default anims => {
  anims.create({
    key: 'birdman-idle',
    frames: anims.generateFrameNumbers('birdman', {start: 0, end: 12}),
    frameRate: 8,
    repeat: -1
  })

  anims.create({
    key: 'birdman-hurt',
    frames: anims.generateFrameNumbers('birdman', {start: 25, end: 26}),
    frameRate: 10,
    repeat: 0
  })
}

// export default anims => {
 
// }

// Attack 1 frames: 1 - 8
// Attack 2 frames: 9 - 16
// Death frames: 17 - 26
// Idle frames: 27 - 35
// run frames: 36 - 42