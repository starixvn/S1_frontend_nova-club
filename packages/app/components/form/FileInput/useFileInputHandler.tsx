import * as ImagePicker from 'expo-image-picker'
import { ChangeEventHandler, useEffect, useRef } from 'react'
import { Platform } from 'react-native'

export type FileInputValue = ImagePicker.ImageInfo | File
export interface FileInputHandlerProps {
  onSelect?: (v?: FileInputValue) => void
  value?: FileInputValue
}

const useFileInputHandler = ({ onSelect, value }: FileInputHandlerProps) => {
  const webInputRef = useRef<HTMLInputElement>(null)

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

      if (selectedFirstFile && onSelect) onSelect(selectedFirstFile)
    }
  }

  const handleNativeSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      console.log('result', result)
      onSelect && onSelect(result)
    }
  }

  const handleSelect =
    Platform.OS === 'web' ? handleWebselect : handleNativeSelect

  function getName() {
    if (value) {
      if (Platform.OS === 'web') {
        let f = value as File
        return f.name
      } else {
        let f = value as ImagePicker.ImageInfo
        return f.uri.split('/').pop()
      }
    }

    return ''
  }

  function clearFile() {
    onSelect && onSelect()
    if (webInputRef.current) webInputRef.current.value = ''
  }

  useEffect(() => {
    if (!value) {
      if (webInputRef.current) webInputRef.current.value = ''
    }
  }, [value])

  return {
    webInputRef,
    getName,
    clearFile,
    handleOnChangeWebImage,
    handleSelect,
  }
}

export default useFileInputHandler
