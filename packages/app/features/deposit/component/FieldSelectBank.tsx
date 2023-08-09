import InputLabel from 'app/components/form/InputLabel'
import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'
import { getBankLogo } from 'app/config/bank'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import { FormikProps } from 'formik'
import React from 'react'
import { PlayerInputFieldsBank } from 'services/deposit.type'
import { DepositValues } from './DepositForm'
import HorizontalSelectBankCardGrid from './HorizontalSelectBankCardGrid'

type FieldBankProps = {
  field: PlayerInputFieldsBank
  isLoading: boolean
  formik: FormikProps<DepositValues>
}

const FieldSelectBank = ({ field, isLoading, formik }: FieldBankProps) => {
  const { t } = useLocalization()
  const horizontalMode = useIsDesktop()

  const { values, setFieldValue, setValues } = formik

  const bankList = Object.keys(field?.bank_tree ?? {}).map((key) => ({
    label: field.bank_tree[key],
    value: key,
    icon: getBankLogo(key),
  }))

  const handleSelected = (value) => {
    // const item = bankList.find((el) => el.value === value)
    // setFieldValue('bank', value)

    setValues({
      ...values,
      bank: value,
      amount: '',
      realAmount: 0,
    })
  }
  return field ? (
    <>
      {/* <Select
        label={t('bank.bank')}
        placeholder={t('bank.selectBank')}
        value={values.bank?.label ?? ''}
        loading={isLoading}
        options={bankList}
        onSelected={handleSelected}
        isHorizontalActionSheet
        sx={{ mb: 0, mt: '$2' }}
        _actionSheet={{
          sheetId: ACTION_SHEET_ID.AUTO_DEPOSIT,
          headerTitle: t('bank.bank'),
        }}
      /> */}
      {horizontalMode ? (
        <View>
          <InputLabel label={t('bank.bank')} />
          <View
            sx={{
              flex: 1,
              flexDirection: 'column',
              borderWidth: 1,
              borderRadius: 15,
              borderColor: '$primary.200',
              p: 19,
            }}
          >
            <Text sx={{ p: '$2', fontSize: 16 }}>
              {bankList &&
                bankList.find((el) => el.value === values.bank)?.label}
            </Text>
            <View sx={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {bankList &&
                bankList.map((e, i) => {
                  return (
                    <View key={i} sx={{ width: '25%' }}>
                      <HorizontalSelectBankCardGrid
                        key={i}
                        item={e}
                        onPress={() => handleSelected(e.value)}
                        selected={e.value === values.bank}
                      />
                    </View>
                  )
                })}
            </View>
          </View>
        </View>
      ) : (
        <SelectWithCardGrid
          label={t('bank.bank')}
          placeholder={t('placeholder.plsSelectBank')}
          options={bankList}
          value={values.bank ?? ''}
          sx={{
            width: '100%',
            mb: '$3',
          }}
          onSelected={(e) => {
            handleSelected(e)
          }}
          _input={{
            error:
              formik.touched.bank && formik.errors.bank ? (
                <Text sx={{ color: formik.errors.bank && '$secondary.500' }}>
                  {t(formik.errors.bank, {
                    field: t('common.bank'),
                  })}
                </Text>
              ) : undefined,
          }}
        />
      )}
    </>
  ) : null
}
export default FieldSelectBank
