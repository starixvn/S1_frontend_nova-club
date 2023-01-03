import DatePicker from 'app/components/form/DatePicker/DatePicker'
import Select, {
  SelectButtonComponentProps,
} from 'app/components/form/Input/Select'
import SelectButton from 'app/components/form/Select/SelectButton'
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
import { SelectOptions } from 'services/common/types'
import { usePlayerWalletDetailQuery } from 'services/walletApi'

const TypeList = ReportTransactionTypeOptions
const DateFilterList = DateFilterOptions
const DepositStatusList = ReportCommonStatusOptions
const WithdrawalStatusList = ReportCommonStatusOptions
const GameStatusList = ReportGameStatusOptions

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
    <View sx={{ p: '$2' }}>
      <View sx={{ flexDirection: 'row' }}>
        {isTransaction ? (
          <Select
            options={TypeList}
            onSelected={(value) =>
              setSelected({
                ...selected,
                selectedTransType: value,
                selectedStatus: ReportDepositStatusOptions[0],
              })
            }
            buttonComponent={(props: SelectButtonComponentProps) => (
              <SelectButton
                variants="history"
                label={selected.selectedTransType.label}
                containerStyle={{
                  mr: 10,
                  flex: 1,
                }}
                {...props}
              />
            )}
            _actionSheet={{
              sheetId: t('menu.tab.transactionType') + 1,
              headerTitle: t('menu.tab.transactionType'),
            }}
          />
        ) : (
          <Select
            isHorizontalActionSheet
            options={providerList}
            onSelected={(value) =>
              setSelected({ ...selected, selectedGame: value })
            }
            buttonComponent={(props: SelectButtonComponentProps) => (
              <SelectButton
                variants="history"
                label={selected.selectedGame.label}
                logo={selected.selectedGame.icon}
                containerStyle={{
                  mr: 10,
                  flex: 1,
                }}
                {...props}
              />
            )}
            _actionSheet={{
              sheetId: t('menu.tab.provider') + 1,
              headerTitle: t('menu.tab.provider'),
              variants: 'provider',
            }}
          />
        )}

        <Select
          options={isTransaction ? DateFilterList : DateFilterList.slice(0, 4)}
          onSelected={(value) => {
            const { startDate, endDate } = handleDateRange(value.value)

            setSelected({
              ...selected,
              selectedDate: value,
              startDate,
              endDate,
            })
          }}
          buttonComponent={(props: SelectButtonComponentProps) => (
            <SelectButton
              variants="history"
              label={selected.selectedDate.label}
              containerStyle={{
                mr: 10,
                flex: 1,
              }}
              {...props}
            />
          )}
          _actionSheet={{
            sheetId: isTransaction
              ? t('menu.tab.date') + 1
              : t('menu.tab.game') + 1,
            headerTitle: t('menu.tab.date'),
          }}
        />

        {isTransaction ? (
          <Select
            options={
              selected.selectedTransType === ReportTransactionType.DEPOSIT
                ? DepositStatusList
                : WithdrawalStatusList
            }
            onSelected={(value) =>
              setSelected({ ...selected, selectedStatus: value })
            }
            buttonComponent={(props: SelectButtonComponentProps) => (
              <SelectButton
                variants="history"
                label={selected.selectedStatus.label}
                containerStyle={{
                  flex: 1,
                }}
                disabled={
                  selected.selectedTransType.value !==
                    ReportTransactionType.DEPOSIT &&
                  selected.selectedTransType.value !==
                    ReportTransactionType.WITHDRAWAL
                }
                {...props}
              />
            )}
            _actionSheet={{
              sheetId: t('menu.tab.statusType') + 1,
              headerTitle: t('menu.tab.statusType'),
            }}
          />
        ) : (
          <Select
            options={GameStatusList}
            onSelected={(value) =>
              setSelected({ ...selected, selectedGameStatus: value })
            }
            buttonComponent={(props: SelectButtonComponentProps) => (
              <SelectButton
                variants="history"
                label={selected.selectedGameStatus.label}
                containerStyle={{
                  flex: 1,
                }}
                {...props}
              />
            )}
            _actionSheet={{
              sheetId: t('menu.tab.win/loss') + 1,
              headerTitle: t('menu.tab.win/loss'),
            }}
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
