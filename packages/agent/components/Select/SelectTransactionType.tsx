import { TypeFilter, TypeFilterOptions } from 'agent/constant/select'
import { useAgentLocalization } from 'app/provider/localization'
import { View } from 'dripsy'
import React, { useRef } from 'react'
import CheckBox from '../CheckBox'
import Select, { CloseSelectForwardRef, SelectProps } from './Select'

export type SelectTransactionType<T> = Omit<
  SelectProps<T>,
  '_actionSheetContent' | 'onSelected'
> & {
  check: TypeFilter[]
  setCheck: (args: TypeFilter[]) => void
}

function SelectTransactionType<T>(props: SelectTransactionType<T>) {
  const { t } = useAgentLocalization()
  const selectRef = useRef<CloseSelectForwardRef>(null)

  const { check, setCheck } = props

  const typeOptions = TypeFilterOptions?.slice(1)?.map((item) => {
    return { ...item, label: t(item.label) }
  })

  const handlePressCheck = (value) => {
    if (check.includes(value)) setCheck(check.filter((el) => el !== value))
    else setCheck([...check, value])
  }

  return (
    <Select
      {...props}
      _input={{ value: props.value }}
      options={[]}
      ref={selectRef}
      _actionSheetContent={({ closeActionSheet }) => {
        return (
          <View>
            {typeOptions.map((item, index) => (
              <CheckBox
                key={item.value}
                label={item.label}
                isCheck={check.includes(item.value)}
                onCheck={() => handlePressCheck(item.value)}
                // checkboxStyle={{ bg: 'white' }}
                sx={{
                  borderTopWidth: index === 0 ? 2 : 0,
                  borderBottomWidth: 2,
                  borderColor: '$white',
                }}
              />
            ))}
          </View>
        )
      }}
    />
  )
}

export default SelectTransactionType
