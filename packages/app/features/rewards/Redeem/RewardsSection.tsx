import SectionHeader from 'app/components/SectionHeader'
import GameCard from 'app/components/game/GameCard'
import { GameList } from 'app/components/game/GameSectionByProviderItem'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'

const rewardsGame = [
  {
    name: 'draw',
    img: '/cms/game/advp/icon_10030_300x300_bkg_EN_1677050437.jpg',
  },
  {
    name: 'angpao',
    img: '/cms/game/advp/icon_10030_300x300_bkg_EN_1677050437.jpg',
  },
  {
    name: 'catSpin',
    img: '/cms/game/advp/icon_10030_300x300_bkg_EN_1677050437.jpg',
  },
  {
    name: 'catSpin',
    img: '/cms/game/advp/icon_10030_300x300_bkg_EN_1677050437.jpg',
  },
]
const RewardsSection = () => {
  const { t } = useLocalization()

  return (
    <View>
      <SectionHeader
        icon="gift"
        title={t('reward.coinRewards').toUpperCase()}
      />
      <View
        sx={{
          mt: ['$1', '$2'],
          gap: ['$2', '$3'],
          mx: ['$2', '$3'],
        }}
      >
        <GameList data={rewardsGame} />
      </View>
    </View>
  )
}

export default RewardsSection
