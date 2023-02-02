import {
  DateFilterOptions,
  getDateRange,
  ShareholderStatusFilterOptions,
} from 'agent/constant/select'
import { AgentListingFilterOptions } from 'agent/features/agent/AgentListing'
import { useAgentTranslation } from 'app/provider/localization'
import { Flex } from 'dripsy'
import React, { useState } from 'react'
import Button from '../Button'
import DatePicker from '../DatePicker/DatePicker'
import Input from '../Input'
import Select from '../Select/Select'
import ModalWrapper from './ModalWrapper'

const FilterAgentListingModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useAgentTranslation()
  const filterOptions = getParam('filterOptions') as AgentListingFilterOptions
  const onConfirm = getParam('onConfirm')

  const [selected, setSelected] = useState({
    date: filterOptions.date,
    username: filterOptions.username,
    startDate: filterOptions.startDate,
    endDate: filterOptions.endDate,
    status: filterOptions.status,
  })

  const dateOptions = DateFilterOptions.map((item) => {
    return { ...item, label: t(item.label) }
  })

  const statusOptions = ShareholderStatusFilterOptions.map((item) => {
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

      <Input
        label={t('common.username')}
        containerProps={{
          sx: { mb: 12 },
        }}
        value={selected.username}
        onChangeText={(value) => setSelected({ ...selected, username: value })}
      />

      <Select
        options={statusOptions}
        placeholder={t('common.status')}
        value={selected.status}
        onSelected={(val) => {
          setSelected({ ...selected, status: val })
        }}
        label={t('common.status')}
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

export default FilterAgentListingModal
