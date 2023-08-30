import { Bodies } from 'matter-js'

const COLS = 9
const ROWS = 7

const GeneratePlinkoAsset = (width: number, height: number) => {
  const spacing = width / COLS
  const asset = []
  const ball = Bodies.circle(width / 2, height * 0.3, width * 0.03855, {
    label: 'ball',
    isStatic: true,
    angle: 0,
    mass: 2,
    restitution: 0,
    friction: 0,
    angularVelocity: 0,
    angularSpeed: 0,
    speed: 0,
    frictionAir: 0,
    frictionStatic: 0,
    velocity: { x: 0, y: 2 },
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/mooncake.png'),
        xScale: 0.4,
        yScale: 0.4,
      },
      // fillStyle: 'red',
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
      category: 0x0004, // set a category for bodyA
      mask: 0x0002, // set a mask for bodyA to collide with bodyB
    },
  })

  //create moon
  // const moon = Bodies.rectangle(width / 2, (height * 0.46) / 2, 50, 100, {
  //   label: 'balloon',
  //   friction: 0,
  //   isStatic: true,
  //   render: {
  //     sprite: {
  //       texture: require('app/assets/images/events/autumn/moon.png'),
  //       xScale: 1,
  //       yScale: 1,
  //     },
  //   },
  //   collisionFilter: {
  //     group: -1, // set a negative group for bodyA
  //     category: 0x0002, // set a category for bodyA
  //     mask: 0x0004, // set a mask for bodyA to collide with bodyB
  //   },
  // })

  // create StartButton
  const startButton = Bodies.rectangle(width / 2, (height * 0.5) / 2, 50, 50, {
    isStatic: true,
    angle: 0.0,
    label: 'startButton',
    friction: 0,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/moon-text.png'),
        xScale: 0.8,
        yScale: 0.8,
      },
    },
    // collisionFilter: {
    //   group: -1, // set a negative group for bodyA
    //   category: 0x0002, // set a category for bodyA
    //   mask: 0x0004, // set a mask for bodyA to collide with bodyB
    // },
  })

  // create ground
  const ground = Bodies.rectangle(400, height - 80, 810, 40, {
    label: 'ground',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/ground.png'),
        xScale: 1.15,
        yScale: 1,
      },
    },
    collisionFilter: {
      // group: -1, // set a negative group for bodyA
      category: 0x0002, // set a category for bodyA
      mask: 0x0004, // set a mask for bodyA to collide with bodyB
    },
  })

  const leftBorder = Bodies.rectangle(0, height / 2, 10, height, {
    label: 'ground',
    isStatic: true,
    render: {
      fillStyle: 'transparent',
    },
    collisionFilter: {
      // group: -1, // set a negative group for bodyA
      category: 0x0002, // set a category for bodyA
      mask: 0x0004, // set a mask for bodyA to collide with bodyB
    },
  })
  const rightBorder = Bodies.rectangle(width, height / 2, 10, height, {
    label: 'ground',
    isStatic: true,
    render: {
      fillStyle: 'transparent',
    },
    collisionFilter: {
      // group: -1, // set a negative group for bodyA
      category: 0x0002, // set a category for bodyA
      mask: 0x0004, // set a mask for bodyA to collide with bodyB
    },
  })

  //Create Platform
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i <= COLS; i++) {
      let x = i * spacing
      if (j % 2 == 0) {
        x += spacing / 2
      } else {
        if (i === 0) {
          x += spacing
        } else if (i === COLS) {
          break
        }
      }

      const y = height * 0.33 + spacing + (j * spacing * 1.5) / 2
      const peg = Bodies.circle(x, y, width * 0.010425, {
        isStatic: true,
        restitution: 1,
        friction: 0,
        render: {
          sprite: {
            texture: require('app/assets/images/plinko/dot.png'),
            xScale: 0.75,
            yScale: 0.75,
          },
          // fillStyle: 'green',
        },
        collisionFilter: {
          // group: -1, // set a negative group for bodyA
          category: 0x0002, // set a category for bodyA
          mask: 0x0004, // set a mask for bodyA to collide with bodyB
        },
      })
      asset.push(peg)
    }
  }
  asset.push(
    ball,
    ground,
    leftBorder,
    rightBorder,
    //moon,
    startButton
  )

  //Create Left and Right Pillar for the Bucket
  for (let i = 0; i <= COLS; i++) {
    let x = i * spacing
    const boxBorder = Bodies.rectangle(x, height - 150, 25, 50, {
      label: 'ground',
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
      collisionFilter: {
        // group: -1, // set a negative group for bodyA
        category: 0x0002, // set a category for bodyA
        mask: 0x0004, // set a mask for bodyA to collide with bodyB
      },
    })
    asset.push(boxBorder)
  }

  //Basket Shadow
  // for (let i = 1; i <= COLS; i++) {
  //   let x = i * spacing
  //   const basketShadow = Bodies.rectangle(
  //     x - spacing / 2,
  //     height - 50,
  //     50,
  //     50,
  //     {
  //       label: 'ground',
  //       isSensor: false,
  //       isStatic: true,
  //       collisionFilter: {
  //         group: -1, // set a negative group for bodyA
  //         category: 0x0002, // set a category for bodyA
  //         mask: 0x0004, // set a mask for bodyA to collide with bodyB
  //       },
  //       render: {
  //         sprite: {
  //           texture: require('../../../../packages/app/assets/images/events/plinko/shadow.png'),
  //           xScale: 1,
  //           yScale: 1,
  //         },
  //       },
  //     }
  //   )
  //   asset.push(basketShadow)
  // }

  // Basket
  for (let i = 1; i <= COLS; i++) {
    let x = i * spacing
    const basket = Bodies.rectangle(x - spacing / 2, height - 150, 50, 50, {
      label: 'ground',
      isSensor: false,
      isStatic: true,
      collisionFilter: {
        group: -1, // set a negative group for bodyA
        category: 0x0002, // set a category for bodyA
        mask: 0x0004, // set a mask for bodyA to collide with bodyB
      },
      render: {
        sprite: {
          texture: require('app/assets/images/events/autumn/basket.png'),
          xScale: 1,
          yScale: 1,
        },
      },
    })
    asset.push(basket)
  }

  return asset
}

export default GeneratePlinkoAsset
