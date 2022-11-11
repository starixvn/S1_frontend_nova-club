import React from 'react'
import useLocalization from 'app/provider/localization'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import {
  Linking,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native'
import useSupportItemList from '../customerSupport/useSupportItemList'
import { BOTTOM_NAV_HEIGHT } from 'app/navigation/BottomNavigation'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import Image from 'app/components/common/Image'

const SupportMenu = ({ setSupportMenuVisible }) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const mediaList = useSupportItemList()

  const { width } = useWindowDimensions()
  let right = Math.max(0, (width - theme.sizes.container) / 2)
  right = width > theme.sizes.container ? right - 2 : right

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={[
        StyleSheet.absoluteFillObject,
        {
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
              mb: BOTTOM_NAV_HEIGHT + 25,
              pr: '$2',
            }}
          >
            <AnimatePresence>
              {mediaList.map((c, i) => {
                return (
                  <MotiView
                    delay={i * 100}
                    from={{ translateX: 100, opacity: 0 }}
                    animate={{ translateX: 0, opacity: 1 }}
                    key={c.label}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (Platform.OS !== 'web') Linking.openURL(c.href)
                      }}
                      sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        mb: '$3',
                      }}
                      href={c.href}
                      hrefAttrs={{
                        rel: 'noreferrer',
                        target: '_blank',
                      }}
                    >
                      <Text sx={{ mr: '$2', fontSize: 16 }}>
                        {t('contact.' + c.label)}
                      </Text>
                      <View
                        sx={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: '$2',
                        }}
                      >
                        <SupportIconWrap colors={c.bg}>
                          {c.icon ? (
                            <Icon name={c.icon} />
                          ) : (
                            <Image
                              source={c.image}
                              sx={{
                                width: 40,
                                height: 40,
                              }}
                            />
                          )}
                        </SupportIconWrap>
                      </View>
                    </TouchableOpacity>
                  </MotiView>
                )
              })}
            </AnimatePresence>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </MotiView>
  )
}

const SupportIconWrap = styled(DripsyGradient)(({ size = 45 }) => ({
  borderRadius: size * 0.5,
  borderWidth: 2,
  borderColor: '$PaleBlue',
  m: 1,
  height: size,
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}))

export default SupportMenu
