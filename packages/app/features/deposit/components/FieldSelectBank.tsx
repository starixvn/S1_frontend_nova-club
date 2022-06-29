import BankItem from 'app/components/actionsheet/BankItem'
import { DEFAULT_SQUARE_ACTION_SHEET_ID } from 'app/components/actionsheet/SquareSelectorActionSheet'
import { TextField } from 'app/components/TextField'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import { FormikProps } from 'formik'
import React from 'react'
import { SheetManager } from 'react-native-actions-sheet'
import { SelectOptions } from 'services/common/types'
import { PlayerInputFieldsBank } from 'services/deposit.type'
import { AutoDepositValues } from '../online-bank'

const actionSheedId = 'auto-deposit'

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
        }}
        _flatList={{
          data: bankList ?? [],
          isLoading: isLoading,
          keyExtractor: (item: SelectOptions) => `${item.value}`,
          renderItem: ({ item }: { item: SelectOptions }) => (
            <BankItem
              key={`${item.value}`}
              icon={require('app/assets/images/home/fishing.png')}
              title={item.value}
              onPress={async () => {
                setFieldValue('bank', item)
                await SheetManager.hide(
                  actionSheedId ?? DEFAULT_SQUARE_ACTION_SHEET_ID
                )
              }}
            />
          ),
        }}
        _actionSheet={{
          id: actionSheedId,
          headerTitle: t('bank.bank'),
        }}
        containerStyle={{ my: '$3' }}
      />
    </View>
  ) : null
}
export default FieldSelectBank
