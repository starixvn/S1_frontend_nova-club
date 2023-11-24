import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Text, View, styled } from 'dripsy'
import React, { useState } from 'react'
import { MysteryEventPrize } from 'services/eventApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { SolitoImage } from 'solito/image'
import { CountUp } from 'use-count-up'

type PrizeProps = {
  width: number
  type: 'grand' | 'major' | 'mini'
  prize: MysteryEventPrize
}

const defaultPrize: MysteryEventPrize = { amt: '0', min: '0', max: '0' }

const Prize = ({ width, type = 'grand', prize }: PrizeProps) => {
  const { t } = useLocalization()
  const { currency } = usePlayerProfileQuery()
  const [prevPrize, setPrevPrize] = useState(500000)

  const randomInterval = Math.floor(Math.random() * (7 - 3 + 1) + 3)

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
          {prize && (
            <>
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
                {`VND `}
                <CountUp
                  key={prize.amt}
                  isCounting
                  start={prevPrize}
                  end={Number(prize.amt)}
                  duration={randomInterval}
                  easing="easeOutCubic"
                  thousandsSeparator=","
                  onComplete={() => setPrevPrize(Number(prize.amt))}
                />
              </Text>

              <SmallText>{t('event.mystery.hitRange')}:</SmallText>
              <SmallText>{`VND ${toThousandSeparator(
                prize.min.toString()
              )} - VND ${toThousandSeparator(
                prize.max.toString()
              )}`}</SmallText>
            </>
          )}
        </View>
      </View>
    </View>
  )
}

const SmallText = styled(Text)({
  fontSize: 10,
  opacity: 0.5,
  textAlign: 'center',
})

export default Prize
