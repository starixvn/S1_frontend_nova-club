import DraggableScrollView from 'app/components/DraggableScrollView'
import SectionHeader from 'app/components/SectionHeader'
import TopGameCard, { height } from 'app/components/game/TopGameCard'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Text, View, styled } from 'dripsy'
import maxBy from 'lodash/maxBy'
import uniqBy from 'lodash/uniqBy'
import { MotiText } from 'moti'
import React, { useMemo } from 'react'
import { useCommissionTableQuery } from 'services/contentApi'
import { useFeaturedGameListQuery } from 'services/gameApi'
import { Currency } from 'utils/constant'

export default function TopGameSection(props) {
  const { t } = useLocalization()
  const lang = useAppSelector((state) => state.setting.locale)

  const { data: commissionList } = useCommissionTableQuery({
    currency: Currency.VND,
  })

  const { data } = useFeaturedGameListQuery(undefined, {
    selectFromResult: (s) => {
      return {
        ...s,
        data: s.data?.filter((g) => g.cat === '2'),
      }
    },
  })

  const desktopMode = useIsDesktop()

  const uptoRate = useMemo(() => {
    if (commissionList && commissionList.length > 0 && data) {
      const availableProviders = uniqBy(data, 'gpc').map((g) => g.gpc)
      const highestObj = maxBy(commissionList, (c) =>
        availableProviders.includes(c.system_code)
          ? c.cash_agent + c.cash_player + c.cash_player_referrer
          : 0
      )

      if (highestObj)
        return (
          highestObj.cash_agent +
          highestObj.cash_player +
          highestObj.cash_player_referrer
        )
    }

    return 0
  }, [commissionList, data])

  const animatedText = useMemo(
    () => (
      <StyledMotiText
        key={uptoRate.toString() + t('home.upTo')}
        from={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 500,
        }}
        sx={{ mt: FONT_TOP_OFFSET }}
      >
        {t('home.upTo', {
          percent: uptoRate,
        })}
      </StyledMotiText>
    ),
    [t('home.upTo'), uptoRate]
  )

  return (
    <View {...props}>
      <SectionHeader
        icon="crown"
        title={t('game.category.recommended').toUpperCase()}
      >
        {uptoRate > 0 && (
          <View
            sx={{
              px: '$3',
              // py: '$1',
              height: 24,
              bg: '$primary.500',
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {animatedText}
          </View>
        )}
      </SectionHeader>
      <DraggableScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerSx={{
          gap: ['$2', '$3'],
          px: ['$2', '$3'],
          mt: '$3',
          height: height,
        }}
      >
        {data?.map((g, i) => {
          return (
            <TopGameCard
              key={i}
              game={g}
              desktopMode={desktopMode}
              isOnGoing={g.ongoing}
            />
          )
        })}
      </DraggableScrollView>
    </View>
  )
}

const StyledMotiText = styled(MotiText)({
  color: '$secondary.100',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 11,
})
