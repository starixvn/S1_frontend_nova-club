import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useInterval from 'app/hooks/useInterval'
import dayjs from 'dayjs'
import { styled, Text, View } from 'dripsy'
import { AnimatePresence, motify } from 'moti'
import { useState } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { useMatchesQuery } from 'services/matchApi'
import { Match } from 'services/matchApi.type'

const animationState = {
  from: { translateY: -50 },
  animate: { translateY: 0 },
  exit: { translateY: 50 },
}

const MatchesSection = () => {
  const { width } = useContainerDimension()
  const [activeIndex, setActiveIndex] = useState<number>(12)

  const { matches, data } = useMatchesQuery(undefined, {
    selectFromResult: (s) => {
      return {
        ...s,
        matches: s.data ? s.data.filter((s) => s.home_team_country) : undefined,
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

  return (
    <ImageBackground
      style={{ width: '100%', height: width / 2.56, alignItems: 'center' }}
      source={require('../../../assets/images/home/matches-bg.jpg')}
    >
      {selectedMatch && <MatchItem match={selectedMatch} />}
    </ImageBackground>
  )
}

const MatchItem = ({ match }: { match: Match }) => {
  const date = dayjs(match.datetime)
  const homeFlag = getFlagPath(match.home_team.name)
  const awayFlag = getFlagPath(match.away_team.name)

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
        name={match.home_team.name}
        image={homeFlag}
        nameFontSize={nameFontSize}
      />
      <View sx={{ width: '26%' }}>
        <View
          sx={{
            mt: '55%',
            height: '20%',
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
        name={match.away_team.name}
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
