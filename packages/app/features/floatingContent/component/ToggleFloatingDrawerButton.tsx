import Icon from 'app/components/Icon'
import { styled, View } from 'dripsy'
import { MotiView } from 'moti'
import { Dispatch, SetStateAction } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ToggleFloatingDrawerButtonProps {
  toggleFloatingDrawer: Dispatch<SetStateAction<boolean>>
  visible: boolean
  drawerButtonOffset: number
}

const ToggleFloatingDrawerButton = ({
  toggleFloatingDrawer,
  visible,
  drawerButtonOffset,
}: ToggleFloatingDrawerButtonProps) => {
  return (
    <DrawerButtonContainer bottom={drawerButtonOffset}>
      <DrawerButton onPress={() => toggleFloatingDrawer(!visible)}>
        <DrawerIconContainer>
          <MotiView
            animate={{
              transform: [{ rotateZ: visible ? '0deg' : '180deg' }],
            }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <Icon name={'chevleft'} size={10} />
          </MotiView>
        </DrawerIconContainer>
      </DrawerButton>
    </DrawerButtonContainer>
  )
}

const DrawerButtonContainer = styled(View)(
  ({ bottom }: { bottom: number }) => ({
    position: 'absolute',
    zIndex: 9,
    right: 0,
    bottom,
  })
)

const DrawerButton = styled(TouchableOpacity)({
  height: 100,
  width: 30,
  alignItems: 'flex-end',
  justifyContent: 'center',
})

const DrawerIconContainer = styled(View)({
  height: 60,
  backgroundColor: '$lightNavyBlue',
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  width: 20,
  justifyContent: 'center',
  alignItems: 'center',
})

export default ToggleFloatingDrawerButton
