import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useDefaultParamSelector from 'app/hooks/useDefaultParamSelector'
import { useAppDispatch } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { Image, Pressable, SxProp, View, styled } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import React, { useMemo } from 'react'
import { ViewProps } from 'react-native'
import { SolitoImage } from 'solito/image'
import { LANGUAGE_CODE } from 'utils/constant'
import { CURRENCY_LANGUAGE_LIST } from 'utils/constant/currency'

const LANGUAGE_BUTTON_SIZE = 25

const LANGUAGE_TO_FLAG_ICON = {
  [LANGUAGE_CODE.ENGLISH]: `${MEDIA_DOMAIN}${CONTENT_URI}/language/en.jpg`,
  [LANGUAGE_CODE.VIETNAM]: `${MEDIA_DOMAIN}${CONTENT_URI}/language/vn.jpg`,
  [LANGUAGE_CODE.THAILAND]: `${MEDIA_DOMAIN}${CONTENT_URI}/language/th.jpg`,
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
          <StyledImage
            sx={imageSxStyle}
            src={LANGUAGE_TO_FLAG_ICON[languageCode]}
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
  const { locale, currency } = useDefaultParamSelector()

  // const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  // const [updateState, setUpdateState] = useState(UPDATE_STATE.COMPLETED)
  // const [updateLanguage] = usePlayerLangMutation()

  // const submitLanguage = async (value: LANGUAGE_CODE) => {
  //   if (updateState === UPDATE_STATE.UPDATING) return

  //   setUpdateState(UPDATE_STATE.UPDATING)

  //   try {
  //     const { success, message } = await updateLanguage({ lang: value })
  //       .unwrap()
  //       .catch((error) => {
  //         return error
  //       })

  //     if (success) {
  //       setLanguage(value)
  //       // baseApiWithTag.util.invalidateTags(['Announcement'])
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   } finally {
  //     setUpdateState(UPDATE_STATE.COMPLETED)
  //   }
  // }

  const setLanguage = (value: LANGUAGE_CODE) => {
    dispatch(SettingActions.setLocale(value))
  }

  const onChangeLanguage = (value: LANGUAGE_CODE) => {
    setLanguage(value)
  }

  const languageList = useMemo(() => {
    return CURRENCY_LANGUAGE_LIST.find((c) => c.currency === currency)
  }, [currency])

  if (!languageList) return null

  return (
    <View sx={{ flexDirection: 'row' }} {...rest}>
      {languageList.language.map(({ value }) => (
        <LanguageButton
          key={value}
          languageCode={value}
          onPress={() => onChangeLanguage(value)}
          active={value === locale}
        />
      ))}
    </View>
  )
}

const StyledImage = styled(SolitoImage)({})
