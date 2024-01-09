import { GAME_TAG_SIZE } from 'app/components/game/GameTagsLabel'
import HorizontalGameList from 'app/components/game/HorizontalGameList'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import { MYSTERY_DROP_GAME_LIST } from './MysteryGameList'

const MysteryGame = () => {
  const { t } = useLocalization()
  return (
    <View sx={{ mb: '$4' }}>
      <TitleText sx={{ mx: 'auto', textAlign: 'center' }}>
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

export const TitleText = styled(Text)({
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: 32,
  fontSize: 18,
})

export default MysteryGame
