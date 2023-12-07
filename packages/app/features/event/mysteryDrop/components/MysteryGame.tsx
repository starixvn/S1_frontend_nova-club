import { Text, View } from 'dripsy'
import React from 'react'
import { TitleText } from './IntroColumn'
import HorizontalGameList from 'app/components/game/HorizontalGameList'
import { MYSTERY_DROP_GAME_LIST } from './MysteryGameList'
import useLocalization from 'app/provider/localization'
import { GAME_TAG_SIZE } from 'app/components/game/GameTagsLabel'

const MysteryGame = () => {
  const { t } = useLocalization()
  return (
    <View sx={{ mb: '$4' }}>
      <TitleText sx={{ mx: 'auto', textAlign: 'center', mb: 0 }}>
        {t('event.mystery.games')}
      </TitleText>

      <View>
        <HorizontalGameList
          data={MYSTERY_DROP_GAME_LIST}
          size={[140, 160]}
          tagSize={GAME_TAG_SIZE.lg}
        />
      </View>
    </View>
  )
}

export default MysteryGame
