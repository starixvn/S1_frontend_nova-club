import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'
import { Row, ScrollView, View, useResponsiveValue } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { SolitoImage } from 'solito/image'
import { HEADER_HEIGHT } from 'utils/constant'
import merge from 'lodash/merge'
import { WINNER_LIST, WINNER_PRIZE } from 'app/features/event/euroCup/Winner'
import PrizeCard from 'app/features/event/euroCup/components/PrizeCard'
import useLocalization from 'app/provider/localization'
import JackpotCard from 'app/features/event/euroCup/components/JackpotCard'
import dayjs from 'dayjs'

const Winner = () => {
  const { t } = useLocalization()
  const { width, height } = useWindowDimensions()
  const contentWidth = useResponsiveValue([380])

  const haveWinner = dayjs().isAfter(dayjs('2024-07-17T04:00:00.000Z'))
  const FINAL_WINNER = haveWinner
    ? merge(WINNER_PRIZE, WINNER_LIST)
    : WINNER_PRIZE

  const FirstRow = FINAL_WINNER.slice(0, 1)
  const SecondRow = FINAL_WINNER.slice(1, 3)
  const ThirdRow = FINAL_WINNER.slice(3)

  return (
    <View sx={{ bg: '#153CDB' }}>
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/bg-win-desktop.png`}
        width={width}
        height={height - HEADER_HEIGHT - NAVIGATION_HEIGHT}
        alt=""
        contentFit="fill"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <ScrollView
        contentContainerSx={{
          height: height - HEADER_HEIGHT - NAVIGATION_HEIGHT,
        }}
      >
        <View sx={{ alignItems: 'center', py: '$5' }}>
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/text-draw.png`}
            width={contentWidth}
            height={contentWidth * (67 / 500)}
            alt=""
            style={{ marginBottom: 24 }}
          />

          {FirstRow.map((item, index) => (
            <PrizeCard
              key={index}
              contentWidth={contentWidth}
              containerImage={item.containerImage}
              prizeImage={item.prizeImage}
              prize={t(item.prize)}
              firstPrize={index === 0}
              winner={item.winner}
            />
          ))}
          <Row sx={{ width: 1000, justifyContent: 'space-evenly' }}>
            {SecondRow.map((item, index) => (
              <PrizeCard
                key={index}
                contentWidth={contentWidth}
                containerImage={item.containerImage}
                prizeImage={item.prizeImage}
                prize={t(item.prize)}
                winner={item.winner}
              />
            ))}
          </Row>
          <Row>
            {ThirdRow.map((item, index) => (
              <PrizeCard
                key={index}
                contentWidth={contentWidth / 1.5}
                containerImage={item.containerImage}
                prizeImage={item.prizeImage}
                prize={t(item.prize)}
                winner={item.winner}
                smallSize={!item.winner}
              />
            ))}
          </Row>

          <View sx={{ mb: '$4' }} />
          <JackpotCard contentWidth={contentWidth} haveWinner={haveWinner} />
        </View>
      </ScrollView>
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/floor-desktop.png`}
        width={width}
        height={60}
        alt=""
        contentFit="fill"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -10,
        }}
      />
    </View>
  )
}

export default Winner
