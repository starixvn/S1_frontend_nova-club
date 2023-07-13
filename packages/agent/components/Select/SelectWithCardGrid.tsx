import { View } from 'dripsy'
import React from 'react'
import Select, { SelectProps } from './Select'
import Image from 'app/components/common/Image'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'

export type SelectWithCardGrid<T> = Omit<SelectProps<T>, '_actionSheetContent'>

export default function SelectWithCardGrid<T>(props: SelectWithCardGrid<T>) {
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
            {props.options.map((option, index) => {
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
            })}
          </View>
        )
      }}
    />
  )
}
