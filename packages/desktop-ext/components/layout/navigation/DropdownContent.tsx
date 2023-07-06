import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import GameCard from 'app/components/game/GameCard'
import { useAppSelector } from 'app/provider/redux/store'
import {
  ActivityIndicator,
  Pressable,
  Row,
  View
} from 'dripsy'
import React, { startTransition } from 'react'
import { Game } from 'services/gameApi.type'
import { useNavigationHeader } from './NavigationHeaderProvider'

type Props = {
  data?: Game[]
  menu: string
  useProviderImage?: boolean
}

export default function DropdownContent({
  data,
  menu,
  useProviderImage,
}: Props) {
  const setDropdownMenu = useNavigationHeader()
  const locale = useAppSelector((s) => s.setting.locale)

  return (
    <Pressable
      onHoverIn={() => startTransition(() => setDropdownMenu(menu))}
      onHoverOut={() => startTransition(() => setDropdownMenu(undefined))}
      sx={{
        width: '100%',
        bg: 'rgba(0,0,0,0.8)',
      }}
    >
      <View sx={{ p: ['$3', '$3', '$3', '$3', '$3', '$4'] }}>
        {!data ? (
          <ActivityIndicator size="large" color="$primary.100" />
        ) : (
          <Row
            sx={{
              width: '100%',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: ['$3', '$4'],
            }}
          >
            {data.map((g) => {
              return (
                <GameCard
                  onHoverIn={() => startTransition(() => setDropdownMenu(menu))}
                  displayName={g.name[locale]}
                  key={g.gc + g.gpc}
                  sx={{ width: '11%' }}
                  {...g}
                  {...(useProviderImage
                    ? {
                        img: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/main/${g.gpc?.toLowerCase()}.png`,
                      }
                    : {})}
                />
              )
            })}
          </Row>
        )}
      </View>
    </Pressable>
  )
}
