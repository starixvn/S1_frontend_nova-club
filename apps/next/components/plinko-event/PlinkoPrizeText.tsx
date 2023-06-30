import { View, Text } from 'dripsy'
import React from 'react'

const basket = 9
const basketPrizeArray = [
  '88K',
  '38K',
  '0K',
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
}

const PlinkoPrizeText = ({
  enlargedHeight,
  enlargedWidth,
  scale,
}: PlinkoPrizeTextProps) => {
  {
    const basketSpacing = enlargedWidth / basket
    return (
      <>
        {basketPrizeArray.map((b, i) => (
          <View
            key={b + i}
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
                color: b === '888K' ? '#FF9300' : '#7C4800',
                fontSize: 22 * scale,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {b}
            </Text>
          </View>
        ))}
      </>
    )
  }
}

export default PlinkoPrizeText
