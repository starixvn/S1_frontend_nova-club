import { toThousandSeparator } from 'app/utils'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import {
  CONTENT_URI,
  MEDIA_DOMAIN,
} from '../../../../../../apps/next/config/env'
import DateTimeCell from '../DateTimeCell'
import { CellViewContainer, TAB_NO } from './DesktopDepositHistoryItem'

export const GameTableHeader = [
  TAB_NO,
  {
    label: 'common.date',
    textStyle: { flex: 1, textAlign: 'left', pl: 12 },
  },
  { label: 'common.game', textStyle: { flex: 1 } },
  { label: 'filter.win/loss', textStyle: { flex: 1, textAlign: 'center' } },
]

const DesktopGameHistoryItem = ({ item, index }) => {
  return (
    <CellViewContainer>
      <CellView index={0}>
        <Text sx={{ textAlign: 'center' }}>{index + 1}</Text>
      </CellView>

      <CellView index={1}>
        <DateTimeCell date={item.date} />
      </CellView>

      <CellView index={2} sx={{ alignItems: 'center' }}>
        <SolitoImage
          resizeMode="contain"
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/all-provider-colored/${item.game_provider_code}.png`}
          height={40}
          width={100}
          alt={item.game_provider_code}
        />
      </CellView>

      <CellView index={3}>
        <Text sx={{ textAlign: 'center' }}>
          {toThousandSeparator(item.bet)}
        </Text>
        <Text
          sx={{
            textAlign: 'center',
            color: item.winloss.includes('-') ? '#BE0A16' : '#00FF19',
          }}
        >
          {item.winloss.includes('-')
            ? toThousandSeparator(item.winloss)
            : `+${toThousandSeparator(item.winloss)}`}
        </Text>
      </CellView>
    </CellViewContainer>
  )
}
const CellView = styled(View)(({ index }: { index: number }) => ({
  ...GameTableHeader[index]?.textStyle,
}))

export default DesktopGameHistoryItem
