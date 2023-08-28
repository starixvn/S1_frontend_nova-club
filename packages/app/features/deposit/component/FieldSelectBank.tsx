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
import BankSelection from 'desktop-ext/features/withdrawal/components/BankSelection'

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
      {horizontalMode ? (
        <BankSelection
          label={t('bank.bank')}
          list={bankList}
          selected={values.bank}
          onPress={handleSelected}
        />
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
