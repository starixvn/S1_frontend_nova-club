import useAlert from 'app/hooks/useAlert'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import Matter, {
  Body,
  Composite,
  Engine,
  Events,
  Render,
  Runner,
} from 'matter-js'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import GeneratePlinkoAsset from '../../components/plinko-event/generatePlinkoAsset'
import generateBackgroundAsset from '../../components/plinko-event/backgroundAsset'
import { View, Text } from 'dripsy'
import PlinkoTicketCounter from '../../components/plinko-event/PlinkoTicketCounter'
import PlinkoPrizeText from '../../components/plinko-event/PlinkoPrizeText'
import {
  useCheckTicketSpinQuery,
  useTicketSpinMutation,
} from 'services/eventApi'
import PlinkoBackButton from '../../components/plinko-event/PlinkoBackButton'
import PlinkoTncButton from '../../components/plinko-event/PlinkoTncButton'
import { getErrorMessage } from 'agent/utils/validation'
import { AuthActions } from 'app/store/authReducer'
import usePlinkoSound from '../../components/plinko-event/usePlinkoSound'
import { SettingActions } from 'app/store/setting.slice'
import PlinkoMessageCard from '../../components/plinko-event/PlinkoMessageCard'
import { ActivityIndicator, Pressable } from 'react-native'
import { LANGUAGE_CODE } from 'app/utils/constant'

const theme = {
  primary: '#81C0FF',
  secondary: '#FF9300',
} as const

let index = 0

