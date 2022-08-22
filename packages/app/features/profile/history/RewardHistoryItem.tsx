import GradientBox from 'app/components/GradientBox'
import { toThousandSeparator } from 'app/utils'
import { ActivityIndicator, Text, View } from 'dripsy'
import React, { useState } from 'react'
import DateTimeCell from './DateTimeCell'
import Accordian from 'app/components/Accordian'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useLazyPlayerReportQuery } from 'services/playerApi'
import {
  ReportCommonStatus,
  ReportDepositStatus,
  ReportDepositStatusOptions,
  ReportTransactionType,
} from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import HistoryEmpty from 'app/components/history/HistoryEmpty'
import { ReportRewardItem } from 'services/playerApi.type'
import Image from 'app/components/common/Image'
import { getProviderLogo } from 'app/config/games/provider'
import RoundedIcon from 'app/components/RoundedIcon'

const CELL_DATE_WIDTH = 1
const CELL_GAME_WIDTH = 1
const CELL_AMOUNT_WIDTH = 1

const RewardHistoryItem = ({ item }) => {
  const [fetchData, result] = useLazyPlayerReportQuery()
  const [rewardDetails, setRewardDetails] = useState([])
  const [firstLoading, setFirstLoading] = useState(true)

  const handleFetchData = async (date) => {
    const { data, success } = await fetchData({
      limit: 10,
      offset: 0,
      status: ReportDepositStatus.ALL,
      time_from: dayjsTz(dayjs(date).startOf('date')).toISOString(),
      time_to: dayjsTz(dayjs(date).endOf('date')).toISOString(),
      trans_type: ReportTransactionType.REWARDS,
      is_reward_group_by: false,
    }).unwrap()

    if (success) setRewardDetails(data.rows)
    setFirstLoading(false)
  }

  const handleExpand = () => {
    setTimeout(() => {
      rewardDetails.length <= 0 && handleFetchData(item.date)
    }, 1000)
  }

  return (
    <GradientBox>
      <Accordian
        isExpandable
        extended={false}
        onPress={handleExpand}
        header={<RewardParentItem date={item.date} amount={item.amount} />}
      >
        <View sx={{ py: 4 }}>
          {firstLoading ? (
            <ActivityIndicator sx={{ flex: 1, minHeight: 68 }} />
          ) : (
            rewardDetails.map((el: ReportRewardItem, index) => (
              <RewardChildItem
                key={`${index} ${el.gp}`}
                date={el.date}
                game={el.gp}
                amount={el.amount}
              />
            ))
          )}
        </View>
      </Accordian>
    </GradientBox>
  )
}

const RewardParentItem = ({ date, amount }) => {
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

const RewardChildItem = ({ date, game, amount }) => {
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
          source={getProviderLogo(game)}
          style={{
            height: 18,
            maxWidth: 100,
          }}
        />
      </View>

      {/* <View sx={{ flex: CELL_DATE_WIDTH }}>
        <DateTimeCell
          date={date}
          isShowDate={false}
          sx={{ textAlign: 'right' }}
        />
      </View> */}

      <View sx={{ flex: CELL_AMOUNT_WIDTH, mr: 28, justifyContent: 'center' }}>
        <Text sx={{ textAlign: 'right' }}>{toThousandSeparator(amount)}</Text>
      </View>
    </View>
  )
}

export default RewardHistoryItem
