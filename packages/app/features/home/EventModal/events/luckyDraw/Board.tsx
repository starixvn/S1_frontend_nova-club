import { useInterval } from 'app/hooks/useInterval'
import { Row, View, styled } from 'dripsy'
import { random } from 'lodash'
import { MotiView, useDynamicAnimation } from 'moti'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SolitoImage } from 'solito/image'
import { useHomeEventModal } from '../../HomeEventModal'
import {
  BG_RATIO,
  BG_SIZES,
  BoardTile,
  CHAR_RATIO,
  CONTENT_ITEM_SIZES,
  DiceResult,
  DiceResults,
  HALF_LENGTH,
  POSITION_ANIMATION_CONFIG,
  SCALING_DEPTH,
  STARTING_POSITION,
  getZIndexByItemIndex,
  randomDiceResult,
  resultToDiceArray,
} from './boardUtility'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

type Props = {
  resultIndex?: number // index of rewards
  onAnimated?: () => void
  tiles: BoardTile[]
}

export default function Board({ tiles, resultIndex, onAnimated }: Props) {
  const { dimension } = useHomeEventModal()
  const { width } = dimension // width = [460, 612, 650]

  const prevIndex = useRef(-1)

  const diceWidth = width * 0.16
  const charWidth = width * 0.1
  const charHeight = charWidth / CHAR_RATIO

  const contentWidth = width * 0.22
  const contentHeight = contentWidth

  const animation = useDynamicAnimation(() => ({
    left: [
      { value: STARTING_POSITION.left },
      { value: STARTING_POSITION.left },
    ],
    top: [{ value: STARTING_POSITION.top }, { value: STARTING_POSITION.top }],
    translateY: [0, 0, 0],
    scale: [{ value: 1 }, { value: 1 }],
  }))

  function animateNext() {
    const nextIndex = (prevIndex.current + 1) % tiles.length

    const toPosition = tiles[nextIndex]?.offset ?? STARTING_POSITION
    prevIndex.current = nextIndex

    const dif = Math.abs(nextIndex - HALF_LENGTH)
    const scaling = 1 - (SCALING_DEPTH - (dif / HALF_LENGTH) * SCALING_DEPTH)

    function getAnimConfig(value) {
      return {
        ...POSITION_ANIMATION_CONFIG,
        value,
      }
    }

    animation.animateTo((current) => {
      try {
        return {
          left: [
            getAnimConfig(current.left[1]?.value),
            getAnimConfig(toPosition.left),
          ],
          top: [
            getAnimConfig(current.top[1]?.value),
            {
              ...getAnimConfig(toPosition.top),
              onDidAnimate: function () {
                if (nextIndex === resultIndex) {
                  onAnimated && setTimeout(() => onAnimated(), 800)
                } else setTimeout(() => animateNext(), 100)
              },
            },
          ],
          translateY: [
            getAnimConfig(0),
            {
              value: -30,
              type: 'timing',
              duration: 200,
            },
            getAnimConfig(0),
          ],
          scale: [
            getAnimConfig(current.scale[1].value),
            getAnimConfig(scaling),
          ],
          zIndex: getZIndexByItemIndex(nextIndex, 2),
        }
      } catch (e) {
        console.log('error', e)
        return {
          ...STARTING_POSITION,
        }
      }
    })
  }

  return (
    <View
      pointerEvents="none"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width,
        height: width / BG_RATIO,
      }}
    >
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/register/bg.png`}
        sizes={BG_SIZES}
        fill
        alt="monopoly"
        style={{
          position: 'absolute',
          zIndex: 1,
        }}
      />

      {tiles.map((p, i) => {
        const zIndex = getZIndexByItemIndex(i)
        const { image, offset, ...rest } = p
        return (
          <BoardItem
            key={i}
            sx={{
              zIndex,
              ...offset,
            }}
            transition={{
              loop: true,
            }}
            from={{
              transform: [{ rotateY: '0deg' }],
            }}
            {...rest}
          >
            <View
              sx={{
                bottom: contentHeight * 0.1,
              }}
            >
              <SolitoImage
                src={image}
                width={contentWidth}
                height={contentHeight}
                sizes={CONTENT_ITEM_SIZES}
                alt="content"
              />
            </View>
          </BoardItem>
        )
      })}

      <CharacterPosition
        state={animation}
        /* Setting transition here will have bug where the animation state will replay again */
        // transition={{ type: 'timing', duration: 300, loop: false }}
      >
        <CharacterJumping width={charWidth} height={charHeight}>
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/register/char.png`}
            fill
            alt="char"
          />
        </CharacterJumping>
      </CharacterPosition>
      <DiceSet
        targetValue={resultIndex ? resultIndex + 1 : undefined}
        size={diceWidth}
        onAnimated={animateNext}
      />
    </View>
  )
}

