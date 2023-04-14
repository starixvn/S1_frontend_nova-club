import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Button } from 'app/components/form/Button'
import InputBase from 'app/components/form/Input/InputBase'
import Select from 'app/components/form/Input/Select'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import useAddBank from 'app/hooks/bank/useAddBank'
import useLocalization from 'app/provider/localization'
import { toCleanCard } from 'app/utils'
import { MaxLength } from 'app/utils/constant'
import { styled, View } from 'dripsy'
import React from 'react'
import { useWithdrawalBankQuery } from 'services/bank'
import RealNameForm from '../components/RealNameForm'

const AddBankAccountScreen = () => {
  const { t } = useLocalization()
  const { bankData, isLoading, isFetching, isSuccess } = useWithdrawalBankQuery(
    undefined,
    {
      selectFromResult: (s) => ({
        ...s,
        bankData: s.data?.data?.filter((b) => b.bank_code),
      }),
    }
  )

  const sheetData = bankData?.map((item) => {
    return {
      label: item.bank_name,
      value: item.bank_code,
      icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.bank_icon}`,
    }
  })

  const { formik } = useAddBank({ BankType: 'bank' })

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

  function onCardChanged(text: string) {
    if (text != null) {
      const cleanText = toCleanCard(text)
      setValues({
        ...values,
        accountNo: cleanText,
      })
    }
  }

  const handleSelected = (value) => {
    const item = bankData?.find((el) => el.bank_code === value.value)
    setFieldValue('bank', item)
  }

  return (
    <PageWithBackHeader header={{ title: t('bank.addBankAccount') }}>
      <StyledView>
        <RealNameForm formik={formik}>
          <Select
            label={t('bank.bank')}
            value={values.bank?.bank_name ?? ''}
            loading={isLoading || isFetching}
            options={sheetData}
            onSelected={handleSelected}
            isHorizontalActionSheet
            sx={{ mb: '$2' }}
            _actionSheet={{
              sheetId: ACTION_SHEET_ID.ADD_BANK_ACCOUNT,
              headerTitle: t('bank.bank'),
            }}
          />

          <InputBase
            label={t('bank.accountNo')}
            value={values.accountNo}
            onChangeText={onCardChanged}
            onBlur={handleBlur('accountNo')}
            keyboardType="number-pad"
            maxLength={MaxLength.CARD}
            error={
              touched.accountNo && errors.accountNo
                ? t(errors.accountNo, {
                    field: t('bank.accountNo'),
                  })
                : undefined
            }
          />
        </RealNameForm>
        <StyledButtonWrapper>
          <Button
            rounded
            stretch
            loading={isSubmitting}
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
            <Button.Label>{t('common.next')}</Button.Label>
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
