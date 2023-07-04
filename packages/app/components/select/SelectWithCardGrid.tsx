import Image from 'app/components/common/Image'
import BankEmpty from 'app/features/bank/components/BankEmpty'
import { View } from 'dripsy'
import React, { ReactNode } from 'react'
import TouchableOpacity from '../pressable/TouchableOpacity'
import Select, { SelectProps } from './Select'

export type SelectWithCardGridProps<T> = Omit<
  SelectProps<T>,
  '_actionSheetContent'
> & { isProvider?: boolean; renderEmpty?: (args) => ReactNode }

function SelectWithCardGrid<T>(props: SelectWithCardGridProps<T>) {
  const { options, isProvider = false, renderEmpty, onSelected } = props

  const squareStyle = isProvider
    ? {
        bg: '$primary.500',
        p: '$2',
      }
    : {
        borderColor: '$primary.100',
      }
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
                      m: '$1',
                      borderRadius: 15,
                      borderWidth: 2,
                      overflow: 'hidden',
                      height: 72,
                      aspectRatio: 3 / 2,
                      ...squareStyle,
                    }}
                    onPress={() => {
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
                        resizeMode="contain"
                        sx={{ width: '100%', height: '100%' }}
                        alt=""
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

export default SelectWithCardGrid
