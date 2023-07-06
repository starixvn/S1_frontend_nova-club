import { View, Text } from 'dripsy'
import React from 'react'

const basket = 9
const basketPrizeArray = [
  '88K',
  '38K',
  '88K',
  '18K',
  '0K',
  '18K',
  '0K',
  '38K',
  '888K',
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
                  bottom: enlargedHeight * 0.0425,
                  left: basketSpacing * i,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
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
                    bottom: enlargedHeight * 0.0425,
                    left: basketSpacing * i,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    selectable={false}
                    sx={{
                      minWidth: enlargedWidth * 0.075,
                      right: basketSpacing * (i + 1),
                      color: dummyText === '888K' ? '#FF9300' : '#7C4800',
                      fontSize: 22 * scale,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {basketLocation.current === i
                      ? prize.current === '0'
                        ? prize.current + 'K'
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
