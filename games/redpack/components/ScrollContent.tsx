import { Container, Text } from '@pixi/react'
import { ISize, TextStyle } from 'pixi.js'
import { useMemo } from 'react'
import RedPack, { REDPACK_RATIO } from './RedPack'
import { useGameState } from '../context/GameContext'
import { useGetCoinRedemptionListQuery } from 'services/rewardApi'
// import { waitFor } from "utils/asyncUtils";

type Props = {
  size: ISize
  enabled?: boolean
}

const NUM_REDPACK = 6
const NUM_PER_ROW = 3
const DISPLAY_ROW = NUM_REDPACK / NUM_PER_ROW
const NUM_SPACE = DISPLAY_ROW + 1

const MAX_WIDTH = 420
const MIN_WIDTH = 295

export default function ScrollContent({ size, enabled, ...rest }: Props) {
  const { setTotalWon } = useGameState()
  const redpackDimension = useMemo(() => {
    const redPackContainerParentRatio = 0.78
    const redPackContainerHeight = size.height * redPackContainerParentRatio
    // const spacePerUnit = redPackContainerHeight * 0;

    const redPackHeight = redPackContainerHeight / DISPLAY_ROW
    //   (redPackContainerHeight - NUM_SPACE * spacePerUnit) / DISPLAY_ROW;

    const redPackSize = {
      height: redPackHeight,
      width: redPackHeight * REDPACK_RATIO,
    }

    const redPackContainerPos = {
      x: -size.width / 2,
      y:
        -size.height * 0.5 +
        size.height * (1 - redPackContainerParentRatio) +
        redPackHeight * 0.5,
    }

    return {
      //   spacePerUnit,
      redPackSize,
      redPackContainerPos,
    }
  }, [size.height, size.width])

  const { redPackSize, redPackContainerPos } = redpackDimension

  const range = 420 - 295 // max font - min font
  const fontRange = 30 - 25 // max font - min font

  const fontScale = ((size.width - 295) / range) * fontRange + 25

  function onResult(result: number = 0) {
    setTotalWon((p) => p + result)
  }

  return (
    <Container {...rest}>
      <Text
        y={-size.height / 2 + 20}
        anchor={{ x: 0.5, y: 0 }}
        text={'CHỌN BAO MAY MẮN'}
        style={
          new TextStyle({
            align: 'center',
            fontFamily: 'AvertaStd Bold',
            fontSize: fontScale,
            fill: '#950000',
            wordWrap: true,
            wordWrapWidth: Math.min(size.width, 350), // TODO find the right width wrap
          })
        }
      />
      <Container {...redPackContainerPos}>
        {Array.from(Array(NUM_REDPACK), (_, i) => {
          return (
            <RedPack
              key={i}
              interactive={!!enabled}
              seal={(i + 1).toString()}
              size={redPackSize}
              onResult={onResult}
              x={
                (i % NUM_PER_ROW) * (size.width / NUM_PER_ROW) +
                (size.width / NUM_PER_ROW) * 0.5
              }
              y={
                Math.floor(i / NUM_PER_ROW) * redPackSize.height
                // Math.floor(i / NUM_PER_ROW) *
                //   (redPackSize.height + spacePerUnit) +
                // spacePerUnit
              }
            />
          )
        })}
      </Container>
    </Container>
  )
}
