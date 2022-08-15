import useFilePicker from 'app/hooks/deposit/useFilePicker'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import * as ImagePicker from 'expo-image-picker'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Platform } from 'react-native'
import { DripsyGradient } from './Gradient'
import Icon from './Icon'

type FilePickerProps = {
  isActive: boolean
  onPress: (File?) => void
}
export interface FilePickerForwardRef {
  resetFile: () => void
}

const TransactionFilePicker = forwardRef<FilePickerForwardRef, FilePickerProps>(
  ({ isActive = true, onPress }: FilePickerProps, ref) => {
    const { t } = useLocalization()
    const webRef = useRef()
    const [image, setImage] = useState<string | null>()

    const { imagePath, pickImage, pickImageWeb, resetFile } = useFilePicker()

    useImperativeHandle(ref, () => ({
      resetFile() {
        resetFile()
      },
    }))

    useEffect(() => {
      setImage(imagePath)
      onPress(imagePath)
    }, [imagePath])

    const handlePickImage = () => {
      pickImage()
    }

    const handlePickImageWeb = () => {
      webRef?.current.click()
    }

    const handleReset = () => {
      resetFile()
      if (webRef) webRef.current.value = null
    }

    return (
      <View
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BouncePressable
          onPress={Platform.OS === 'web' ? handlePickImageWeb : handlePickImage}
          disabled={!isActive}
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon
            name="file-upload"
            size={12}
            color={isActive ? '$lightCyan' : '$disabled'}
          />
          <Text
            numberOfLines={1}
            sx={{
              fontSize: 12,
              ml: 4,
              color: isActive ? '$lightCyan' : '$disabled',
              textDecorationLine: 'underline',
            }}
          >
            {t('deposit.bankSlip')}
          </Text>
        </BouncePressable>
        {Platform.OS === 'web' && (
          <input
            ref={webRef}
            type="file"
            onChange={pickImageWeb}
            style={{ display: 'none' }}
          />
        )}
      </View>
    )
  }
)

const StyledGradient = styled(DripsyGradient)({
  borderRadius: 15,
  borderWidth: 1,
  mt: '$4',
  mb: '$4',
  flex: 1,
})

TransactionFilePicker.displayName = 'TransactionFilePicker'

export default TransactionFilePicker
