import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { DripsyGradient } from './Gradient'
import Icon from './Icon'

const FilePicker = () => {
  const { t } = useLocalization()
  const [image, setImage] = useState<string | null>()

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })
    console.log(
      '🚀 ~ file: FilePicker.tsx ~ line 20 ~ pickImage ~ result',
      result
    )

    if (!result.cancelled) {
      setImage(result.uri)
    } else {
      setImage(null)
    }
  }
  const fileName = image && 'receipt.jpg selected'
  const bgColor = fileName ? ['#132946', '#14455B'] : ['#004EB5', '#007FB7']
  const bColor = fileName ? '#00283A' : '$border2'

  console.log('fileName', fileName)
  console.log('image', image)
  return (
    <View
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <StyledGradient
        colors={bgColor}
        sx={{
          borderColor: bColor,
        }}
      >
        <BouncePressable
          onPress={pickImage}
          sx={{
            flexDirection: 'row',
            height: 40,
            px: '$4',
            alignItems: 'center',
          }}
        >
          {fileName && <Icon name="lc" size={25} color={'#BDBDBD'} />}
          <Text
            sx={{
              flex: 1,
              color: fileName ? '#BDBDBD' : 'white',
            }}
            numberOfLines={1}
          >
            {fileName ? fileName : t('deposit.upload.files')}
          </Text>
          {!fileName && <Icon name="lc" size={25} />}
        </BouncePressable>
      </StyledGradient>
      {fileName && (
        <BouncePressable
          onPress={() => {
            setImage(null)
          }}
          sx={{
            marginLeft: '$2a',
            borderRadius: 10,
          }}
        >
          <Icon
            name="cross"
            size={20}
            sx={{
              color: '#BDBDBD',
              alignSelf: 'center',
              px: '$1',
            }}
          />
        </BouncePressable>
      )}
    </View>
  )
}

const StyledGradient = styled(DripsyGradient)({
  borderRadius: 15,
  borderWidth: 1,
  mt: '$4',
  mb: '$4',
  flex: 1,
})

export default FilePicker
