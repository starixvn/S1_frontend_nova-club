import { DripsyGradient } from 'app/components/Gradient'
import { LanguageButton } from 'app/components/LanguageSwitch'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { LANGUAGE_CODE } from 'app/utils/constant'
import { View, styled } from 'dripsy'
import React from 'react'

type Props = {}

export default function HeaderLanguageToggle({}: Props) {
  const dispatch = useAppDispatch()
  const lang = useAppSelector((state) => state.setting.locale)
  const setLanguage = (value: LANGUAGE_CODE) => {
    dispatch(SettingActions.setLocale(value))
  }
  const onChangeLanguage = (value: LANGUAGE_CODE) => {
    setLanguage(value)
  }
  return (
    <HeaderLanguageButtonContainer>
      <HeaderLanguageButtonInnerContainer gradient="button">
        <LanguageButton
          size={26}
          languageCode={lang}
          onPress={() =>
            onChangeLanguage(
              lang === LANGUAGE_CODE.VIETNAM
                ? LANGUAGE_CODE.ENGLISH
                : LANGUAGE_CODE.VIETNAM
            )
          }
          imageSx={{ borderWidth: 1.5 }}
        />
      </HeaderLanguageButtonInnerContainer>
    </HeaderLanguageButtonContainer>
  )
}

const HeaderLanguageButtonContainer = styled(View)({
  bg: '$primary.300',
  borderRadius: 50,
  alignItems: 'center',
  justifyContent: 'center',
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
