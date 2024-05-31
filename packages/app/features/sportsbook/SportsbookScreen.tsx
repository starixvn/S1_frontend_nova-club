import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import ScrollToTopWrapper from 'app/components/ScrollToTopWrapper'
import GameCard from 'app/components/game/GameCard'
import { GetGameRebateValue } from 'app/components/game/GameUtilityAction'
import { LEAGUE_SECTION } from 'app/constants/recMatchMapping'
import useDefaultParamSelector from 'app/hooks/useDefaultParamSelector'
import useLocalization from 'app/provider/localization'
import FocusedLocalizationProvider from 'app/provider/localization/FocusedLocalizationProvider'
import { Row, View, useResponsiveValue } from 'dripsy'
import uniqBy from 'lodash/uniqBy'
import { default as React, useEffect, useMemo } from 'react'
import { Platform } from 'react-native'
import { useCommissionTableQuery } from 'services/contentApi'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { createParam } from 'solito'
import { GAME_TYPE_CODE, LANGUAGE_NAMESPACE } from 'utils/constant'
import MatchSection from './MatchSection'
import EuroSection from './euro/EuroSection'
import EuroSectionHeader from './euro/EuroSectionHeader'

type Params = {
  section?: string
}

const { useParam } = createParam<Params>()

export default function SportsbookScreen() {
  const { t } = useLocalization()
  const { locale, currency } = useDefaultParamSelector()
  const [leagueSection, setLeagueSection] = useParam('section', {
    parse: (templateFromUrl) => {
      if (templateFromUrl) return templateFromUrl
      return LEAGUE_SECTION.LEAGUE_ODDS
    },
    initial: LEAGUE_SECTION.LEAGUE_ODDS,
  })

  useEffect(() => {
    if (leagueSection === undefined)
      setLeagueSection(LEAGUE_SECTION.LEAGUE_ODDS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueSection])

  const { data } = useGetGameListByCategoryQuery({
    currency,
    categories: [
      GAME_TYPE_CODE.SPORTS,
      GAME_TYPE_CODE.E_SPORTS,
      GAME_TYPE_CODE.VIRTUAL_SPORTS,
    ],
  })

  const { data: commissionList } = useCommissionTableQuery({
    currency,
  })

  const numColumns = useResponsiveValue([2, 3, 3, 4])

  const providers = useMemo(() => {
    if (data) return uniqBy(data, (d) => [d.gpc, d.gtc].join())
    else return []
  }, [data])

  function renderItem({ item, index }: { item: Game; index: number }) {
    const isMostLeft = index % numColumns === 0
    const isMostRight = index % numColumns === numColumns - 1
    const isMiddle = !isMostLeft && !isMostRight
    const spacePercentage = 5

    return (
      <Row
        sx={{
          flex: 1,
          ml: isMostLeft ? `${spacePercentage}%` : 0,
          mr: isMostRight ? `${spacePercentage}%` : 0,
        }}
      >
        <GameCard
          showRebate={true}
          rebateText={GetGameRebateValue({
            commissionList,
            gtc: item.gtc,
            gpc: item.gpc,
          })}
          rebateTop
          sx={{
            my: `${spacePercentage}%`,
            flex: 1,
            mx: isMiddle ? `${spacePercentage * 1.5}%` : `${spacePercentage}%`,
          }}
          isDualVersion
          {...item}
          img={item.img[locale]}
          xImg={item.xImg?.[locale]}
        />
      </Row>
    )
  }

  const SportsbookSection = useMemo(() => {
    switch (leagueSection) {
      case LEAGUE_SECTION.EURO_MATCH:
        return (
          <EuroSection
            leagueSection={leagueSection}
            onPress={setLeagueSection}
          />
        )
      case LEAGUE_SECTION.EURO_STANDINGS:
        return (
          <EuroSection
            leagueSection={leagueSection}
            onPress={setLeagueSection}
          />
        )

      case LEAGUE_SECTION.LEAGUE_ODDS:
      default:
        return (
          <FlashList
            key={numColumns}
            estimatedItemSize={160}
            showsVerticalScrollIndicator={false}
            data={providers}
            renderItem={renderItem}
            numColumns={numColumns}
            contentContainerStyle={{
              paddingBottom: 40,
            }}
            extraData={commissionList}
          />
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commissionList, leagueSection, providers, numColumns])

  return (
    <FocusedLocalizationProvider namespace={LANGUAGE_NAMESPACE.MEMBER}>
      <ScrollToTopWrapper>
        <View sx={{ gap: '$3', my: '$3' }}>
          {leagueSection === LEAGUE_SECTION.LEAGUE_ODDS ? (
            <GamePageHeader
              title={t('game.category.sportsbook')}
              icon="sportbook"
            />
          ) : (
            <EuroSectionHeader />
          )}
          <MatchSection />
          {SportsbookSection}
        </View>
      </ScrollToTopWrapper>
    </FocusedLocalizationProvider>
  )
}
