import Select from 'app/components/form/Input/Select'
import { getBankLogo } from 'app/config/bank'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import useLocalization from 'app/provider/localization'
import { FormikProps } from 'formik'
import React from 'react'
import { PlayerInputFieldsBank } from 'services/deposit.type'
import { AutoDepositValues } from './AutoDepositForm'

type FieldBankProps = {
  field: PlayerInputFieldsBank
  isLoading: boolean
  formik: FormikProps<AutoDepositValues>
}

const FieldSelectBank = ({ field, isLoading, formik }: FieldBankProps) => {
  const { t } = useLocalization()

  const { values, setFieldValue } = formik

  const bankList = Object.keys(field?.bank_tree ?? {}).map((key) => ({
    label: field.bank_tree[key],
    value: key,
    icon: getBankLogo(key),
  }))

  const handleSelected = (value) => {
    const item = bankList.find((el) => el.value === value.value)
    setFieldValue('bank', item)
  }
  return field ? (
    <>
      <Select
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
      />
    </>
  ) : null
}
export default FieldSelectBank
