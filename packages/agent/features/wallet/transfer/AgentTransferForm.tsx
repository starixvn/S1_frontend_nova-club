import Button from 'agent/components/Button'
import Card from 'agent/components/Card'
import IconButton from 'agent/components/Icon/IconButton'
import Input from 'agent/components/Input'
import NumberInput from 'agent/components/NumberInput'
import Text from 'agent/components/Text'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import {
  useAgentChangeReferralToUserDetailMutation,
  useAgentNewTransferMutation,
  useShareholderChangeReferralToUserDetailMutation,
  useShareholderNewTransferMutation,
} from 'agent/services/transferApi'
import { ROLE } from 'agent/utils/helper'
import validation from 'agent/utils/validation'
import { useAgentLocalization } from 'app/provider/localization'
import { Currency } from 'utils/constant'
import { ActivityIndicator, View, useDripsyTheme } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import debounce from 'lodash/debounce'
import { useCallback, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import * as Yup from 'yup'
import { agentToThousandSeparator } from 'agent/utils'

interface BankInfoValues {
  playerId: string
  username: string
  amount: string
}

interface AgentTransferFormProps {
  currency: Currency
  balance: number
  isAgent: boolean
  hasPin: boolean
}

const CONFIRMATION_FIELDS = [
  {
    label: 'bank.playerID',
    value: 'playerId',
  },
  {
    label: 'bank.playerName',
    value: 'username',
  },
  {
    label: 'common.amount',
    value: 'amount',
  },
]

const TO_THOUSAND = 1000

const AgentTransferForm = ({
  currency,
  balance,
  isAgent,
  hasPin,
}: AgentTransferFormProps) => {
  const { theme } = useDripsyTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [isUserNameLoading, setIsUserNameLoading] = useState(false)
  const [isUserName, setIsUserName] = useState(true)
  const { t } = useAgentLocalization()
  const { showAlert } = useAgentAlert()
  const { openModal } = useModal()

  const [agentNewTransfer] = useAgentNewTransferMutation()
  const [shareholderNewTransfer] = useShareholderNewTransferMutation()

  const [agentReferralToUserDetail] =
    useAgentChangeReferralToUserDetailMutation()
  const [shareholderReferralToUserDetail] =
    useShareholderChangeReferralToUserDetailMutation()

  const newTransfer = isAgent ? agentNewTransfer : shareholderNewTransfer

  const referralToUserDetail = isAgent
    ? agentReferralToUserDetail
    : shareholderReferralToUserDetail

  const onSubmit = async (
    { playerId, username, amount }: BankInfoValues,
    action: FormikHelpers<BankInfoValues>
  ) => {
    setIsLoading(true)
    try {
      //use transfer function
      if (values.username && values.amount) {
        const { success, message, result } = await newTransfer({
          memberCode: values.username,
          currency,
          balance_transfer: amount?.replace(/,/g, '') ?? '0',
          remark: `${values.username} - ${values.amount}`,
          referrer_code: playerId,
        }).unwrap()

        if (success && result) {
          //show success alert
          showAlert(
            `${result.data.message} - ${result.data.data?.request_secure_id}`
          )
          resetForm()
        } else {
          showAlert(`${result?.data.message}`)
        }
      }
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik<BankInfoValues>({
    initialValues: {
      //IAJF465573
      playerId: '',
      username: '',
      amount: '',
    },
    validationSchema: Yup.object({
      playerId: validation.stringRequired,
      username: validation.username,
      amount: validation.amount,
    }),
    onSubmit,
  })
  const getUserDetailByReferralCode = async (refId: string) => {
    if (!refId) {
      setIsUserNameLoading(false)
      setIsUserName(true)
      return
    }
    try {
      const { success, message, result } = await referralToUserDetail({
        referralCode: refId,
      }).unwrap()

      if (success && result?.data.value) {
        setFieldValue('username', result.data.value)
        setIsUserName(true)
      } else {
        setFieldValue('username', '')
        setIsUserName(false)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsUserNameLoading(false)
    }
  }
  function transferPinConfirmation() {
    openModal('AgentPinModal', {
      isAgent,
      onConfirm: () => onSubmit(values, ROLE.SHAREHOLDER, formik),
    })
  }
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    values,
    errors,
    touched,
    isValid,
    dirty,
    submitForm,
    resetForm,
  } = formik

  const handleChangeAmount = (value: string, field: string) => {
    const amount = value.replace(/[^\d]/g, '')
    const formattedAmount = agentToThousandSeparator(amount)
    formik.setFieldValue(field, formattedAmount.toString())
  }

  const debounceGetUserByReferralCode = useCallback(
    debounce(getUserDetailByReferralCode, 1000),
    []
  )

  return (
    <Card sx={{ mx: '3%', my: '$2', alignItems: 'center' }}>
      <Input
        label={t('wallet.referralId')}
        containerProps={{ sx: { mb: '$3' } }}
        placeholder={t('placeholder.enterPlayerId')}
        value={values.playerId}
        error={
          touched.playerId && errors.playerId
            ? t(errors.playerId, {
                field: t('transfer.playerID'),
              })
            : undefined
        }
        onChangeText={(e) => {
          handleChange('playerId')(e)
          debounceGetUserByReferralCode(e)
          isUserNameLoading === false && setIsUserNameLoading(true)
        }}
        onBlur={() => {
          handleBlur('playerId')
        }}
      />
      <Input
        label={t('common.username')}
        value={values.username}
        containerProps={{ sx: { mb: '$3' } }}
        isRequired
        editable={false}
        error={
          touched.username && errors.username
            ? t(errors.username, {
                field: t('common.username'),
              })
            : undefined
        }
        leftInnerElement={
          isUserNameLoading ? (
            <ActivityIndicator color={'white'} />
          ) : isUserName ? (
            <View />
          ) : (
            <Text sx={{ color: '$errorAgent' }}>{t('transfer.errorId')}</Text>
          )
        }
      />
      <NumberInput
        value={values.amount?.toString()}
        onChangeText={(e) => formik.setFieldValue('amount', e)}
        label={t('common.amount')}
        placeholder={t('placeholder.enterAmount')}
        containerProps={{ sx: { mb: '$5' } }}
        onBlur={() => {
          handleBlur('amount')
        }}
        keyboardType={'numeric'}
        isRequired
        rightOuterElementProps={{ sx: { bg: theme.colors.$secondaryAgent } }}
        rightOuterElement={
          <IconButton
            name="cash"
            color={balance <= 0 ? '$disabled' : '#4e4f50'}
            size={25}
            disabled={balance <= 0}
            sx={{ mr: '$4' }}
            onPress={() => handleChangeAmount(balance.toString(), 'amount')}
          />
        }
        error={
          errors.amount && touched.amount
            ? t(errors.amount, {
                field: t('common.amount'),
              })
            : undefined
        }
      />

      <Button
        onPress={transferPinConfirmation}
        loading={isLoading}
        sx={{ width: 150 }}
        disabled={
          !isValid ||
          !dirty ||
          parseInt(values.amount.replace(/,/g, '')) > balance ||
          isUserNameLoading
        }
      >
        <Text sx={{ fontWeight: 'bold', py: '$1', color: 'white' }}>
          {t('common.submit')}
        </Text>
      </Button>
    </Card>
  )
}

export default AgentTransferForm