const BoardItem = styled(MotiView)({
  position: 'absolute',
  width: 10,
  height: 10,
  marginLeft: -5,
  marginTop: -5,
  alignItems: 'center',
  justifyContent: 'center',
  // bg: 'red', // toggle for indicator
})

const CharacterPosition = styled(MotiView)({
  position: 'absolute',
  zIndex: 20,
  ...STARTING_POSITION,
})

const CharacterJumping = styled(MotiView)(
  ({ width, height }: { width: number; height: number }) => ({
    width,
    height,
    position: 'absolute',
    left: width * -0.5,
    top: height * -0.68,
  })
)

const DiceSet = ({
  size,
  targetValue,
  onAnimated,
}: {
  size: number
  targetValue?: number
  onAnimated?: () => void
}) => {
  const [diceResults, setDiceResults] = useState<DiceResults>(
    randomDiceResult([random(1, 6) as DiceResult, random(1, 6) as DiceResult])
  )

  const [isRunning, setIsRunning] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let isFirstDicePattern = useMemo(() => !!random(0, 1), [diceResults])

  useEffect(() => {
    if (targetValue) {
      setIsRunning(true)

      const clearEffect = setTimeout(() => {
        const diceResult = resultToDiceArray(targetValue)
        setDiceResults(diceResult)
        setIsRunning(false)
        onAnimated && onAnimated()
      }, random(2000, 4000))

      return () => clearTimeout(clearEffect)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetValue])

  useInterval(
    () => {
      setDiceResults(randomDiceResult(diceResults))
    },
    isRunning ? 75 : null
  )

  return (
    <Row
      sx={{
        zIndex: getZIndexByItemIndex(3, 1),
        position: 'absolute',
        left: '36%',
        top: '17%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Dice
        size={size}
        result={diceResults[0]}
        pattern={isFirstDicePattern ? 1 : 2}
      />
      <Dice
        size={size}
        result={diceResults[1]}
        pattern={isFirstDicePattern ? 2 : 1}
      />
    </Row>
  )
}

const Dice = ({
  result,
  pattern,
  size,
}: {
  result: DiceResult
  pattern: 1 | 2
  size: number
}) => {
  return (
    <View>
      <PreloadDiceImages />
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/register/dice/No${result}-0${pattern}.png`}
        width={size}
        height={size}
        alt="dice"
      />
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/register/dice/shadow.png`}
        width={size}
        height={20}
        alt="dice-shadow"
        style={{ zIndex: 1 }}
      />
    </View>
  )
}

function PreloadDiceImages() {
  return (
    <View sx={{ opacity: 0, position: 'absolute' }}>
      {[1, 2].map((num1) => {
        return [1, 2, 3, 4, 5, 6].map((num2) => {
          return (
            <SolitoImage
              key={num1 + num2}
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/register/dice/No${num2}-0${num1}.png`}
              width={20}
              height={20}
              alt="dice-shadow"
              style={{ zIndex: 1 }}
            />
          )
        })
      })}
    </View>
  )
}
