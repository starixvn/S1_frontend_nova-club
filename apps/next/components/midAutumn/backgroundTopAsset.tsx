import { Bodies } from 'matter-js'

const backgroundBottomAsset = (width: number, height: number) => {
  const asset = []

  const lineLeft = Bodies.rectangle(width * 0.3, height * 0.085, 1, 1, {
    label: 'lineLeft',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/line-1.png'),
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const latern1 = Bodies.rectangle(width * 0.1, height * 0.183, 1, 1, {
    label: 'latern1',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/latern-1.png'),
        xScale: 0.5,
        yScale: 0.5,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const latern2 = Bodies.rectangle(width * 0.3, height * 0.155, 1, 1, {
    label: 'latern2',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/latern-2.png'),
        xScale: 0.45,
        yScale: 0.45,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const latern3 = Bodies.rectangle(width * 0.445, height * 0.15, 1, 1, {
    label: 'latern3',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/latern-3.png'),
        xScale: 0.45,
        yScale: 0.45,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const lineRight = Bodies.rectangle(width * 0.7, height * 0.065, 1, 1, {
    label: 'lineRight',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/line-2.png'),
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const latern4 = Bodies.rectangle(width * 0.6, height * 0.107, 1, 1, {
    label: 'latern4',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/latern-4.png'),
        xScale: 0.5,
        yScale: 0.5,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const latern5 = Bodies.rectangle(width * 0.78, height * 0.125, 1, 1, {
    label: 'latern5',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/latern-5.png'),
        xScale: 0.45,
        yScale: 0.45,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const latern6 = Bodies.rectangle(width * 0.95, height * 0.126, 1, 1, {
    label: 'latern6',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/latern-6.png'),
        xScale: 0.45,
        yScale: 0.45,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  asset.push(
    lineLeft,
    latern1,
    latern2,
    latern3,
    lineRight,
    latern4,
    latern5,
    latern6
  )

  return asset
}

export default backgroundBottomAsset
