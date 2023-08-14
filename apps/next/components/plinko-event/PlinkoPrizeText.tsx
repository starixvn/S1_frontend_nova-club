import { View, Text } from 'dripsy'
import React from 'react'

const basket = 9
const basketPrizeArray = [
  '100K',
  '200K',
  '100K',
  '100K',
  '0K',
  '1TR',
  '0K',
  '0K',
  '200K',
]
interface PlinkoPrizeTextProps {
  enlargedHeight: number
  enlargedWidth: number
  scale: number
  prize: React.MutableRefObject<string>
  basketLocation: React.MutableRefObject<number>
  ballDropping: boolean
  isHidePrize: boolean
}

const PlinkoPrizeText = ({
  enlargedHeight,
  enlargedWidth,
  scale,
  prize,
  basketLocation,
  ballDropping,
  isHidePrize,
}: PlinkoPrizeTextProps) => {
  {
    // console.log('Prize', prize)
    // console.log('basketLocation', basketLocation)
    const basketSpacing = enlargedWidth / basket
    // console.log('IsIdle: ', gameIsIdle)
    // console.log('ballDropping: ', ballDropping)

    return (
      <>
        {isHidePrize
          ? Array.from({ length: basket }, (_, i) => (
              <View
                key={i}
                sx={{
                  position: 'absolute',
                  minWidth: enlargedWidth * 0.11,
                  top: enlargedHeight * (1 - 0.13),
                  left: basketSpacing * i,
                  display: 'flex',
                }}
              >
                <Text
                  selectable={false}
                  sx={{
                    minWidth: enlargedWidth * 0.075,
                    right: basketSpacing * (i + 1),
                    color: '#7C4800',

                    fontSize: 22 * scale,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  ?
                </Text>
              </View>
            ))
          : Array.from({ length: basket }, (_, i) => {
              const dummyText = basketPrizeArray[Math.floor(Math.random() * 9)]
              return (
                <View
                  key={i}
                  sx={{
                    position: 'absolute',
                    minWidth: enlargedWidth * 0.11,
                    top: enlargedHeight * (1 - 0.13),
                    left: basketSpacing * i,
                    display: 'flex',
                  }}
                >
                  <Text
                    selectable={false}
                    sx={{
                      minWidth: enlargedWidth * 0.075,
                      right: basketSpacing * (i + 1),
                      color:
                        basketLocation.current === i &&
                        prize.current === '1000K'
                          ? '#FF9300'
                          : dummyText === '1TR' && basketLocation.current !== i
                          ? '#FF9300'
                          : '#7C4800',
                      fontSize: 22 * scale,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {basketLocation.current === i
                      ? prize.current === '0'
                        ? prize.current + 'K'
                        : prize.current === '1000K'
                        ? '1TR'
                        : prize.current
                      : dummyText}
                  </Text>
                </View>
              )
            })}
      </>
    )
  }
}

export default PlinkoPrizeText
