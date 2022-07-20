import DatePicker from 'app/components/form/DatePicker/DatePicker'
import Select from 'app/components/form/Select'
import SelectSquare from 'app/components/form/Select/SelectSquare'
import useLocalization from 'app/provider/localization'
import {
  DateFilter,
  GameProvider,
  ReportTransactionType,
  ReportTransactionTypeOptions,
  ReportDepositStatusOptions,
  ReportGameStatusOptions,
  DateFilterOptions,
  ReportCommonStatusOptions,
  ReportGameStatus,
} from 'app/utils/constant'
import dayjs from 'dayjs'
import { Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { SelectOptions } from 'services/common/types'
import { usePlayerWalletDetailQuery } from 'services/walletApi'

const TypeList = ReportTransactionTypeOptions
const DateFilterList = DateFilterOptions
const DepositStatusList = ReportCommonStatusOptions
const WithdrawalStatusList = ReportCommonStatusOptions
const GameStatusList = ReportGameStatusOptions
export const ProviderList = Object.keys(GameProvider).map((key) => ({
  label: key,
  value: key,
}))

const FilterSelection = ({ selected, setSelected, isTransaction = false }) => {
  const { t } = useLocalization()
  const { data } = usePlayerWalletDetailQuery()
  const [providerList, setProviderList] = useState<SelectOptions[]>([])

  useEffect(() => {
    if (!data?.success) return
    const newArray =
      Object.values(data?.data).map((item) => {
        return {
          value: item.system_code,
          label: item.system_name,
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
    <View sx={{ p: '$2' }}>
      <View sx={{ flexDirection: 'row' }}>
        {isTransaction ? (
          <Select
            actionSheetProps={{ id: t('menu.tab.transactionType') }}
            headerTitle={t('menu.tab.transactionType')}
            buttonTitle={selected.selectedTransType.label}
            buttonProps={{
              sx: {
                mr: 10,
                flex: 1,
              },
            }}
            data={TypeList.slice(0, 3)}
            setSelectedValue={(value) =>
              setSelected({
                ...selected,
                selectedTransType: value,
                selectedStatus: ReportDepositStatusOptions[0],
              })
            }
          />
        ) : (
          <SelectSquare
            buttonTitle={selected.selectedGame.label}
            buttonProps={{
              sx: {
                mr: 10,
                flex: 1,
              },
            }}
            _dataList={{
              data: providerList,
              setSelectedValue: (value) =>
                setSelected({ ...selected, selectedGame: value }),
            }}
            _actionSheet={{
              id: t('menu.tab.provider'),
              headerTitle: t('menu.tab.game'),
            }}
          />
        )}

        <Select
          actionSheetProps={{
            id: isTransaction ? t('menu.tab.date') : t('menu.tab.game'),
          }}
          headerTitle={t('menu.tab.date')}
          buttonTitle={selected.selectedDate.label}
          buttonProps={{
            sx: {
              mr: 10,
              flex: 1,
            },
          }}
          data={isTransaction ? DateFilterList : DateFilterList.slice(0, 4)}
          setSelectedValue={(value) => {
            const { startDate, endDate } = handleDateRange(value.value)

            setSelected({
              ...selected,
              selectedDate: value,
              startDate,
              endDate,
            })
          }}
        />

        {isTransaction ? (
          <Select
            key={selected.selectedTransType.value}
            actionSheetProps={{ id: t('menu.tab.statusType') }}
            headerTitle={t('menu.tab.statusType')}
            buttonTitle={selected.selectedStatus.label}
            buttonProps={{
              sx: {
                flex: 1,
              },
              disabled:
                selected.selectedTransType.value ===
                ReportTransactionType.REWARD,
            }}
            data={
              selected.selectedTransType === ReportTransactionType.DEPOSIT
                ? DepositStatusList
                : WithdrawalStatusList
            }
            setSelectedValue={(value) =>
              setSelected({ ...selected, selectedStatus: value })
            }
          />
        ) : (
          <Select
            actionSheetProps={{ id: t('menu.tab.win/loss') }}
            headerTitle={t('menu.tab.win/loss')}
            buttonTitle={selected.selectedGameStatus.label}
            buttonProps={{
              sx: {
                flex: 1,
              },
            }}
            data={GameStatusList}
            setSelectedValue={(value) =>
              setSelected({ ...selected, selectedGameStatus: value })
            }
          />
        )}
      </View>

      {isTransaction && (
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: '$2',
          }}
        >
          <DatePicker
            value={selected.startDate}
            icon={'date'}
            rightIcon={'chevdown'}
            _icon={{ color: 'white', size: 20 }}
            style={{ flex: 1 }}
            _dateTime={{
              maximumDate: selected.endDate,
            }}
            _rightIcon={{ size: 20 }}
            onChange={(value) =>
              setSelected({
                ...selected,
                selectedDate: DateFilterOptions[5],
                startDate: value,
              })
            }
          />
          <Text sx={{ justifyContent: 'center', fontSize: 25, mx: 10 }}>-</Text>
          <DatePicker
            value={selected.endDate}
            icon={'date'}
            rightIcon={'chevdown'}
            _icon={{ color: 'white', size: 20 }}
            _rightIcon={{ size: 20 }}
            style={{ flex: 1 }}
            _dateTime={{
              minimumDate: selected.startDate,
            }}
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
