import { DateFilterOptions, getDateRange } from 'agent/constant/select'
import { TransactionFilterOptions } from 'agent/features/report/Transaction'
import { useAgentLocalization } from 'app/provider/localization'
import dayjs from 'dayjs'
import { Flex } from 'dripsy'
import React, { useState } from 'react'
import DatePicker from '../DatePicker/DatePicker'
import Select from '../Select/Select'
import FilterButtonSelection from './components/FilterButtonSelection'
import ModalWrapper from './ModalWrapper'

const FilterTransactionReportModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useAgentLocalization()
  const filterOptions = getParam('filterOptions') as TransactionFilterOptions
  const onConfirm = getParam('onConfirm')

  const { date, startDate, endDate, type } = filterOptions
  const [selected, setSelected] = useState({
    date,
    startDate,
    endDate,
  })

  const dateOptions = DateFilterOptions.map((item) => {
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
    })
  }

  return (
    <ModalWrapper title={t('report.transactionFilter')} onClose={onDismiss}>
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
          onChange={(value) => {
            setSelected({
              ...selected,
              date: DateFilterOptions[5]?.value,
              startDate: value,
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
              endDate: value,
            })
          }}
          sx={{ width: '48%' }}
        />
      </Flex>

      <FilterButtonSelection
        resetFilter={resetFilter}
        handleConfirm={handleConfirm}
      />
    </ModalWrapper>
  )
}

export default FilterTransactionReportModal
