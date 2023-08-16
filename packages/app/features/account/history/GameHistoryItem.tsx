import { getProviderLogo } from 'app/config/games/provider'
import { toThousandSeparator } from 'app/utils'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import DateTimeCell from './DateTimeCell'
import { CellViewContainer } from './dekstop/DesktopDepositHistoryItem'
import { GameTableHeader } from './dekstop/DesktopGameHistoryItem'
import TransactionHistoryItemBox from './TransactionHistoryItemBox'
import isDesktop from 'app/utils/isDesktop'
import useIsDesktop from 'app/hooks/useIsDesktop'

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
            src={getProviderLogo(item.game_provider_code)}
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
