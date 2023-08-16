import { ActivityIndicator, Pressable, Row, View } from 'dripsy'
import React, { ReactNode, startTransition } from 'react'
import { Game } from 'services/gameApi.type'
import {
  NAVIGATION_DROPDOWN_MENU,
  useNavigationHeader,
} from './NavigationHeaderProvider'

type Props = {
  data?: Game[]
  menu: NAVIGATION_DROPDOWN_MENU
  useProviderImage?: boolean
  children: ReactNode
}

export default function DropdownContent({ data, menu, children }: Props) {
  const toggleMenu = useNavigationHeader()

  return (
    <>
      <Pressable
        onHoverIn={() => toggleMenu(menu)}
        // onHoverOut={() => toggleMenu(undefined)}
        sx={{
          cursor: 'auto',
          width: '100%',
          bg: 'rgba(0,0,0,0.8)',
        }}
      >
        <View sx={{ p: ['$3', '$3', '$3', '$3', '$3', '$4'] }}>
          {!children ? (
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
              {children}
            </Row>
          )}
        </View>
      </Pressable>
      <Pressable
        onHoverIn={() => toggleMenu(undefined)}
        sx={{
          width: '100%',
          height: 200,
          bg: 'rgba(0,0,0,0)',
        }}
      />
    </>
  )
}
