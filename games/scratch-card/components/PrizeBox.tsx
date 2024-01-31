import { AssetBasePath } from '@games/config'
import { Container, Sprite } from '@pixi/react'
import { sound } from '@pixi/sound'
import { useEffect, useState } from 'react'
import { GamePackageName } from '../config'
import { prizeDict } from './GameBody'
import PrizeEgg from './PrizeEgg'
import { Prize, useItemsLayout } from './Util'

type PrizeBoxProps = {
  boxWidth: number
  result: Prize
  onComplete: () => void
}

const PrizeBox = ({ boxWidth, result, onComplete }: PrizeBoxProps) => {
  const [prizePress, setPrizePress] = useState(0)

  const contentPosition = useItemsLayout({
    width: boxWidth - 10,
    height: boxWidth - 10,
    result,
  })

  const handleClick = (prizeAmount: number) => {
    result === prizeAmount && setPrizePress(prizePress + 1)
    sound.play('audio/click.mp3')
  }

  useEffect(() => {
    if (prizePress === 3) {
      sound.play('audio/win.mp3')

      setTimeout(() => {
        setPrizePress(0)
        onComplete()
      }, 2000)
    }
  }, [prizePress])

  console.log('🚀 ~ PrizeBox ~ contentPosition:', contentPosition)

  return (
    <Container>
      {contentPosition.map((item, index) => (
        <PrizeEgg key={index} item={item} />
      ))}

      <Sprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/scratch.png`}
        anchor={{ x: 0.5, y: 0.5 }}
        scale={{ x: 0.5, y: 0.5 }}
        width={boxWidth}
        height={boxWidth}
      />
    </Container>
  )
}
export default PrizeBox
