import { BOTTOM_NAV_HEIGHT } from 'app/constant/sizes'
import useSupportItemList from 'app/features/customerSupport/useSupportItemList'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View, useDripsyTheme } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import React, { Dispatch, SetStateAction } from 'react'
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native'
import MediaIcon from './MediaIcon'
interface SupportMenuProps {
  setSupportMenuVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const SupportMenu = ({ setSupportMenuVisible, visible }: SupportMenuProps) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const mediaList = useSupportItemList()

  const { width } = useWindowDimensions()
  let right = Math.max(0, (width - theme.sizes.container) / 2)

  const { bottom } = useSafeArea()

  return (
    <>
      <AnimatePresence>
        {visible && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={[
              StyleSheet.absoluteFillObject,
              {
                zIndex: 9,
                backgroundColor: 'rgba(0,0,0,0.8)',
                position: Platform.OS === 'web' ? 'fixed' : 'absolute',
              },
            ]}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setSupportMenuVisible(false)
              }}
            >
              <View sx={{ width: '100%', height: '100%' }}>
                <View
                  sx={{
                    alignSelf: 'flex-end',
                    mt: 'auto',
                    mr: right,
                    mb: BOTTOM_NAV_HEIGHT + bottom + 25,
                    pr: '$2',
                  }}
                >
                  <AnimatePresence>
                    {mediaList.map((c, i) => (
                      <MotiView
                        delay={i * 100}
                        from={{ translateX: 100, opacity: 0 }}
                        animate={{ translateX: 0, opacity: 1 }}
                        key={c.label}
                      >
                        <MediaIcon key={c.label} item={c} index={i} />
                      </MotiView>
                    ))}
                  </AnimatePresence>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </MotiView>
        )}
      </AnimatePresence>
    </>
  )
}

export default SupportMenu
