import {
  DateFilterOptions,
  getDateRange,
  TypeFilterOptions,
} from 'agent/constant/select'
import { TransactionFilterOptions } from 'agent/features/report/Transaction'
import { useAgentTranslation } from 'app/provider/localization'

import { Flex } from 'dripsy'
import React, { useState } from 'react'
import Button from '../Button'
import DatePicker from '../DatePicker/DatePicker'
import Select from '../Select/Select'
import ModalWrapper from './ModalWrapper'

const FilterTransactionReportModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useAgentTranslation()
  const filterOptions = getParam('filterOptions') as TransactionFilterOptions
  const onConfirm = getParam('onConfirm')

  const [selected, setSelected] = useState({
    date: filterOptions.date,
    type: filterOptions.type,
    startDate: filterOptions.startDate,
    endDate: filterOptions.endDate,
  })

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

  return (
    <ModalWrapper title={t('report.transactionFilter')} onClose={onDismiss}>
      <Select
        options={dateOptions}
        placeholder={t('report.transactionDate')}
        value={selected.date}
        onSelected={(val) => {
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

      <Select
        options={typeOptions}
        placeholder={t('report.type')}
        value={selected.type}
        onSelected={(val) => {
          setSelected({ ...selected, type: val })
        }}
        label={t('report.type')}
        isRequired
        sx={{ mb: 12 }}
      />

      <Button
        elevation={1}
        leftIcon={{
          name: 'search',
        }}
        titleProps={{
          sx: {
            fontWeight: 'bold',
          },
        }}
        onPress={handleConfirm}
      >
        {t('common.search')}
      </Button>
    </ModalWrapper>
  )
}

export default FilterTransactionReportModal
