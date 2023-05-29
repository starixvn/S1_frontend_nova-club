import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { View, styled } from 'dripsy'
import React from 'react'
import { useWithdrawalBankQuery } from 'services/bank'
import RealNameForm from '../components/RealNameForm'
import Input from 'app/components/form/Input'
import Button from 'app/components/common/Button'
import useAddBank from 'app/hooks/bank/useAddBank'
import { MaxLength } from 'app/utils/constant'
import CardInput from 'app/components/form/CardInput'

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
  console.log(
    '🚀 ~ file: index.tsx:48 ~ AddBankAccountScreen ~ values:',
    values
  )

  const handleSelected = (value) => {
    const item = bankData?.find((el) => el.bank_code === value.value)
    setFieldValue('bank', item)
  }

  return (
    <PageWithBackHeader header={{ title: 'Add Bank Account' }}>
      <ContentWrapper>
        <RealNameForm formik={formik}>
          {/* <Select
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
          /> */}

          <CardInput
            label={t('bank.accountNo')}
            value={values.accountNo}
            setValue={handleChange('accountNo')}
            // onChangeText={handleChange('accountNo')}
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
          <Button title="Add" />
        </StyledButtonWrapper>
      </ContentWrapper>
    </PageWithBackHeader>
  )
}

const ContentWrapper = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  p: '$pagePadding',
}))

const StyledButtonWrapper = styled(View)(() => ({
  my: 20,
  mx: 12,
}))
export default AddBankAccountScreen
