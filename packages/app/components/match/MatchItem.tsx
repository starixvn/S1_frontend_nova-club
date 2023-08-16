import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import {
  MatchHandicapType,
  MatchLeagueLogoMapping,
} from 'app/constants/recMatchMapping'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import { Pressable, Row, Text, View, styled } from 'dripsy'
import { MotiView } from 'moti'
import React, { useState } from 'react'
import { MatchResult } from 'services/matchApi.type'
import { SolitoImage } from 'solito/image'

import { FONT_TOP_OFFSET } from 'app/constants/font'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { MotifiedImage } from '../common/Image'

dayjs.extend(customParseFormat)
interface Props {
  width: number
  match: MatchResult
  onPress: (match: MatchResult) => void
}

export const SCORE_HEIGHT = [20, 30]

export default function MatchItem({ width, match, onPress }: Props) {
  // const leagueLogo = getLeagueLogo(match.LeagueId)
  let dateDisplay = '-'

  try {
    const gmt8 = dayjs(match.globalshowtime, 'MM/DD hh:mmA')
    const gmt7 = dayjsTz(gmt8)

    if (gmt7.isValid())
      dateDisplay = gmt7.format('DD MMM YYYY') + '\n' + gmt7.format('hh:mmA')
  } catch (e) {
    // Android Hermes will hit error if using dayjsTz
  }
  const homeFlag = `${MEDIA_DOMAIN}/nvclub${match.HomeImagePath}`
  const awayFlag = `${MEDIA_DOMAIN}/nvclub${match.AwayImagePath}`
  const leagueLogo = getLeagueLogo(match.LeagueId)
  const homeName = match.HomeName ?? 0
  const awayName = match.AwayName ?? 0
  const homePrice =
    match.selection[MatchHandicapType.FULL_TIME]?.[0]?.Price ?? 0
  const awayPrice =
    match.selection[MatchHandicapType.FULL_TIME]?.[1]?.Price ?? 0
  const homeOdd = match.selection[MatchHandicapType.FULL_TIME]?.[0]?.Point ?? 0
  const awayOdd = match.selection[MatchHandicapType.FULL_TIME]?.[1]?.Point ?? 0

  // console.log(match.LeagueName)
  // console.log(JSON.stringify(match.selection, undefined, 2))

  // console.log(homeFlag)
  return (
    <Pressable
      onPress={() => onPress(match)}
      sx={{
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'white',
        alignSelf: 'center',
      }}
    >
      {/* <Button title="asdff" onPress={onRandom} /> */}
      <View sx={{ position: 'relative' }} pointerEvents="none">
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
          <MotifiedImage
            key={leagueLogo}
            from={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            source={{ uri: leagueLogo }}
            style={{ width: width * 0.23, height: width * 0.056 }}
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
    </Pressable>
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

  return `${MEDIA_DOMAIN}${CONTENT_URI}/flags/${cleanFileName}.png`
}

const LeagueLogo = styled(View)({
  position: 'absolute',
  top: '12%',
  // backgroundColor: 'rgba(255,0,0,0.6)',
  alignSelf: 'center',
})

const Logo = ({ image, sx, size }) => {
  return (
    <LogoView
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
      <MotifiedImage
        key={image}
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        source={{ uri: image }}
        style={{ width: size, height: size }}
        alt="live match"
        resizeMode="contain"
      />
    </LogoView>
  )
}

const LogoView = styled(View)(({}) => ({
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

const fontSize = [11, 12, 14]
const HandicapLabel = styled(Text)(
  ({ color = 'black' }: { color?: string }) => ({
    color,
    mx: ['$1', '$1', '$2', '$2'],
    fontSize,
    mt: FONT_TOP_OFFSET,
    minWidth: 40,
    // lineHeight: SCORE_HEIGHT,
    fontWeight: '500',
  })
)

const MatchTime = styled(Text)(() => ({
  pt: 2,
  fontSize,
  fontWeight: '500',
  width: '25%',
  textAlign: 'center',
}))

const TeamName = styled(Text)(() => ({
  pt: 2,
  fontSize,
  // lineHeight: 14,
  mt: FONT_TOP_OFFSET,
  width: '24%',
  // backgroundColor: 'rgba(255,0,0,0.3)',
  fontWeight: 'bold',
  textAlign: 'center',
}))
