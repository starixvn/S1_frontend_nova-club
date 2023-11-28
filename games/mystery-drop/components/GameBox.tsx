import { AssetBasePath } from '@games/config'
import { Container, Sprite } from '@pixi/react'
import React, { useEffect, useState } from 'react'
import { GamePackageName } from '../config'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { useItemsLayout } from './Util'
import FlipCard from './FlipCard'
import NiceModal from '@ebay/nice-modal-react'
import WinModal from './WinModal'
import {
  useGetMysteryCheckQuery,
  useSetMysteryClaimMutation,
} from 'services/eventApi'

export const possibleResult = [1, 2, 3]

export const potDict = {
  1: `${AssetBasePath}/assets/${GamePackageName}/images/pot-blue.png`,
  2: `${AssetBasePath}/assets/${GamePackageName}/images/pot-green.png`,
  3: `${AssetBasePath}/assets/${GamePackageName}/images/pot-red.png`,
}
export const prizeDict = {
  1: `${AssetBasePath}/assets/${GamePackageName}/images/pot-highlight.png`,
  2: `${AssetBasePath}/assets/${GamePackageName}/images/pot-highlight.png`,
  3: `${AssetBasePath}/assets/${GamePackageName}/images/pot-highlight.png`,
}

const GameBox = () => {
  const { width, height } = useWindowSize()
  const containerWidth = width
  const containerHeight = height * 0.5

  const bgWidth = Math.min(500, width)
  const boxWidth = bgWidth >= 500 ? bgWidth * 0.8 : bgWidth * 0.9
  const [prizePress, setPrizePress] = useState(0)
  // const result = 1
  const [claimReward] = useSetMysteryClaimMutation()
  const { data, result, isLoading } = useGetMysteryCheckQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      ...data,
      isLoading,
      result: Number(data?.data?.prize),
    }),
    refetchOnMountOrArgChange: true,
  })

  const contentPosition = useItemsLayout({
    width: boxWidth * 0.6,
    height: boxWidth * 0.6,
    result: Number(result),
  })

  const handleClick = (prizeAmount: number) => {
    result === prizeAmount && setPrizePress(prizePress + 1)
    // sound.play('audio/click.mp3')
  }

  const handleWin = () => {
    NiceModal.show(WinModal, {
      winPrize: data?.bonus,
      type: data?.prize,
    })
  }

  const handleClaim = async () => {
    console.log('data', data)
    const { data: claimData } = await claimReward({
      code: data?.key ?? '',
    })
      .unwrap()
      .catch((error) => {
        return error
      })
  }

  useEffect(() => {
    if (prizePress === 3) {
      // sound.play('audio/win.mp3')
      setTimeout(() => {
        handleWin()
        setPrizePress(0)
        handleClaim()
      }, 2000)
    }
  }, [prizePress])

  return (
    <Container>
      <Sprite
        anchor={{ x: 0.5, y: 0 }}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/game-body.png`}
        width={boxWidth}
        height={boxWidth}
      />

      <Container position={[0, boxWidth / 2]}>
        {contentPosition
          ? contentPosition.map((item, index) => {
              const prize = item.prize

              return (
                <FlipCard
                  key={index}
                  position={item.position}
                  disabled={prizePress === 3}
                  image={potDict[prize]}
                  winImage={result === prize ? prizeDict[prize] : undefined}
                  onComplete={() => handleClick(prize)}
                  win={result === prize && prizePress === 3}
                />
              )
            })
          : null}
      </Container>
    </Container>
  )
}

export default GameBox
