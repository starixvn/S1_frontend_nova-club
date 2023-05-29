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

  const sheetData = bankData?.map((item) => {
    return {
      label: item.bank_name,
      value: item.bank_code,
      icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.bank_icon}`,
    }
  })

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

  const handleSelected = (value) => {
    const item = bankData?.find((el) => el.bank_code === value.value)
    const bankProtocol = getCryptoProtocol(item?.bank_code)

    setFieldValue('bank', item)
    setFieldValue('walletAddress', '')
    setFieldValue('protocol', bankProtocol)
  }

  return (
    <PageWithBackHeader header={{ title: t('bank.addCryptoWallet') }}>
      <StyledView>
        <RealNameForm formik={formik}>
          {/* <Select
            label={t('deposit.channel')}
            value={values.bank?.bank_name ?? ''}
            loading={isLoading || isFetching}
            options={sheetData}
            onSelected={handleSelected}
            sx={{ mb: '$2' }}
            _actionSheet={{
              sheetId: ACTION_SHEET_ID.CHANNEL,
              headerTitle: t('deposit.channel'),
            }}
          /> */}

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

        <StyledButtonWrapper>
          {/* <Button
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
          </Button> */}
          <Button title={t('bank.addCryptoWallet')} />
        </StyledButtonWrapper>
      </StyledView>
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  p: '$pagePadding',
}))

const StyledButtonWrapper = styled(View)(() => ({
  my: 20,
  mx: 12,
}))
export default AddCryptoWalletScreen
