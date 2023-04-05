import {
  DateFilterOptions,
  EarningOptions,
  getDateRange,
} from 'agent/constant/select'
import { CommissionFilterOptions } from 'agent/features/report/ShareholderCommissionReport'
import {
  useShareholderEditPTMutation,
  useShareholderGetEarnPtQuery,
  useShareholderUpdatePtMutation,
} from 'agent/services/shareholderApi'
import RootToast from 'app/components/RootToast'
import { useAgentLocalization } from 'app/provider/localization'
import { Flex } from 'dripsy'
import React, { useState } from 'react'
import Button from '../Button'
import DatePicker from '../DatePicker/DatePicker'
import Select from '../Select/Select'
import ModalWrapper from './ModalWrapper'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const EditPTModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useAgentLocalization()
  const id = getParam('id')
  const pt = getParam('pt')

  const { ptList } = useShareholderGetEarnPtQuery(
    { id },
    {
      selectFromResult: ({ data }) => ({
        ptList: data?.result?.data.earnPercList.VND ?? {},
      }),
    }
  )

  const [updatePT] = useShareholderUpdatePtMutation()

  const [selected, setSelected] = useState(pt)

  const ptOptions = Object.values(ptList).map((el) => {
    return { label: el, value: el }
  })
  console.log(
    '🚀 ~ file: EditPTModal.tsx:42 ~ ptOptions ~ ptOptions:',
    ptOptions
  )

  function onDismiss() {
    closeModal()
  }

  async function handleConfirm() {
    const { success, message } = await updatePT({
      id,
      currency: {
        VND: {
          EARNP: selected,
        },
      },
    })
      .unwrap()
      .catch((error) => {
        console.log(
          '🚀 ~ file: EditPTModal.tsx:59 ~ handleConfirm ~ error:',
          error
        )
        Toast.show({ type: 'error', text1: error?.message })
        return error
      })

    if (success) {
      Toast.show({ type: 'success', text1: message })

      onDismiss()
    }
  }

  return (
    <ModalWrapper title={t('report.earning')} onClose={onDismiss}>
      <Select
        label={t('report.earning') + ' %'}
        options={ptOptions}
        placeholder={t('report.earning')}
        value={selected}
        onSelected={(val) => setSelected(val)}
        isRequired
        sx={{ mb: 12 }}
      />

      <Button
        elevation={1}
        titleProps={{
          sx: {
            fontWeight: 'bold',
          },
        }}
        onPress={handleConfirm}
      >
        {t('common.submit')}
      </Button>
    </ModalWrapper>
  )
}

export default EditPTModal
