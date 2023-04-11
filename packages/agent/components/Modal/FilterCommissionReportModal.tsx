import { DateFilterOptions, getDateRange } from 'agent/constant/select'
import { CommissionFilterOptions } from 'agent/features/report/ShareholderCommissionReport'
import { useAgentLocalization } from 'app/provider/localization'
import dayjs from 'dayjs'
import { Flex } from 'dripsy'
import React, { useEffect, useState } from 'react'
import DatePicker from '../DatePicker/DatePicker'
import Select from '../Select/Select'
import ModalWrapper from './ModalWrapper'
import FilterButtonSelection from './components/FilterButtonSelection'
import dayjsTz from 'app/utils/dayjs'

const FilterCommissionReportModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useAgentLocalization()
  const filterOptions = getParam('filterOptions') as CommissionFilterOptions
  const onConfirm = getParam('onConfirm')

  const { date, startDate, endDate } = filterOptions
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

  useEffect(() => {
    if (selected.startDate > selected.endDate) {
      setSelected({ ...selected, startDate: selected.endDate })
    }
  }, [selected.endDate])

  return (
    <ModalWrapper title={t('report.commissionFilter')} onClose={onDismiss}>
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
          value={selected.startDate}
          rightIcon="calendar"
          _rightIcon={{ size: 20 }}
          _dateTime={{ maximumDate: selected.endDate as Date }}
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
          value={selected.endDate}
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

export default FilterCommissionReportModal
