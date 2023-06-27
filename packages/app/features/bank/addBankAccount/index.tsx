import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Button from 'app/components/common/Button'
import CardInput from 'app/components/form/CardInput'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'
import SelectWithDropdown from 'app/components/select/SelectWithDropdown'
import useAddBank from 'app/hooks/bank/useAddBank'
import useLocalization from 'app/provider/localization'
import { MaxLength } from 'app/utils/constant'
import isDesktop from 'app/utils/isDesktop'
import DesktopPage from 'desktop-ext/components/layout/DesktopPage'
import { View, styled } from 'dripsy'
import React, { useMemo } from 'react'
import { useWithdrawalBankQuery } from 'services/bank'
import RealNameForm from '../components/RealNameForm'
import DesktopPageContainer from 'desktop-ext/components/layout/DesktopPage'
import FormContainer from 'app/components/form/FormContainer'

const AddBankAccountScreen = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()

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
  console.log(
    '🚀 ~ file: index.tsx:62 ~ AddBankAccountScreen ~ errors:',
    errors
  )

  const handleSelected = (value) => {
    const item = bankData?.find((el) => el.bank_code === value)
    setFieldValue('bank', item)
  }

  return (
    <PageWithBackHeader header={{ title: t('bank.addBankAccount') }}>
      <ContentWrapper desktop={desktop}>
        <FormContainer>
          <RealNameForm formik={formik}>
            {desktop ? (
              <View sx={{ marginBottom: '$3' }}>
                <SelectWithDropdown
                  label={t('bank.bank')}
                  options={sheetData}
                  selected={values.bank?.bank_name}
                  onSelected={(e) => handleSelected(e)}
                />
              </View>
            ) : (
              <SelectWithCardGrid
                label={t('bank.bank')}
                placeholder={t('bank.selectBank')}
                options={sheetData}
                loading={isLoading || isFetching}
                value={values.bank?.bank_name}
                sx={{ width: '100%', mb: '$3' }}
                onSelected={(e) => handleSelected(e)}
              />
            )}
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
        </FormContainer>
      </ContentWrapper>
    </PageWithBackHeader>
  )
}

const ContentWrapper = styled(View)(({ desktop }: { desktop: boolean }) => ({
  flex: 1,
  bg: '$secondary',
  p: '$pagePadding',
  px: desktop ? 0 : '$pagePadding',
}))

export default AddBankAccountScreen
