import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import HorizontalGameList from 'app/features/games/HorizontalGameList'
import { View } from 'dripsy'
import React from 'react'
import { useFeaturedGameListQuery } from 'services/contentApi'
import { FEATURED_GAME_CATEGORY } from 'services/contentApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import SectionHeader from './SectionHeader'

const RecommendedGamesSection = () => {
  const { currency } = usePlayerProfileQuery()
  const { data } = useFeaturedGameListQuery({ currency }, { skip: !currency })

  const featuredList = data?.data?.rows
    .filter((el) => el.cat === FEATURED_GAME_CATEGORY.RECOMMENDED)
    .map((item, index) => {
      const imageNumber = index + 1

      return {
        ...item,
        img: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.img}`,
        imgAlt: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.xImg}`,
      }
    })

  return (
    <View sx={{ mb: '$4' }}>
      {featuredList && featuredList.length > 0 && (
        <>
          <SectionHeader
            title="game.category.recommended"
            bgColor="recommended"
            iconName="recommended"
          />
          <HorizontalGameList data={featuredList ?? []} isRankCard />
        </>
      )}
    </View>
  )
}

export default RecommendedGamesSection
