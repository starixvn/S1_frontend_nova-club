import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'
import Button from 'app/components/common/Button'
import CardInput from 'app/components/form/CardInput'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useAddBank from 'app/hooks/bank/useAddBank'
import useLocalization from 'app/provider/localization'
import { MaxLength } from 'app/utils/constant'
import { View, styled } from 'dripsy'
import React, { useMemo } from 'react'
import { useWithdrawalBankQuery } from 'services/bank'
import RealNameForm from '../components/RealNameForm'

const AddBankAccountScreen = () => {
  const { t } = useLocalization()
  const { bankData, isLoading, isFetching, isSuccess } = useWithdrawalBankQuery(
    undefined,
    {
      selectFromResult: (s) => ({
        ...s,
        bankData: s.data?.data,
      }),
    }
  )

  const sheetData = useMemo(
    () =>
      bankData
        ?.filter((b) => b.bank_code)
        ?.map((item) => {
          return {
            label: item.bank_name,
            value: item.bank_code,
            icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.bank_icon}`,
          }
        }) ?? [],
    [bankData]
  )

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

  const handleSelected = (value) => {
    const item = bankData?.find((el) => el.bank_code === value)
    setFieldValue('bank', item)
  }

  return (
    <PageWithBackHeader header={{ title: 'Add Bank Account' }}>
      <ContentWrapper>
        <RealNameForm formik={formik}>
          <SelectWithCardGrid
            label={t('common.bank')}
            placeholder={t('placeholder.selectBank')}
            options={sheetData}
            loading={isLoading || isFetching}
            value={values.bank?.bank_name}
            sx={{ width: '100%', mb: '$3' }}
            onSelected={(e) => handleSelected(e)}
          />

          <CardInput
            label={t('bank.accountNumber')}
            value={values.accountNo}
            setValue={handleChange('accountNo')}
            // onChangeText={handleChange('accountNo')}
            onBlur={handleBlur('accountNo')}
            keyboardType="number-pad"
            maxLength={MaxLength.CARD}
            error={
              touched.accountNo && errors.accountNo
                ? t(errors.accountNo, {
                    field: t('bank.accountNumber'),
                  })
                : undefined
            }
          />
        </RealNameForm>

        <Button
          loading={isSubmitting}
          disabled={!isValid || !dirty}
          onPress={submitForm}
          sx={{ my: 20 }}
        >
          {t('common.next')}
        </Button>
      </ContentWrapper>
    </PageWithBackHeader>
  )
}

const ContentWrapper = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  p: '$pagePadding',
}))

export default AddBankAccountScreen
