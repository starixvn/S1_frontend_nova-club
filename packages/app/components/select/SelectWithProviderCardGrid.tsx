import Image from 'app/components/common/Image'
import BankEmpty from 'app/features/bank/components/BankEmpty'
import { View } from 'dripsy'
import React, { ReactNode } from 'react'
import TouchableOpacity from '../pressable/TouchableOpacity'
import Select, { SelectProps } from './Select'

export type SelectWithProviderCardGrid<T> = Omit<
  SelectProps<T>,
  '_actionSheetContent'
> & { renderEmpty?: (args) => ReactNode }

function SelectWithProviderCardGrid<T>(props: SelectWithProviderCardGrid<T>) {
  const { options, renderEmpty, onSelected } = props

  return (
    <Select
      {...props}
      _actionSheetContent={({ closeActionSheet }) => {
        return (
          <View
            sx={{
              flexDirection: 'row',
              p: '$2',
              flexWrap: 'wrap',
              justifyContent: 'center',
              bg: 'white',
            }}
          >
            {options && options.length > 0 ? (
              options.map((option, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    sx={{
                      m: '$2',
                      borderRadius: 15,
                      borderWidth: 2,
                      overflow: 'hidden',
                      width: 100,
                      height: 100,
                      bg: '$primary.500',
                      p: '$2',
                    }}
                    onPress={() => {
                      console.log('topion', option)
                      onSelected(option.value)
                      closeActionSheet()
                    }}
                  >
                    {option.icon && (
                      <Image
                        source={
                          typeof option.icon === 'string'
                            ? {
                                uri: option.icon,
                              }
                            : option.icon
                        }
                        resizeMode={'contain'}
                        sx={{ width: '100%', height: '100%' }}
                      />
                    )}
                  </TouchableOpacity>
                )
              })
            ) : (
              <View sx={{ height: 100 }}>
                {renderEmpty ? (
                  renderEmpty(closeActionSheet)
                ) : (
                  <BankEmpty size="small" />
                )}
              </View>
            )}
          </View>
        )
      }}
    />
  )
}

export default SelectWithProviderCardGrid
