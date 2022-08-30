import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { styled, SxProp, Text, View } from 'dripsy'
import { forwardRef, useImperativeHandle } from 'react'
import { Platform } from 'react-native'
import useFileInputHandler, {
  FileInputValue,
} from './form/FileInput/useFileInputHandler'
import IconButton from './form/IconButton'
import { DripsyGradient } from './Gradient'
import Icon from './Icon'

export type FilePickerProps = {
  loading?: boolean
  disabled?: boolean
  onSelect?: (v?: FileInputValue) => void
  value?: FileInputValue
  sx?: SxProp
}
export interface FilePickerForwardRef {
  clearFile: () => void
}

const FilePicker = forwardRef<FilePickerForwardRef, FilePickerProps>(
  ({ loading, disabled, onSelect, value, sx }: FilePickerProps, ref) => {
    const { t } = useLocalization()

    const {
      webInputRef,
      handleSelect,
      handleOnChangeWebImage,
      getName,
      clearFile,
    } = useFileInputHandler({
      onSelect,
      value,
    })

    useImperativeHandle(ref, () => ({
      clearFile,
    }))

    const fileName = getName()
    const bgColor = value ? ['#132946', '#14455B'] : ['#004EB5', '#007FB7']
    const bColor = value ? '#00283A' : '$borderBlue'

    return (
      <View
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          ...sx,
        }}
      >
        <StyledGradient
          colors={bgColor}
          sx={{
            borderColor: bColor,
            opacity: loading || disabled ? 0.3 : 1,
          }}
        >
          <BouncePressable
            onPress={handleSelect}
            disabled={disabled || loading}
            sx={{
              flexDirection: 'row',
              height: 40,
              px: '$4',
              alignItems: 'center',
            }}
          >
            {value && <Icon name={'attachment'} size={16} />}
            <Text
              sx={{
                flex: 1,
                color: value ? '#BDBDBD' : 'white',
                mx: value ? '$2' : 0,
              }}
              numberOfLines={1}
            >
              {value ? fileName : t('deposit.upload.files')}
            </Text>
            <IconButton
              onPress={clearFile}
              name={value ? 'cross' : 'attachment'}
              color={value ? '$error' : 'white'}
              size={16}
            />
          </BouncePressable>
        </StyledGradient>
        {Platform.OS === 'web' && (
          <input
            ref={webInputRef}
            type="file"
            onChange={handleOnChangeWebImage}
            style={{ opacity: 0 }}
          />
        )}
      </View>
    )
  }
)

const StyledGradient = styled(DripsyGradient)({
  borderRadius: 15,
  borderWidth: 1,
  width: '100%',
})

FilePicker.displayName = 'FilePicker'

export default FilePicker
