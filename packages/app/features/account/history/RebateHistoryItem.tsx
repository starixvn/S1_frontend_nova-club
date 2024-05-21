import Accordian from 'app/components/Accordian'
import Image from 'app/components/common/Image'
import { toThousandSeparator } from 'app/utils'
import dayjs from 'dayjs'
import { ActivityIndicator, Text, View, useDripsyTheme } from 'dripsy'
import React, { useState } from 'react'
import { useLazyPlayerReportQuery } from 'services/playerApi'
import { ReportRewardItem } from 'services/playerApi.type'
import {
  ReportCommonStatus,
  ReportTransactionType
} from 'utils/constant'
import { CONTENT_URI, MEDIA_DOMAIN } from '../../../../../apps/next/config/env'
import DateTimeCell from './DateTimeCell'
import TransactionHistoryItemBox from './TransactionHistoryItemBox'

const CELL_DATE_WIDTH = 1
const CELL_GAME_WIDTH = 1
const CELL_AMOUNT_WIDTH = 1

const RebateHistoryItem = ({ item }) => {
  const [fetchData] = useLazyPlayerReportQuery()
  const [dataDetails, setDataDetails] = useState([])
  const [firstLoading, setFirstLoading] = useState(true)
  const { theme } = useDripsyTheme()

  const handleFetchData = async (date) => {
    const { data, success } = await fetchData({
      limit: 10,
      offset: 0,
      status: ReportCommonStatus.ALL,
      time_from: dayjs(date).startOf('date').toISOString(),
      time_to: dayjs(date).endOf('date').toISOString(),
      trans_type: ReportTransactionType.REBATE,
      is_reward_group_by: false,
    }).unwrap()

    if (success) setDataDetails(data.rows)
    setFirstLoading(false)
  }

  const handleExpand = () => {
    setTimeout(() => {
      dataDetails.length <= 0 && handleFetchData(item.date)
    }, 1000)
  }

  return (
    <TransactionHistoryItemBox>
      <Accordian
        isExpandable
        extended={false}
        onPress={handleExpand}
        header={<ParentItem date={item.date} amount={item.amount} />}
      >
        <View
          sx={{
            py: 4,
            flexGrow: 1,
            minHeight: 52,
            justifyContent: 'center',
          }}
        >
          {firstLoading ? (
            <ActivityIndicator size={32} color={theme.colors.$primary['50']} />
          ) : (
            dataDetails.map((el: ReportRewardItem, index) => (
              <ChildItem
                key={`${index} ${el.gp}`}
                date={el.date}
                game={el.gp}
                amount={el.amount}
              />
            ))
          )}
        </View>
      </Accordian>
    </TransactionHistoryItemBox>
  )
}

const ParentItem = ({ date, amount }) => {
  return (
    <View
      sx={{
        flex: 1,
        flexDirection: 'row',
        px: '$0',
        alignItems: 'center',
      }}
    >
      <View sx={{ flex: CELL_DATE_WIDTH }}>
        <DateTimeCell date={date} isShowTime={false} />
      </View>

      <View sx={{ flex: CELL_AMOUNT_WIDTH, mr: 8 }}>
        <Text sx={{ textAlign: 'right' }}>{toThousandSeparator(amount)}</Text>
      </View>
    </View>
  )
}

const ChildItem = ({ date, game, amount }) => {
  return (
    <View
      sx={{
        flex: 1,
        flexDirection: 'row',
        px: '$3',
        alignItems: 'center',
      }}
    >
      <View
        sx={{
          flex: CELL_GAME_WIDTH,
          py: 8,
        }}
      >
        <Image
          resizeMode="contain"
          source={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/all-provider-colored/${game}.png`}
          style={{
            height: 18,
            maxWidth: 100,
          }}
          alt={`Logo of ${game}`}
        />
      </View>

      <View sx={{ flex: CELL_AMOUNT_WIDTH, mr: 28, justifyContent: 'center' }}>
        <Text sx={{ textAlign: 'right' }}>{toThousandSeparator(amount)}</Text>
      </View>
    </View>
  )
}

export default RebateHistoryItem