//Path to the Basket
const arrays = [
  [-2, -1, -1, 0, 0, 0, 0, -2, 0, 0],
  [-2, -1, -1, -1, 0, 5, 0.5, -2.5, -1, 0, -2, -2],
  [-2, -1, 0, 0, 0, 0, 3, 3, 3, 3, -2, -2],
  [-2, -1, 4, 2, 1, 0, -3, 0, -1, -4, -3, -2.5, -1, -1],
  [-2, -1, -1, -1, 4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0.5, 0.2, 0.2, 0.2, 0.2, -5, -1, -1, -1, -1, -1, -1],
  [-2, -1, 4, 2, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
  [2, 1, 1, 1, 0, -5, -0.5, 2.5, 1, 0, 2, 2],
  [2, 1, 1, 0, 0, 0, 0, 2, 0, 0],
]

//Ball Final Location
const FinalLocation = [
  {
    start: 0,
    end: 45,
  },
  {
    start: 120,
    end: 130,
  },
  {
    start: 210,
    end: 220,
  },
  {
    start: 290,
    end: 310,
  },
  {
    start: 380,
    end: 390,
  },
  {
    start: 460,
    end: 470,
  },
  {
    start: 550,
    end: 560,
  },
  {
    start: 630,
    end: 650,
  },
  {
    start: 720,
    end: 730,
  },
]

const amplitude = 5 // The maximum distance the hotAirBalloon will move up and down
const period = 2000 // The time it takes for the hotAirBalloon to complete one full up-and-down cycle (in milliseconds)
const xRatio = 768
const yRatio = 1280

const resetPosition = {
  x: xRatio * 1.25,
  y: yRatio,
}
const outOfScreenXPosition = -xRatio * 0.25

const Plinko = () => {
  const { bgm, bounce, win } = usePlinkoSound()
  const dispatch = useAppDispatch()
  const url = new URLSearchParams(window.location.search)
  const username = url.get('username')
  const token = url.get('token')
  const locale = url.get('lang') as LANGUAGE_CODE
  const deviceLocale = useAppSelector((s) => s.setting.locale)
  const testBasketLocation = useRef(-1)
  const scene = useRef<HTMLDivElement>(null)
  const engine = useRef(Engine.create())
  const render = useRef<Matter.Render>()
  const runner = useRef<Matter.Runner>()
  const loginInfo = useAppSelector((s) => s.auth.info)

  const { width, height } = useContainerDimension()
  const pathToBasket = useRef<number[]>([])
  const winAmount = useRef('')
  const prizeCode = useRef(0)
  const [isShowCard, setIsShowCard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isTicketLoading, setIsTicketLoading] = useState(false)
  const [isHidePrize, setIsHidePrize] = useState(true)
  const basketFinalLocation = useRef(0)
  const intervalId = useRef<NodeJS.Timeout | null>(null)
  const { showAlert } = useAlert()
  const [draw] = useTicketSpinMutation()
  const { balance, isFetching } = useCheckTicketSpinQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: (s) => ({ ...s, balance: s.data?.data }),
    skip: token || loginInfo?.token ? false : true,
  })
  const scale = Math.min(width / xRatio, height / yRatio)
  const enlargedWidth = Math.floor(scale * xRatio)
  const enlargedHeight = Math.floor(scale * yRatio)

  async function getResult() {
    try {
      setIsLoading(true)
      setIsTicketLoading(true)
      const { data, success, message } = await draw().unwrap()

      if (success && data && data[0].code !== '') {
        winAmount.current = data[0].formatted_amount
        prizeCode.current = parseInt(data[0].code)
        const basketLocation = mapDataCodeToValue(parseInt(data[0].code))
        // console.log(basketLocation)
        basketFinalLocation.current = basketLocation
        testBasketLocation.current = basketLocation
        handleTargetBasket(arrays[basketLocation])
        handleDropBall()
        setIsTicketLoading(false)
      } else {
        showAlert(data[0].err)
        setIsHidePrize(true)
        setIsLoading(false)
        setIsTicketLoading(false)
      }
    } catch (e) {
      const error = getErrorMessage(e)
      showAlert(error)
      setIsLoading(false)
      setIsHidePrize(true)
      setIsTicketLoading(false)
    }
  }

  const loginWithToken = useCallback(() => {
    if (username && token) {
      dispatch(AuthActions.setAuthInfo({ playerName: username, token }))
    }
    if (loginInfo?.playerName && loginInfo?.token) {
      dispatch(
        AuthActions.setAuthInfo({
          playerName: loginInfo?.playerName,
          token: loginInfo?.token,
        })
      )
    }
  }, [loginInfo])

  const initialBallProperties = {
    position: { x: xRatio / 2, y: yRatio * 0.35 },
    label: 'ball',
    angle: 0,
    mass: 2,
    restitution: 0,
    friction: 0.5,
    angularVelocity: 0,
    angularSpeed: 0,
    speed: 0,
    frictionAir: 0,
    frictionStatic: 0,
    velocity: { x: 0, y: 2 },
  }

  function mapDataCodeToValue(code: number): number {
    switch (code) {
      case 0:
        return [2, 4, 6][Math.floor(Math.random() * 3)]
      case 1:
        return [3, 5][Math.floor(Math.random() * 2)]
      case 2:
        return [1, 7][Math.floor(Math.random() * 2)]
      case 3:
        return 0
      case 4:
        return 8
      default:
        throw new Error(`Please Contact Customer Support`)
    }
  }

  const handleTargetBasket = (newArray: number[]) => {
    pathToBasket.current = newArray
    index = 0
  }

  const handleMessageCard = () => {
    setIsShowCard(false)
    setIsLoading(false)
    setIsHidePrize(true)
    testBasketLocation.current = 0
  }

  const getNextX = (() => {
    return () => {
      const x = pathToBasket.current[index] ?? 0
      index = (index + 1) % pathToBasket.current.length
      return x
    }
  })()

  //Handle The Collision of Ball and Different Asset
  const handleCollision = useCallback(
    (e: Matter.IEventCollision<Engine>) => {
      const ball = Composite.allBodies(engine.current.world).find(
        (body) => body.label === 'ball'
      )
      const ground = Composite.allBodies(engine.current.world).find(
        (body) => body.label === 'ground'
      )

      if (ball && ground) {
        if (
          e.pairs.some(
            (pair) =>
              (pair.bodyA === ball && pair.bodyB === ground) ||
              (pair.bodyA === ground && pair.bodyB === ball)
          )
        ) {
          Body.setVelocity(ball, { x: 0, y: 0 })
          index = 0
          Body.setStatic(ball, true)
          //TODO ADD OVERLAY FOR RESULT
          for (let i = 0; i < 9; i++) {
            if (
              ball.position.x <= FinalLocation[i].end &&
              ball.position.x >= FinalLocation[i].start
            ) {
              basketFinalLocation.current = i
            }
          }
          setIsShowCard(true)
          setIsHidePrize(false)

          testBasketLocation.current = -1
          prizeCode.current = -1
          win.play()
        } else {
          bounce.play()
          const nextX = getNextX()
          Body.setVelocity(ball, { x: nextX, y: 0 })
        }
      }
    },
    [showAlert]
  )

  const initMatter = useCallback(() => {
    if (!scene.current) return

    // create runner
    const runnerInstance = Runner.create({ isFixed: true })
    runner.current = runnerInstance

    const backgroundAssetStack = generateBackgroundAsset(xRatio, yRatio)
    const assetStack = GeneratePlinkoAsset(xRatio, yRatio)

    // add all of the assets to the world
    Composite.add(engine.current.world, [
      ...backgroundAssetStack,
      ...assetStack,
    ])

    engine.current.gravity.y = 3

    //create Canvas
    const renderInstance = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: xRatio,
        height: yRatio,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio || 1,
      },
    })

    handleBalloonMoving()
    handleCloudMoving()

    if (isLoading) {
      setIsLoading(false)
      setIsShowCard(true)
      setIsHidePrize(true)
    }

    render.current = renderInstance

    renderInstance.canvas.style.width = `${enlargedWidth}px`
    renderInstance.canvas.style.height = `${enlargedHeight}px`

    Events.on(engine.current, 'collisionStart', handleCollision)

    // run the renderer
    Render.run(renderInstance)

    // run the engine
    Runner.run(runnerInstance, engine.current)
  }, [enlargedHeight, enlargedWidth, handleCollision])

  const removeMatter = useCallback(() => {
    if (!render.current || !runner.current) {
      return
    }

    Render.stop(render.current)
    Composite.clear(engine.current.world, false)
    Engine.clear(engine.current)
    Runner.stop(runner.current)
    render.current.canvas.remove()
    render.current.canvas = null
    render.current.context = null
    render.current.textures = {}
    Events.off(engine.current, 'collisionStart', handleCollision)
  }, [handleCollision])

  useEffect(() => {
    bgm.play()
    initMatter()

    return () => {
      removeMatter()
      bgm.stop()
    }
  }, [bgm, initMatter, removeMatter])

  useEffect(() => {
    loginWithToken()
    dispatch(SettingActions.setLocale(locale ? locale : deviceLocale))
  }, [])

  const handleDropBall = () => {
    const ball = Composite.allBodies(engine.current.world).find(
      (body) => body.label === 'ball'
    )
    if (ball) {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current)
        intervalId.current = null
      }
      Body.set(ball, initialBallProperties)
      Body.setStatic(ball, false)
    }
  }

  const handleBalloonMoving = () => {
    const hotAirBalloon = Composite.allBodies(engine.current.world).find(
      (body) => body.label === 'balloon'
    )
    const ball = Composite.allBodies(engine.current.world).find(
      (body) => body.label === 'ball'
    )
    const startButton = Composite.allBodies(engine.current.world).find(
      (body) => body.label === 'startButton'
    )
    const habGreen = Composite.allBodies(engine.current.world).find(
      (body) => body.label === 'habGreen'
    )
    const habBlue = Composite.allBodies(engine.current.world).find(
      (body) => body.label === 'habBlue'
    )
    if (hotAirBalloon && ball && startButton && habGreen && habBlue) {
      const centerYBalloon = hotAirBalloon.position.y
      const centerYBall = ball.position.y
      const centerYButton = startButton.position.y
      const centerYhabGreen = habGreen.position.y
      const centerYhabBlue = habBlue.position.y

      setInterval(() => {
        const balloonHover =
          amplitude * Math.sin((2 * Math.PI * Date.now()) / period)
        const yBalloon = centerYBalloon + balloonHover

        const yButton = centerYButton + balloonHover

        const yhabGreen = centerYhabGreen - balloonHover

        const yhabBlue = centerYhabBlue - balloonHover

        Body.setPosition(hotAirBalloon, {
          x: hotAirBalloon.position.x,
          y: yBalloon,
        })
        Body.setPosition(startButton, {
          x: startButton.position.x,
          y: yButton,
        })
        Body.setPosition(habGreen, {
          x: habGreen.position.x,
          y: yhabGreen,
        })
        Body.setPosition(habBlue, {
          x: habBlue.position.x,
          y: yhabBlue,
        })
      }, 1000 / 360) //  frames per second

      //Ball require unique id to remove animation when Ball is Dropping
      const id = setInterval(() => {
        const yBall =
          centerYBall +
          amplitude * Math.sin((2 * Math.PI * Date.now()) / period)

        Body.setPosition(ball, { x: ball.position.x, y: yBall })
      }, 1000 / 120) // frames per second
      intervalId.current = id
    }
  }

  const handleCloudMoving = () => {
    const bottomLeftCloud = Composite.allBodies(engine.current.world).find(
      (body) => body.label === 'bottomLeftCloud'
    )
    const topLeftCloud = Composite.allBodies(engine.current.world).find(
      (body) => body.label === 'topLeftCloud'
    )
    const topRightCloud = Composite.allBodies(engine.current.world).find(
      (body) => body.label === 'topRightCloud'
    )
    const bottomRightCloud = Composite.allBodies(engine.current.world).find(
      (body) => body.label === 'bottomRightCloud'
    )

    if (bottomLeftCloud && topLeftCloud && topRightCloud && bottomRightCloud) {
      const centerYBottomLeftCloud = bottomLeftCloud.position.y
      const centerYTopLeftCloud = topLeftCloud.position.y
      const centerYTopRightCloud = topRightCloud.position.y
      const centerYBottomRightCloud = bottomRightCloud.position.y

      setInterval(() => {
        const cloudHover =
          amplitude * Math.sin((2 * Math.PI * Date.now()) / period)

        const yBottomLeftCloud = centerYBottomLeftCloud - cloudHover
        const yTopLeftCloud = centerYTopLeftCloud + cloudHover
        const yTopRightCloud = centerYTopRightCloud + -cloudHover
        const yBottomRightCloud = centerYBottomRightCloud + cloudHover

        // bottomLeftCloud.position.x < outOfScreenXPosition &&
        //   Body.setPosition(bottomLeftCloud, resetPosition)

        topLeftCloud.position.x < outOfScreenXPosition &&
          Body.setPosition(topLeftCloud, resetPosition)

        topRightCloud.position.x < outOfScreenXPosition &&
          Body.setPosition(topRightCloud, resetPosition)

        // bottomRightCloud.position.x < outOfScreenXPosition &&
        //   Body.setPosition(bottomRightCloud, resetPosition)

        Body.setPosition(bottomLeftCloud, {
          x: bottomLeftCloud.position.x,
          y: yBottomLeftCloud,
        })
        Body.setPosition(topLeftCloud, {
          x: topLeftCloud.position.x - 0.05,
          y: yTopLeftCloud,
        })
        Body.setPosition(topRightCloud, {
          x: topRightCloud.position.x - 0.03,
          y: yTopRightCloud,
        })
        Body.setPosition(bottomRightCloud, {
          x: bottomRightCloud.position.x,
          y: yBottomRightCloud,
        })
      }, 1000 / 360) //  frames per second
    }
  }

  return (
    <View sx={{ flex: 1 }}>
      <main
        style={{
          overflow: 'auto',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <div
          style={{
            height: '100%',
            display: 'grid',
            placeContent: 'center',
            justifyItems: 'center',
            position: 'relative',
          }}
        >
          <div
            ref={scene}
            style={{
              backgroundColor: theme.primary,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'relative',
              }}
            >
              {isShowCard && (
                <Pressable
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    position: 'absolute',
                    bottom: -enlargedHeight / 2,
                  }}
                  onPress={(e) => handleMessageCard()}
                >
                  <PlinkoMessageCard
                    width={enlargedWidth}
                    height={enlargedHeight}
                    winAmount={winAmount.current}
                    code={prizeCode}
                  />
                </Pressable>
              )}
              <PlinkoBackButton scale={scale} />
              <Pressable
                onPress={() => getResult()}
                disabled={!!!balance?.totalBalance || isLoading}
                style={{
                  top: enlargedHeight * 0.08,
                  right: enlargedWidth * 0.35,
                  zIndex: 1,
                  width: 235 * scale,
                  height: 235 * scale * 1.5,
                  position: 'absolute',
                  borderRadius: 50,
                }}
              >
                {(isLoading || isFetching) && (
                  <ActivityIndicator
                    color={'white'}
                    style={{ paddingTop: enlargedHeight * 0.11 }}
                  />
                )}
              </Pressable>
              <PlinkoTncButton
                scale={scale}
                locale={
                  locale
                    ? (locale as LANGUAGE_CODE)
                    : (deviceLocale as LANGUAGE_CODE)
                }
              />
              <PlinkoTicketCounter
                loading={isTicketLoading}
                balance={balance?.totalBalance ?? 0}
                enlargedHeight={enlargedHeight}
                enlargedWidth={enlargedWidth}
                scale={scale}
                loadingBalance={isFetching}
              />
              <PlinkoPrizeText
                enlargedHeight={enlargedHeight}
                enlargedWidth={enlargedWidth}
                scale={scale}
                prize={winAmount}
                basketLocation={basketFinalLocation}
                ballDropping={isLoading}
                isHidePrize={isHidePrize}
              />
            </div>
          </div>
          {/* <View sx={{ flexDirection: 'row' }}>
            <Text key={index}>
              {' Ball Should Drop At Basket: ['}
              {testBasketLocation.current + 1}
              {']'}
            </Text>
          </View> */}
        </div>
      </main>
    </View>
  )
}

export default Plinko
