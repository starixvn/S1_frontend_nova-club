import DatePicker from 'app/components/form/DatePicker'
import Select from 'app/components/select/Select'
import SelectWithProviderCardGrid from 'app/components/select/SelectWithProviderCardGrid'
import { getProviderLogo } from 'app/config/games/provider'
import useLocalization from 'app/provider/localization'
import {
  DateFilter,
  DateFilterOptions,
  ReportCommonStatusOptions,
  ReportDepositStatusOptions,
  ReportGameStatusOptions,
  ReportTransactionType,
  ReportTransactionTypeOptions,
} from 'app/utils/constant'
import dayjs from 'dayjs'
import { Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SelectOptions } from 'services/common/types'
import { usePlayerWalletDetailQuery } from 'services/walletApi'

const FILTER_BOX_HEIGHT = 60

const TypeList = ReportTransactionTypeOptions
const DateFilterList = DateFilterOptions
const DepositStatusList = ReportCommonStatusOptions
const WithdrawalStatusList = ReportCommonStatusOptions
const GameStatusList = ReportGameStatusOptions

const FilterSelection = ({ selected, setSelected, isTransaction = false }) => {
  const { t } = useLocalization()
  const { data } = usePlayerWalletDetailQuery()
  const [providerList, setProviderList] = useState<SelectOptions[]>([])
  const { width } = useWindowDimensions()

  useEffect(() => {
    if (!data?.success) return
    const newArray =
      Object.values(data?.data).map((item) => {
        return {
          value: item.system_code,
          label: item.system_name,
          icon: getProviderLogo(item.system_code),
        }
      }) ?? []

    setProviderList(
      [ReportGameStatusOptions[0] as SelectOptions].concat(newArray)
    )
  }, [data])

  const handleDateRange = (
    value: string
  ): { startDate: Date; endDate: Date } | undefined => {
    let startDate: Date
    let endDate: Date

    switch (value) {
      case DateFilter.TODAY:
        startDate = dayjs().startOf('date').toDate()
        endDate = dayjs().endOf('date').toDate()
        return { startDate, endDate }

      case DateFilter.YESTERDAY:
        startDate = dayjs().subtract(1, 'day').startOf('date').toDate()
        endDate = dayjs().subtract(1, 'day').endOf('date').toDate()
        return { startDate, endDate }

      case DateFilter.THIS_WEEK:
        startDate = dayjs().startOf('week').toDate()
        endDate = dayjs().endOf('date').toDate()
        return { startDate, endDate }

      case DateFilter.LAST_WEEK:
        startDate = dayjs().subtract(1, 'week').startOf('week').toDate()
        endDate = dayjs().subtract(1, 'week').endOf('week').toDate()
        return { startDate, endDate }

      case DateFilter.THIS_MONTH:
        startDate = dayjs().startOf('month').toDate()
        endDate = dayjs().endOf('date').toDate()
        return { startDate, endDate }

      case DateFilter.CUSTOM:
        startDate = selected.startDate
        endDate = selected.endDate
        return { startDate, endDate }

      default:
        startDate = dayjs().startOf('date').toDate()
        endDate = dayjs().endOf('date').toDate()
        return { startDate, endDate }
    }
  }
  return (
    <View sx={{ p: '$2', mx: '$2' }}>
      <View
        sx={{
          flexDirection: 'row',
          height: FILTER_BOX_HEIGHT,
        }}
      >
        {isTransaction ? (
          <Select
            value={selected.selectedTransType}
            enabledLabel={false}
            placeholder={t(selected.selectedTransType.label)}
            sx={{ flex: 1, m: '$1' }}
            options={TypeList}
            onSelected={(value) => {
              return setSelected({
                ...selected,
                selectedTransType: value,
                selectedStatus: ReportDepositStatusOptions[0],
              })
            }}
            _input={{ placeholderTextColor: '$white' }}
            // buttonComponent={(props) => (
            //   <SelectButton
            //     variants="history"
            //     label={selected.selectedTransType.label}
            //     containerStyle={{
            //       mr: 10,
            //       flex: 1,
            //     }}
            //     {...props}
            //   />
            // )}
            label={t('filter.transactionType.title')}
            _actionSheet={{
              sheetId: t('filter.transactionType.title') + 1,
            }}
          />
        ) : (
          <SelectWithProviderCardGrid
            value={selected.selectedGame}
            enabledLabel={false}
            placeholder={
              selected.selectedGame.label === 'common.all'
                ? t(selected.selectedGame.label)
                : selected.selectedGame.label
            }
            sx={{ flex: 1, m: '$1' }}
            isHorizontalActionSheet
            options={providerList}
            onSelected={(value) =>
              setSelected({ ...selected, selectedGame: value })
            }
            _input={{ placeholderTextColor: '$white' }}
            label={t('common.provider')}
            // buttonComponent={(props: SelectButtonProps) => (
            //   <SelectButton
            //     variants="history"
            //     label={selected.selectedGame.label}
            //     logo={selected.selectedGame.icon}
            //     containerStyle={{
            //       mr: 10,
            //       flex: 1,
            //     }}
            //     {...props}
            //   />
            // )}
            // _actionSheet={{
            //   sheetId: t('common.provider') + 1,
            // }}
          />
        )}

        <Select
          value={selected.selectedDate}
          options={isTransaction ? DateFilterList : DateFilterList.slice(0, 4)}
          sx={{ flex: 1, m: '$1' }}
          enabledLabel={false}
          placeholder={t(selected.selectedDate.label)}
          onSelected={(value) => {
            const { startDate, endDate } = handleDateRange(value.value)

            setSelected({
              ...selected,
              selectedDate: value,
              startDate,
              endDate,
            })
          }}
          _input={{ placeholderTextColor: '$white' }}
          label={t('common.date')}
          // buttonComponent={(props: SelectButtonComponentProps) => (
          //   <SelectButton
          //     variants="history"
          //     label={selected.selectedDate.label}
          //     containerStyle={{
          //       mr: 10,
          //       flex: 1,
          //     }}
          //     {...props}
          //   />
          // )}
          // _actionSheet={{
          //   sheetId: isTransaction
          //     ? t('common.date') + 1
          //     : t('common.game') + 1,
          // }}
        />
        {isTransaction ? (
          <Select
            placeholder={t(selected.selectedStatus.label)}
            value={selected.selectedStatus}
            options={
              selected.selectedTransType === ReportTransactionType.DEPOSIT
                ? DepositStatusList
                : WithdrawalStatusList
            }
            _input={{ placeholderTextColor: '$white' }}
            enabledLabel={false}
            sx={{ flex: 1, m: '$1' }}
            onSelected={(value) =>
              setSelected({ ...selected, selectedStatus: value })
            }
            // buttonComponent={(props: SelectButtonComponentProps) => (
            //   <SelectButton
            //     variants="history"
            //     label={selected.selectedStatus.label}
            //     containerStyle={{
            //       flex: 1,
            //     }}
            //     disabled={
            //       selected.selectedTransType.value !==
            //         ReportTransactionType.DEPOSIT &&
            //       selected.selectedTransType.value !==
            //         ReportTransactionType.WITHDRAWAL
            //     }
            //     {...props}
            //   />
            // )}
            label={t('filter.statusType')}
            // _actionSheet={{
            //   sheetId: t('filter.statusType') + 1,
            //   // headerTitle: t('menu.tab.statusType'),
            // }}
          />
        ) : (
          <Select
            label={t('filter.win/loss')}
            value={selected.selectedGameStatus}
            enabledLabel={false}
            placeholder={t(selected.selectedGameStatus.label)}
            sx={{ flex: 1, m: '$1' }}
            _input={{ placeholderTextColor: '$white' }}
            options={GameStatusList}
            onSelected={(value) =>
              setSelected({ ...selected, selectedGameStatus: value })
            }
            // buttonComponent={(props: SelectButtonComponentProps) => (
            //   <SelectButton
            //     variants="history"
            //     label={selected.selectedGameStatus.label}
            //     containerStyle={{
            //       flex: 1,
            //     }}
            //     {...props}
            //   />
            // )}
            // _actionSheet={{
            //   sheetId: t('filter.win/loss') + 1,
            // }}
          />
        )}
      </View>

      {isTransaction && (
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: FILTER_BOX_HEIGHT,
          }}
        >
          <DatePicker
            value={selected.startDate}
            inputSx={{ flex: 1, m: '$1' }}
            minimumDate={dayjs().subtract(2, 'month').startOf('date').toDate()}
            maximumDate={selected.endDate}
            onChange={(value) =>
              setSelected({
                ...selected,
                selectedDate: DateFilterOptions[5],
                startDate: value,
              })
            }
          />
          <Text sx={{ fontSize: 25, mx: 10, lineHeight: 55, height: 50 }}>
            -
          </Text>
          <DatePicker
            value={selected.endDate}
            inputSx={{ flex: 1, m: '$1' }}
            minimumDate={dayjs().subtract(2, 'month').startOf('date').toDate()}
            maximumDate={selected.startDate}
            onChange={(value) =>
              setSelected({
                ...selected,
                selectedDate: DateFilterOptions[5],
                endDate: value,
              })
            }
          />
        </View>
      )}
    </View>
  )
}

export default FilterSelection
