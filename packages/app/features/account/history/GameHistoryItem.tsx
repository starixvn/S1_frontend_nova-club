import Image from 'app/components/common/Image'
import { getProviderLogo } from 'app/config/games/provider'
import { toThousandSeparator } from 'app/utils'
import { Text, View } from 'dripsy'
import React from 'react'
import DateTimeCell from './DateTimeCell'
import TransactionHistoryItemBox from './TransactionHistoryItemBox'

const CELL_DATE_WIDTH = 1
const CELL_GAME_WIDTH = 1
const CELL_STATUS_WIDTH = 1

const GameHistoryItem = ({ item }) => {
  return (
    <TransactionHistoryItemBox>
      <View
        sx={{
          flex: 1,
          alignSelf: 'stretch',
          flexDirection: 'row',
          p: '$3',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: CELL_DATE_WIDTH }}>
          <DateTimeCell date={item.date} />
        </View>

        <View
          sx={{
            flex: CELL_GAME_WIDTH,
            py: 12,
          }}
        >
          <Image
            resizeMode="contain"
            source={getProviderLogo(item.game_provider_code)}
            style={{
              height: 20,
              maxWidth: 100,
            }}
            alt={item.game_provider_code}
          />
        </View>
        <View style={{ flex: CELL_STATUS_WIDTH }}>
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
        </View>
      </View>
    </TransactionHistoryItemBox>
  )
}

export default GameHistoryItem
