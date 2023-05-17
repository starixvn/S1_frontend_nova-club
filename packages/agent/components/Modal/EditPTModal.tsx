import {
  useShareholderGetEarnPtQuery,
  useShareholderUpdatePtMutation,
} from 'agent/services/shareholderApi'
import { useAgentLocalization } from 'app/provider/localization'
import React, { useState } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import Button from '../Button'
import Select from '../Select/Select'
import ModalWrapper from './ModalWrapper'

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
        Toast.show({ type: 'error', text1: error?.message })
        return error
      })

    if (success) {
      Toast.show({ type: 'success', text1: message })

      onDismiss()
    }
  }

  return (
    <ModalWrapper title={t('report.pt')} onClose={onDismiss}>
      <Select
        label={t('report.pt') + ' %'}
        options={ptOptions}
        placeholder={t('report.pt')}
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
