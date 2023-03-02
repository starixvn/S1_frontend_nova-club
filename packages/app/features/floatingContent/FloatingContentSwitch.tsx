import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import { View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { useContext } from 'react'
import { FloatingContext } from './FloatingContext'
import FloatingSpinMania from './FloatingSpinMania'
import VGaming from './VGaming'

interface FloatingContentSwitchProps {
  isOpen: boolean
  iconSize: number
}

const FloatingContentSwitch = ({
  isOpen,
  iconSize,
}: FloatingContentSwitchProps) => {
  const { toggleLiveChat } = useContext(FloatingContext)
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <MotiView
            from={{ transform: [{ translateX: 100 }], opacity: 0 }}
            transition={{ type: 'timing', duration: 500 }}
            animate={{ transform: [{ translateX: 0 }], opacity: 1 }}
            exit={{ transform: [{ translateX: 100 }], opacity: 0 }}
            style={{
              backgroundColor: 'rgba(30,30,30,0.4)',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              height: '100%',
              justifyContent: 'center',
            }}
          >
            <View
              sx={{
                py: '$2',
                pl: '$1',
                alignItems: 'center',
                paddingRight: '$6',
              }}
            >
              <FloatingSpinMania iconSize={iconSize} />
              <VGaming iconSize={iconSize} />

              <Button
                onPress={() => {
                  toggleLiveChat(true)
                }}
                rounded
                variant="lg"
                fill={{
                  type: 'gradient',
                  color: 'secondary',
                  start: { x: 0, y: 0 },
                  end: { x: 1, y: 0 },
                }}
                containerStyle={{ width: 50, height: 50, px: 2 }}
              >
                {<Icon name="cs" size={30} />}
              </Button>
            </View>
          </MotiView>
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingContentSwitch
