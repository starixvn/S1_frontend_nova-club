import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useWindowResize from 'app/hooks/useWindowResize'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import React, { useEffect } from 'react'
import { SolitoImage } from 'solito/image'

type PrizeProps = {
  width: number
  type: 'grand' | 'major' | 'mini'
}

const Prize = ({ width, type = 'grand' }: PrizeProps) => {
  const { t } = useLocalization()
  let boardImage
  let textShadowColor
  let typeText

  switch (type) {
    case 'grand':
      boardImage = require('app/assets/images/events/mystery/board-grand.png')
      textShadowColor = '#F80000EB'
      typeText = 'event.mystery.grand'
      break
    case 'major':
      boardImage = require('app/assets/images/events/mystery/board-major.png')
      textShadowColor = '#00CEFFEB'
      typeText = 'event.mystery.major'
      break
    case 'mini':
      boardImage = require('app/assets/images/events/mystery/board-mini.png')
      textShadowColor = '#0AF800EB'
      typeText = 'event.mystery.mini'
      break

    default:
      break
  }

  return (
    <View sx={{ alignItems: 'center', width }}>
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/${type}.png`}
        alt=""
        width={width * 0.5}
        height={width * 0.5}
        style={{ zIndex: 10 }}
      />
      <View sx={{ position: 'relative' }}>
        <SolitoImage
          src={boardImage}
          alt=""
          width={width}
          height={width * 0.945}
          style={{ marginTop: -width * 0.5 * 0.5, zIndex: 1 }}
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
          <Text>{t(typeText)}</Text>
          <Text
            sx={{
              my: '$1',
              fontWeight: 'bold',
              fontSize: 20,
              textShadowColor,
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 12,
            }}
          >
            VND 123,456,789
          </Text>
          <SmallText>{t('event.mystery.hitRange')}:</SmallText>
          <SmallText>VND 50,000 - VND 70,000</SmallText>
        </View>
      </View>
    </View>
  )
}

const SmallText = styled(Text)({
  fontSize: 12,
  opacity: 0.5,
})

export default Prize
