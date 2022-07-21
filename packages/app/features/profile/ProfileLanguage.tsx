import { Button } from 'app/components/form/Button'
import { LANGUAGE_CODE } from 'app/constant/language'
import { RootState } from 'app/provider/redux/store'
import { AlertActions } from 'app/store/alert'
import { SettingActions } from 'app/store/setting.slice'
import { Image, styled, useDripsyTheme, View } from 'dripsy'
import React, { ComponentProps, useRef, useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { usePlayerLangMutation } from 'services/playerApi'

const LANGUAGE_TO_FLAG_ICON = {
  [LANGUAGE_CODE.ENGLISH]: require('../../assets/images/common/icon-en.png'),
  [LANGUAGE_CODE.VIETNAM]: require('../../assets/images/common/icon-vn.png'),
}

const enum UPDATE_STATE {
  UPDATING = 'updating',
  COMPLETED = 'completed',
}

interface ProfileLanguageProps {
  isAuthRequired?: boolean
}

const ProfileLanguage = ({ isAuthRequired = true }: ProfileLanguageProps) => {
  const dispatch = useDispatch()

  const lang = useSelector((s: RootState) => s.setting.locale)
  const [activeLang, setActiveLang] = useState(lang)

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
      }
    } catch (e) {
      console.error(e)
    } finally {
      setUpdateState(UPDATE_STATE.COMPLETED)
    }
  }

  const setLanguage = (value: LANGUAGE_CODE) => {
    setActiveLang(value)
    dispatch(SettingActions.setLocale(value))
  }

  const onChangeLanguage = (value: LANGUAGE_CODE) => {
    if (isAuthRequired) {
      submitLanguage(value)
      return
    }

    setLanguage(value)
  }

  return (
    <StyledView>
      <StyledSelectedView isActive={activeLang === LANGUAGE_CODE.ENGLISH}>
        <FlagButton
          onPress={() => onChangeLanguage(LANGUAGE_CODE.ENGLISH)}
          disabled={activeLang === LANGUAGE_CODE.ENGLISH}
          loading={
            updateState === UPDATE_STATE.UPDATING &&
            activeLang === LANGUAGE_CODE.VIETNAM
          }
          imageSource={LANGUAGE_TO_FLAG_ICON[LANGUAGE_CODE.ENGLISH]}
        />
      </StyledSelectedView>

      <View sx={{ mx: '$1' }} />

      <StyledSelectedView isActive={activeLang === LANGUAGE_CODE.VIETNAM}>
        <FlagButton
          onPress={() => onChangeLanguage(LANGUAGE_CODE.VIETNAM)}
          disabled={activeLang === LANGUAGE_CODE.VIETNAM}
          loading={
            updateState === UPDATE_STATE.UPDATING &&
            activeLang === LANGUAGE_CODE.ENGLISH
          }
          imageSource={LANGUAGE_TO_FLAG_ICON[LANGUAGE_CODE.VIETNAM]}
        />
      </StyledSelectedView>
    </StyledView>
  )
}

interface FlagButtonProps
  extends Omit<ComponentProps<typeof Button>, 'children'> {
  imageSource: ImageSourcePropType
}

const FlagButton = ({ imageSource, ...props }: FlagButtonProps) => {
  const { theme } = useDripsyTheme()

  return (
    <Button
      rounded
      containerStyle={{
        px: 0,
        opacity: 1,
      }}
      fill={{ type: 'ghost', color: 'transparent' }}
      loadingIndicator={{
        color: '$blue',
      }}
      {...props}
    >
      <Image
        sx={{
          width: 35,
          height: theme.buttons.md.height,
          borderRadius: 10,
        }}
        source={imageSource}
        resizeMode="contain"
      />
    </Button>
  )
}

const StyledView = styled(View)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  p: '$6',
}))

const StyledSelectedView = styled(View)(
  ({ isActive }: { isActive: boolean }) => ({
    borderWidth: 4,
    borderColor: isActive ? '$blue' : '$transparent',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  })
)
export default ProfileLanguage
