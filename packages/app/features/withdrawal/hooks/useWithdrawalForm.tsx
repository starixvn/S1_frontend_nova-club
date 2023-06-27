import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useAlert from 'app/hooks/useAlert'
import useShield from 'app/hooks/useShield'
import { toCleanCard, toCurrency, toDisplayAmount } from 'app/utils'
import validation from 'app/utils/validation'
import { FormikHelpers, useFormik } from 'formik'
import { useEffect, useMemo } from 'react'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Shield_Action } from 'services/authApi.type'
import { usePlayerBankQuery } from 'services/bank'
import { PlayerBankResult } from 'services/bank.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/walletApi'
import { useSubmitWithdrawalMutation } from 'services/withdrawal'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'

export type WithdrawalValues = {
  amount: string
  realAmount: number
  bank: PlayerBankResult | undefined
}

const CONFIRMATION_FIELDS = [
  {
    label: 'withdrawal.withdrawTo',
    value: 'bankName',
  },
  {
    label: 'bank.accountName',
    value: 'accountName',
  },
  {
    label: 'bank.accountNumber',
    value: 'accountNumber',
  },
  {
    label: 'common.amount',
    value: 'amount',
  },
]

const CRYPTO_CONFIRMATION_FIELDS = [
  {
    label: 'withdrawal.withdrawTo',
    value: 'bankName',
  },
  {
    label: 'bank.walletAddress',
    value: 'accountNumber',
  },
  {
    label: 'common.amount',
    value: 'amount',
  },
]

const useWithdrawalForm = ({ isCrypto = false, minMax }) => {
  const { showAlert } = useAlert()
  const { openModal } = useModal()
  const { push } = useRouter()

  const { playerBankList, playerCryptoList, isLoading } = usePlayerBankQuery()

  const bankData = useMemo(
    () => (isCrypto ? playerCryptoList : playerBankList),
    [isCrypto, isLoading]
  )

  const { playerBalance } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data }) => ({
      playerBalance: data?.data?.main.balance,
    }),
  })

  const { currency, username } = usePlayerProfileQuery()

  const [postSubmitWithdrawal] = useSubmitWithdrawalMutation()
  const { syncShield } = useShield()

  const bankSelectionList =
    bankData?.map((item) => {
      return {
        label: isCrypto ? item.BankCode : toCleanCard(item.BankAccountNumber),
        value: item.BankAccountNumber,
        icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.BankIcon}`,
      }
    }) ?? []

  useEffect(() => {
    bankData && bankData?.length > 0
      ? setFieldValue('bank', bankData[0])
      : setFieldValue('bank', undefined)
  }, [bankData])

  const handleSelected = (value) => {
    console.log(
      '🚀 ~ file: useWithdrawalForm.tsx:99 ~ handleSelected ~ value:',
      value
    )
    console.log(
      '🚀 ~ file: useWithdrawalForm.tsx:104 ~ handleSelected ~ bankData:',
      bankData
    )
    const item = bankData?.find((el) => el.BankAccountNumber === value)
    setFieldValue('bank', item)
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

  const formik = useFormik<WithdrawalValues>({
    initialValues: {
      amount: '',
      realAmount: 0,
      bank: undefined,
    },
    validationSchema: Yup.object({
      bank: validation.bank,
      amount: validation.amountMinMax({
        min: toDisplayAmount((minMax && minMax.min) ?? 1, currency),
        max: toDisplayAmount(
          Number(playerBalance) > 0
            ? minMax
              ? Math.min(minMax.max, Number(playerBalance))
              : playerBalance
            : 1,
          currency
        ),
      }),
    }),
    onSubmit,
  })

  const { values, setFieldValue } = formik

  function withdrawalConfirmation() {
    openModal('WithdrawalConfirmationModal', {
      withdrawalInfo: {
        bankName: values.bank?.BankName,
        accountName: values.bank?.BankAccountFullName,
        accountNumber: values.bank?.BankAccountNumber,
        amount:
          toCurrency(values.realAmount, currency, {
            forceDecimal: false,
            hideTruncatedThousand: false,
          }) ?? '',
      },
      bankLogo:
        values.bank?.BankIcon &&
        `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${values.bank?.BankIcon}`,
      fields: isCrypto ? CRYPTO_CONFIRMATION_FIELDS : CONFIRMATION_FIELDS,
      onConfirm: () => onSubmit(values, formik),
    })
  }

  const handleGoToBank = () => {
    isCrypto
      ? push('/account/bank/add-crypto-wallet')
      : push('/account/bank/add-bank-account')
  }

  return {
    formik,
    bankSelectionList,
    handleSelected,
    handleGoToBank,
    withdrawalConfirmation,
  }
}

export default useWithdrawalForm
