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
              transform: [{ rotateZ: visible ? '180deg' : '0deg' }],
            }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <Icon name={'back'} size={14} />
          </MotiView>
          <DrawerText>{t('common.download')}</DrawerText>
        </DrawerIconContainer>
      </DrawerButton>
    </DrawerButtonContainer>
  )
}

const DrawerButtonContainer = styled(View)({
  position: 'absolute',
  zIndex: 2,
  left: 0,
  top: 125,
})

const DrawerButton = styled(TouchableOpacity)({
  height: 20,
  width: 20,
  alignItems: 'flex-end',
  justifyContent: 'center',
  bg: 'blue',
})

const DrawerText = styled(Text)({
  mb: '$4',
  textWrap: 'nowrap',
  transform: [{ rotateZ: '90deg' }],
})

const DrawerIconContainer = styled(View)({
  height: 150,
  backgroundColor: '$primary.200',
  borderBottomRightRadius: 10,
  width: 20,
  alignItems: 'center',
  justifyContent: 'space-between',
  py: '$2',
})

export default ToggleFloatingDownloadButton
