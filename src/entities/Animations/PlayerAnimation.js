export default anims => {

    anims.create({
        key: 'idle',
        frames: anims.generateFrameNumbers('player', {start: 8, end: 9  }),
        frameRate: 1,
        repeat: -1
      })

    
      anims.create({
        key: 'sword-default-swing',
        frames: anims.generateFrameNumbers('sword-default', {start: 1, end: 7}),
        frameRate: 20,
        repeat: 0
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

