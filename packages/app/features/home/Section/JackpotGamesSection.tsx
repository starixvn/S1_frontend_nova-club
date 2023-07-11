import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import HorizontalGameList from 'app/features/games/HorizontalGameList'
import { SlotType } from 'app/utils/constant'
import { View } from 'dripsy'
import React from 'react'
import { useFeaturedGameListQuery } from 'services/contentApi'
import { FEATURED_GAME_CATEGORY } from 'services/contentApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import SectionHeader from './SectionHeader'

const JackpotGamesSection = () => {
  // const { gameList } = useJackpotGamesFilter()

  const { currency } = usePlayerProfileQuery()
  const { data } = useFeaturedGameListQuery({ currency }, { skip: !currency })

  const jackpotList = data?.data?.rows
    .filter((el) => el.cat === FEATURED_GAME_CATEGORY.JACKPOT)
    .map((item) => {
      return {
        ...item,
        img: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.img}`,
      }
    })

  return (
    <View sx={{ mt: 0 }}>
      {jackpotList && jackpotList.length > 0 && (
        <>
          <SectionHeader
            title={SlotType.JACKPOT}
            bgColor="jackpot"
            iconName="jackpot"
          />
          <HorizontalGameList data={jackpotList ?? []} />
        </>
      )}
    </View>
  )
}

export default JackpotGamesSection
