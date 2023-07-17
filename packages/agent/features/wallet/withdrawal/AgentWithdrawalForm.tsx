import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Button from 'agent/components/Button'
import Card from 'agent/components/Card'
import IconButton from 'agent/components/Icon/IconButton'
import Input from 'agent/components/Input'
import NumberInput from 'agent/components/NumberInput'
import SelectWithdrawalBank from 'agent/components/Select/SelectWithdrawalBank'
import Text from 'agent/components/Text'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import { BankAccountItem } from 'agent/services/accountApi.type'
import { IResponse } from 'agent/services/common/agentAxiosBaseQuery'
import {
  useNewNettPayoutMutation,
  useNewWithdrawalMutation,
} from 'agent/services/withdrawalApi'
import {
  NettPayout,
  WithdrawalSubmissionInfo,
} from 'agent/services/withdrawalApi.type'
import validation from 'agent/utils/validation'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useAgentLocalization } from 'app/provider/localization'
import { agentToThousandSeparator } from 'agent/utils'
import { Currency } from 'app/utils/constant'
import { ActivityIndicator, View, styled, useDripsyTheme } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import debounce from 'lodash/debounce'
import { useCallback, useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import * as Yup from 'yup'

const CONFIRMATION_FIELDS = [
  {
    label: 'wallet.withdrawalTo',
    value: 'bankName',
  },
  {
    label: 'common.accountName',
    value: 'accountName',
  },
  {
    label: 'common.accountNumber',
    value: 'accountNumber',
  },
  {
    label: 'wallet.nettPayout',
    value: 'nettPayout',
  },
]
export interface AgentWithdrawalInfoValue {
  bankCard?: string
  accountNumber: string
  accountName: string
  amount: string
  nettPayout?: string
}

interface WithdrawalSheetData {
  label: string
  value: string
  icon: string
  id: string
}
interface AgentWithdrawalFormProps {
  currency: Currency
  bankListData: IResponse<BankAccountItem[]>
  bankListLoading: boolean
  balance: number
}

const AgentWithdrawalForm = ({
  currency,
  bankListData,
  bankListLoading,
  balance,
}: AgentWithdrawalFormProps) => {
  const { theme } = useDripsyTheme()
  const { t } = useAgentLocalization()
  const { openModal } = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const [isNettPayoutLoading, setIsNettPayoutLoading] = useState(false)
  const [selectedBankIcon, setSelectedBankIcon] = useState('')
  const [bankCardId, setBankCardId] = useState('')
  const { width } = useContainerDimension()
  const [newWithdrawal] = useNewWithdrawalMutation()
  const [newNettPayout] = useNewNettPayoutMutation()
  const { showAlert } = useAgentAlert()
  const onSubmit = async (
    {
      bankCard,
      accountNumber,
      accountName,
      amount,
      nettPayout,
    }: AgentWithdrawalInfoValue,
    { resetForm }: FormikHelpers<AgentWithdrawalInfoValue>
  ) => {
    try {
      setIsLoading(true)
      const { message, success } = await newWithdrawal({
        currency,
        bank_card: bankCardId,
        account_number: accountNumber,
        account_name: accountName,
        amount: amount.replace(/[^\d]/g, ''),
      })
        .unwrap()
        .catch((error: IResponse<WithdrawalSubmissionInfo>) => {
          showAlert(error)
          return error
        })
      if (success) {
        showAlert(message)
        formik.setFieldValue('amount', '0')
        formik.setFieldValue('nettPayout', '0')
      }
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      showAlert(err)
    }
  }
  const formik = useFormik<AgentWithdrawalInfoValue>({
    initialValues: {
      bankCard: '',
      accountNumber: '',
      accountName: '',
      amount: '',
    },
    validationSchema: Yup.object({
      bankCard: Yup.string().required('validation.required'),
      accountNumber: validation.stringRequired,
      accountName: validation.stringRequired,
      amount: validation.amount500k,
      nettPayout: validation.stringRequired,
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    dirty,
    setValues,
  } = formik

  function withdrawalConfirmation() {
    openModal('AgentCommonConfirmationModal', {
      info: {
        bankName: values.bankCard,
        accountName: values.accountName,
        accountNumber: values.accountNumber,
        nettPayout: currency + ' ' + values.nettPayout,
      },
      title: 'wallet.withdrawalConfirmation',
      bankLogo: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${selectedBankIcon}`,
      fields: CONFIRMATION_FIELDS,
      onConfirm: () => onSubmit(values, formik),
    })
  }
  const handleChangeAmount = (value: string, field: string) => {
    const amount = value.replace(/[^\d]/g, '')
    const formattedAmount = agentToThousandSeparator(amount.toString())
    formik.setFieldValue(field, formattedAmount)
  }

  const computeNettPayout = async (amt: number) => {
    if (amt < 1000 || null) return null
    setIsNettPayoutLoading(true)
    const { result } = await newNettPayout({
      currency,
      amount: amt,
    })
      .unwrap()
      .catch((err): IResponse<NettPayout> => {
        showAlert(err)
        return err
      })

    handleChangeAmount(result?.data.value.toString() ?? '0', 'nettPayout')
    setIsNettPayoutLoading(false)
  }

  const debounceNettPayout = useCallback(debounce(computeNettPayout, 1000), [
    currency,
  ])

  const handleSelected = (value: WithdrawalSheetData) => {
    const item = bankListData.result?.data.find((el) => {
      return el.bank_card_id === value.id
    })
    setValues({
      ...values,
      bankCard: item?.bank_code,
      accountName: item?.acc_name ?? 'N/A',
      accountNumber: item?.acc_no ?? 'N/A',
    })
    setSelectedBankIcon(item?.bank_icon ?? '')
    setBankCardId(item?.bank_card_id ?? '')
  }
  const sheetData: WithdrawalSheetData[] =
    bankListData?.result?.data.map((item) => {
      return {
        label: item.bank_code,
        value: item.bank_code,
        icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.bank_icon}`,
        id: item.bank_card_id,
      }
    }) ?? []

  useEffect(() => {
    if (bankListData?.result?.data[0]) {
      setValues({
        ...values,
        bankCard: bankListData.result.data[0].bank_code ?? '',
        accountName: bankListData.result.data[0]?.acc_name ?? 'N/A',
        accountNumber: bankListData.result.data[0]?.acc_no ?? 'N/A',
      })
      setSelectedBankIcon(bankListData.result.data[0].bank_icon ?? '')
      setBankCardId(bankListData.result.data[0].bank_card_id ?? '')
    }
  }, [bankListData])
  return (
    <Card sx={{ mx: '3%', my: '$2', alignItems: 'center' }}>
      <SelectWithdrawalBank
        placeholder={t('common.selectBank')}
        value={values.bankCard}
        onSelected={handleSelected}
        label={t('common.bankCard')}
        options={sheetData}
        loading={bankListLoading}
        sx={{ width: '100%', mb: '$3' }}
        onDeleteDone={() => formik.resetForm()}
      />
      <RowInputContainer>
        <Input
          editable={false}
          label={t('common.accountNumber')}
          value={values.accountNumber}
          onBlur={handleBlur('accountNumber')}
          onChange={handleBlur('accountNumber')}
          containerProps={{
            sx: { mb: '$3', width: width * 0.43 },
          }}
          error={
            errors.accountNumber && touched.accountNumber
              ? t(errors.accountNumber, {
                  field: 'Account Number',
                })
              : undefined
          }
        />
        <Input
          editable={false}
          value={values.accountName}
          label={t('common.accountName')}
          onBlur={handleBlur('accountName')}
          onChange={handleBlur('accountName')}
          containerProps={{
            sx: { mb: '$3', width: width * 0.43 },
          }}
          error={
            errors.accountName && touched.accountName
              ? t(errors.accountName, {
                  field: 'Account Name',
                })
              : undefined
          }
        />
      </RowInputContainer>

      <NumberInput
        value={values.amount}
        label={t('common.amount')}
        placeholder={t('placeholder.enterAmount')}
        onChangeText={(e) => {
          formik.setFieldValue('amount', e)
          debounceNettPayout(parseInt(e.replace(/[^\d]/g, '')))
          isNettPayoutLoading === false && setIsNettPayoutLoading(true)
        }}
        onBlur={handleBlur('amount')}
        keyboardType={'number-pad'}
        isRequired
        rightOuterElementProps={{
          sx: { bg: theme.colors.$secondaryAgent },
        }}
        rightOuterElement={
          <IconButton
            name="cash"
            color={balance <= 0 ? '$disabled' : '#4e4f50'}
            size={25}
            disabled={balance <= 0}
            sx={{ mr: '$4' }}
            onPress={() => {
              handleChangeAmount(balance.toString(), 'amount')
              debounceNettPayout(balance)
            }}
          />
        }
        error={
          errors.amount
            ? t(errors.amount, {
                field: t('common.amount'),
              })
            : undefined
        }
      />
      <View sx={{ bg: 'transparent', width: '100%', mb: '$2' }}>
        <Text sx={{ color: 'red', fontSize: 13 }}>
          {'* ' + t('wallet.withdrawalAmountNote')}
        </Text>
      </View>

      <Input
        editable={false}
        label={t('wallet.nettPayout')}
        value={values.nettPayout ? values.nettPayout : '0'}
        onChangeText={handleChange('nettPayout')}
        onBlur={handleBlur('nettPayout')}
        keyboardType={'numeric'}
        containerProps={{ sx: { mb: '$5' } }}
        error={
          touched.nettPayout && errors.nettPayout
            ? t(errors.nettPayout, {
                field: 'Nett Payout',
              })
            : undefined
        }
        leftInnerElement={
          isNettPayoutLoading ? <ActivityIndicator color={'white'} /> : <View />
        }
      />

      <Button
        onPress={withdrawalConfirmation}
        loading={isLoading}
        sx={{ width: 150 }}
        disabled={
          !isValid ||
          !dirty ||
          parseInt(values.amount.replace(/,/g, '')) > balance ||
          isNettPayoutLoading
        }
      >
        <Text sx={{ fontWeight: 'bold', py: '$1', color: 'white' }}>
          {t('common.submit')}
        </Text>
      </Button>
    </Card>
  )
}

const RowInputContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
})

export default AgentWithdrawalForm
