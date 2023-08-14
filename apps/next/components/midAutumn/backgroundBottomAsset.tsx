import { Bodies } from 'matter-js'

const backgroundBottomAsset = (width: number, height: number) => {
  const asset = []

  const grassLeft = Bodies.rectangle(width * 0.18, height * 0.935, 1, 1, {
    label: 'grassLeft',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/grass-left.png'),
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const rabbitLeft = Bodies.rectangle(width * 0.1, height * 0.94, 1, 1, {
    label: 'rabbitLeft',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/rabbit-left.png'),
        xScale: 0.5,
        yScale: 0.5,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const grassRight = Bodies.rectangle(width * 0.8, height * 0.94, 1, 1, {
    label: 'grassRight',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/grass-right.png'),
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const rabbitRight = Bodies.rectangle(width * 0.89, height * 0.945, 1, 1, {
    label: 'rabbitRight',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/rabbit-right.png'),
        xScale: 0.45,
        yScale: 0.45,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  asset.push(grassLeft, rabbitLeft, grassRight, rabbitRight)

  return asset
}

export default backgroundBottomAsset
