import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { MatchLeagueLogoMapping } from 'app/constants/recMatchMapping'
import dayjsTz from 'app/utils/dayjs'
import dayjs, { Dayjs } from 'dayjs'
import { Row, Text, View, styled } from 'dripsy'
import { MotiView } from 'moti'
import React, { useState } from 'react'
import { MatchResult } from 'services/matchApi.type'
import { SolitoImage } from 'solito/image'

import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
interface Props {
  width: number
  match: MatchResult
}

export const SCORE_HEIGHT = 20

export default function MatchItem({ width, match }: Props) {
  // const leagueLogo = getLeagueLogo(match.LeagueId)

  let gmt7: Dayjs

  try {
    const gmt8 = dayjs(match.globalshowtime, 'MM/DD hh:mmA')
    gmt7 = dayjsTz(gmt8)
    console.log('gmt7', gmt7)
  } catch (e) {
    // Android Hermes will hit error if using dayjsTz
    console.log('gmt7 error', e)
  }
  const homeFlag = getFlagPath(match.HomeName)
  const awayFlag = getFlagPath(match.AwayName)
  const leagueLogo = getLeagueLogo(match.LeagueId)
  const homeName = match.selection[0]?.KeyName
  const awayName = match.selection[1]?.KeyName
  const homePrice = match.selection[0]?.Price ?? 0
  const awayPrice = match.selection[1]?.Price ?? 0
  const homeOdd = match.selection[0]?.Point ?? 0
  const awayOdd = match.selection[1]?.Point ?? 0

  const dateDisplay =
    gmt7 && gmt7.isValid()
      ? gmt7.format('DD MMM YYYY') + '\n' + gmt7.format('hh:mmA')
      : ''

  return (
    <View
      sx={{
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'white',
        alignSelf: 'center',
      }}
    >
      {/* <Button title="asdff" onPress={onRandom} /> */}
      <View sx={{ position: 'relative' }}>
        <SolitoImage
          src={require('app/assets/images/match/fullbg.jpg')}
          alt="live match"
          width={width}
          height={width / 3}
          resizeMode="cover"
        />
        <Logo image={homeFlag} sx={{ left: '17%' }} size={width * 0.15} />
        <Logo image={awayFlag} sx={{ right: '17%' }} size={width * 0.15} />
        <LeagueLogo>
          <SolitoImage
            alt="league"
            src={leagueLogo}
            width={width * 0.23}
            height={width * 0.056}
            resizeMode="contain"
          />
        </LeagueLogo>
        <Row
          sx={{
            position: 'absolute',
            width: '100%',
            top: '71%',
            // backgroundColor: 'rgba(0,255,255,0.8)',
            height: '27%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TeamName numberOfLines={1}>{homeName}</TeamName>
          <MatchTime>{dateDisplay}</MatchTime>
          <TeamName numberOfLines={1}>{awayName}</TeamName>
        </Row>
      </View>
      <Row sx={{ height: SCORE_HEIGHT, bg: 'white', alignItems: 'center' }}>
        <HandicapColumn>
          <HandicapLabel>{formatOdd(homeOdd)}</HandicapLabel>
          <HandicapLabel color={'red'}>{homePrice}</HandicapLabel>
        </HandicapColumn>
        <HandicapColumn>
          <HandicapLabel>{formatOdd(awayOdd)}</HandicapLabel>
          <HandicapLabel color={'red'}>{awayPrice}</HandicapLabel>
        </HandicapColumn>
      </Row>
    </View>
  )
}

function getLeagueLogo(leagueId: number) {
  return `${MEDIA_DOMAIN}${CONTENT_URI}/home/matches/${MatchLeagueLogoMapping[leagueId]}`
}

function formatOdd(price) {
  return price > 0 ? `+${price}` : price
}

function getFlagPath(country: string) {
  const cleanFileName = country.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')

  return `${MEDIA_DOMAIN}/${CONTENT_URI}/flags/${cleanFileName}.png`
}

const LeagueLogo = styled(View)({
  position: 'absolute',
  top: '12%',
  // backgroundColor: 'rgba(255,0,0,0.6)',
  alignSelf: 'center',
})

const Logo = ({ image, sx, size }) => {
  return (
    <LogoAnimatedView
      sx={sx}
      // animate={{
      //   transform: [
      //     { translateY: [{ value: -100 }, 0, 0] },
      //     {
      //       scaleY: [1, { value: 1.4, type: 'spring' }, 1],
      //     },
      //   ],
      // }}
    >
      <SolitoImage
        src={image}
        alt="live match"
        width={size}
        height={size}
        resizeMode="contain"
      />
    </LogoAnimatedView>
  )
}

const LogoAnimatedView = styled(MotiView)(({}) => ({
  position: 'absolute',
  top: '18%',
  zIndex: 1,
}))

const Field = ({ width }) => {
  const soccerBgHeight = width / (600 / 121)
  const [test, setTest] = useState('0')

  function onRandom() {
    setTest(Math.random().toString())
  }
  return (
    <MotiView
      key={test}
      transition={{ type: 'timing', duration: 1000 }}
      from={{
        transform: [
          {
            translateY: soccerBgHeight,
          },
          {
            rotateX: '-90deg',
          },
        ],
      }}
      animate={{
        transform: [
          {
            translateY: soccerBgHeight,
          },
          {
            rotateX: '0deg',
          },
        ],
      }}
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}
    >
      <SolitoImage
        src={require('app/assets/images/match/bgSoccer.png')}
        alt="live match"
        width={width}
        height={soccerBgHeight}
        style={{ marginBottom: soccerBgHeight }}
      />
    </MotiView>
  )
}

const HandicapColumn = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
})

const HandicapLabel = styled(Text)(
  ({ color = 'black' }: { color?: string }) => ({
    color,
    mx: '$1',
    fontSize: [11, 12],
    lineHeight: SCORE_HEIGHT,
    fontWeight: '500',
  })
)

const MatchTime = styled(Text)(() => ({
  pt: 2,
  fontSize: [10, 12, 14],
  fontWeight: '500',
  width: '25%',
  textAlign: 'center',
}))

const TeamName = styled(Text)(() => ({
  pt: 2,
  fontSize: [10, 12, 14],
  lineHeight: 14,
  width: '24%',
  // backgroundColor: 'rgba(255,0,0,0.3)',
  fontWeight: 'bold',
  textAlign: 'center',
}))
