import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Row, Text, View, styled } from 'dripsy'
import { MotiView } from 'moti'
import React, { useState } from 'react'
import { Button, useWindowDimensions } from 'react-native'
import { MatchResult } from 'services/matchApi.type'
import { SolitoImage } from 'solito/image'

interface Props {
  width: number
  match: MatchResult
}

export const SCORE_HEIGHT = 20

export default function MatchItem({ width, match }: Props) {
  const [test, setTest] = useState('0')

  function onRandom() {
    setTest(Math.random().toString())
  }
  console.log('MEDIA_DOMAIN', MEDIA_DOMAIN)
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
        <Logo
          key={test + '1'}
          name="westhamunited"
          sx={{ left: '17%' }}
          size={width * 0.15}
        />
        <Logo
          key={test + '2'}
          name="westhamunited"
          sx={{ right: '17%' }}
          size={width * 0.15}
        />
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
          <TeamName numberOfLines={1}>PORTODFFSDFDSF</TeamName>
          <MatchTime>{'15 MAR 2023\n04:00AM'}</MatchTime>
          <TeamName numberOfLines={1}>INTERDFDFDSFDF</TeamName>
        </Row>
      </View>
      <Row sx={{ height: SCORE_HEIGHT, bg: 'white', alignItems: 'center' }}>
        <HandicapColumn>
          <HandicapLabel>-0.25</HandicapLabel>
          <HandicapLabel color={'red'}>-0.25</HandicapLabel>
        </HandicapColumn>
        <HandicapColumn>
          <HandicapLabel>-0.25</HandicapLabel>
          <HandicapLabel color={'red'}>-0.25</HandicapLabel>
        </HandicapColumn>
      </Row>
    </View>
  )
}

function getFlagPath(country: string) {
  const cleanFileName = country.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')

  return `https://static.zzspeed.site/${CONTENT_URI}/flags/${cleanFileName}.png`
}

const Logo = ({ name, sx, size }) => {
  const image = getFlagPath(name)
  return (
    <LogoAnimatedView
      sx={sx}
      animate={{
        transform: [
          { translateY: [{ value: -100 }, 0, 0] },
          {
            scaleY: [1, { value: 1.4, type: 'spring' }, 1],
          },
        ],
      }}
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
  fontSize: [9, 12, 14],
  fontWeight: '500',
  width: '25%',
  textAlign: 'center',
}))

const TeamName = styled(Text)(() => ({
  pt: 2,
  fontSize: [8, 10, 12],
  lineHeight: 14,
  width: '24%',
  // backgroundColor: 'rgba(255,0,0,0.3)',
  fontWeight: 'bold',
  textAlign: 'center',
}))
