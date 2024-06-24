import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import {
  Row,
  ScrollView,
  Text,
  View,
  styled,
  useResponsiveValue,
  useSx,
} from 'dripsy'
import React from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { SolitoImage } from 'solito/image'
import PrizeCard from './components/PrizeCard'
import JackpotCard from './components/JackpotCard'
import merge from 'lodash/merge'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import dayjs from 'dayjs'

type WINNER = {
  containerImage: string
  winnerImage2?: string
  prizeImage: string
  prize: string
  winner?: string[]
}

export const WINNER_PRIZE: WINNER[] = [
  {
    containerImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/winner1.png`,
    prizeImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/prize1.png`,
    prize: 'event.euro.prize.p1',
  },
  {
    containerImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/winner2.png`,
    prizeImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/prize2.png`,
    prize: 'event.euro.prize.p2',
  },
  {
    containerImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/winner3.png`,
    prizeImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/prize3.png`,
    prize: 'event.euro.prize.p3',
  },
  {
    containerImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/winner4-small.png`,
    prizeImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/prize4.png`,
    prize: 'event.euro.prize.p4',
  },
  {
    containerImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/winner4-small.png`,
    prizeImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/prize5.png`,
    prize: 'event.euro.prize.p5',
  },
  {
    containerImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/winner4-small.png`,
    prizeImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/prize6.png`,
    prize: 'event.euro.prize.p6',
  },
  {
    containerImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/winner4-small.png`,
    prizeImage: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/prize7.png`,
    prize: 'event.euro.prize.p7',
  },
]

export const WINNER_LIST = [
  {
    winner: ['Name1'],
  },
  {
    winner: ['Name1', 'Name2'],
  },
  {
    winner: ['Name1', 'Name2', 'Name3', 'Name4', 'Name5'],
  },
  {
    winner: [
      'Name1',
      'Name2',
      'Name3',
      'Name4',
      'Name5',
      'Name6',
      'Name7',
      'Name8',
      'Name9',
      'Name10',
    ],
  },
  {
    winner: [
      'Name1',
      'Name2',
      'Name3',
      'Name4',
      'Name5',
      'Name6',
      'Name7',
      'Name8',
      'Name9',
      'Name10',
    ],
  },
  {
    winner: [
      'Name1',
      'Name2',
      'Name3',
      'Name4',
      'Name5',
      'Name6',
      'Name7',
      'Name8',
      'Name9',
      'Name10',
    ],
  },
  {
    winner: [
      'Name1',
      'Name2',
      'Name3',
      'Name4',
      'Name5',
      'Name6',
      'Name7',
      'Name8',
      'Name9',
      'Name10',
    ],
  },
]

const Winner = () => {
  const { t } = useLocalization()
  const { width, height } = useWindowDimensions()
  const HeaderHeight = useResponsiveValue([50, 60])
  const contentWidth = useResponsiveValue([width < 380 ? 360 : 380])

  const { bottom } = useSafeArea()
  const sx = useSx()

  const haveWinner = dayjs().isAfter(dayjs('2024-07-17T04:00:00.000Z'))
  const FINAL_WINNER = haveWinner
    ? merge(WINNER_PRIZE, WINNER_LIST)
    : WINNER_PRIZE

  return (
    <PageWithBackHeader
      disableScrollView
      header={{ title: t('event.euro.tnc.prizes') }}
    >
      <View sx={{ bg: '#153CDB' }}>
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/bg-win-mobile.png`}
          width={width}
          height={height - HeaderHeight}
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
          contentContainerSx={
            Platform.OS === 'web' ? { height: height - HeaderHeight } : {}
          }
        >
          <View sx={{ alignItems: 'center', pb: ['$4', '$6'] }}>
            <SolitoImage
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/text-draw.png`}
              width={contentWidth}
              height={contentWidth * (67 / 500)}
              alt=""
              style={{ marginVertical: 24 }}
            />

            {FINAL_WINNER.map((item, index) => (
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

            <JackpotCard contentWidth={contentWidth} haveWinner={haveWinner} />
          </View>
        </ScrollView>

        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/floor-mobile.png`}
          width={width}
          height={80}
          alt=""
          contentFit="fill"
          style={sx({
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: [-bottom],
          })}
        />
      </View>
    </PageWithBackHeader>
  )
}

export const WinnerText = styled(Text)({ color: 'black', fontSize: 11 })

export default Winner
