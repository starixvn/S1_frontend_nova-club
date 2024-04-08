import FloatingOverlay from 'app/features/floatingContent/FloatingOverlay'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { Row, Text, View, styled, useSx } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import React from 'react'
import { Platform } from 'react-native'
import { SolitoImage } from 'solito/image'
import BouncePressable from '../pressable/BouncePressable'
import { CURRENCY_LANGUAGE_LIST } from 'utils/constant/currency'

const ICON_SIZE = 32

const LanguageDropdown = () => {
  const sx = useSx()
  const dispatch = useAppDispatch()
  const isLanguageMenuVisible = useAppSelector(
    (s) => s.tempSetting.isLanguageMenuVisible
  )
  const handlePress = (item, currency) => {
    dispatch(SettingActions.setCurrency(currency))
    dispatch(SettingActions.setLocale(item.value))

    dispatch(TempSettingActions.setIsOverlayVisible(false))
  }

  return (
    <>
      {Platform.OS === 'web' && <FloatingOverlay />}
      <AnimatePresence>
        {isLanguageMenuVisible && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'timing' }}
            style={sx({
              position: 'absolute',
              top: Platform.OS === 'web' ? 36 : 110,
              right: -8,
              width: 300,
              zIndex: 11,
            })}
          >
            <Triangle />
            <View
              sx={{
                borderRadius: 12,
                bg: '$primary.100',
                p: '$1',
              }}
            >
              {CURRENCY_LANGUAGE_LIST.map((item) => (
                <View key={item.title} sx={{ py: '$2' }}>
                  <Row sx={{ alignItems: 'center' }}>
                    <View
                      sx={{
                        borderRadius: 50,
                        borderWidth: 2,
                        borderColor: 'white',
                        marginLeft: 12,
                        marginRight: 24,
                        overflow: 'hidden',
                      }}
                    >
                      <SolitoImage
                        src={item.image}
                        resizeMode="contain"
                        alt=""
                        width={ICON_SIZE}
                        height={ICON_SIZE}
                      />
                    </View>
                    <View>
                      <Text sx={{ fontWeight: 'bold', py: '$1' }}>
                        {item.title}
                      </Text>
                      <Row>
                        {item.language.map((el, index) => (
                          <BouncePressable
                            key={index}
                            onPress={() => handlePress(el, item.currency)}
                          >
                            <Row>
                              {index > 0 && <Text> | </Text>}
                              <Text>{el.label}</Text>
                            </Row>
                          </BouncePressable>
                        ))}
                      </Row>
                    </View>
                  </Row>
                </View>
              ))}
            </View>
          </MotiView>
        )}
      </AnimatePresence>
    </>
  )
}

const Triangle = styled(View)({
  alignSelf: 'flex-end',
  marginRight: 15,
  marginBottom: -2,
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftWidth: 10,
  borderRightWidth: 10,
  borderBottomWidth: 20,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderBottomColor: '$primary.100',
})

export default LanguageDropdown
