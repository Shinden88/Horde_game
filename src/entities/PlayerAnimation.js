export default anims => {

    anims.create({
        key: 'idle',
        frames: anims.generateFrameNumbers('player', {start: 8, end: 13 }),
        frameRate: 6,
        repeat: -1
      })

    anims.create({
        key: 'run',
        frames: anims.generateFrameNumbers('player', {start: 20, end: 24 }),
        frameRate: 7,
        repeat: -1
      })

      anims.create({
        key: 'jump',
        frames: anims.generateFrameNumbers('player', {start: 15, end: 18 }),
        frameRate: 2,
        repeat: 1
      })
}