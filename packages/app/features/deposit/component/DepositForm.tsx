import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Button from 'app/components/common/Button'
import SelectList from 'app/components/select/SelectList'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { MAP_CRYPTO_PROTOCOL } from 'app/constants/crypto'
import { ROOT_DOMAIN } from 'app/constants/domain'
import useAlert from 'app/hooks/useAlert'
import useCheckMobile from 'app/hooks/useCheckMobile'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { toDisplayAmount } from 'app/utils'
import validation from 'app/utils/validation'
import BankSelection from 'desktop-ext/features/withdrawal/components/BankSelection'
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Linking, Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import {
  useDepositPaymentListQuery,
  useGetAvailableDepositAmountQuery,
  useSubmitDepositMutation,
} from 'services/deposit'
import {
  AutoBankItem,
  PlayerInputFieldsAmount,
  PlayerInputFieldsBank,
} from 'services/deposit.type'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import useDepositFailedMessage from '../tools/useDepositFailedMessage'
import DailyMax from './DailyMax'
import FieldAmount from './FieldAmount'
import FieldSelectBank from './FieldSelectBank'

export type DepositValues = {
  bank: string | null
  selectedChannel: AutoBankItem | null
  amount: string
  realAmount: number
}

const DepositForm = ({ DepositCategoryId }) => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { showAlert } = useAlert()
  const { openModal } = useModal()
  const [postSubmitDeposit] = useSubmitDepositMutation()

  const currency = useAppSelector((state) => state.setting.currency)
  const horizontalMode = useIsDesktop()
  const { dispatchDepositFailedMessage } = useDepositFailedMessage()

  const { isMobile } = useCheckMobile()
  const { data, isLoading, isFetching } = useDepositPaymentListQuery({
    is_mobile: isMobile ? 0 : 1,
  })
  const { data: dailyData } = useGetAvailableDepositAmountQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const depositPayment = data?.data?.result.auto.find(
    (el) => el.category_id === DepositCategoryId
  )

  const channelOptions =
    depositPayment?.list.map((item: AutoBankItem, index: number) => {
      return {
        label:
          depositPayment.category_id === DepositPaymentMethodCategoryId.CRYPTO
            ? MAP_CRYPTO_PROTOCOL[item.bankTypeId]
            : // : `${t('deposit.channel')} ${index + 1}`,
              `${item.payment_account_name}`,
        value: index.toString(),
        icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.account_icon}`,
        limit: { min: item.minDeposit, max: item.maxDeposit },
      }
    }) ?? []

  const [selectedValues, setSelectedValues] = useState(0)
  const selectedChannel = depositPayment?.list[selectedValues] as AutoBankItem
  const inputFields = Object.values(selectedChannel?.player_input_fields ?? {})

  const fieldBank = inputFields.find(
    (el: PlayerInputFieldsBank) => el.type === 'bank_list'
  ) as PlayerInputFieldsBank

  const fieldAmount = inputFields.find(
    (el: PlayerInputFieldsAmount) => el.type === 'float_amount'
  ) as PlayerInputFieldsAmount

  const minAmount = selectedChannel?.minDeposit
  const maxAmount = selectedChannel?.maxDeposit

  useEffect(() => {
    selectedChannel && setFieldValue('selectedChannel', selectedChannel)

    fieldBank &&
      fieldBank.bank_tree &&
      setFieldValue('bank', Object.keys(fieldBank.bank_tree)[0])
  }, [selectedChannel])

  const onSubmit = async (
    { bank, selectedChannel, realAmount }: DepositValues,
    actions: FormikHelpers<DepositValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const result = await postSubmitDeposit({
        amount: realAmount,
        bank: bank ?? '',
        bank_type_id: selectedChannel?.bankTypeId ?? 0,
        card_code: 0,
        card_seri: 0,
        card_type: '',
        deposit_from: selectedChannel?.deposit_from ?? 0,
        fail_url: ROOT_DOMAIN,
        home_url: ROOT_DOMAIN,
        process_url: ROOT_DOMAIN,
        name: '',
        payment_account_id: selectedChannel?.pay_acc_id ?? 0,
        success_url: ROOT_DOMAIN,
      })
        .unwrap()
        .catch((error) => {
          dispatchDepositFailedMessage(error)
          return null
        })

      if (result?.success) {
        if (DepositCategoryId === DepositPaymentMethodCategoryId.CRYPTO) {
          openModal('DepositCryptoModal', {
            data: result.data,
            persistent: true,
          })
        } else {
          if (Platform.OS === 'web') {
            Linking.openURL(result?.data?.url ?? '')
          } else {
            const params = {
              title: depositPayment?.category_text,
              depositUrl: encodeURIComponent(result?.data?.url ?? ''),
            }

            push('/deposit/deposit-loader', {
              pathname: '/deposit/deposit-loader',
              query: params,
            })
          }
        }

        formik.resetForm()
        setSelectedValues(0)
        setFieldValue('selectedChannel', selectedChannel)
      }
    } catch (error) {
      showAlert(error)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik<DepositValues>({
    initialValues: {
      bank: null,
      selectedChannel: null,
      amount: '',
      realAmount: 0,
    },
    validationSchema: Yup.object({
      realAmount: validation.amount,
      amount: validation.amountMinMax({
        min: toDisplayAmount(minAmount, currency),
        max: toDisplayAmount(maxAmount, currency),
      }),
    }),
    onSubmit,
  })

  const { isSubmitting, isValid, dirty, submitForm, setFieldValue } = formik

  const handleSelected = (value) => {
    setSelectedValues(value)
    formik.resetForm()
  }

  return (
    <View sx={{ pt: '$3' }}>
      <View sx={{ px: horizontalMode ? 0 : '$4' }}>
        <DailyMax
          type="deposit"
          amount={dailyData?.current}
          dailyMax={dailyData?.max}
        />
        {horizontalMode ? (
          <BankSelection
            subtitle=""
            label={t('deposit.selectChannel')}
            list={channelOptions}
            selected={channelOptions && channelOptions[selectedValues]?.value}
            onPress={handleSelected}
          />
        ) : (
          <SelectList
            label={t('deposit.selectChannel')}
            placeholder={t('deposit.selectChannel')}
            value={channelOptions && channelOptions[selectedValues]?.value}
            loading={isLoading || isFetching}
            options={channelOptions}
            onSelected={handleSelected}
          />
        )}
      </View>
      {/* <View
        sx={{
          pt: horizontalMode ? '$4' : 0,
        }}
      >
        {selectedValues >= 0 && (
          <MinMaxLimitDetail
            currency={currency}
            minAmount={minAmount}
            maxAmount={maxAmount}
          />
        )}
      </View> */}
      <View sx={{ px: horizontalMode ? 0 : '$4' }}>
        <FieldSelectBank
          field={fieldBank}
          isLoading={isLoading || isFetching}
          formik={formik}
        />
        <FieldAmount
          field={fieldAmount}
          minAmount={minAmount ?? ''}
          maxAmount={maxAmount ?? ''}
          formik={formik}
        />

        <View sx={{ flex: 1, marginTop: 65, justifyContent: 'space-between' }}>
          <Button
            loading={isSubmitting}
            disabled={!isValid || !dirty}
            onPress={submitForm}
          >
            <Text>{t('common.next')}</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default DepositForm
