export default anims => {

    anims.create({
        key: 'idle',
        frames: anims.generateFrameNumbers('player', {start: 8, end: 9  }),
        frameRate: 1,
        repeat: -1
      })

      anims.create({
        key: 'attack',
        frames: anims.generateFrameNumbers('player', {start: 1, end: 7 }),
        frameRate: 6,
        repeat: -1
      })

    anims.create({
        key: 'run',
        frames: anims.generateFrameNumbers('player', {start: 8, end: 17 }),
        frameRate: 10,
        repeat: -1
      })

      anims.create({
        key: 'jump',
        frames: anims.generateFrameNumbers('player', {start: 22, end: 24 }),
        frameRate: 2,
        repeat: 1
      })

      anims.create({
        key: 'dead',
        frames: anims.generateFrameNumbers('player', {start: 17, end: 21 }),
        frameRate: 2,
        repeat: 1
      })
}

