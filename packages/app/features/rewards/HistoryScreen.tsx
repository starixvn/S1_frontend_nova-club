import DatePicker from 'app/components/form/DatePicker'
import HistoryListing from 'app/components/history/HistoryListing'
import SelectList from 'app/components/select/SelectList'
import useLocalization from 'app/provider/localization'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import { Row, Text, View, styled, useDripsyTheme } from 'dripsy'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLazyPlayerReportQuery } from 'services/playerApi'
import { ReportGameItem, ReportResult } from 'services/playerApi.type'
import {
  CoinRedemptionTypeOptions,
  DateFilterOptions,
  ReportDepositStatusOptions,
  ReportTransactionType,
} from 'utils/constant'
import DateTimeCell from '../account/history/DateTimeCell'
import {
  CellViewContainer,
  TAB_NO,
} from '../account/history/dekstop/DesktopDepositHistoryItem'
import { Platform } from 'react-native'
import { toThousandSeparator } from 'app/utils'

type HistoryListingDataType = Exclude<
  ReportResult['rows'],
  ReportGameItem[]
>[number]

const TransactionHistory = () => {
  const { t } = useLocalization()

  const [fetchData, result] = useLazyPlayerReportQuery()

  const [selected, setSelected] = useState({
    selectedStatus: ReportDepositStatusOptions[0]?.value,
    selectedDate: DateFilterOptions[0]?.value,
    startDate: dayjsTz(undefined, 'Asia/Shanghai').startOf('date').toDate(),
    endDate: dayjsTz(undefined, 'Asia/Shanghai').endOf('date').toDate(),
    trans_type: ReportTransactionType.COIN,
    coin_redemption_type: CoinRedemptionTypeOptions[0]?.value,
  })

  const [fetchParams, setFetchParams] = useState({
    status: selected.selectedStatus,
    time_from: selected.startDate.toISOString(),
    time_to: selected.endDate.toISOString(),
    trans_type: ReportTransactionType.COIN,
    is_reward_group_by: false,
    coin_redemption_type: selected.coin_redemption_type,
  })

  useEffect(() => {
    setFetchParams({
      status: selected.selectedStatus,
      time_from: selected.startDate.toISOString(),
      time_to: selected.endDate.toISOString(),
      trans_type: ReportTransactionType.COIN,
      is_reward_group_by: false,
      coin_redemption_type: selected.coin_redemption_type,
    })
  }, [selected])

  const keyExtractor = (item: HistoryListingDataType, index: number) => {
    let uid = ''

    if ('tx_code' in item) {
      uid = item.tx_code
    } else if ('gp' in item) {
      uid = item.gp
    } else if ('secure_id' in item) {
      uid = item.secure_id
    }

    return `${index} History ${uid}`
  }

  const renderHeader = useMemo(() => {
    return Columns
  }, [])

  const renderItem = useCallback(({ item, index }) => {
    return <HistoryItem item={item} index={index} />
  }, [])

  return (
    <View
      sx={{
        flex: 300,
        bg: '$secondary',
        width: '100%',
        mx: 'auto',
      }}
    >
      <View
        sx={{
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          flexDirection: ['column', 'row'],
          justifyContent: 'space-between',
          alignItems: 'stretch',
          marginVertical: ['$3'],
          paddingHorizontal: '$3',
        }}
      >
        <SelectList
          label={t('filter.transactionType.title')}
          value={selected.coin_redemption_type}
          enabledLabel={false}
          placeholder={t(selected.coin_redemption_type || 'common.all')}
          sx={{
            flex: Platform.select({ web: 1 }),
            mr: [0, 10],
            mb: [10, 0],
          }}
          _input={{ sx: { mb: 0 } }}
          options={CoinRedemptionTypeOptions}
          onSelected={(value) => {
            return setSelected({
              ...selected,
              coin_redemption_type: value,
              selectedStatus: ReportDepositStatusOptions[0]?.value,
            })
          }}
          _actionSheet={{
            sheetId: t('filter.transactionType.title') + 1,
          }}
        />

        <Row
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: Platform.select({ web: 2 }),
          }}
        >
          <DatePicker
            value={selected.startDate}
            inputSx={{ flex: 1, mb: 0 }}
            minimumDate={dayjs(selected.endDate)
              .subtract(2, 'month')
              .startOf('date')
              .toDate()}
            maximumDate={selected.endDate}
            onChange={(value: Date) => {
              setSelected({
                ...selected,
                selectedDate: DateFilterOptions[5]?.value,
                startDate: dayjsTz(value, 'Asia/Shanghai')
                  .startOf('date')
                  .toDate(),
              })
            }}
          />
          <Text sx={{ fontSize: 25, mx: 4, lineHeight: 55, height: 50 }}>
            -
          </Text>
          <DatePicker
            value={selected.endDate}
            inputSx={{ flex: 1, mb: 0 }}
            minimumDate={selected.startDate}
            maximumDate={dayjs().toDate()}
            onChange={(value: Date) => {
              setSelected({
                ...selected,
                selectedDate: DateFilterOptions[5]?.value,
                endDate: dayjsTz(value, 'Asia/Shanghai').endOf('date').toDate(),
              })
            }}
          />
        </Row>
      </View>

      <HistoryListing<HistoryListingDataType, typeof fetchParams>
        fetchParams={fetchParams}
        trigger={fetchData}
        result={result}
        keyExtractor={keyExtractor}
        header={renderHeader}
        renderItem={renderItem}
      />
    </View>
  )
}

export default TransactionHistory

export const Columns = [
  TAB_NO,
  { label: 'common.date', textStyle: { flex: 3, textAlign: 'left' } },
  { label: 'rewards.category', textStyle: { flex: 6, textAlign: 'center' } },
  { label: 'rewards.coin', textStyle: { flex: 3, textAlign: 'center' } },
]

const HistoryItem = ({ item, index }) => {
  const { theme } = useDripsyTheme()
  return (
    <CellViewContainer>
      <CellView index={0}>
        <Text sx={{ textAlign: 'center' }}>{index + 1}</Text>
      </CellView>

      <CellView index={1}>
        <DateTimeCell date={item.date} />
      </CellView>

      <CellView index={2}>
        <Text sx={{}}>{item.eventName}</Text>
      </CellView>
      <CellView index={3}>
        <Text
          sx={{
            color: item.amount.includes('-') ? '#ed5c66' : '#00FF19',
          }}
        >
          {item.amount.includes('-')
            ? toThousandSeparator(item.amount)
            : `+${toThousandSeparator(item.amount)}`}
        </Text>
      </CellView>
    </CellViewContainer>
  )
}

const CellView = styled(View)(({ index }: { index: number }) => ({
  ...Columns[index]?.textStyle,
}))
