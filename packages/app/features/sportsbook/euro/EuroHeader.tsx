import { LEAGUE_SECTION } from 'app/constants/recMatchMapping'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import { Pressable, Row } from 'dripsy'
import React from 'react'

const EuroHeader = ({ leagueSection, onPress }) => {
  const { t } = useLocalization()

  return (
    <Row
      sx={{
        py: '$2',
        px: '$4',
        bg: '$primaryEuro.700',
        gap: '$4',
        borderTopWidth: 1,
        borderColor: 'white',
      }}
    >
      <HeaderItem
        label={t('event.euro.sportsbook.matches')}
        active={leagueSection === LEAGUE_SECTION.EURO_MATCH}
        onPress={() => onPress(LEAGUE_SECTION.EURO_MATCH)}
      />
      <HeaderItem
        label={t('event.euro.sportsbook.standings')}
        active={leagueSection === LEAGUE_SECTION.EURO_STANDINGS}
        onPress={() => onPress(LEAGUE_SECTION.EURO_STANDINGS)}
      />
    </Row>
  )
}

const HeaderItem = ({ active, label, onPress }) => (
  <Pressable onPress={onPress} sx={{ flex: 1 }}>
    <SelectorView
      sx={{
        bg: active ? '$primary.500' : '$primaryEuro.500',
      }}
    >
      <SelectorText>{label}</SelectorText>
    </SelectorView>
  </Pressable>
)

const SelectorView = styled(View)({
  py: '$1',
  borderRadius: 24,
  borderColor: 'white',
  borderWidth: 1,
})

const SelectorText = styled(Text)({
  textAlign: 'center',
})

export default EuroHeader
