import { DripsyGradient } from 'app/components/Gradient'
import { LanguageButton } from 'app/components/LanguageSwitch'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { View, styled } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'
import { LANGUAGE_CODE } from 'utils/constant'
import LanguageDropdown from '../LanguageDropdown'
import { CURRENCY_LANGUAGE_LIST } from 'utils/constant/currency'

type Props = {}

export default function HeaderLanguageToggle({}: Props) {
  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const lang = useAppSelector((state) => state.setting.locale)
  const currentCurrency = useAppSelector((state) => state.setting.currency)
  const isLanguageMenuVisible = useAppSelector(
    (s) => s.tempSetting.isLanguageMenuVisible
  )

  const setLanguage = (value: LANGUAGE_CODE) => {
    dispatch(SettingActions.setLocale(value))
  }
  const onChangeLanguage = () => {
    const tempCurrency = CURRENCY_LANGUAGE_LIST.find(
      (el) => el.currency === currentCurrency
    )

    if (isLoggedIn && tempCurrency) {
      const toLang =
        lang === tempCurrency.localeLang
          ? LANGUAGE_CODE.ENGLISH
          : tempCurrency.localeLang

      setLanguage(toLang as LANGUAGE_CODE)
    } else
      dispatch(TempSettingActions.setIsOverlayVisible(!isLanguageMenuVisible))
  }

  return (
    <HeaderLanguageButtonContainer>
      <HeaderLanguageButtonInnerContainer gradient="button">
        <LanguageButton
          size={26}
          languageCode={lang}
          onPress={onChangeLanguage}
          imageSx={{ borderWidth: 1.5 }}
        />
      </HeaderLanguageButtonInnerContainer>

      {Platform.OS === 'web' && <LanguageDropdown />}
    </HeaderLanguageButtonContainer>
  )
}

const HeaderLanguageButtonContainer = styled(View)({
  bg: '$primary.300',
  borderRadius: 50,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  position: 'relative',
})

const HeaderLanguageButtonInnerContainer = styled(DripsyGradient)({
  alignItems: 'center',
  justifyContent: 'center',
  height: 33,
  width: 33,
  m: 1,
  borderColor: '$primary.700',
  borderWidth: 2,
  borderRadius: 50,
})
