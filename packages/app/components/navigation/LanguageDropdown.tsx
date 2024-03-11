import React from 'react'
import { CURRENCY_LANGUAGE_LIST } from 'app/config/currency'
import { Row, Text, View, useSx } from 'dripsy'
import { SolitoImage } from 'solito/image'
import BouncePressable from '../pressable/BouncePressable'
import { AnimatePresence, MotiView } from 'moti'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { TempSettingActions } from 'app/store/tempSetting.slice'

const ICON_SIZE = 32

const LanguageDropdown = () => {
  const sx = useSx()
  const dispatch = useAppDispatch()
  const isLanguageMenuVisible = useAppSelector(
    (s) => s.tempSetting.isLanguageMenuVisible
  )

  const handlePress = (item, currency) => {
    dispatch(SettingActions.setLocale(item.value))
    dispatch(SettingActions.setCurrency(currency))

    dispatch(TempSettingActions.setIsOverlayVisible(false))
  }

  return (
    <>
      <AnimatePresence>
        {isLanguageMenuVisible && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'timing' }}
            style={sx({
              position: 'absolute',
              top: 40,
              right: 0,
              bg: '$primary.500',
              width: 300,
              borderRadius: 12,
              p: '$2',
              zIndex: 2,
            })}
          >
            {CURRENCY_LANGUAGE_LIST.map((item) => (
              <View key={item.title} sx={{ py: '$2' }}>
                <Text sx={{ fontWeight: 'bold', py: '$1' }}>{item.title}</Text>
                <Row>
                  <SolitoImage
                    src={item.image}
                    resizeMode="contain"
                    alt=""
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    style={{
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: 'white',
                      marginLeft: 12,
                      marginRight: 24,
                    }}
                  />

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
            ))}
          </MotiView>
        )}
      </AnimatePresence>
    </>
  )
}

export default LanguageDropdown
