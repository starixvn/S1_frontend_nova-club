import Image from 'app/components/common/Image'
import { View } from 'dripsy'
import React from 'react'
import TouchableOpacity from '../pressable/TouchableOpacity'
import Select, { SelectProps } from './Select'

export type SelectWithCardGrid<T> = Omit<SelectProps<T>, '_actionSheetContent'>

function SelectWithCardGrid<T>(props: SelectWithCardGrid<T>) {
  const { onSelected } = props

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
            }}
          >
            {props.options &&
              props.options.map((option, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    sx={{
                      borderColor: '#0c7dff',
                      m: '$2',
                      borderRadius: 15,
                      borderWidth: 2,
                      overflow: 'hidden',
                      width: 100,
                      height: 100,
                      // p: '$2',
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
              })}
          </View>
        )
      }}
    />
  )
}

export default SelectWithCardGrid
