import { Image, styled, View } from 'dripsy'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Select, { SelectProps } from './Select'

const StyledTouchableOpacity = styled(TouchableOpacity)()

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
                <StyledTouchableOpacity
                  key={index}
                  sx={{
                    borderColor: '$grayAgent',
                    m: '$2',
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
                      resizeMode={'contain'}
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 15,
                        borderColor: '#0c7dff',
                        borderWidth: 2,
                      }}
                    />
                  )}
                </StyledTouchableOpacity>
              )
            })}
          </View>
        )
      }}
    />
  )
}
