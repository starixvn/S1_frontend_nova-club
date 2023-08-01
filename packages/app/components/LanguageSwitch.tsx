import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { LANGUAGE_CODE } from 'app/utils/constant'
import { Image, Pressable, SxProp, View } from 'dripsy'
import React, { useState } from 'react'
import { ViewProps } from 'react-native'
import { usePlayerLangMutation } from '../../services/playerApi'
import { AnimatePresence, MotiImage, MotiView } from 'moti'

const LANGUAGE_BUTTON_SIZE = 25

const LANGUAGE_TO_FLAG_ICON = {
  [LANGUAGE_CODE.ENGLISH]: require('../assets/images/common/en.jpg'),
  [LANGUAGE_CODE.VIETNAM]: require('../assets/images/common/vn.jpg'),
}

const enum UPDATE_STATE {
  UPDATING = 'updating',
  COMPLETED = 'completed',
}

interface LanguageButtonProps {
  languageCode: LANGUAGE_CODE
  onPress: () => void
  active?: boolean
  sx?: SxProp
  size?: number
  imageSx?: SxProp
}

export function LanguageButton({
  languageCode,
  onPress,
  active,
  sx,
  size = LANGUAGE_BUTTON_SIZE,
  imageSx,
}: LanguageButtonProps) {
  const defaultButtonStyle: SxProp = {
    m: 10,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: active ? '$primary.100' : 'transparent',
  }
  const defaultImageStyle: SxProp = {
    width: size,
    height: size,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  }
  const buttonSxStyle = Object.assign(defaultButtonStyle, sx)
  const imageSxStyle = Object.assign(defaultImageStyle, imageSx)

  return (
    <AnimatePresence>
      <Pressable onPress={onPress} sx={buttonSxStyle}>
        <MotiView
          key={LANGUAGE_TO_FLAG_ICON[languageCode]}
          from={{ opacity: 0, transform: [{ rotateZ: '0deg' }] }}
          animate={{
            opacity: 1,
            transform: [{ rotateZ: '360deg' }],
          }}
          exit={{ opacity: 0, transform: [{ rotateZ: '0deg' }] }}
          transition={{ type: 'timing' }}
          exitTransition={{ type: 'timing' }}
        >
          <Image
            sx={imageSxStyle}
            source={LANGUAGE_TO_FLAG_ICON[languageCode]}
            resizeMode="contain"
            alt=""
          />
        </MotiView>
      </Pressable>
    </AnimatePresence>
  )
}

export default function LanguageSwitch({ ...rest }: ViewProps) {
  const dispatch = useAppDispatch()
  const lang = useAppSelector((state) => state.setting.locale)
  const [updateState, setUpdateState] = useState(UPDATE_STATE.COMPLETED)
  const [updateLanguage] = usePlayerLangMutation()

  const submitLanguage = async (value: LANGUAGE_CODE) => {
    if (updateState === UPDATE_STATE.UPDATING) return

    setUpdateState(UPDATE_STATE.UPDATING)

    try {
      const { success, message } = await updateLanguage({ lang: value })
        .unwrap()
        .catch((error) => {
          return error
        })

      if (success) {
        setLanguage(value)
        // baseApiWithTag.util.invalidateTags(['Announcement'])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setUpdateState(UPDATE_STATE.COMPLETED)
    }
  }

  const setLanguage = (value: LANGUAGE_CODE) => {
    dispatch(SettingActions.setLocale(value))
  }

  const onChangeLanguage = (value: LANGUAGE_CODE) => {
    setLanguage(value)
  }

  return (
    <View sx={{ flexDirection: 'row' }} {...rest}>
      {Object.values(LANGUAGE_CODE).map((languageCode) => (
        <LanguageButton
          key={languageCode}
          languageCode={languageCode}
          onPress={() => onChangeLanguage(languageCode)}
          active={languageCode === lang}
        />
      ))}
    </View>
  )
}
