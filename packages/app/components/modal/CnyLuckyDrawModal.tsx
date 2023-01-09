import useAlert from 'app/hooks/useAlert'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useOrientation from 'app/hooks/useOrientation'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { ScrollView, Styles, View } from 'dripsy'
import debounce from 'lodash/debounce'
import { MotiImage, MotiView, Text } from 'moti'
import { useCallback, useMemo, useState } from 'react'
import { Platform, StyleSheet, Image } from 'react-native'
import Animated, {
  Easing,
  RotateInUpRight,
  ZoomInRotate,
} from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { useLuckySpinMutation } from 'services/playerApi'
import { MotifiedImage } from '../common/Image'
import { Button } from '../form/Button'
import IconButton from '../form/IconButton'
import Svg, { Path } from 'react-native-svg'

const CnyLuckyDrawModal = ({ modal: { closeModal } }) => {
  const { t } = useLocalization()
  const dispatch = useDispatch()

  const { width, height } = useContainerDimension()
  const { isLandscape } = useOrientation()

  const handleClose = () => {
    closeModal('CnyLuckyDrawModal', () => {
      dispatch(SettingActions.setLuckyDrawBalance(0))
    })
  }

  const { top } = useSafeArea()

  return (
    <View
      sx={{
        bg: 'rgba(18, 55, 88, 0.6)',
        width,
        height,
        position: 'relative',
        top: 0,
      }}
    >
      <View
        sx={{
          flexDirection: isLandscape ? 'row' : 'column',
          flex: 1,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <MotiView
          style={(styles.position, { zIndex: 1 })}
          animate={{
            transform: [
              {
                translateY: [200, 110],
              },
              { scaleY: [1, -1] },
            ],
          }}
          transition={{
            type: 'timing',
            duration: 2800,
          }}
        >
          <Image
            style={{
              height: 103,
              aspectRatio: 2 / 1,
            }}
            source={require('app/assets/images/events/cny/cover.png')}
          />
        </MotiView>
        <MotiView
          style={(styles.position, { zIndex: 4 })}
          animate={{
            transform: [
              {
                translateY: [100, 50],
              },
              { scaleY: [1, 0] },
            ],
          }}
          transition={{
            type: 'timing',
            duration: 2500,
          }}
        >
          <Image
            style={{
              height: 103,
              aspectRatio: 2 / 1,
            }}
            source={require('app/assets/images/events/cny/cover.png')}
          />
        </MotiView>
        {/* Body */}
        <View
          style={
            (styles.position,
            {
              zIndex: 3,
              alignItems: 'center',
            })
          }
        >
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              marginHorizontal: 'auto',
              zIndex: 6,
              maxWidth: 200,
              height: '100%',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                padding: 10,
                color: 'yellow',
                fontWeight: '900',
              }}
            >
              Congratulation! VND 38K has been added to your wallet.
            </Text>
          </View>
          <Image
            style={{
              height: 250,
              width: 200,
            }}
            source={require('app/assets/images/events/cny/front.png')}
          />
        </View>
        <MotiView
          style={(styles.position, { zIndex: 2 })}
          animate={{
            transform: [
              {
                translateY: [-200, -320],
              },
            ],
            opacity: [0, 1],
          }}
          transition={{
            type: 'timing',
            duration: 3200,
          }}
        >
          <View
            style={{
              height: 90,
              width: 180,
              backgroundColor: 'yellow',
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'red',
                fontWeight: '900',
                fontSize: 30,
                marginTop: 20,
              }}
            >
              VND 38K
            </Text>
          </View>
        </MotiView>
      </View>
      <View sx={{ position: 'absolute', top: '8%', right: '10%' }}>
        <IconButton
          onPress={handleClose}
          name="cross"
          color="white"
          sx={{
            right: 0,
            zIndex: 10,
          }}
          size={30}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    marginHorizontal: 'auto',
    top: '23%',
  },
})

export default CnyLuckyDrawModal
