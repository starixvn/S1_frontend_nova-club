import React, { useRef } from 'react'
import Input, { InputProps } from '../Input'
import * as ImagePicker from 'expo-image-picker'
import { Image, Row, View, styled } from 'dripsy'
import IconButton from 'app/components/IconButton'
import InputClearActionRow from '../InputClearActionRow'
import Icon from 'app/components/icon'

export interface FilePickerProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  onChange?: (e?: ImagePicker.ImagePickerAsset) => void
  onCancel?: () => void
  value?: ImagePicker.ImagePickerAsset
}

export default function FilePicker({
  onChange,
  onCancel,
  value,
  ...rest
}: FilePickerProps) {
  // const preview = useRef<string>();
  async function pickImageAsync() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (!result.canceled && result.assets && result.assets[0]) {
      onChange && onChange(result.assets[0])
    } else {
      onCancel && onCancel()
    }
  }

  return (
    <Input
      action={
        <InputClearActionRow
          isClearable={!!value}
          onPress={() => {
            onChange && onChange()
          }}
        >
          <Icon name="attachment" />
        </InputClearActionRow>
      }
      onPress={pickImageAsync}
      value={value ? value.fileName ?? ' ' : ''}
      {...rest}
    >
      {value && !value?.fileName && (
        <Preview>
          <Image
            alt="upload-preview"
            source={{ uri: value?.uri }}
            style={{ height: '100%', aspectRatio: value.width / value.height }}
            resizeMode="contain"
          />
        </Preview>
      )}
    </Input>
  )
}

const Preview = styled(View)({
  position: 'absolute',
  maxWidth: '70%',
  left: 0,
  top: 0,
  bottom: 0,
  pl: '$3',
  py: '$2',
})
