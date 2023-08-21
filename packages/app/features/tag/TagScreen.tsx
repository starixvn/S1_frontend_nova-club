import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import GameListSectionAsyncByTag from 'app/components/game/GameListSectionAsyncByTag'
import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import useLocalization from 'app/provider/localization'
import { SlotType } from 'app/utils/constant'
import { View } from 'dripsy'
import { startTransition, useEffect, useRef, useState } from 'react'
import { useGetGameListByTagsQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { createParam } from 'solito'
import SlotSingleProviderListing from '../slot/SlotSingleProviderListing'
import { useRouter } from 'solito/router'

type Params = {
  tag?: string
}

const { useParam } = createParam<Params>()

const TagScreen = () => {
  const { back } = useRouter()

  const [tagGameGroup, setTagGameGroup] = useState<Game[]>([])

  const [tag, setTag] = useParam('tag', {
    initial: undefined,
    parse: (templateFromUrl) => {
      return templateFromUrl && templateFromUrl[0]
        ? templateFromUrl[0]
        : undefined
    },
  })

  const [isDelayed, setDelayed] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setDelayed(true)
    }, 10)
  }, [])

  const { data: games } = useGetGameListByTagsQuery(
    { tags: [tag || ''], limit: 1000 },
    {
      refetchOnMountOrArgChange: true,
      skip: !isDelayed,
    }
  )

  useEffect(() => {
    if (games) {
      startTransition(() => setTagGameGroup(games))
    }
  }, [games])

  return (
    <>
      <SlotSingleProviderListing
        games={tagGameGroup}
        tag={tag}
        onBack={back}
        hideTag
      />
    </>
  )
}

export default TagScreen
