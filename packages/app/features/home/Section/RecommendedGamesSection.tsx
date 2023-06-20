import { CMS_CONTENT_URI, CONTENT_URI, MEDIA_DOMAIN } from '@env'
import HorizontalGameList from 'app/features/games/HorizontalGameList'
import { View } from 'dripsy'
import React from 'react'
import { useFeaturedGameListQuery } from 'services/contentApi'
import { usePlayerProfileQuery } from 'services/playerApi'
import SectionHeader from './SectionHeader'
import { FEATURED_GAME_CATEGORY } from 'services/contentApi.type'

const RecommendedGamesSection = () => {
  const { currency } = usePlayerProfileQuery()
  const { data } = useFeaturedGameListQuery({ currency })
  const featuredList = data?.data?.rows
    .filter((el) => el.cat === FEATURED_GAME_CATEGORY.RECOMMENDED)
    .map((item, index) => {
      const imageNumber = index + 1
      const imageName = (imageNumber < 10 ? '0' : '') + imageNumber
      return {
        ...item,
        img: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.img}`,
        imgAlt: `${MEDIA_DOMAIN}${CONTENT_URI}/games/recommended/${imageName}.jpg`,
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
