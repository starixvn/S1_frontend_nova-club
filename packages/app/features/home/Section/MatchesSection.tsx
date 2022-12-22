import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useInterval from 'app/hooks/useInterval'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import dayjsTz from 'app/utils/dayjs'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { styled, Text, View } from 'dripsy'
import { AnimatePresence, motify } from 'moti'
import { useState } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { useGetRecoMatchQuery } from 'services/contentApi'
import { Game, Match } from 'services/contentApi.type'

dayjs.extend(customParseFormat)

const animationState = {
  from: { translateY: -50 },
  animate: { translateY: 0 },
  exit: { translateY: 50 },
}

const MatchesSection = () => {
  const { width } = useContainerDimension()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const dispatch = useDispatch()

  const { matches } = useGetRecoMatchQuery(undefined, {
    selectFromResult: (s) => {
      return {
        ...s,
        matches: s.data?.data?.rows,
      }
    },
  })

  const selectedMatch =
    matches && matches.length > activeIndex ? matches?.[activeIndex] : undefined

  useInterval(
    () => {
      if (selectedMatch && matches) {
        if (activeIndex < matches.length - 1) setActiveIndex(activeIndex + 1)
        else setActiveIndex(0)
      }
    },
    matches && matches.length > 0 ? 6000 : null
  )

  const onPress = (match: Match) => {
    const launchAction = {
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
    }

    getAction(launchAction)()
  }

  return (
    <ImageBackground
      style={{ width: '100%', height: width / 2.56 }}
      source={require('../../../assets/images/home/matches-bg.jpg')}
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
  )
}

const MatchItem = ({ match }: { match: Match }) => {
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
      <MatchCol
        name={match.HomeName}
        image={homeFlag}
        nameFontSize={nameFontSize}
        odd={match.selection['1'].Price}
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
        <View sx={{ mt: '61%', height: '7.5%', overflow: 'hidden' }}>
          <OddLabel
            sx={{
              fontSize: oddFontSize,
              lineHeight: oddFontSize * 1.4,
            }}
          >
            {match.selection.x.Price}
          </OddLabel>
        </View>
      </View>
      <MatchCol
        name={match.AwayName}
        image={awayFlag}
        nameFontSize={nameFontSize}
        odd={match.selection['2'].Price}
        oddFontSize={oddFontSize}
      />
    </View>
  )
}

const MatchCol = ({ image, name, nameFontSize, odd, oddFontSize }) => {
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
            {name}
          </CountryLabel>
        </AnimatePresence>
      </View>
      <View
        sx={{
          height: '7.3%',
          mt: '3%',
          justifyContent: 'center',
        }}
      >
        <OddLabel sx={{ fontSize: oddFontSize, lineHeight: oddFontSize * 1.2 }}>
          {odd}
        </OddLabel>
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
        borderRadius: 100,
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
          style={{
            height: '100%',
            aspectRatio: 1,
            width: '100%',
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

const OddLabel = styled(Text)({
  fontSize: 11,
  textAlign: 'center',
  color: 'black',
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
  return `${MEDIA_DOMAIN}/${CONTENT_URI}/flags/${country
    .toLowerCase()
    .replace(/\s/g, '')}.png`
}

export default MatchesSection
