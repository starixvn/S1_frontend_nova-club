import validation from 'app/utils/validation'
import { FormikHelpers, useFormik } from 'formik'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useAddPlayerBankAccMutation } from 'services/bank'
import { WithdrawalBankResult } from 'services/bank.type'
import {
  usePlayerProfileQuery,
  useUpdateProfileMutation,
} from 'services/playerApi'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import useAlert from '../useAlert'

type BankType = {
  BankType: 'bank' | 'crypto'
}

type AddBankAccountValues = {
  realName?: string
  otp?: string
  bank: WithdrawalBankResult | undefined
  accountNo: string
}

type AddCryptoValues = {
  realName?: string
  otp?: string
  bank: WithdrawalBankResult | undefined
  protocol: string
  walletAddress: string
  isCryptoValidation: boolean
  isRealNameValidation: boolean
  isPhoneVerified: boolean
}

const useAddBank = ({ BankType }: BankType) => {
  const { back } = useRouter()
  const { showAlert } = useAlert()
  const [postAddWithdrawalBankAcc] = useAddPlayerBankAccMutation()
  const [updateProfile] = useUpdateProfileMutation()
  const { data: playerData } = usePlayerProfileQuery()
  const isRealNameAvailable =
    playerData?.firstName && playerData?.firstName?.length > 0
  const isPhoneVerified = playerData?.verified_phone === 1
  const isCrypto = BankType === 'crypto'

  async function updateRealName(realName, otp) {
    const { data, success, message } = await updateProfile({
      field: 'firstName',
      value: realName,
      verify_code: otp,
    })
      .unwrap()
      .catch((error) => {
        showAlert(error)
        return error
      })

    if (success) {
      Toast.show({ type: 'success', text1: message })
      return
    } else {
      return message
    }
  }

  const onSubmit = async (
    {
      realName,
      otp,
      bank,
      protocol,
      walletAddress,
      accountNo,
    }: AddCryptoValues & AddBankAccountValues,
    actions: FormikHelpers<AddCryptoValues & AddBankAccountValues>
  ) => {
    try {
      if ((!isRealNameAvailable || !isPhoneVerified) && realName && otp) {
        const sanitizedRealName = realName.trim().replace(/\s\s+/g, ' ')
        const error = await updateRealName(sanitizedRealName, otp)

        if (error) {
          return
        }
      }

      const { data, success, message } = await postAddWithdrawalBankAcc({
        bank_acc_name: bank?.bank_name ?? '',
        bank_acc_num: isCrypto
          ? walletAddress.replace(/[^a-zA-Z0-9]/g, '')
          : accountNo.replace(/[^0-9]/g, ''),
        bank_address: bank?.bank_code ?? '',
        bank_type_id: bank?.id ?? 0,
        branch: bank?.bank_name ?? '',
        city: '',
        province: '',
        protocol: isCrypto ? protocol : '',
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
        Toast.show({ type: 'success', text1: message })
        actions.resetForm()

        setTimeout(() => {
          back()
        }, 150)
      }
    } catch (error) {
      showAlert(error)
    }
  }

  const formik = useFormik<AddCryptoValues & AddBankAccountValues>({
    enableReinitialize: true,
    initialValues: {
      bank: undefined,
      protocol: '',
      walletAddress: '',
      accountNo: '',
      realName: playerData?.firstName ?? '',
      isCryptoValidation: isCrypto,
      isRealNameValidation: !!isRealNameAvailable,
      isPhoneVerified: !!isPhoneVerified,
    },
    validationSchema: Yup.object({
      bank: validation.bank,
      accountNo: Yup.number().when('isCryptoValidation', {
        is: false,
        then: () => validation.accountNo,
      }),
      walletAddress: Yup.string().when('isCryptoValidation', {
        is: true,
        then: () =>
          Yup.string().when('bank', ([bank]) => {
            switch (bank?.bank_code) {
              case 'USDT-ERC20':
                return validation.usdtErc20
              case 'USDT-TRC20':
                return validation.usdtTrc20
              case 'BTC':
                return validation.btc
              case 'ETH':
                return validation.eth

              default:
                break
            }
          }),
      }),
      protocol: Yup.string().when('isCryptoValidation', {
        is: true,
        then: () => validation.stringRequired,
      }),
      realName: Yup.string().when('isRealNameValidation', {
        is: false,
        then: () => validation.vietnameseCharacter,
      }),
      otp: Yup.string().when('isPhoneVerified', {
        is: false,
        then: () => validation.stringRequired,
      }),
    }),
    onSubmit,
  })

  return {
    formik,
  }
}

export default useAddBank
