import { DateFilterOptions, getDateRange } from 'agent/constant/select'
import { CommissionFilterOptions } from 'agent/features/report/ShareholderCommissionReport'
import { useAgentTranslation } from 'app/provider/localization'
import { Flex } from 'dripsy'
import React, { useState } from 'react'
import Button from '../Button'
import DatePicker from '../DatePicker/DatePicker'
import Select from '../Select/Select'
import ModalWrapper from './ModalWrapper'

const FilterCommissionReportModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useAgentTranslation()
  const filterOptions = getParam('filterOptions') as CommissionFilterOptions
  const onConfirm = getParam('onConfirm')

  const [selected, setSelected] = useState({
    date: filterOptions.date,
    startDate: filterOptions.startDate,
    endDate: filterOptions.endDate,
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

export default FilterCommissionReportModal
