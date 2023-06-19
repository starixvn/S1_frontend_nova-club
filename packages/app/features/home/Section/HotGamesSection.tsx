import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import ListImage from 'app/components/ListImage'
import hotgame from 'app/config/games/hotgame'
import HorizontalGameList from 'app/features/games/HorizontalGameList'
import { View } from 'dripsy'
import React from 'react'
import { useFeaturedGameListQuery } from 'services/contentApi'
import { FEATURED_GAME_CATEGORY, Game } from 'services/contentApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import SectionHeader from './SectionHeader'

const games: Game[] = [
  {
    tags: [],
    name: {
      en: 'Lottery',
      vi: 'Lottery',
    },
    gc: 'kenolottery',
    gpc: 'SABA',
    gtc: 'lottery',
    img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/Saba-Keno.jpg`,
  },
  {
    tags: [],
    name: {
      en: 'Lottery',
      vi: 'Lottery',
    },
    gc: 'kenolottery',
    gpc: 'SABA',
    gtc: 'lottery',
    img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/Saba-lottery.jpg`,
  },
  {
    tags: [],
    name: {
      en: 'TCG Lotto',
      vi: 'TCG Lotto',
    },
    gc: 'B2BC11X5',
    gpc: 'TCG',
    gtc: 'lottery',
    img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/TCG-lottery.jpg`,
  },
  {
    tags: [],
    name: {
      en: 'Tien Len',
      vi: 'Tien Len',
    },
    gc: 'B2BC11X5',
    gpc: 'V8PK',
    gtc: 'games',
    img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/V8-Killer-13.jpg`,
  },
  {
    tags: [],
    name: {
      en: 'Lieng',
      vi: 'Lieng',
    },
    gc: 'B2BC11X5',
    gpc: 'V8PK',
    gtc: 'games',
    img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/Three-Cards.jpg`,
  },
  {
    tags: [],
    name: {
      en: 'Xoc Dia',
      vi: 'Xoc Dia',
    },
    gc: 'B2BC11X5',
    gpc: 'V8PK',
    gtc: 'games',
    img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/V8-Xoc-Dia4.jpg`,
  },
  {
    tags: [],
    name: {
      en: 'Fan Tan',
      vi: 'Fan Tan',
    },
    gc: 'B2BC11X5',
    gpc: 'V8PK',
    gtc: 'games',
    img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/V8-Fan_Tan.jpg`,
  },
  {
    tags: [],
    name: {
      en: 'Fish Prawn Crab',
      vi: 'Fish Prawn Crab',
    },
    gc: 'Vgaming',
    gpc: 'SABA',
    gtc: 'games',
    img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/Vgaming-FishPrawnCrabl.jpg`,
  },
  {
    tags: [],
    name: {
      en: 'Baccarat',
      vi: 'Baccarat',
    },
    gc: 'Vgaming',
    gpc: 'SABA',
    gtc: 'games',
    img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/Vgaming-Baccarat.jpg`,
  },
  {
    tags: [],
    name: {
      en: 'Big Small',
      vi: 'Big Small',
    },
    gc: 'Vgaming',
    gpc: 'SABA',
    gtc: 'games',
    img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/Vgaming-Bigsmall.jpg`,
  },
]

const HotGamesSection = () => {
  const { data: playerProfile } = usePlayerProfileQuery()
  const { currency } = playerProfile || {}
  const { data } = useFeaturedGameListQuery({ currency })

  const featuredList = data?.data?.rows
    .filter((el) => el.cat === FEATURED_GAME_CATEGORY.HOT)
    .map((item) => {
      return {
        ...item,
        img: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.img}`,
      }
    })

  return (
    <View sx={{ mb: '$7a' }}>
      {featuredList && featuredList.length > 0 && (
        <>
          <SectionHeader
            title={hotgame.label}
            bgColor="orange"
            iconName="fire"
          />
          <HorizontalGameList data={featuredList ?? []} />
        </>
      )}
    </View>
  )
}

export default HotGamesSection
