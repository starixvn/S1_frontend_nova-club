import {
  Pressable,
  Row,
  Text,
  View,
  styled,
  useDripsyTheme,
  useResponsiveValue,
} from 'dripsy'
import union from 'lodash/union'
import React, { FC, startTransition, useEffect, useMemo, useState } from 'react'
import { Game } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'
import { DripsyGradient } from '../Gradient'

import { FONT_TOP_OFFSET } from 'app/constants/font'
import { ProviderImageMapping } from 'app/constants/gameAssets'
import { useAppSelector } from 'app/provider/redux/store'
import { ALL } from 'app/utils/constant'
import { GameToLaunchPayload } from 'app/utils/game'
import { Shadow } from 'react-native-shadow-2'
import GameCard from './GameCard'

const width = ['22%', '18%', '15%', '15%', '12%']
const spaces = ['1.5%', '1%', '0.83%', '0.83%', '1.14%']
const GameSectionByProviderItemGameListSummary = ({
  data,
  bordered = false,
}: {
  data: Game[]
  bordered?: boolean
}) => {
  const locale = useAppSelector((s) => s.setting.locale)
  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        px: ['$3'],
        pt: ['$2'],
        pb: '$sectionBottomSpace',
        borderWidth: bordered ? 2 : 0,
        borderColor: '$primary.300',
      }}
    >
      {data.map((g, i) => {
        const launchPayload = GameToLaunchPayload(g, locale)
        return (
          <GameCard
            key={i}
            width={width}
            sx={{
              m: spaces,
            }}
            {...launchPayload}
          />
        )
      })}
    </Row>
  )
}

export default GameSectionByProviderItemGameListSummary
