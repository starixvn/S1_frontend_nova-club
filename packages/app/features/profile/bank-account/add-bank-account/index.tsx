import React from 'react'
import { TextField } from 'app/components/TextField'
import { styled, Text, View } from 'dripsy'
import { Button } from 'app/components/form/Button'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import { useDispatch } from 'react-redux'
import { DEFAULT_SQUARE_ACTION_SHEET_ID } from 'app/components/SquareSelectorActionSheet'
import {
  useAddPlayerBankAccMutation,
  useWithdrawalBankQuery,
} from 'services/bank'
import { AlertActions } from 'app/store/alert'
import { useRouter } from 'solito/router'
import useLocalization from 'app/provider/localization'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { WithdrawalBankResult } from 'services/bank.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { SheetManager } from 'react-native-actions-sheet'
import RoundedIcon from 'app/components/RoundedIcon'

type AddBankAccountValues = {
  accountName: string
  bank: WithdrawalBankResult | {}
  accountNo: string
}

const AddBankAccountScreen = () => {
  const dispatch = useDispatch()
  const { t } = useLocalization()
  const { back } = useRouter()
  const { data, isLoading, isFetching, isSuccess } = useWithdrawalBankQuery()
  const [postAddWithdrawalBankAcc] = useAddPlayerBankAccMutation()
  const { data: playerProfile } = usePlayerProfileQuery()

  const actionSheedId = t('bank.addBankAccount')

  const onSubmit = async (
    { accountName, bank, accountNo }: AddBankAccountValues,
    actions: FormikHelpers<AddBankAccountValues>
  ) => {
    try {
      const { data, success, message } = await postAddWithdrawalBankAcc({
        bank_acc_name: 'bankAcc',
        bank_acc_num: accountNo,
        bank_address: 'bankAcc',
        bank_type_id: bank.id,
        branch: 'bankAcc',
        city: 'bankAcc',
        province: 'bankAcc',
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))
      console.log(
        '🚀 ~ file: index.tsx ~ line 64 ~ WithdrawalPage ~ data',
        data
      )

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()

        back()
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    }
  }

  const formik = useFormik<AddBankAccountValues>({
    initialValues: {
      accountName: playerProfile?.data?.firstName ?? '',
      bank: {},
      accountNo: '',
    },
    validationSchema: Yup.object({
      accountName: validation.accountName,
      // bank: validation.sysId,
      accountNo: validation.accountNo,
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    errors,
    touched,
    isValid,
    dirty,
    submitForm,
    setFieldValue,
    setValues,
  } = formik

  function onAmountChanged(text: string) {
    if (text != null) {
      const cleanText = text.replace(/[^0-9]/g, '')
      if (cleanText === values.accountNo) return
      let amountNumber = parseFloat(cleanText)
      if (isNaN(amountNumber)) amountNumber = 0
      setValues({
        ...values,
        accountNo: cleanText,
      })
    }
  }

  return (
    <PageWithBackHeader header={{ title: t('bank.addBankAccount') }}>
      <StyledView>
        <TextField labelWidth={0.55}>
          <TextField.TextInput
            label="bank.accountName"
            _input={{
              placeholder: 'bank.enterAccountName',
              editable: values.accountName === '' ? true : false,
              value: values.accountName,
            }}
            error={
              touched.accountName && errors.accountName
                ? errors.accountName
                : undefined
            }
            containerStyle={{ my: '$3' }}
          />
          <TextField.Select
            label="bank.bank"
            _input={{
              placeholder: t('bank.selectBank'),
              value: values.bank?.bank_name,
            }}
            _flatList={{
              data: data,
              isLoading: isLoading || isFetching,
              keyExtractor: (item) => item.id,
              renderItem: ({ item }) => (
                <View sx={{ alignItems: 'center' }}>
                  <RoundedIcon
                    size="lg"
                    key={item.id}
                    icon={require('app/assets/images/home/fishing.png')}
                    onPress={async () => {
                      setFieldValue('bank', item)
                      await SheetManager.hide(
                        actionSheedId ?? DEFAULT_SQUARE_ACTION_SHEET_ID
                      )
                    }}
                    containerStyle={{
                      m: '$0a',
                    }}
                  />
                  <Text sx={{ color: 'black' }}>{item.bank_code}</Text>
                </View>
              ),
            }}
            _actionSheet={{
              id: actionSheedId,
              headerTitle: t('bank.bank'),
            }}
          />

          <TextField.TextInput
            label="bank.accountNo"
            _input={{
              placeholder: t('bank.enterAccountNo'),
              value: values.accountNo,
              onChangeText: onAmountChanged,
              onBlur: handleBlur('accountNo'),
              keyboardType: 'number-pad',
            }}
            error={
              touched.accountNo && errors.accountNo
                ? errors.accountNo
                : undefined
            }
            containerStyle={{ my: '$0' }}
          />
        </TextField>

        <StyledButtonWrapper>
          <Button
            rounded
            stretch
            disabled={!isValid || !dirty}
            variant="lg"
            fill={{
              type: 'gradient',
              color: 'secondary',
              start: { x: 0, y: 0 },
              end: { x: 1, y: 0 },
            }}
            onPress={submitForm}
          >
            <Button.Label>Next</Button.Label>
          </Button>
        </StyledButtonWrapper>
      </StyledView>
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  pt: '$6',
}))

const StyledButtonWrapper = styled(View)(() => ({
  my: '$10',
  mx: '$6',
}))
export default AddBankAccountScreen
