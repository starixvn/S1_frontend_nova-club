import FilePicker, { FilePickerForwardRef } from 'app/components/FilePicker'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import { RefObject } from 'react'

type DepositUploadProps = {
  onImagePicked: (arg0: any) => void
  innerRef: RefObject<FilePickerForwardRef>
}

const DepositUpload = ({ onImagePicked, innerRef }: DepositUploadProps) => {
  const { t } = useLocalization()

  const handleUploadDeposit = async (path) => {
    onImagePicked(path)
  }

  return (
    <StyledTop
      gradient={'PaleBlue'}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0 }}
    >
      <View
        sx={{
          py: '$3',
          px: '$7',
        }}
      >
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon name="lc" color={'#82BAF6'} size={33} />
          <Text sx={{ color: '#82BAF6', fontWeight: 'bold' }}>
            {t('deposit.upload.title')}
          </Text>
        </View>
        <Text sx={{ color: '#82BAF6', fontSize: 12, mt: '$1' }}>
          {t('deposit.upload.description')}
        </Text>
        <FilePicker
          // isActive={isDepositSubmitted}
          ref={innerRef}
          onPress={handleUploadDeposit}
        />
      </View>
    </StyledTop>
  )
}

const StyledTop = styled(DripsyGradient)({
  m: '$2',
  mx: '$4',
  alignItems: 'center',
  borderRadius: 10,
  borderColor: '$border2',
  borderWidth: 1,
})

export default DepositUpload
