import { AssetBasePath } from '@games/config'
import { Container, Graphics, PixiRef, Sprite, useTick } from '@pixi/react'
import sample from 'lodash/sample'
import sampleSize from 'lodash/sampleSize'
import { Assets, BlurFilter, Resource, Spritesheet, Texture } from 'pixi.js'
import {
  ComponentProps,
  Ref,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { IContainer, ISprite } from 'utils-pixi/type'
import { GamePackageName } from '../config'
import { IMediaInstance, sound } from '@pixi/sound'

type Props = {
  results?: boolean[]
  onCompleteAnimated: () => void
} & ComponentProps<IContainer>

export type SlotMachineMethods = {
  stop: () => void
}

const spritesheet = `${AssetBasePath}/assets/${GamePackageName}/spritesheets/zodiac.json`
const catFrameIndex = 0 // first frame must be the cat in the spritesheet
export const columns = 3

const spaceRatio = 0.15
const displayRow = 5
const offset = 2 // Math.floor(5/2)

const SlotMachine = memo(
  forwardRef<SlotMachineMethods, Props>(
    ({ width = 0, height = 0, results, onCompleteAnimated, ...rest }, ref) => {
      const [zodiacFrames, setZodiacFrames] = useState<Texture<Resource>[]>([])
      const [columnFrames, setColumnFrames] = useState<Texture<Resource>[][]>(
        []
      )
      const maskRef = useRef<PixiRef<typeof Graphics>>(null)
      const frameRef = useRef<PixiRef<ISprite>>(null)
      const colRefs = useRef<(SlotMachineMethods | null)[]>(
        Array(columns).fill(null)
      )

      const lastAnswerTimeSpan = useMemo(() => {
        return results && results.length > 0
          ? new Date().getTime().toString()
          : undefined
      }, [results])

      useImperativeHandle(
        ref,
        () => ({
          stop: function () {
            colRefs.current.map((r) => {
              if (r) {
                r.stop()
              }
            })
          },
        }),
        []
      )

      useEffect(() => {
        Assets.load(spritesheet).then((r: Spritesheet) => {
          const allFrames = Object.keys(r.textures).map((k) => r.textures[k])
          setZodiacFrames(allFrames)

          const initialColumnFrames: Texture<Resource>[][] = []
          Array.from(Array(columns)).map((_, i) => {
            let initialFrames = sampleSize(allFrames, displayRow)
            initialFrames[offset] = allFrames[catFrameIndex] // Always show cat at the middle on first load
            initialColumnFrames.push(initialFrames)
          })

          setColumnFrames(initialColumnFrames)
        })
      }, [])

      const zodiacSize = width * 0.13

      return (
        <Container {...rest}>
          <Graphics
            anchor={[0.5, 0]}
            y={-height * 0.17}
            ref={maskRef}
            draw={(g) => {
              g.clear()
              g.beginFill(0xffffff)
              g.drawRect(-width * 0.5, 0, width, height * 0.62)
              g.endFill()
            }}
          />
          <Sprite
            anchor={[0.5, 0]}
            y={-height * 0.17}
            mask={maskRef.current}
            width={width * 0.7}
            height={height * 0.62}
            texture={Texture.WHITE}
          />
          <Container y={height * 0.14} mask={maskRef.current}>
            {columnFrames.length > 0 &&
              columnFrames.map((_, i) => {
                return (
                  <SlotMachineCol
                    ref={(r) => (colRefs.current[i] = r)}
                    key={i}
                    lastUpdatedAnswer={lastAnswerTimeSpan}
                    isAnswer={results ? results[i] : undefined}
                    initialFrames={columnFrames[i]}
                    texturePool={zodiacFrames}
                    size={zodiacSize}
                    x={(zodiacSize + 0.8 * zodiacSize) * (i - 1)}
                    delay={(i + 1) * 300}
                    onCompleteAnimated={
                      i === columnFrames.length - 1
                        ? onCompleteAnimated
                        : undefined
                    }
                  />
                )
              })}
          </Container>
          <Sprite
            ref={frameRef}
            image={`${AssetBasePath}/assets/${GamePackageName}/images/slot-machine-frame.png`}
            anchor={0.5}
            width={width}
            height={height}
          />
        </Container>
      )
    }
  )
)

type SlotMachineColProps = {
  initialFrames: Texture<Resource>[]
  texturePool: Texture<Resource>[]
  lastUpdatedAnswer?: string
  size: number
  x: number
  delay: number
  isAnswer?: boolean
  onCompleteAnimated?: () => void
}
const SlotMachineCol = forwardRef<SlotMachineMethods, SlotMachineColProps>(
  (
    {
      initialFrames,
      lastUpdatedAnswer,
      texturePool,
      size,
      isAnswer,
      x,
      delay,
      onCompleteAnimated,
    }: SlotMachineColProps,
    ref
  ) => {
    const elapsedMs = useRef<number>(0)
    const blurFilter = useRef(new BlurFilter(0, 1))
    const trackNthDistanceTravelled = useRef<number>(0)
    const [currentDistance, setCurrentDistance] = useState<number>(0)
    const [frames, setFrames] = useState<Texture<Resource>[]>(initialFrames)
    const [targetDistance, setTargetDistance] = useState<number>(0)
    const spinSoundRef = useRef<IMediaInstance>()

    async function startSpinAudio() {
      spinSoundRef.current = await sound.play('audio/spin.mp3', {
        speed: 0,
        volume: 0.2,
        loop: true,
      })
    }

    useEffect(() => {
      if (lastUpdatedAnswer) {
        setTargetDistance(100)
        startSpinAudio()
      }
    }, [lastUpdatedAnswer])

    const onStop = useCallback(() => {
      setTargetDistance(trackNthDistanceTravelled.current + 17)
    }, [])

    useImperativeHandle(
      ref,
      () => {
        return {
          stop: onStop,
        }
      },
      [onStop]
    )

    useTick((_, ticker) => {
      elapsedMs.current += ticker.elapsedMS

      if (elapsedMs.current > delay) {
        const maxSpeed = 30 // 30 units per second

        const progress = currentDistance / targetDistance
        if (spinSoundRef.current) {
          spinSoundRef.current.speed = Math.max(
            0.2,
            Math.sin(Math.PI * progress)
          )
        }

        const currentSpeed =
          (maxSpeed * Math.sin(Math.PI * progress) + 1) *
          (ticker.elapsedMS / 1000)

        const distanceTravelled = currentDistance + currentSpeed
        blurFilter.current.blur = parseFloat(
          Math.sin(Math.PI * progress).toFixed(2)
        )
        blurFilter.current.quality =
          1 - parseFloat(Math.sin(Math.PI * progress).toFixed(2)) * 0.2 // keep value between 0.8-1

        setCurrentDistance(distanceTravelled)

        /* change the frames that hit the last position */
        const travelledUnit = Math.floor(distanceTravelled)
        if (trackNthDistanceTravelled.current < travelledUnit) {
          let updatedFrames = [...frames]
          const indexToChange = displayRow - (travelledUnit % displayRow) - 1
          const isResultIndex =
            targetDistance - displayRow + offset === travelledUnit
          const isLastLoop = targetDistance - distanceTravelled <= displayRow

          const newTexture =
            isResultIndex && isAnswer
              ? texturePool[catFrameIndex]
              : isLastLoop
              ? (sample(
                  texturePool.slice(1, texturePool.length)
                ) as Texture<Resource>) // isLastLoop should not show cat if its not an answer column
              : (sample(texturePool) as Texture<Resource>) // can be any texture as long its not the last loop

          updatedFrames[indexToChange] = newTexture

          setFrames(updatedFrames)

          trackNthDistanceTravelled.current = travelledUnit
        }

        // reset animation progress
        if (distanceTravelled >= targetDistance) {
          setTargetDistance(0)
          spinSoundRef.current && spinSoundRef.current.stop()
          setCurrentDistance(trackNthDistanceTravelled.current % displayRow) // make sure next spin it continues from current frame
          elapsedMs.current = 0
          trackNthDistanceTravelled.current = 0
          onCompleteAnimated && onCompleteAnimated()
        }
      }
      /* */
    }, currentDistance < targetDistance)

    return (
      <Container anchor={[0.5, 0.5]} x={x} filters={[blurFilter.current]}>
        {Array.from(Array(displayRow)).map((_, i) => {
          const position = ((i + currentDistance) % displayRow) - offset
          const y = (size + spaceRatio * size) * position

          return (
            <Sprite
              key={i}
              y={y}
              texture={frames[i]}
              width={size}
              height={size}
              anchor={0.5}
            />
          )
        })}
      </Container>
    )
  }
)

export default SlotMachine
