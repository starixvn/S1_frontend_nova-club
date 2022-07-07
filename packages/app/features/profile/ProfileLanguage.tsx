import IconButton from 'app/components/form/IconButton'
import { LANGUAGE_CODE } from 'app/constant/language'
import { RootState } from 'app/provider/redux/store'
import { AlertActions } from 'app/store/alert'
import { SettingActions } from 'app/store/setting.slice'
import { styled, View } from 'dripsy'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePlayerLangMutation } from 'services/playerApi'

const ProfileLanguage = () => {
  const dispatch = useDispatch()

  const lang = useSelector((s: RootState) => s.setting.locale)
  const [activeLang, setActiveLang] = useState(lang)

  const [updateLanguage] = usePlayerLangMutation()

  const handleClick = async (value) => {
    try {
      const { success, message } = await updateLanguage({ lang: value })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        setActiveLang(value)
        dispatch(SettingActions.setLocale(value))
        dispatch(AlertActions.addSuccess(message))
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    }
  }

  return (
    <StyledView>
      <StyledSelectedView isActive={activeLang === LANGUAGE_CODE.ENGLISH}>
        <IconButton
          name="sb"
          onPress={() => handleClick(LANGUAGE_CODE.ENGLISH)}
        />
      </StyledSelectedView>
      <View sx={{ mx: '$1' }} />
      <StyledSelectedView isActive={activeLang === LANGUAGE_CODE.VIETNAM}>
        <IconButton
          name="sb"
          onPress={() => handleClick(LANGUAGE_CODE.VIETNAM)}
        />
      </StyledSelectedView>
    </StyledView>
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
    borderColor: isActive ? 'red' : '$transparent',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  })
)
export default ProfileLanguage
