import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { Text } from 'dripsy'
import { styled, View } from 'dripsy'
import { MotiView } from 'moti'
import { Dispatch, SetStateAction } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ToggleFloatingDownloadButtonProps {
  toggleFloatingDrawer: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const ToggleFloatingDownloadButton = ({
  toggleFloatingDrawer,
  visible,
}: ToggleFloatingDownloadButtonProps) => {
  const { t } = useLocalization()

  return (
    <DrawerButtonContainer>
      <DrawerButton onPress={() => toggleFloatingDrawer(!visible)}>
        <DrawerIconContainer>
          <MotiView
            animate={{
              transform: [{ rotateZ: visible ? '90deg' : '270deg' }],
            }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <Icon name={'back'} size={14} />
          </MotiView>
          <DrawerText numberOfLines={1}>{t('common.download')}</DrawerText>
        </DrawerIconContainer>
      </DrawerButton>
    </DrawerButtonContainer>
  )
}

const DrawerButtonContainer = styled(View)({
  position: 'absolute',
  zIndex: 2,
  left: 50,
  top: 110,
})

const DrawerButton = styled(TouchableOpacity)({
  height: 20,
  width: 20,
  alignItems: 'flex-end',
  justifyContent: 'center',
})

const DrawerText = styled(Text)({
  ml: '$2',
})

const DrawerIconContainer = styled(View)({
  height: 20,
  width: 120,
  backgroundColor: '$primary.200',
  borderTopRightRadius: 10,
  alignItems: 'center',
  // justifyContent: 'space-between',
  transform: [{ rotateZ: '90deg' }],
  flexDirection: 'row',
  px: '$2',
})

export default ToggleFloatingDownloadButton
