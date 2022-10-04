import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import HorizontalGameList from 'app/features/games/HorizontalGameList'
import useJackpotGamesFilter from 'app/hooks/game/useJackpotGamesFilter'
import { View } from 'dripsy'
import React from 'react'

const JackpotGamesSection = () => {
  const { gameList } = useJackpotGamesFilter()

  const jackpotList = gameList.map((item) => {
    return {
      ...item,
      img: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.img}`,
    }
  })

  return (
    <View sx={{ mt: -100, mb: '$7a' }}>
      {jackpotList && jackpotList.length > 0 && (
        <>
          {/* <SectionHeader
            title={SlotType.JACKPOT}
            bgColor="orange"
            iconName="fire"
          /> */}
          <HorizontalGameList
            data={jackpotList ?? []}
            containerStyle={{ paddingRight: 80 }}
          />
        </>
      )}
    </View>
  )
}

export default JackpotGamesSection
