import React from 'react'
import Input, { InputProps } from '../Input'
import Icon from 'app/components/Icon'
import * as ImagePicker from 'expo-image-picker'

export interface FilePickerProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  onChange?: (e: ImagePicker.ImagePickerAsset) => void
  onCancel?: () => void
  value?: ImagePicker.ImagePickerAsset
}

export default function FilePicker({
  onChange,
  onCancel,
  value,
  ...rest
}: FilePickerProps) {
  async function pickImageAsync() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (!result.canceled && result.assets && result.assets[0]) {
      onChange && onChange(result.assets[0])
      console.log(result)
    } else {
      onCancel && onCancel()
      console.log('cancel')
      //   alert('You did not select any image.')
    }
  }

  return (
    <Input
      action={<Icon name="attachment" />}
      onPress={pickImageAsync}
      value={value ? value.fileName?.toString() : undefined}
      {...rest}
    />
  )
}
