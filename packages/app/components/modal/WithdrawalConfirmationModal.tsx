import { WithdrawalValues } from 'app/features/withdrawal/components/WithdrawalForm'
import useAlert from 'app/hooks/useAlert'
import useShield from 'app/hooks/useShield'
import useLocalization from 'app/provider/localization'
import { Box, Image, Text } from 'dripsy'
import { FormikHelpers } from 'formik'
import React from 'react'
import { Platform } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Shield_Action } from 'services/authApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useSubmitWithdrawalMutation } from 'services/withdrawal'
import { modalDelaySubmission } from 'utils/common'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const WithdrawalConfirmationModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()

  const { showAlert } = useAlert()
  const { username } = usePlayerProfileQuery()

  const withdrawalInfo = getParam('withdrawalInfo', '')
  const bankLogo = getParam('bankLogo', '')
  const fields = getParam('fields', '')
  const formik = getParam('formik')

  const isShowingFields = withdrawalInfo && fields

  const [postSubmitWithdrawal, { isLoading }] = useSubmitWithdrawalMutation()
  const { syncShield } = useShield()

  function onDismiss() {
    closeModal()
  }

  function onWithdrawalConfirmed() {
    modalDelaySubmission(() => onSubmit(formik.values, formik))
    onDismiss()
  }

  const onSubmit = async (
    { bank, realAmount }: WithdrawalValues,
    actions: FormikHelpers<WithdrawalValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await postSubmitWithdrawal({
        amount: realAmount,
        bank_details_id: bank?.PlayerBankDetailsId ?? 0,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
        if (username) {
          syncShield(Shield_Action.WITHDRAWAL)
        }
        Toast.show({ type: 'success', text1: message })
        actions.resetForm()
      }
    } catch (error) {
      showAlert(error)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <ModalWrapper>
      <ModalContent
        title={t('menu.withdrawalConfirmation')}
        actions={[
          {
            label: t('common.cancel'),
            onPress: onDismiss,
          },
          {
            label: t('common.submit'),
            onPress: onWithdrawalConfirmed,
            loading: isLoading,
          },
        ]}
      >
        <>
          {bankLogo ? (
            <Image
              source={
                typeof bankLogo === 'string'
                  ? {
                      uri: bankLogo,
                    }
                  : bankLogo
              }
              resizeMode="contain"
              sx={{ mx: '$2', width: 100, height: 100 }}
            />
          ) : null}
          {isShowingFields &&
            fields.map((field) => {
              return (
                <Box sx={{ p: '$2' }} key={field.value?.toString()}>
                  <Text sx={{ fontWeight: 'bold' }}>
                    {t(field.label?.toString())} :
                  </Text>
                  <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      sx={{
                        mt: '$1',
                        ...Platform.select({
                          web: {
                            wordBreak: 'break-word',
                          },
                        }),
                      }}
                    >
                      {withdrawalInfo[field.value]?.toString() ?? ''}
                    </Text>
                  </Box>
                </Box>
              )
            })}
        </>
      </ModalContent>
    </ModalWrapper>
  )
}

export default WithdrawalConfirmationModal
