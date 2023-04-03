import Button from 'agent/components/Button'
import Card from 'agent/components/Card'
import IconButton from 'agent/components/Icon/IconButton'
import Input from 'agent/components/Input'
import Text from 'agent/components/Text'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import {
  useAgentChangeReferralToUserDetailMutation,
  useAgentNewTransferMutation,
} from 'agent/services/agentApi'
import {
  useShareholderChangeReferralToUserDetailMutation,
  useShareholderNewTransferMutation,
} from 'agent/services/shareholderApi'
import {
  useChangeReferralToUserDetailMutation,
  useNewTransferMutation,
} from 'agent/services/transferApi'
import { useUserInfoQuery } from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import validation from 'agent/utils/validation'
import { useAgentLocalization } from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { ActivityIndicator, useDripsyTheme, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import debounce from 'lodash/debounce'
import { useCallback, useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import * as Yup from 'yup'

interface BankInfoValues {
  playerId?: string
  username?: string
  amount?: string
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
  const { push, replace } = useContextualRouter()

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

  const currentBalance = (balance ?? 0) / TO_THOUSAND

  const onSubmit = async (
    { playerId, username }: BankInfoValues,
    amount,
    action: FormikHelpers<BankInfoValues>
  ) => {
    setIsLoading(true)
    action.setSubmitting(true)
    try {
      //use transfer function
      if (values.username && values.amount) {
        const { success, message, result } = await newTransfer({
          memberCode: values.username,
          currency: Currency.VND,
          balance_transfer: (parseInt(values.amount) * TO_THOUSAND).toString(),
          remark: `${values.username} - ${values.amount}`,
        }).unwrap()

        if (success && result) {
          //show success alert
          showAlert(
            `${result.data.message} - ${result.data.data?.request_secure_id}`
          )
        } else {
          showAlert(`${result?.data.message}`)
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      action.resetForm()
      action.setSubmitting(false)
      setIsLoading(false)
    }
  }

  const formik = useFormik<BankInfoValues>({
    initialValues: {
      //IAJF465573
      playerId: 'IAJF465573',
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
        console.log(result?.data.message)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsUserNameLoading(false)
    }
  }

  // function transferConfirmation() {
  //   openModal('AgentCommonConfirmationModal', {
  //     info: {
  //       playerId: values.playerId,
  //       username: values.username,
  //       amount: currency + ' ' + toThousandSeparator(values.amount ?? '') + 'K',
  //     },
  //     fields: CONFIRMATION_FIELDS,
  //     onConfirm: () => onSubmit(values, ROLE.SHAREHOLDER, formik),
  //   })
  // }
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
  } = formik
  const debounceGetUserByReferralCode = useCallback(
    debounce(getUserDetailByReferralCode, 1000),
    []
  )

  return (
    <Card sx={{ mx: '3%', my: '$2', alignItems: 'center' }}>
      <Input
        label={t('wallet.referralId')}
        containerProps={{ sx: { mb: '$3' } }}
        placeholder={t('wallet.enterPlayerId')}
        value={values.playerId}
        error={
          touched.playerId && errors.playerId
            ? t(errors.playerId, {
                field: 'Player Id',
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
                field: 'Username',
              })
            : undefined
        }
        leftInnerElement={
          isUserNameLoading ? (
            <ActivityIndicator color={'white'} />
          ) : isUserName ? (
            <View />
          ) : (
            <Text sx={{ color: '$errorAgent' }}>Player ID NOT FOUND</Text>
          )
        }
      />
      <Input
        label={t('common.amount')}
        placeholder={t('wallet.enterWithdrawalAmount')}
        containerProps={{ sx: { mb: '$8' } }}
        onChangeText={handleChange('amount')}
        onBlur={() => {
          handleBlur('amount')
        }}
        value={values.amount?.toString()}
        keyboardType={'numeric'}
        isRequired
        rightOuterElementProps={{
          sx: { bg: theme.colors.$secondaryAgent },
        }}
        rightOuterElement={
          <IconButton
            name="cash"
            color={currentBalance <= 0 ? '$disabled' : 'black'}
            size={25}
            sx={{ mr: '$4' }}
            disabled={currentBalance <= 0}
            onPress={() => {
              formik.setValues({
                ...values,
                amount: currentBalance.toString(),
              })
            }}
          />
        }
        rightInnerElement={
          <Text sx={{ color: 'red' }}>
            {!values.amount
              ? '=0K'
              : `=${toThousandSeparator(values.amount ?? '')}K`}
          </Text>
        }
        error={
          touched.amount && errors.amount
            ? t(errors.amount, {
                field: 'Amount',
              })
            : undefined
        }
      />

      <Button
        onPress={transferPinConfirmation}
        loading={isLoading}
        sx={{ width: 150 }}
        disabled={!isValid || !dirty}
      >
        <Text sx={{ fontWeight: 'bold', py: '$1', color: 'white' }}>
          {t('common.submit')}
        </Text>
      </Button>
    </Card>
  )
}

export default AgentTransferForm
