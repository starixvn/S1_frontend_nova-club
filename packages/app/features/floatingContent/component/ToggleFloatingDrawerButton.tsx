import Icon from 'app/components/Icon'
import { styled, View } from 'dripsy'
import { MotiView } from 'moti'
import { Dispatch, SetStateAction } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ToggleFloatingDrawerButtonProps {
  toggleFloatingDrawer: Dispatch<SetStateAction<boolean>>
  visible: boolean
  drawerButtonOffset: number
  isDesktop: boolean
}

const ToggleFloatingDrawerButton = ({
  toggleFloatingDrawer,
  visible,
  drawerButtonOffset,
  isDesktop,
}: ToggleFloatingDrawerButtonProps) => {
  return (
    <DrawerButtonContainer isDesktop={isDesktop} bottom={drawerButtonOffset}>
      <DrawerButton onPress={() => toggleFloatingDrawer(!visible)}>
        <DrawerIconContainer>
          <MotiView
            animate={{
              transform: [{ rotateZ: visible ? '0deg' : '180deg' }],
            }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <Icon name={'back'} size={14} />
          </MotiView>
        </DrawerIconContainer>
      </DrawerButton>
    </DrawerButtonContainer>
  )
}

const DrawerButtonContainer = styled(View)(
  ({ bottom, isDesktop }: { bottom: number; isDesktop: boolean }) => ({
    position: isDesktop ? 'fixed' : 'absolute',
    zIndex: 9,
    right: 0,
    bottom,
  })
)

const DrawerButton = styled(TouchableOpacity)({
  width: 40,
  alignItems: 'flex-end',
  justifyContent: 'center',
})

const DrawerIconContainer = styled(View)({
  height: 60,
  backgroundColor: '$primary.200',
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  width: 20,
  justifyContent: 'center',
  alignItems: 'center',
})

export default ToggleFloatingDrawerButton
