import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

const useFilePicker = () => {
  const [imagePath, setImagePath] = useState('')

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImagePath(result.uri)
    } else {
      setImagePath('')
    }
  }

  const pickImageWeb = (event) => {
    if (event.target.value) {
      setImagePath(event.target.files[0])
    }
  }

  const resetFile = () => {
    setImagePath('')
  }

  return {
    imagePath,
    pickImage,
    pickImageWeb,
    resetFile,
  }
}

export default useFilePicker
