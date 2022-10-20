import GradientBox from 'app/components/GradientBox'
import Icon from 'app/components/Icon'
import useBioAuth from 'app/hooks/useBioAuth'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import {
  ActivityIndicator,
  Pressable,
  styled,
  Text,
  useDripsyTheme,
  View,
} from 'dripsy'
import React, { useState } from 'react'
import { Platform, Switch } from 'react-native'
import { useDispatch } from 'react-redux'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'

const enum LOADING_STATE {
  LOADING = 'loading',
  COMPLETE = 'complete',
}

const ProfileOptions = ({ isCreditMember }: { isCreditMember: boolean }) => {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const { data } = usePlayerProfileQuery()
  const biometricCredentials = useAppSelector(
    (s) => s.setting.biometricCredentials
  )
  const isBioLogin =
    !!biometricCredentials && biometricCredentials.username === data?.username

  const [loadingState, setLoadingState] = useState(LOADING_STATE.COMPLETE)

  const { push } = useRouter()
  const { theme } = useDripsyTheme()

  const { makeContextualHref } = useContextualRouting()
  const toProfileDetails = makeContextualHref('profile-details')
  const toSupport = makeContextualHref('customer-support')
  const toMessages = makeContextualHref('messages', {
    tab: 0,
  })
  const toManageCredentials = makeContextualHref('manage-credentials')
  const toCommissionTable = makeContextualHref('commission-table')

  const { logout } = useOnAppLogout()
  const { enableBiometric } = useBioAuth()

  const optionsRoute = [
    {
      id: 1,
      iconName: 'avatar',
      title: 'menu.profile',
      routeWeb: toProfileDetails,
      route: '/profile/profile-details',
    },
    {
      id: 2,
      iconName: 'lock',
      title: 'menu.manageCredentials',
      routeWeb: toManageCredentials,
      route: '/profile/manage-credentials',
      isCashMemberOnly: true,
    },
    {
      id: 3,
      iconName: 'ct',
      title: 'menu.commisionTable',
      routeWeb: toCommissionTable,
      route: '/profile/commission-table',
    },
    {
      id: 4,
      iconName: 'annoucement',
      title: 'menu.message/announcement',
      routeWeb: toMessages,
      route: {
        pathname: '/messages',
        query: {
          tab: 0,
        },
      },
    },
    {
      id: 5,
      iconName: 'cs',
      title: 'menu.customerSupport',
      routeWeb: toSupport,
      route: '/customer-support',
    },
    {
      id: 6,
      title: 'biometric.label',
      iconName: Platform.OS === 'ios' ? 'face-id' : 'fingerprint',
      onClick: async () => {
        toogleBiometricLogin()
      },
      appendIcon: () => {
        return (
          <Switch
            trackColor={{ false: '#3e3e3e', true: theme.colors.$PaleBlue }}
            thumbColor={isBioLogin ? theme.colors.$lightNavyBlue : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toogleBiometricLogin()}
            value={isBioLogin}
          />
        )
      },
      isMobileOnly: Platform.OS === 'android',
      // isMobileOnly: Platform.OS !== 'web',
    },
    {
      id: 7,
      iconName: 'logout',
      title: 'menu.logout',
      route: 'logout',
      onClick: async () => {
        if (loadingState === LOADING_STATE.LOADING) return

        setLoadingState(LOADING_STATE.LOADING)
        await logout()
        setLoadingState(LOADING_STATE.COMPLETE)
      },
      appendIcon: () => {
        return loadingState === LOADING_STATE.LOADING ? (
          <ActivityIndicator color={theme.colors.$lightCyan} />
        ) : null
      },
      fontColor: '$taupeGray',
    },
  ]

  const onOptionPress = (item: typeof optionsRoute[number]) => {
    const { routeWeb, route, onClick } = item

    if (typeof routeWeb !== 'undefined') {
      push(routeWeb, route)
      return
    }

    onClick?.()
  }

  const toogleBiometricLogin = () => {
    isBioLogin
      ? dispatch(SettingActions.toogleBiometricLogin(false))
      : enableBiometric(() => {})
  }

  return (
    <View>
      {optionsRoute.map((item) =>
        item.isCashMemberOnly && isCreditMember ? null : item.id === 6 &&
          !item.isMobileOnly ? null : (
          <StyledGradientBox
            key={item.id}
            gradient={item.gradient ?? 'darkNavyBlue'}
          >
            <StyledPressable onPress={() => onOptionPress(item)}>
              <StyledIcon
                name={item.iconName}
                size={26}
                sx={{ color: item.fontColor ?? '$PastelBlue' }}
              />
              <StyledText
                sx={{
                  color: item.fontColor ?? '$PastelBlue',
                  fontWeight: item.id === 7 ? 'bold' : 'normal',
                }}
              >
                {t(item.title)}
              </StyledText>

              {Boolean(item.appendIcon) && item.appendIcon?.()}
            </StyledPressable>
          </StyledGradientBox>
        )
      )}
    </View>
  )
}

const StyledGradientBox = styled(GradientBox)(() => ({
  minHeight: 60,
  px: '$4',
}))

const StyledPressable = styled(Pressable)(() => ({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
}))

const StyledIcon = styled(Icon)(() => ({
  mr: '$2',
  color: '$PastelBlue',
  textAlign: 'center',
  minWidth: 30,
}))
const StyledText = styled(Text)(() => ({
  flex: 1,
  fontSize: 20,
  color: '$PastelBlue',
}))

export default ProfileOptions
