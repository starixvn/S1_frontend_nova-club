import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import { Pressable, ScrollView, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import Select, { SelectProps } from './Select'

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
                    m: '$1',
                    borderRadius: 15,
                    borderWidth: 2,
                    overflow: 'hidden',
                    width: 100,
                    height: 100,
                  }}
                  onPress={() => {
                    onSelected(option.value)
                    closeActionSheet()
                  }}
                >
                  {option.icon && (
                    <SolitoImage
                      src={option.icon}
                      resizeMode="contain"
                      fill
                      alt=""
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
