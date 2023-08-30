import { Bodies } from 'matter-js'

const backgroundAsset = (width: number, height: number) => {
  const asset = []

  const topRightCloud = Bodies.rectangle(width * 0.75, height * 0.055, 1, 1, {
    label: 'topRightCloud',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/cloud-1.png'),
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const middleLeftCloud = Bodies.rectangle(width * 0.2, height * 0.2, 1, 1, {
    label: 'middleLeftCloud',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/cloud-2.png'),
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const middleRightCloud = Bodies.rectangle(width * 0.8, height * 0.24, 1, 1, {
    label: 'middleRightCloud',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/cloud-2.png'),
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const bottomLeftCloud = Bodies.rectangle(width * 0.2, height * 0.45, 1, 1, {
    label: 'bottomLeftCloud',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/cloud-1.png'),
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  const bottomRightCloud = Bodies.rectangle(width * 0.85, height * 0.55, 1, 1, {
    label: 'bottomRightCloud',
    isStatic: true,
    render: {
      sprite: {
        texture: require('app/assets/images/events/autumn/cloud-1.png'),
        xScale: 1,
        yScale: 1,
      },
    },
    collisionFilter: {
      group: -1, // set a negative group for bodyA
    },
  })

  asset.push(
    topRightCloud,
    middleLeftCloud,
    middleRightCloud,
    bottomLeftCloud,
    bottomRightCloud
  )

  return asset
}

export default backgroundAsset
