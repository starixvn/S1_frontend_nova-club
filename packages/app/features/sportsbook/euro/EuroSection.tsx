import { LEAGUE_SECTION } from 'app/constants/recMatchMapping'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { useMemo } from 'react'
import EuroHeader from './EuroHeader'
import EuroMatches from './EuroMatches'

const EuroSection = ({ leagueSection, onPress }) => {
  const { t } = useLocalization()

  const Section = useMemo(() => {
    switch (leagueSection) {
      case LEAGUE_SECTION.EURO_MATCH:
        return <EuroMatches />

      default:
        break
    }
  }, [leagueSection])

  return (
    <View>
      <EuroHeader leagueSection={leagueSection} onPress={onPress} />

      {Section}
    </View>
  )
}

export default EuroSection
