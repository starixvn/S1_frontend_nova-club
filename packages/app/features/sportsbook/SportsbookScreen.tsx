import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import ScrollToTopWrapper from 'app/components/ScrollToTopWrapper'
import GameCard from 'app/components/game/GameCard'
import { GetGameRebateValue } from 'app/components/game/GameUtilityAction'
import useDefaultParamSelector from 'app/hooks/useDefaultParamSelector'
import useLocalization from 'app/provider/localization'
import { Row, View, useResponsiveValue } from 'dripsy'
import uniqBy from 'lodash/uniqBy'
import React, { useMemo } from 'react'
import { useCommissionTableQuery } from 'services/contentApi'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { GAME_TYPE_CODE, LANGUAGE_NAMESPACE } from 'utils/constant'
import MatchSection from './MatchSection'
import FocusedLocalizationProvider from 'app/provider/localization/FocusedLocalizationProvider'

export default function SportsbookScreen() {
  const { locale, currency } = useDefaultParamSelector()

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

  return (
    <FocusedLocalizationProvider namespace={LANGUAGE_NAMESPACE.MEMBER}>
      <ScrollToTopWrapper>
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
          ListHeaderComponent={
            <View sx={{ gap: '$3', my: '$3' }}>
              <GamePageHeader
                title={'game.category.sportsbook'}
                icon="sportbook"
              />
              <MatchSection />
            </View>
          }
        />
      </ScrollToTopWrapper>
    </FocusedLocalizationProvider>
  )
}
