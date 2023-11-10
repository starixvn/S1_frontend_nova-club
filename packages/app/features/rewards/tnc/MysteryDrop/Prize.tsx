import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useWindowResize from 'app/hooks/useWindowResize'
import { Text, View, styled } from 'dripsy'
import React, { useEffect } from 'react'
import { SolitoImage } from 'solito/image'

type PrizeProps = {
  width: number
  type: 'grand' | 'major' | 'mini'
}

const Prize = ({ width, type = 'grand' }: PrizeProps) => {
  let boardImage

  switch (type) {
    case 'grand':
      boardImage = require('app/assets/images/events/mystery/board-grand.png')
      break
    case 'major':
      boardImage = require('app/assets/images/events/mystery/board-major.png')
      break
    case 'mini':
      boardImage = require('app/assets/images/events/mystery/board-mini.png')
      break

    default:
      break
  }

  return (
    <View sx={{ alignItems: 'center', width }}>
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/${type}.png`}
        alt=""
        width={width * 0.6}
        height={width * 0.6}
        style={{ zIndex: 10 }}
      />
      <View sx={{ position: 'relative' }}>
        <SolitoImage
          src={boardImage}
          alt=""
          width={width}
          height={width * 0.945}
          style={{ marginTop: -75, zIndex: 1 }}
        />
        <View
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
          }}
        >
          <Text>Grand</Text>
          <Text sx={{ fontWeight: 'bold', fontSize: 20 }}>VND 123,456,789</Text>
          <SmallText>Hit range:</SmallText>
          <SmallText>VND 50,000 - VND 70,000</SmallText>
        </View>
      </View>
    </View>
  )
}

const SmallText = styled(Text)({
  fontSize: 12,
})

export default Prize
