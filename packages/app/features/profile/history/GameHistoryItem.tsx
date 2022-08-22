import Image from 'app/components/common/Image'
import GradientBox from 'app/components/GradientBox'
import { getProviderLogo } from 'app/config/games/provider'
import { toThousandSeparator } from 'app/utils'
import { Text, View } from 'dripsy'
import React from 'react'
import DateTimeCell from './DateTimeCell'

const CELL_DATE_WIDTH = 1
const CELL_GAME_WIDTH = 1
const CELL_STATUS_WIDTH = 1

const GameHistoryItem = ({ item }) => {
  return (
    <GradientBox>
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
        {/* <View style={{ flex: CELL_AMOUNT_WIDTH }}>
          <Text sx={{ textAlign: 'center' }}>{item.game_provider_code}</Text>
        </View> */}

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
    </GradientBox>
  )
}

export default GameHistoryItem
