import {
  DateFilterOptions,
  getDateRange,
  TypeFilter,
  TypeFilterOptions,
} from 'agent/constant/select'
import { TransactionFilterOptions } from 'agent/features/report/Transaction'
import { useAgentLocalization } from 'app/provider/localization'
import dayjs from 'dayjs'
import { Flex } from 'dripsy'
import React, { useEffect, useState } from 'react'
import DatePicker from '../DatePicker/DatePicker'
import Select from '../Select/Select'
import FilterButtonSelection from './components/FilterButtonSelection'
import ModalWrapper from './ModalWrapper'
import SelectTransactionType from '../Select/SelectTransactionType'

const FilterTransactionReportModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useAgentLocalization()
  const filterOptions = getParam('filterOptions') as TransactionFilterOptions
  const onConfirm = getParam('onConfirm')

  const { date, startDate, endDate, type } = filterOptions
  const [selected, setSelected] = useState({
    date,
    startDate,
    endDate,
    type,
  })

  const getTypeValue = () => {
    let value = ''
    if (selected.type.length === 4)
      return (value = t('filter.selectedItem', { total: selected.type.length }))
    selected.type
      .sort((a, b) => Number(a) - Number(b))
      .map((item) => {
        const label = TypeFilterOptions.find((el) => el.value === item)?.label
        if (label) value += t(label).concat(', ')
      })
    return value.slice(0, -2)
  }

  console.log('typeValue', getTypeValue())
  const dateOptions = DateFilterOptions.map((item) => {
    return { ...item, label: t(item.label) }
  })

  const typeOptions = TypeFilterOptions.map((item) => {
    return { ...item, label: t(item.label) }
  })

  function onDismiss() {
    closeModal()
  }

  function handleConfirm() {
    onDismiss()
    onConfirm(selected)
  }

  function resetFilter() {
    onDismiss()
    onConfirm({
      date: DateFilterOptions[0]?.value,
      startDate: dayjs().startOf('date').toDate(),
      endDate: dayjs().endOf('date').toDate(),
      type: [1, 2, 3, 4],
    })
  }

  useEffect(() => {
    if (selected.startDate > selected.endDate) {
      setSelected({
        ...selected,
        startDate: dayjs(selected.endDate).startOf('date').toDate(),
      })
    }
  }, [selected.endDate])

  return (
    <ModalWrapper title={t('common.filter')} onClose={onDismiss}>
      <Select
        options={dateOptions}
        placeholder={t('report.transactionDate')}
        value={selected.date}
        onSelected={(val: string) => {
          const { startDate, endDate } = getDateRange(val)
          setSelected({
            ...selected,
            date: val,
            startDate: startDate ? startDate : selected.startDate,
            endDate: endDate ? endDate : selected.endDate,
          })
        }}
        label={t('report.transactionDate')}
        isRequired
      />
      <Flex
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          mb: 12,
        }}
      >
        <DatePicker
          label={t('common.from')}
          isRequired
          value={
            selected.startDate instanceof Date
              ? selected.startDate
              : new Date(selected.startDate)
          }
          rightIcon="calendar"
          _rightIcon={{ size: 20 }}
          _dateTime={{ maximumDate: selected.endDate as Date }}
          onChange={(value) => {
            setSelected({
              ...selected,
              date: DateFilterOptions[5]?.value,
              startDate: dayjs(value).startOf('date').toDate(),
            })
          }}
          sx={{ width: '48%' }}
        />
        <DatePicker
          label={t('common.to')}
          isRequired
          value={
            selected.endDate instanceof Date
              ? selected.endDate
              : new Date(selected.endDate)
          }
          rightIcon="calendar"
          _rightIcon={{ size: 20 }}
          onChange={(value) => {
            setSelected({
              ...selected,
              date: DateFilterOptions[5]?.value,
              endDate: dayjs(value).endOf('date').toDate(),
            })
          }}
          sx={{ width: '48%' }}
        />
      </Flex>

      <SelectTransactionType
        placeholder={t('report.type')}
        value={getTypeValue()}
        check={selected.type}
        setCheck={(value: TypeFilter[]) =>
          setSelected({
            ...selected,
            type: value,
          })
        }
        label={t('report.type')}
        options={dateOptions}
      />

      <FilterButtonSelection
        resetFilter={resetFilter}
        handleConfirm={handleConfirm}
      />
    </ModalWrapper>
  )
}

export default FilterTransactionReportModal
