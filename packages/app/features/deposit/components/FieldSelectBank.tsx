import { TextField } from 'app/components/TextField'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import { FormikProps } from 'formik'
import React from 'react'
import { PlayerInputFieldsBank } from 'services/deposit.type'
import { AutoDepositValues } from './AutoDepositForm'

const actionSheetId = ACTION_SHEET_ID.AUTO_DEPOSIT

type FieldBankProps = {
  field: PlayerInputFieldsBank
  isLoading: boolean
  formik: FormikProps<AutoDepositValues>
}

const FieldSelectBank = ({ field, isLoading, formik }: FieldBankProps) => {
  const { t } = useLocalization()

  const { values, setFieldValue } = formik

  const bankList = Object.keys(field?.bank_tree ?? {}).map((key) => ({
    value: key,
    label: field.bank_tree[key],
  }))

  return field ? (
    <View>
      <Text sx={{ mx: '$4', mt: '$4' }}>{field.label_lang}</Text>
      <TextField.Select
        label=""
        _input={{
          placeholder: t('bank.selectBank'),
          value: values.bank?.label ?? '',
          pointerEvents: 'none',
        }}
        _dataList={{
          data: bankList ?? [],
          isLoading: isLoading,
          titleType: 'value',
          key: 'value',
          onPress: (item) => setFieldValue('bank', item),
        }}
        _actionSheet={{
          id: actionSheetId,
          headerTitle: t('bank.bank'),
        }}
        containerStyle={{ my: '$3' }}
      />
    </View>
  ) : null
}
export default FieldSelectBank
