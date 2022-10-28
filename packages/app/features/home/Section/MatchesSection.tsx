import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useInterval from 'app/hooks/useInterval'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import { styled, Text, View } from 'dripsy'
import { AnimatePresence, motify } from 'moti'
import { useCallback, useState } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { useGetRecoMatchQuery } from 'services/contentApi'
import { Game, Match } from 'services/contentApi.type'
import FifaTeam from '../../../config/fifa'

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
          matchid: match.selection?.a?.MarketID.toString(),
        },
      } as Game,
    }

    getAction(launchAction)()
  }

  return (
    <ImageBackground
      style={{ width: '100%', height: width / 2.56, alignItems: 'center' }}
      source={require('../../../assets/images/home/matches-bg.jpg')}
    >
      {selectedMatch && (
        <TouchableOpacity onPress={() => onPress(selectedMatch)}>
          <MatchItem match={selectedMatch} />
        </TouchableOpacity>
      )}
    </ImageBackground>
  )
}

const MatchItem = ({ match }: { match: Match }) => {
  const date = dayjsTz(
    dayjs(match.globalshowtime, 'MM/DD hh:mmA').tz('Asia/Hong_Kong')
  )
  const homeFlag = FifaTeam[match.HomeKey]
  const awayFlag = FifaTeam[match.AwayKey]

  const { width } = useContainerDimension()
  const nameFontSize = width * 0.03

  const dateDisplay = date.format('DD MMM YYYY') + '\n' + date.format('hh:mmA')

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
      </View>
      <MatchCol
        name={match.AwayName}
        image={awayFlag}
        nameFontSize={nameFontSize}
      />
    </View>
  )
}

const MatchCol = ({ image, name, nameFontSize }) => {
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
            sx={{ fontSize: nameFontSize }}
          >
            {name}
          </CountryLabel>
        </AnimatePresence>
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

function getFlagPath(name) {
  let mappedName = name
  switch (mappedName) {
    case 'United States': {
      mappedName = 'united-states-of-america'
      break
    }

    case 'Korea Republic': {
      mappedName = 'south-korea'
      break
    }
  }

  return `https://cdn.countryflags.com/thumbs/${mappedName
    .replace(/\s+/g, '-')
    .toLowerCase()}/flag-square-250.png`
}

export default MatchesSection
