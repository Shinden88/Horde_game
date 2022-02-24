export default anims => {
  anims.create({
    key: 'hit-effect',
    frames:  anims.generateFrameNumbers('hit-sheet', {start: 0, end: 4}),
    frrameRate: 10,
    repeat: 0
  })
  anims.create({
    key: 'potion',
    frames:  
    [ 
      { key: 'potionPurple1'},
      { key: 'potionPurple2'}
  ],
    frameRate: 2,
    repeat: -1
  })
}

// anims.generateFrameNumbers('potionSprite', {start: 0, end: 1}),