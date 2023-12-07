import { AssetBasePath } from '@games/config'
import { Container, PixiRef, Sprite } from '@pixi/react'
import { Sine, gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import { useEffect, useMemo, useRef } from 'react'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { ISprite } from 'utils-pixi/type'
import { GamePackageName } from '../config'

type Props = {}

const amplitude = 5 // The maximum distance the hotAirBalloon will move up and down
const period = 2000 // The time it takes for the hotAirBalloon to complete one full up-and-down cycle (in milliseconds)

const CLOUD_SCALE = 0.7
const CLOUD_INIT_X_1 = 628 * CLOUD_SCALE
const CLOUD_INIT_X_2 = 600 * CLOUD_SCALE

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const BASE_DURATION = 50
export default function Background({}: Props) {
  const { width, height } = useWindowSize()
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

  const animationCloudMovement = () => {
    gsap.fromTo(
      cloudRef1.current,
      { x: -CLOUD_INIT_X_1 },
      {
        x: width,
        duration: BASE_DURATION + 5,
        repeat: -1,
        ease: 'none',
      }
    )
    gsap.fromTo(
      cloudRef2.current,
      { x: -CLOUD_INIT_X_2 },
      {
        x: width,
        duration: BASE_DURATION + 9,
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
        duration: BASE_DURATION + 8,
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
        duration: BASE_DURATION + 2,
        repeat: -1,
        ease: 'none',
        delay: 2,
      }
    )
    gsap.fromTo(
      cloudRef5.current,
      { x: width },
      {
        x: -CLOUD_INIT_X_2,
        y: '-=20px',
        duration: BASE_DURATION + 5,
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
        position={{ x: width * 0.2, y: height * 0.85 }}
        alpha={1}
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
        alpha={1}
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
