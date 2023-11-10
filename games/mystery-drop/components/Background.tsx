import { AssetBasePath } from '@games/config'
import {
  Container,
  PixiRef,
  Sprite,
  TilingSprite,
  useApp,
  useTick,
} from '@pixi/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { GamePackageName } from '../config'
import { Circ, Cubic, Expo, Power2, Sine, gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import { ISprite } from 'utils-pixi/type'
import { CustomWiggle } from 'gsap/all'

type Props = {}

const amplitude = 5 // The maximum distance the hotAirBalloon will move up and down
const period = 2000 // The time it takes for the hotAirBalloon to complete one full up-and-down cycle (in milliseconds)

const CLOUD_SCALE = 0.7
const CLOUD_INIT_X_1 = 628 * CLOUD_SCALE
const CLOUD_INIT_X_2 = 600 * CLOUD_SCALE

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

export default function Background({}: Props) {
  const app = useApp()
  const waveSpeed = 1
  const [rotation, setRotation] = useState(0)
  const [waveX, setWaveX] = useState(0)
  const { width, height } = useWindowSize()
  const [cloudX, setCloudX] = useState({ x: CLOUD_INIT_X_1 })
  const [cloud2X, setCloud2X] = useState({ x: CLOUD_INIT_X_2 ?? 0 })
  const cloudRef1 = useRef<PixiRef<ISprite>>(null)
  const cloudRef2 = useRef<PixiRef<ISprite>>(null)
  const cloudRef3 = useRef<PixiRef<ISprite>>(null)
  const cloudRef4 = useRef<PixiRef<ISprite>>(null)
  const cloudRef5 = useRef<PixiRef<ISprite>>(null)
  const moneyRef1 = useRef<PixiRef<ISprite>>(null)
  const moneyRef2 = useRef<PixiRef<ISprite>>(null)

  const bgWidth = width
  const bgHeight = Math.max(bgWidth / (668 / 1200), height)

  const frameDimension = useMemo(() => {
    const ratio = 1328 / 768
    return {
      width: height / ratio,
      height: height,
    }
  }, [width])

  // useTick((delta) => {
  //   // Update wave position / Movement speed
  //   const cloudHover = amplitude * Math.sin((2 * Math.PI * Date.now()) / period)
  //   setWaveX(waveX + 1)
  //   setCloudX({
  //     x: cloudX.x > width - CLOUD_INIT_X_1 ? CLOUD_INIT_X_1 : cloudX.x + 2,
  //   })
  //   setCloud2X({
  //     x: cloud2X.x > width - CLOUD_INIT_X_1 ? CLOUD_INIT_X_1 : cloud2X.x + 2,
  //   })

  //   delta && setRotation(rotation + 0.003 * delta)
  // })

  const animationCloudMovement = () => {
    gsap.fromTo(
      cloudRef1.current,
      { x: -CLOUD_INIT_X_1 },
      {
        x: width,
        duration: 15,
        repeat: -1,
        ease: 'none',
      }
    )
    gsap.fromTo(
      cloudRef2.current,
      { x: -CLOUD_INIT_X_2 },
      {
        x: width,
        duration: 19,
        repeat: -1,
        ease: 'none',
        delay: 2,
      }
    )
    gsap.fromTo(
      cloudRef3.current,
      { x: -CLOUD_INIT_X_2 },
      {
        x: width,
        duration: 18,
        repeat: -1,
        ease: 'none',
        delay: 3,
      }
    )
    gsap.fromTo(
      cloudRef4.current,
      { x: width },
      {
        x: -CLOUD_INIT_X_2,
        y: '-=20px',
        duration: 12,
        repeat: -1,
        ease: 'none',
        delay: 1,
      }
    )
    gsap.fromTo(
      cloudRef5.current,
      { x: width },
      {
        x: -CLOUD_INIT_X_2,
        y: '-=20px',
        duration: 15,
        repeat: -1,
        ease: 'none',
      }
    )
  }

  const animationCloudHover = () => {
    gsap.to(
      [
        cloudRef1.current,
        cloudRef2.current,
        cloudRef3.current,
        cloudRef4.current,
        cloudRef5.current,
      ],
      {
        y: '-=20px',
        duration: 3,
        repeat: -1,
        ease: Sine.easeInOut,
        yoyo: true,
      }
    )
    gsap.to(moneyRef1.current, {
      pixi: { alpha: 1, scale: 0.4 },
      repeat: -1,
      yoyo: true,
    })
    gsap.to(moneyRef2.current, {
      pixi: { alpha: 1, scale: 0.6 },
      repeat: -1,
      yoyo: true,
    })
  }

  useEffect(() => {
    animationCloudMovement()
    animationCloudHover()
  }, [])

  return (
    <Container>
      <Sprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/game-bg.jpg`}
        width={width}
        height={height}
        anchor={0.5}
        x={width * 0.5}
        y={height * 0.5}
      />

      <Sprite
        ref={moneyRef1}
        anchor={{ x: 0.5, y: 0.5 }}
        scale={0.3}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/money01.png`}
        position={{ x: width * 0.5 - 100, y: height * 0.75 }}
        alpha={0.7}
      />
      <Sprite
        ref={cloudRef5}
        anchor={{ x: 0, y: 0.5 }}
        scale={CLOUD_SCALE}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/cloud05.png`}
        position={{ x: CLOUD_INIT_X_1, y: height - 100 }}
      />
      <Sprite
        ref={cloudRef4}
        anchor={{ x: 0, y: 0.5 }}
        scale={CLOUD_SCALE}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/cloud04.png`}
        position={{ x: CLOUD_INIT_X_1, y: height - 100 }}
      />
      <Sprite
        ref={cloudRef3}
        anchor={{ x: 0, y: 0.5 }}
        scale={CLOUD_SCALE}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/cloud03.png`}
        position={{ x: CLOUD_INIT_X_1, y: height - 50 }}
      />
      <Sprite
        ref={moneyRef2}
        anchor={{ x: 0.5, y: 0.5 }}
        scale={0.5}
        alpha={0.7}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/money01.png`}
        position={{ x: width - 108, y: height - 50 }}
      />
      <Sprite
        ref={cloudRef2}
        anchor={{ x: 0, y: 0.5 }}
        scale={CLOUD_SCALE}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/cloud02.png`}
        position={{ x: CLOUD_INIT_X_1, y: height }}
      />
      <Sprite
        ref={cloudRef1}
        anchor={{ x: 0, y: 0.5 }}
        scale={CLOUD_SCALE}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/cloud01.png`}
        position={{ x: CLOUD_INIT_X_2, y: height }}
      />
    </Container>
  )
}
