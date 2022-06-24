import DatePicker from 'app/components/form/DatePicker/DatePicker'
import Select from 'app/components/form/Select'
import SelectButton from 'app/components/form/Select/SelectButton'
import SelectSquare from 'app/components/form/Select/SelectSquare'
import RoundedIcon from 'app/components/RoundedIcon'
import useLocalization from 'app/provider/localization'
import {
  DateFilter,
  GameProvider,
  ReportGameStatus,
  ReportStatusDeposit,
  ReportStatusWithdrawal,
  ReportTransactionType,
} from 'app/utils/constant'
import dayjs from 'dayjs'
import { Text, View } from 'dripsy'
import React from 'react'
import { SheetManager } from 'react-native-actions-sheet'

const TypeList = Object.values(ReportTransactionType)
const DateFilterList = Object.values(DateFilter)
const DepositStatusList = Object.values(ReportStatusDeposit)
const WithdrawalStatusList = Object.values(ReportStatusWithdrawal)
const GameStatusList = Object.values(ReportGameStatus)
const ProviderList = Object.keys(GameProvider)

const FilterSelection = ({ selected, setSelected, isTransaction = false }) => {
  const { t } = useLocalization()

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
    <View>
      <View sx={{ flexDirection: 'row', p: '$4' }}>
        {isTransaction ? (
          <Select
            actionSheetProps={{ id: t('menu.tab.transactionType') }}
            headerTitle={t('menu.tab.transactionType')}
            buttonTitle={selected.selectedTransType}
            buttonProps={{
              sx: {
                mr: 10,
                flex: 1,
              },
            }}
            data={TypeList}
            setSelectedValue={(value) =>
              setSelected({
                ...selected,
                selectedTransType: value,
                selectedStatus: ReportStatusDeposit.ALL,
              })
            }
          />
        ) : (
          <SelectSquare
            buttonTitle={selected.selectedGame}
            buttonProps={{
              sx: {
                mr: 10,
                flex: 1,
              },
            }}
            _flatList={{
              data: ProviderList,
              keyExtractor: (item) => item,
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
          buttonTitle={selected.selectedDate}
          buttonProps={{
            sx: {
              mr: 10,
              flex: 1,
            },
          }}
          data={isTransaction ? DateFilterList : DateFilterList.slice(0, 4)}
          setSelectedValue={(value) => {
            const { startDate, endDate } = handleDateRange(value)

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
            actionSheetProps={{ id: t('menu.tab.statusType') }}
            headerTitle={t('menu.tab.statusType')}
            buttonTitle={selected.selectedStatus}
            buttonProps={{
              sx: {
                flex: 1,
              },
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
            buttonTitle={selected.selectedStatus}
            buttonProps={{
              sx: {
                flex: 1,
              },
            }}
            data={GameStatusList}
            setSelectedValue={(value) =>
              setSelected({ ...selected, selectedStatus: value })
            }
          />
        )}
      </View>

      {isTransaction && (
        <View sx={{ flexDirection: 'row', alignItems: 'center', mb: '$10' }}>
          <DatePicker
            value={selected.startDate}
            icon={'sb'}
            rightIcon={'chevdown'}
            _icon={{
              color: 'white',
              size: 20,
            }}
            style={{ flex: 1 }}
            onChange={(value) =>
              setSelected({
                ...selected,
                selectedDate: DateFilter.CUSTOM,
                startDate: value,
              })
            }
          />
          <Text sx={{ justifyContent: 'center', fontSize: 25, mx: 10 }}>-</Text>
          <DatePicker
            value={selected.endDate}
            icon={'sb'}
            rightIcon={'chevdown'}
            _icon={{ color: 'white', size: 20 }}
            style={{ flex: 1 }}
            onChange={(value) =>
              setSelected({
                ...selected,
                selectedDate: DateFilter.CUSTOM,
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
