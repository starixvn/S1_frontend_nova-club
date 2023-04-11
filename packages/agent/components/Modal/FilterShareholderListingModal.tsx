import {
  DateFilterOptions,
  getDateRange,
  ShareholderStatusFilterOptions,
} from 'agent/constant/select'
import { ShareholderListingFilterOptions } from 'agent/features/shareholder/ShareholderListing'
import { useAgentLocalization } from 'app/provider/localization'
import dayjs from 'dayjs'
import { Flex } from 'dripsy'
import React, { useEffect, useState } from 'react'
import DatePicker from '../DatePicker/DatePicker'
import Input from '../Input'
import Select from '../Select/Select'
import FilterButtonSelection from './components/FilterButtonSelection'
import ModalWrapper from './ModalWrapper'

const FilterShareholderListingModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useAgentLocalization()
  const filterOptions = getParam(
    'filterOptions'
  ) as ShareholderListingFilterOptions
  const onConfirm = getParam('onConfirm')

  const { date, username, startDate, endDate, status } = filterOptions
  const [selected, setSelected] = useState({
    date,
    username,
    startDate,
    endDate,
    status,
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
  function resetFilter() {
    onDismiss()
    onConfirm({
      date: '',
      startDate: dayjs().startOf('month').toDate(),
      endDate: dayjs().endOf('date').toDate(),
      status: '',
      username: '',
    })
  }

  useEffect(() => {
    if (selected.startDate > selected.endDate) {
      setSelected({ ...selected, startDate: selected.endDate })
    }
  }, [selected.endDate])

  return (
    <ModalWrapper title={t('shAgent.shareholderFilter')} onClose={onDismiss}>
      <Select
        options={dateOptions}
        placeholder={t('shAgent.regDate')}
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
        label={t('shAgent.regDate')}
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
        onSelected={(val: string) => {
          setSelected({ ...selected, status: val })
        }}
        label={t('common.status')}
        isRequired
        sx={{ mb: 12 }}
      />

      <FilterButtonSelection
        resetFilter={resetFilter}
        handleConfirm={handleConfirm}
      />
    </ModalWrapper>
  )
}

export default FilterShareholderListingModal
