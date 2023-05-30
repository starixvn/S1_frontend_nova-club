import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useAddBank from 'app/hooks/bank/useAddBank'
import useLocalization from 'app/provider/localization'
import { View, styled } from 'dripsy'
import React from 'react'
import { useCryptoBankQuery } from 'services/bank'
import RealNameForm from '../components/RealNameForm'
import { getCryptoProtocol } from 'app/constants/crypto'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import Input from 'app/components/form/Input'
import Button from 'app/components/common/Button'
import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'

const AddCryptoWalletScreen = () => {
  const { t } = useLocalization()
  const { bankData, isLoading, isFetching, isSuccess } = useCryptoBankQuery(
    undefined,
    {
      selectFromResult: (s) => ({
        ...s,
        bankData: s.data?.data?.filter((b) => b.bank_code),
      }),
    }
  )

  const sheetData =
    bankData?.map((item) => {
      return {
        label: item.bank_name,
        value: item.bank_code,
        icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.bank_icon}`,
      }
    }) ?? []

  const { formik } = useAddBank({ BankType: 'crypto' })

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
  } = formik
  console.log(
    '🚀 ~ file: index.tsx:49 ~ AddCryptoWalletScreen ~ errors:',
    errors
  )

  const handleSelected = (value) => {
    const item = bankData?.find((el) => el.bank_code === value)
    const bankProtocol = getCryptoProtocol(item?.bank_code)

    setFieldValue('bank', item)
    setFieldValue('walletAddress', '')
    setFieldValue('protocol', bankProtocol)
  }

  return (
    <PageWithBackHeader header={{ title: t('bank.addCryptoWallet') }}>
      <StyledView>
        <RealNameForm formik={formik}>
          <SelectWithCardGrid
            label={t('bank.channel')}
            placeholder={t('placeholder.selectChannel')}
            options={sheetData}
            loading={isLoading || isFetching}
            value={values.bank?.bank_name}
            sx={{ width: '100%', mb: '$3' }}
            onSelected={(e) => handleSelected(e)}
          />

          <Input
            label={t('bank.walletAddress')}
            value={values.walletAddress}
            onChangeText={handleChange('walletAddress')}
            onBlur={handleBlur('walletAddress')}
            error={
              touched.walletAddress && errors.walletAddress
                ? t(errors.walletAddress, {
                    field: t('bank.walletAddress'),
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
      </StyledView>
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  p: '$pagePadding',
}))

export default AddCryptoWalletScreen
