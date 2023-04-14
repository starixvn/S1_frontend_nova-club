import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Button } from 'app/components/form/Button'
import InputBase from 'app/components/form/Input/InputBase'
import Select from 'app/components/form/Input/Select'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import useAddBank from 'app/hooks/bank/useAddBank'
import useLocalization from 'app/provider/localization'
import { View, styled } from 'dripsy'
import React from 'react'
import { useCryptoBankQuery } from 'services/bank'
import RealNameForm from '../components/RealNameForm'

const AddCryptoAccountScreen = () => {
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
    setFieldValue('bank', item)
    setFieldValue('walletAddress', '')

    switch (item?.bank_code) {
      case 'USDT-ERC20':
        setFieldValue('protocol', 'ERC20')
        break
      case 'USDT-TRC20':
        setFieldValue('protocol', 'TRC20')
        break
      case 'BTC':
        setFieldValue('protocol', 'BTC')
        break
      case 'ETH':
        setFieldValue('protocol', 'ETH')
        break
      default:
        break
    }
  }

  return (
    <PageWithBackHeader header={{ title: t('bank.addCryptoAccount') }}>
      <StyledView>
        <RealNameForm formik={formik}>
          <Select
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
          />

          <InputBase
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
export default AddCryptoAccountScreen
