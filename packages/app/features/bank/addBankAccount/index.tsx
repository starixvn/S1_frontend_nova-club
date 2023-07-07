import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Button from 'app/components/common/Button'
import CardInput from 'app/components/form/CardInput'
import FormContainer from 'app/components/form/FormContainer'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import SelectList from 'app/components/select/SelectList'
import useAddBank from 'app/hooks/bank/useAddBank'
import useLocalization from 'app/provider/localization'
import { MaxLength } from 'app/utils/constant'
import isDesktop from 'app/utils/isDesktop'
import React, { useMemo } from 'react'
import { useWithdrawalBankQuery } from 'services/bank'
import RealNameForm from '../components/RealNameForm'

const AddBankAccountScreen = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()

  const {
    data: bankData,
    isLoading,
    isFetching,
    isSuccess,
  } = useWithdrawalBankQuery()

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
    <PageWithBackHeader header={{ title: t('bank.addBankAccount') }}>
      <FormContainer>
        <RealNameForm formik={formik}>
          <SelectList
            isGrid
            label={t('bank.bank')}
            placeholder={t('bank.selectBank')}
            options={sheetData}
            loading={isLoading || isFetching}
            value={values.bank?.bank_code}
            onSelected={(e) => handleSelected(e)}
          />

          <CardInput
            label={t('bank.accountNumber')}
            value={values.accountNo}
            setValue={handleChange('accountNo')}
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

          <CardInput
            label={t('bank.accountNumber')}
            value={values.accountNo}
            setValue={handleChange('accountNo')}
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
    </PageWithBackHeader>
  )
}

export default AddBankAccountScreen
