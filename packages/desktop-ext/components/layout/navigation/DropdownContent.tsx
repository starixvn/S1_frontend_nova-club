import {
  ActivityIndicator,
  Container,
  Pressable,
  Row,
  Text,
  View,
} from 'dripsy'
import React, { startTransition } from 'react'
import { Game } from 'services/gameApi.type'
import { useNavigationHeader } from './NavigationHeaderProvider'
import GameCard from 'app/components/game/GameCard'
import { GameToLaunchPayload } from 'app/utils/game'
import { useAppSelector } from 'app/provider/redux/store'

type Props = {
  data?: Game[]
  menu: string
}

export default function DropdownContent({ data, menu }: Props) {
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
              const launchPayload = GameToLaunchPayload(g, locale)
              return (
                <GameCard
                  onHoverIn={() => startTransition(() => setDropdownMenu(menu))}
                  name={g.name[locale]}
                  key={g.gc + g.gpc}
                  sx={{ width: '11%' }}
                  {...launchPayload}
                />
              )
            })}
          </Row>
        )}
      </View>
    </Pressable>
  )
}
