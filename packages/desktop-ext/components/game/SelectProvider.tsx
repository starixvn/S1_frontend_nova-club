import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import ShadowButton from 'app/components/ShadowButton'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import {
  Pressable,
  Row,
  ScrollView,
  SxProp,
  Text,
  View,
  useDripsyTheme,
} from 'dripsy'
import React, { startTransition, useState } from 'react'
import { SolitoImage } from 'solito/image'

import * as DropdownMenu from 'zeego/dropdown-menu'
type Props = {
  providers: string[]
  value?: string
  onSelect: (p?: string) => void
}

enum IndexState {
  ALL = -2,
  NONE = -1,
}

export default function SelectProvider({ providers, value, onSelect }: Props) {
  const [activeIndex, setActiveIndex] = useState(IndexState.NONE)
  const { theme } = useDripsyTheme()
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <ShadowButton
          safeRender
          containerStyle={{
            height: 28,
            width: 150,
            p: '$1',
          }}
        >
          <Row
            sx={{
              px: '$2',
              height: '100%',
              alignItems: 'center',
              gap: '$2',
            }}
          >
            <View
              sx={{
                minWidth: 100,
                alignItems: 'center',
                height: '100%',
              }}
            >
              {!value ? (
                <AllSelection />
              ) : (
                <SolitoImage
                  fill
                  alt={value}
                  src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/white/${value.toLowerCase()}.png`}
                />
              )}
            </View>
            <Icon name="down" color="white" size={12} />
          </Row>
        </ShadowButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content side="bottom" align="center">
        <ScrollView
          sx={{ maxHeight: 300, bg: '$primary.700' }}
          indicatorSx={{ bg: 'transparent' }}
          // contentContainerSx={{ p: '$2' }}
          showsVerticalScrollIndicator={false}
        >
          <DropdownMenu.Item
            key="all"
            onSelect={() => {
              onSelect && onSelect(undefined)
            }}
          >
            <Pressable
              onPress={() => {
                onSelect && onSelect(undefined)
              }}
              onHoverIn={() =>
                startTransition(() => setActiveIndex(IndexState.ALL))
              }
              onHoverOut={() =>
                startTransition(() => setActiveIndex(IndexState.NONE))
              }
              style={{
                height: 40,
                backgroundColor:
                  activeIndex === -2
                    ? theme?.colors?.$primary?.[100]
                    : 'transparent',
              }}
            >
              <AllSelection size={20} sx={{ mx: 'auto' }} />
            </Pressable>
          </DropdownMenu.Item>
          <View sx={{}}>
            {providers.map((p, index) => {
              return (
                <DropdownMenu.Item
                  key={p}
                  style={{
                    width: 125,
                    height: 40,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      index === activeIndex
                        ? theme?.colors?.$primary?.[100]
                        : 'transparent',
                  }}
                  onSelect={() => {
                    onSelect && onSelect(p)
                  }}
                >
                  <Pressable
                    onPress={() => {
                      onSelect && onSelect(p)
                    }}
                    onHoverIn={() =>
                      startTransition(() => setActiveIndex(index))
                    }
                    onHoverOut={() =>
                      startTransition(() => setActiveIndex(IndexState.NONE))
                    }
                  >
                    <SolitoImage
                      height={25}
                      width={100}
                      alt={p}
                      src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/white/${p.toLowerCase()}.png`}
                      resizeMode="contain"
                    />
                  </Pressable>
                </DropdownMenu.Item>
              )
            })}
          </View>
        </ScrollView>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const AllSelection = ({ size = 16, sx }: { size?: number; sx?: SxProp }) => {
  return (
    <Row
      sx={{
        alignItems: 'center',
        gap: '$2',
        flex: 1,
        ...sx,
      }}
    >
      <Icon name="all" size={size} />
      <Text
        sx={{
          mt: FONT_TOP_OFFSET,
          fontSize: size * 0.8,
          fontWeight: '900',
          userSelect: 'none',
        }}
      >
        {'ALL'}
      </Text>
    </Row>
  )
}
