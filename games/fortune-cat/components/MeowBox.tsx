import { Container } from '@pixi/react'
import { sound } from '@pixi/sound'
import { useEffect, useState } from 'react'
import FlipCard from './FlipCard'
import { catDict, prizeDict } from './MeowBody'
import { useItemsLayout } from './Util'

const MeowBox = ({ boxWidth, result, onComplete, disabled }) => {
  const containerWidth = boxWidth * 0.7
  const containerHeight = boxWidth * 0.7
  const [prizePress, setPrizePress] = useState(0)

  const contentPosition = useItemsLayout({
    width: containerWidth,
    height: containerWidth,
    result,
  })

  const handleClick = (prizeAmount) => {
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

  return (
    <Container y={containerHeight * 0.7}>
      {contentPosition.map((item, index) => {
        return (
          <FlipCard
            key={index}
            position={item.position}
            disabled={prizePress === 3}
            image={catDict[item.prize]}
            winImage={result === item.prize && prizeDict[item.prize]}
            onComplete={() => handleClick(item.prize)}
            win={result === item.prize && prizePress === 3}
          />
        )
      })}
    </Container>
  )
}
export default MeowBox
