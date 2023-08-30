import Accordian from 'app/components/Accordian'
import Image from 'app/components/common/Image'
import { toThousandSeparator } from 'app/utils'
import { ReportDepositStatus, ReportTransactionType } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import { ActivityIndicator, Text, View, styled } from 'dripsy'
import React, { useState } from 'react'
import { useLazyPlayerReportQuery } from 'services/playerApi'
import { ReportRewardItem } from 'services/playerApi.type'
import {
  CONTENT_URI,
  MEDIA_DOMAIN,
} from '../../../../../../apps/next/config/env'
import DateTimeCell from '../DateTimeCell'
import { CellViewContainer, TAB_NO } from './DesktopDepositHistoryItem'

export const RebateTableHeader = [
  TAB_NO,
  { label: 'common.date', textStyle: { flex: 1, textAlign: 'left' } },
  {
    label: 'common.amount',
    textStyle: { flex: 1, textAlign: 'center' },
  },
  {
    label: '',
    textStyle: { mr: 18 },
  },
]

const DesktopRebateHistoryItem = ({ item, index }) => {
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
      trans_type: ReportTransactionType.REBATE,
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
    <Accordian
      isExpandable
      extended={false}
      onPress={handleExpand}
      header={
        <RewardParentItem date={item.date} amount={item.amount} index={index} />
      }
      parentStyle={{ bg: 'transparent', px: 0, mx: 0 }}
      childStyle={{ bg: 'transparent' }}
    >
      <View sx={{ py: 12 }}>
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
  )
}

const RewardParentItem = ({ date, amount, index }) => {
  return (
    <CellViewContainer>
      <CellView index={0}>
        <Text sx={{ textAlign: 'center' }}>{index + 1}</Text>
      </CellView>

      <CellView index={1}>
        <DateTimeCell date={date} isShowTime={false} />
      </CellView>

      <CellView index={2}>
        <Text sx={{}}>{toThousandSeparator(amount)}</Text>
      </CellView>
    </CellViewContainer>
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
      <CellView
        index={1}
        sx={{
          py: 8,
        }}
      >
        <Image
          alt=""
          resizeMode="contain"
          source={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/all-provider-colored/${game}.png`}
          style={{
            height: 24,
            maxWidth: 100,
          }}
        />
      </CellView>

      {/* <View sx={{ flex: CELL_DATE_WIDTH }}>
        <DateTimeCell
          date={date}
          isShowDate={false}
          sx={{ textAlign: 'right' }}
        />
      </View> */}

      <CellView index={2}>
        <Text sx={{ textAlign: 'center' }}>{toThousandSeparator(amount)}</Text>
      </CellView>
    </View>
  )
}

const CellView = styled(View)(({ index }: { index: number }) => ({
  ...RebateTableHeader[index]?.textStyle,
}))
export default DesktopRebateHistoryItem
