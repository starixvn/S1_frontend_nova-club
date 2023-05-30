import GamePageHeader from 'app/components/GamePageHeader'
import { Pressable, ScrollView, Text } from 'dripsy'
import React from 'react'
import MatchSection from './MatchSection'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useGetGameListQuery } from 'services/contentApi'
import { Currency, GAME_TYPE_CODE } from 'app/utils/constant'
import { CellContainer, FlashList } from '@shopify/flash-list'
import { Game } from 'services/contentApi.type'
import GameCard from 'app/components/game/GameCard'
import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'

export default function SportsbookScreen() {
  const { t } = useLocalization()
  const locale = useAppSelector((s) => s.setting.locale)

  const { data: playerProfile } = usePlayerProfileQuery()
  const { currency } = playerProfile || {}

  const { gameList } = useGetGameListQuery(
    {
      currency: currency ?? Currency.VND,
      game_category: [
        GAME_TYPE_CODE.SPORTS,
        GAME_TYPE_CODE.E_SPORTS,
        GAME_TYPE_CODE.VIRTUAL_SPORTS,
      ],
      limit: 100,
      offset: 0,
    },
    {
      selectFromResult: (resp) => {
        return { ...resp, gameList: resp.data?.data?.rows }
      },
    }
  )

  function renderItem({ item }: { item: Game }) {
    const { name, img } = item
    async function launchGame() {
      // todo launch game
    }
    const formattedName = name
      ? typeof name === 'string'
        ? name
        : name[locale]
      : undefined

    const imageUrl = `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${img}`
    return <GameCard name={formattedName} image={imageUrl} />
  }

  return (
    <FlashList<Game>
      CellRendererComponent={(props) => {
        return (
          <CellContainer {...props} style={[props.style, { padding: 10 }]} />
        )
      }}
      data={gameList}
      renderItem={renderItem}
      estimatedItemSize={10}
      numColumns={2}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      ListHeaderComponent={
        <>
          <GamePageHeader title={'SPORTSBOOK'} icon="sportbook" />
          <MatchSection />
        </>
      }
    />
  )
}
