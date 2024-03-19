import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import ShadowButton from 'app/components/ShadowButton'
import GameRebateLabel from 'app/components/game/GameRebateLabel'
import {
  GameProviderCategory,
  GetGameRebateValue,
} from 'app/components/game/GameUtilityAction'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import useLocalization from 'app/provider/localization'
import { Row, ScrollView, SxProp, Text, View, useDripsyTheme } from 'dripsy'
import React, { startTransition, useState } from 'react'
import { CommissionTableResult } from 'services/contentApi.type'
import { SolitoImage } from 'solito/image'

import * as DropdownMenu from 'zeego/dropdown-menu'
type Props = {
  providers: GameProviderCategory[]
  value: string
  onSelect: (p?: string) => void
  commissionList: CommissionTableResult[]
}

enum IndexState {
  ALL = -2,
  NONE = -1,
}

export default function SelectProvider({
  providers,
  value,
  onSelect,
  commissionList,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(IndexState.NONE)
  const { theme } = useDripsyTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <ShadowButton
          safeRender
          containerStyle={{
            height: 28,
            width: 185,
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
                  src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/gameV2/provider/white/${value?.toLowerCase()}.png`}
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
            onFocus={() => {
              startTransition(() => setActiveIndex(IndexState.ALL))
            }}
            onBlur={() => {
              startTransition(() => setActiveIndex(IndexState.NONE))
            }}
          >
            <View
              style={{
                height: 40,
                backgroundColor:
                  activeIndex === -2
                    ? theme?.colors?.$primary?.[100]
                    : 'transparent',
              }}
            >
              <AllSelection size={20} sx={{ mx: 'auto' }} />
            </View>
          </DropdownMenu.Item>
          <View
            sx={{
              width: 170,
            }}
          >
            {providers.map((p, index) => {
              return (
                <DropdownMenu.Item
                  key={p.gpc}
                  style={{
                    width: '100%',
                    height: 40,
                    flex: 1,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor:
                      index === activeIndex
                        ? theme?.colors?.$primary?.[100]
                        : 'transparent',
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                  }}
                  onSelect={() => {
                    onSelect && onSelect(p.gpc)
                  }}
                  onFocus={() => startTransition(() => setActiveIndex(index))}
                  onBlur={() =>
                    startTransition(() => setActiveIndex(IndexState.NONE))
                  }
                >
                  <SolitoImage
                    height={20}
                    width={90}
                    alt={p.gpc}
                    src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/gameV2/provider/white/${p?.gpc?.toLowerCase()}.png`}
                    resizeMode="contain"
                  />
                  <GameRebateLabel
                    rebateText={GetGameRebateValue({
                      gtc: p.gtc,
                      gpc: p.gpc,
                      commissionList,
                    })}
                    background="transparent"
                  />
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
  const { t } = useLocalization()

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
        {t('game.allProviders')}
      </Text>
    </Row>
  )
}
