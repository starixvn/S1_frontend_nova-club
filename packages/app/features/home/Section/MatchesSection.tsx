import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import {
  MatchLeagueColorMapping,
  MatchLeagueLogoMapping,
  MatchNameMapping,
} from 'app/config/matches/MatchNameMapping'

import useContainerDimension from 'app/hooks/useContainerDimension'
import useInterval from 'app/hooks/useInterval'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import dayjsTz from 'app/utils/dayjs'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Flex, styled, Text, View } from 'dripsy'
import { AnimatePresence, motify, MotiView } from 'moti'
import { useState } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { useGetRecoMatchQuery } from 'services/contentApi'
import { Game, MatchResult } from 'services/contentApi.type'

dayjs.extend(customParseFormat)

const animationState = {
  from: { translateY: -50, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
  exit: { translateY: 50, opacity: 0 },
}

const horizontalAnimationState = {
  from: { scaleX: 0 },
  animate: { scaleX: 1, opacity: 1 },
  exit: { scaleX: 0 },
}

const MatchesSection = () => {
  const { width } = useContainerDimension()
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const { matches } = useGetRecoMatchQuery(undefined, {
    selectFromResult: (s) => {
      return {
        ...s,
        matches: s.data?.data,
      }
    },
  })

  const selectedMatch =
    matches && matches.length > activeIndex ? matches?.[activeIndex] : undefined

  const selectedBgColor =
    matches && matches.length > activeIndex
      ? MatchLeagueColorMapping[matches?.[activeIndex]?.LeagueId ?? 0]
      : null

  useInterval(
    () => {
      if (selectedMatch && matches) {
        if (activeIndex < matches.length - 1) setActiveIndex(activeIndex + 1)
        else setActiveIndex(0)
      }
    },
    matches && matches.length > 0 ? 6000 : null
  )

  const onPress = (match: MatchResult) => {
    getAction({
      type: ActionType.GAME,
      payload: {
        gc: '1',
        name: {
          en: 'SABA Sports',
          vi: 'SABA Sports',
        },
        gtc: 'sports',
        img: 'https://static-stage.gball8.com/nvclub/sbe/cms/game/saba/sport-saba_1659947637.png',
        gpc: 'SABA',
        tags: [],
        params: {
          leaguekey: match.LeagueId.toString(),
          matchid: match.EventId.toString(),
        },
      } as Game,
    })()
  }

  return (
    <View sx={{ position: 'relative' }}>
      <MatchesBackground bgColor={selectedBgColor} />
      <ImageBackground
        style={{ width: '100%', height: width / 2.56 }}
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/home/matches/matches-bg.png?v=2`,
        }}
      >
        {selectedMatch && (
          <TouchableOpacity
            onPress={() => onPress(selectedMatch)}
            sx={{ width: '100%', height: '100%', alignItems: 'center' }}
          >
            <MatchItem match={selectedMatch} />
          </TouchableOpacity>
        )}
      </ImageBackground>
    </View>
  )
}

const MatchesBackground = ({ bgColor }) => {
  return (
    <View
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <AnimatePresence>
        <MotiView
          key={bgColor}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          style={{
            backgroundColor: bgColor,
            ...StyleSheet.absoluteFillObject,
          }}
        />
      </AnimatePresence>
    </View>
  )
}

const MatchItem = ({ match }: { match: MatchResult }) => {
  const gmt8 = dayjs.tz(match.globalshowtime, 'MM/DD hh:mmA', 'Asia/Hong_Kong')
  let gmt7: Dayjs

  try {
    gmt7 = dayjsTz(gmt8)
  } catch (e) {
    // Android Hermes will hit error if using dayjsTz
    console.log('gmt7 error', e)
  }
  const homeFlag = getFlagPath(match.HomeName)
  const awayFlag = getFlagPath(match.AwayName)
  const leagueLogo = getLeagueLogo(match.LeagueId)
  const homeSelection = match.selection?.find((el) => el.Key === 'h')
  const awaySelection = match.selection?.find((el) => el.Key === 'a')
  const homeOdd = homeSelection?.Point ?? match.selection?.[0].Point ?? 0
  const awayOdd = awaySelection?.Point ?? match.selection?.[1].Point ?? 0
  const homePrice = homeSelection?.Price ?? match.selection?.[0].Price ?? 0
  const awayPrice = awaySelection?.Price ?? match.selection?.[1].Price ?? 0

  const { width } = useContainerDimension()
  const nameFontSize = width * 0.03

  const dateDisplay =
    gmt7 && gmt7.isValid()
      ? gmt7.format('DD MMM YYYY') + '\n' + gmt7.format('hh:mmA')
      : ''
  const oddFontSize = width * 0.02

  return (
    <View
      sx={{
        height: '100%',
        width: '82%',
        px: '3%',
        flexDirection: 'row',
      }}
    >
      <LeagueLogo image={leagueLogo} />

      <MatchCol
        name={match.HomeName}
        image={homeFlag}
        nameFontSize={nameFontSize}
        odd={formatOdd(homeOdd)}
        price={homePrice}
        oddFontSize={oddFontSize}
      />
      <View sx={{ width: '26%' }}>
        <View
          sx={{
            mt: '55%',
            height: '18%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence>
            <TimeLabel
              key={dateDisplay}
              {...animationState}
              numberOfLines={2}
              allowFontScaling={false}
              sx={{ fontSize: nameFontSize, lineHeight: nameFontSize * 1.1 }}
            >
              {dateDisplay}
            </TimeLabel>
          </AnimatePresence>
        </View>
        {/* <View sx={{ mt: '61%', height: '7.5%', overflow: 'hidden' }}>
          <OddLabel
            sx={{
              fontSize: oddFontSize,
              lineHeight: oddFontSize * 1.4,
            }}
          >
            {`${match.selection[0].Point} | ${match.selection[1].Point}`}
          </OddLabel>
        </View> */}
      </View>
      <MatchCol
        name={match.AwayName}
        image={awayFlag}
        nameFontSize={nameFontSize}
        odd={formatOdd(awayOdd)}
        price={awayPrice}
        oddFontSize={oddFontSize}
      />
    </View>
  )
}

const MatchCol = ({ image, name, nameFontSize, odd, oddFontSize, price }) => {
  return (
    <View
      sx={{
        height: '100%',
        flex: 1,
      }}
    >
      <View
        sx={{
          mt: '21%',
          height: '40%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Flag image={image} />
      </View>
      <View
        sx={{
          height: '11%',
          mt: '4%',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence>
          <CountryLabel
            key={name}
            {...animationState}
            sx={{ fontSize: nameFontSize, lineHeight: nameFontSize * 1.2 }}
          >
            {formatName(name)}
          </CountryLabel>
        </AnimatePresence>
      </View>
      <View
        sx={{
          height: '7.3%',
          mt: '3%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <OddLabel
          key={'odd' + odd}
          {...horizontalAnimationState}
          sx={{ fontSize: oddFontSize, lineHeight: oddFontSize * 1.2 }}
        >
          {odd}
        </OddLabel>
        <PriceLabel
          key={'price' + price}
          {...horizontalAnimationState}
          sx={{ fontSize: oddFontSize, lineHeight: oddFontSize * 1.2 }}
        >
          {price}
        </PriceLabel>
      </View>
    </View>
  )
}

const Flag = ({ image }) => {
  return (
    <View
      sx={{
        width: '40%',
        aspectRatio: 1,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,1)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <AnimatePresence>
        <FlagIcon
          key={image}
          from={{ scaleX: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ scaleX: 0 }}
          resizeMode="contain"
          style={{
            margin: '5%',
            height: '90%',
            aspectRatio: 1,
            width: '90%',
            ...StyleSheet.absoluteFillObject,
          }}
          source={{
            uri: image,
          }}
        />
      </AnimatePresence>
    </View>
  )
}

const LeagueLogo = ({ image }) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        mt: '1.8%',
        height: '18%',
      }}
    >
      <View
        sx={{
          width: '25%',
          height: '80%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence>
          <FlagIcon
            key={image}
            from={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            resizeMode="contain"
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
            source={{
              uri: image,
            }}
          />
        </AnimatePresence>
      </View>
    </Flex>
  )
}

const OddLabel = styled(motify(Text)())({
  fontSize: 11,
  textAlign: 'center',
  color: 'black',
  fontWeight: 'bold',
  mr: 12,
})
const PriceLabel = styled(motify(Text)())({
  fontSize: 11,
  textAlign: 'center',
  color: '$accent',
  fontWeight: 'bold',
})

const TimeLabel = styled(motify(Text)())({
  color: '#660032',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  position: 'absolute',
  textAlign: 'center',
})

const CountryLabel = styled(motify(Text)())({
  fontWeight: 'bold',
  textTransform: 'uppercase',
  textAlign: 'center',
  color: 'white',
  position: 'absolute',
  left: 0,
  right: 0,
})

const FlagIcon = motify(Image)()

function getFlagPath(country: string) {
  const cleanFileName = country.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')

  return `${MEDIA_DOMAIN}${CONTENT_URI}/flags/${cleanFileName}.png`
}

function getLeagueLogo(leagueId: number) {
  return `${MEDIA_DOMAIN}${CONTENT_URI}/home/matches/${MatchLeagueLogoMapping[leagueId]}`
}

function formatName(name) {
  const removedMultiSpace = name.replace(/\s{2,}/g, ' ')

  return MatchNameMapping[removedMultiSpace] ?? removedMultiSpace
}

function formatOdd(price) {
  return price > 0 ? `+${price}` : price
}

export default MatchesSection
