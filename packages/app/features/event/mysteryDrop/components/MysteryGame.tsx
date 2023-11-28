import { Text, View } from 'dripsy'
import React from 'react'
import { TitleText } from './IntroColumn'
import HorizontalGameList from 'app/components/game/HorizontalGameList'
import { MYSTERY_DROP_GAME_LIST } from './MysteryGameList'
import useLocalization from 'app/provider/localization'

const MysteryGame = () => {
  const { t } = useLocalization()
  return (
    <View sx={{ mb: '$4' }}>
      <TitleText sx={{ mx: 'auto', width: 300, textAlign: 'center' }}>
        {t('event.mystery.games')}
      </TitleText>

      <View>
        <HorizontalGameList data={MYSTERY_DROP_GAME_LIST} size={160} />
      </View>
    </View>
  )
}

export default MysteryGame
