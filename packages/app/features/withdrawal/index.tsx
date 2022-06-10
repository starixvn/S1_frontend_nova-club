import { Button } from 'app/components/form/Button'
import Select from 'app/components/form/Select'
import { GradientBoxText } from 'app/components/GradientBoxText'
import RoundedIcon from 'app/components/RoundedIcon'
import { useAppSelector } from 'app/provider/redux/store'
import { usePlayerWithdrawalBankQuery } from 'app/services/playerWithdrawalBank'
import { ScrollView, styled, Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import ImportantNotice from 'app/components/ImportantNotice'
import BankSelector from 'app/components/BankSelector'

type WithdrawalValues = {
  bank: number
  amount: string
}

const NOTES = ['note.w1', 'note.w2', 'note.w3', 'note.w4', 'note.w5']

const WithdrawalPage = () => {
  const user = useAppSelector((state) => state.player.currentLoginUser)
  const { data, isLoading, isFetching, isSuccess } =
    usePlayerWithdrawalBankQuery({
      username: user?.username ?? '',
    })

  const [convertedData, setConvertedData] = useState([])
  const [selectedBank, setSelectedBank] = useState()

  const onSubmit = async (
    { bank, amount }: WithdrawalValues,
    actions: FormikHelpers<WithdrawalValues>
  ) => {
    console.log('bank :>> ', bank)
    console.log('amount :>> ', amount)
  }

  const formik = useFormik<WithdrawalValues>({
    initialValues: {
      bank: 0,
      amount: '',
    },
    validationSchema: Yup.object({
      bank: validation.sysId,
      amount: validation.amount,
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
    setValues,
    setFieldValue,
  } = formik

  function onAmountChanged(text: string) {
    if (text != null) {
      const cleanText = text.replace(/[^0-9]/g, '')
      if (cleanText === values.amount) return
      let amountNumber = parseFloat(cleanText)
      if (isNaN(amountNumber)) amountNumber = 0
      setValues({
        ...values,
        amount: cleanText,
      })
    }
  }

  useEffect(() => {
    data && setConvertedData(Object.keys(data).map((key) => data[key]))
  }, [data])
  console.log('errors', errors)
  console.log('bank', selectedBank)
  return (
    <StyledView>
      <GradientBoxText labelWidth={0.55}>
        <Select
          headerTitle={'Player Withdrawal bank'}
          buttonTitle="Player withdrawal bank"
          buttonProps={{
            sx: {
              borderColor: 'transparent',
            },
            isActive: false,
          }}
          setSelectedValue={(value) => console.log('selected value', value)}
        >
          <BankSelector
            bankList={convertedData}
            isLoading={isLoading || isFetching}
            selectedBank={values.bank}
            onPress={(id) => {
              setSelectedBank(id)
              setFieldValue('bank', id)
            }}
          />
          {/* <ScrollView sx={{ bg: 'white' }}>
            <View
              sx={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                p: '$2',
              }}
            >
              {isSuccess
                ? convertedData.map((item) => (
                    <View key={item.id}>
                      <RoundedIcon
                        size="small"
                        key={item.id}
                        image={require('app/assets/images/home/fishing.png')}
                        containerStyle={{ m: '$1' }}
                      />
                      <Text sx={{ color: 'black', textAlign: 'center' }}>
                        {item.bankName}
                      </Text>
                    </View>
                  ))
                : null}
            </View>
          </ScrollView> */}
        </Select>

        <GradientBoxText.TextInput
          label="Amount"
          _input={{
            placeholder: 'Please enter your withdrawal amount',
            value: values.amount.toString(),
            keyboardType: 'number-pad',
            onChangeText: onAmountChanged,
            onBlur: handleBlur('amount'),
          }}
          error={touched.amount && errors.amount ? errors.amount : undefined}
          containerStyle={{ my: '$3' }}
        />

        <ImportantNotice keys={NOTES} module="withdrawal" />

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
          sx={{
            my: '$10',
          }}
          onPress={submitForm}
        >
          <Button.Label>Next</Button.Label>
        </Button>
      </GradientBoxText>
    </StyledView>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  background: '$secondary',
  p: '$4',
}))

export default WithdrawalPage
