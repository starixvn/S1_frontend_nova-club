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
  }

  return (
    <GradientBox>
      <Accordian
        isExpandable
        extended={false}
        onPress={() => handleFetchData(item.date)}
        header={<RewardItem date={item.date} amount={item.amount} isShowDate />}
      >
        {result.isFetching ? (
          <ActivityIndicator size="large" />
        ) : (
          rewardDetails.map((el: ReportRewardItem, index) => (
            <RewardItem
              key={`${index} ${el.gp}`}
              date={el.date}
              game={el.gp}
              amount={el.amount}
              isShowTime
            />
          ))
        )}
      </Accordian>
    </GradientBox>
  )
}

const RewardItem = ({
  date,
  game,
  amount,
  isShowDate = false,
  isShowTime = false,
}) => {
  return (
    <View
      sx={{
        flex: 1,
        flexDirection: 'row',
        px: isShowDate ? '$0' : '$3',
        alignItems: 'center',
      }}
    >
      <View style={{ flex: CELL_DATE_WIDTH }}>
        <DateTimeCell
          date={date}
          isShowDate={isShowDate}
          isShowTime={isShowTime}
        />
      </View>

      {isShowTime && (
        <View
          style={{
            flex: CELL_GAME_WIDTH,
            justifyContent: 'center',
          }}
        >
          <Image
            resizeMode="contain"
            source={getProviderLogo(game)}
            style={{ height: 48 }}
          />
        </View>
      )}

      <View style={{ flex: CELL_AMOUNT_WIDTH }}>
        <Text sx={{ textAlign: isShowDate ? 'center' : 'right' }}>
          {toThousandSeparator(amount)}
        </Text>
      </View>
    </View>
  )
}

export default RewardHistoryItem
