import DraggableScrollView from 'app/components/DraggableScrollView'
import SectionHeader from 'app/components/SectionHeader'
import TopGameCard, { height } from 'app/components/game/TopGameCard'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Text, View, styled } from 'dripsy'
import { MotiText } from 'moti'
import React, { useMemo } from 'react'
import { useFeaturedGameListQuery } from 'services/gameApi'

export default function TopGameSection(props) {
  const { t } = useLocalization()
  const lang = useAppSelector((state) => state.setting.locale)
  const { data } = useFeaturedGameListQuery(undefined, {
    selectFromResult: (s) => {
      return {
        ...s,
        data: s.data?.filter((g) => g.cat === '2'),
      }
    },
  })

  const desktopMode = useIsDesktop()

  const AnimateText = useMemo(
    () => (
      <StyledMotiText
        key={lang}
        from={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 500,
        }}
      >
        {t('home.upTo')}
      </StyledMotiText>
    ),
    [lang]
  )
  return (
    <View {...props}>
      <SectionHeader icon="crown" title={t('game.category.recommended')}>
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
          {AnimateText}
        </View>
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
