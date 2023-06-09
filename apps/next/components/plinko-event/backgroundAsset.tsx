import { Bodies } from 'matter-js'

const backgroundAsset = (width: number, height: number) => {
  const asset = []

  const bottomLeftCloud = Bodies.rectangle(width * 0.05, height * 0.7, 1, 1, {
    label: 'bottomLeftCloud',
    isStatic: true,
    render: {
      sprite: {
        texture: require('../../../../packages/app/assets/images/events/plinko/cloud1-1.png'),
        xScale: 0.75,
        yScale: 0.75,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const topLeftCloud = Bodies.rectangle(width * 0.25, height * 0.2, 1, 1, {
    label: 'topLeftCloud',
    isStatic: true,
    render: {
      sprite: {
        texture: require('../../../../packages/app/assets/images/events/plinko/cloud1.png'),
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const topRightCloud = Bodies.rectangle(width, height * 0.2, 1, 1, {
    label: 'topRightCloud',
    isStatic: true,
    render: {
      sprite: {
        texture: require('../../../../packages/app/assets/images/events/plinko/cloud2-1.png'),
        xScale: 0.75,
        yScale: 0.75,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const bottomRightCloud = Bodies.rectangle(width * 0.93, height * 0.86, 1, 1, {
    label: 'bottomRightCloud',
    isStatic: true,
    render: {
      sprite: {
        texture: require('../../../../packages/app/assets/images/events/plinko/cloud2.png'),
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const habGreen = Bodies.rectangle(width * 0.19, height * 0.76, 1, 1, {
    label: 'habGreen',
    isStatic: true,
    render: {
      sprite: {
        texture: require('../../../../packages/app/assets/images/events/plinko/hab-green.png'),
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const habBlue = Bodies.rectangle(width * 0.79, height * 0.66, 1, 1, {
    label: 'habBlue',
    isStatic: true,
    render: {
      sprite: {
        texture: require('../../../../packages/app/assets/images/events/plinko/hab-blue.png'),
        xScale: 1.15,
        yScale: 1.15,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  asset.push(
    bottomLeftCloud,
    topLeftCloud,
    topRightCloud,
    bottomRightCloud,
    habGreen,
    habBlue
  )

  return asset
}

export default backgroundAsset
