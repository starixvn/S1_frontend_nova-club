import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Button from 'app/components/common/Button'
import Input from 'app/components/form/Input'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'
import SelectWithDropdown from 'app/components/select/SelectWithDropdown'
import { getCryptoProtocol } from 'app/constants/crypto'
import useAddBank from 'app/hooks/bank/useAddBank'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import DesktopPageContainer from 'desktop-ext/components/layout/DesktopPage'
import { View, styled } from 'dripsy'
import React from 'react'
import { useCryptoBankQuery } from 'services/bank'
import RealNameForm from '../components/RealNameForm'

const AddCryptoWalletScreen = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()

  const {
    data: bankData,
    isLoading,
    isFetching,
    isSuccess,
  } = useCryptoBankQuery()

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

  const handleSelected = (value) => {
    const item = bankData?.find((el) => el.bank_code === value)
    const bankProtocol = getCryptoProtocol(item?.bank_code)

    setFieldValue('bank', item)
    setFieldValue('walletAddress', '')
    setFieldValue('protocol', bankProtocol)
  }

  return (
    <PageWithBackHeader header={{ title: t('wallet.addCryptoWallet') }}>
      <ContentWrapper desktop={desktop}>
        <DesktopPageContainer>
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
                label={t('bank.channel')}
                placeholder={t('bank.selectChannel')}
                options={sheetData}
                loading={isLoading || isFetching}
                value={values.bank?.bank_name}
                sx={{ width: '100%', mb: '$3' }}
                onSelected={(e) => handleSelected(e)}
              />
            )}
            <Input
              label={t('wallet.walletAddress')}
              value={values.walletAddress}
              onChangeText={handleChange('walletAddress')}
              onBlur={handleBlur('walletAddress')}
              error={
                touched.walletAddress && errors.walletAddress
                  ? t(errors.walletAddress, {
                      field: t('wallet.walletAddress'),
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
        </DesktopPageContainer>
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

export default AddCryptoWalletScreen
