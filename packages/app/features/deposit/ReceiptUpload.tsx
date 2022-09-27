import FilePicker, { FilePickerProps } from 'app/components/FilePicker'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { getErrorMessage } from 'app/utils/validation'
import { styled, SxProp, Text, View } from 'dripsy'
import * as ImagePicker from 'expo-image-picker'
import { forwardRef, useImperativeHandle } from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useUploadDepositSlipMutation } from 'services/deposit'
export type DepositUploadProps = FilePickerProps & {}
export interface ReceiptUploadMethods {
  uploadReceipt: (secureId: string) => void
  sx?: SxProp
  disabled?: boolean
}

const ReceiptUpload = forwardRef<ReceiptUploadMethods, DepositUploadProps>(
  ({ value, sx, disabled, ...rest }: DepositUploadProps, ref) => {
    const { t } = useLocalization()
    const { openModal } = useModal()
    const { showAlert } = useAlert()

    const [postUploadReceipt] = useUploadDepositSlipMutation()

    const uploadReceipt = async (secureId) => {
      try {
        let file

        if (Platform.OS === 'web') {
          file = value as File
        } else {
          const imageInfo = value as ImagePicker.ImageInfo
          file = {
            uri: imageInfo.uri,
            name: imageInfo.uri.split('/').pop() ?? '',
            type: `image/${imageInfo.uri.split('.').pop()}` ?? '',
          }
        }

        const uploadResp = await postUploadReceipt({
          secure_id: secureId,
          file,
        })
          .unwrap()
          .catch((error) => showAlert(error))

        return uploadResp
      } catch (error) {
        return openModal('AlertModal', {
          message: getErrorMessage(error),
          onClose: () => {
            return false
          },
        })
      }
    }

    useImperativeHandle(ref, () => ({
      uploadReceipt,
    }))

    return (
      <StyledTop
        gradient={'PaleBlue'}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0 }}
        sx={sx}
      >
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon name="file-upload" size={28} />
          <Text sx={{ ml: '$1' }}>{t('deposit.upload.title')}</Text>
        </View>
        <Text sx={{ color: '#82BAF6', fontSize: 12, mt: '$1' }}>
          {t('deposit.upload.description')}
        </Text>

        <FilePicker
          disabled={disabled}
          value={value}
          sx={{ mt: '$3' }}
          {...rest}
        />
      </StyledTop>
    )
  }
)

ReceiptUpload.displayName = 'ReceiptUpload'

const StyledTop = styled(DripsyGradient)({
  p: '$3',
  borderRadius: 10,
  borderColor: '$borderBlue',
  borderWidth: 1,
})

export default ReceiptUpload
