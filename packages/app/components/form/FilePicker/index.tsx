import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import Input, { InputProps } from '../Input'
import * as ImagePicker from 'expo-image-picker'
import { Image, Row, Text, View, styled } from 'dripsy'
import IconButton from 'app/components/IconButton'
import InputClearActionRow from '../InputClearActionRow'
import Icon from 'app/components/Icon'
import { Platform } from 'react-native'
import { humanFileSize } from 'app/utils'
import useLocalization from 'app/provider/localization'

export interface FilePickerProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  onChange?: (e?: ImagePicker.ImagePickerAsset | File) => void
  onCancel?: () => void
  value?: ImagePicker.ImagePickerAsset | File
  maxSize?: number
}

export default function FilePicker({
  onChange,
  onCancel,
  value,
  maxSize = 5 * 1024 * 1024,
  ...rest
}: FilePickerProps) {
  // const preview = useRef<string>();
  const { t } = useLocalization()
  const webInputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState<string>()

  const handleWebselect = () => {
    webInputRef.current && webInputRef.current.click()
  }

  const handleOnChangeWebImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (
      e &&
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const selectedFirstFile = e.currentTarget.files[0]
      console.log('aa', selectedFirstFile)

      if (selectedFirstFile && onChange) onChange(selectedFirstFile)
    }
  }

  async function pickImageAsync() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (!result.canceled && result.assets && result.assets[0]) {
      const file = result.assets[0]
      if (maxSize && file.fileSize && file.fileSize > maxSize) {
        console.log('file size too big ', humanFileSize(file.fileSize))
        setError(t('common.fileSizeExceeds', { size: humanFileSize(maxSize) }))

        onChange && onChange(undefined)
        return
      }

      onChange && onChange(result.assets[0])
    } else {
      onCancel && onCancel()
    }

    setError(undefined)
  }

  const handleSelect = Platform.OS === 'web' ? handleWebselect : pickImageAsync

  function getName() {
    if (value) {
      if ('name' in value) {
        let f = value
        return f.name
      } else if (value && 'fileName' in value) {
        let f = value
        return f.uri.split('/').pop()
      }
    }

    return ''
  }

  useEffect(() => {
    if (!value) {
      if (webInputRef.current) webInputRef.current.value = ''
    }
  }, [value])

  return (
    <Input
      error={error && error}
      action={({ color }) => (
        <InputClearActionRow
          isClearable={!!value}
          onPress={() => {
            onChange && onChange()
          }}
        >
          <Icon name="attachment" color={color} />
        </InputClearActionRow>
      )}
      onPress={Platform.OS !== 'web' ? handleSelect : undefined}
      value={value ? getName() ?? ' ' : ''}
      {...rest}
    >
      {value && !getName() && (
        <Preview>
          {'name' in value ? (
            <Text>{value?.name}</Text>
          ) : (
            <Image
              alt="upload-preview"
              source={{ uri: value?.uri }}
              style={{
                height: '100%',
                aspectRatio: value.width / value.height,
              }}
              resizeMode="contain"
            />
          )}
        </Preview>
      )}
      {Platform.OS === 'web' && (
        <input
          ref={webInputRef}
          type="file"
          onChange={handleOnChangeWebImage}
          style={{
            cursor: 'pointer',
            backgroundColor: 'red',
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            opacity: 0,
          }}
        />
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
