import useIsDesktop from 'app/hooks/useIsDesktop'
import { toThousandSeparator } from 'app/utils'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import { CONTENT_URI, MEDIA_DOMAIN } from '../../../../../apps/next/config/env'
import DateTimeCell from './DateTimeCell'
import TransactionHistoryItemBox from './TransactionHistoryItemBox'
import { CellViewContainer } from './dekstop/DesktopDepositHistoryItem'
import { GameTableHeader } from './dekstop/DesktopGameHistoryItem'

const GameHistoryItem = ({ item }) => {
  return (
    <ItemContainer>
      <CellViewContainer>
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
    </ItemContainer>
  )
}

const ItemContainer = ({ children }) => {
  const desktop = useIsDesktop()

  return desktop ? (
    <>{children}</>
  ) : (
    <TransactionHistoryItemBox>{children}</TransactionHistoryItemBox>
  )
}

const CellView = styled(View)(({ index }: { index: number }) => ({
  ...GameTableHeader[index]?.textStyle,
}))

export default GameHistoryItem
