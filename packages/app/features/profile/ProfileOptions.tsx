import GradientBox from 'app/components/GradientBox'
import Icon from 'app/components/Icon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualNavigationContext } from 'app/navigation/web/ContextualNavigation'
import useLocalization from 'app/provider/localization'
import { logOut } from 'app/utils/authUtil'
import {
  ActivityIndicator,
  Pressable,
  styled,
  Text,
  useDripsyTheme,
  View,
} from 'dripsy'
import React, { useContext, useState } from 'react'
import { useRouter } from 'solito/router'

const enum LOADING_STATE {
  LOADING = 'loading',
  COMPLETE = 'complete',
}

const ProfileOptions = () => {
  const { t } = useLocalization()
  const [loadingState, setLoadingState] = useState(LOADING_STATE.COMPLETE)

  const { push, replace } = useRouter()
  const { theme } = useDripsyTheme()

  const { makeContextualHref } = useContextualRouting()
  const toProfileDetails = makeContextualHref('profile-details')
  const toSupport = makeContextualHref('customer-support')
  const toMessages = makeContextualHref('messages', {
    tab: 0,
  })
  const toChangePassword = makeContextualHref('change-password')
  const toCommissionTable = makeContextualHref('commission-table')

  const { clear: clearNavigationStack } = useContext(
    ContextualNavigationContext
  )

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
      title: 'menu.changePassword',
      routeWeb: toChangePassword,
      route: '/profile/change-password',
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
    // {
    //   id: 6,
    //   title: 'Switch Account',
    //   iconName: 'lt',
    //   routeWeb: toProfileDetails,
    //   route: '/switch-account',
    //   gradient: 'wineRed',
    //   fontColor: 'white',
    // },
    {
      id: 7,
      iconName: 'logout',
      title: 'menu.logout',
      route: 'logout',
      onClick: async () => {
        if (loadingState === LOADING_STATE.LOADING) return

        setLoadingState(LOADING_STATE.LOADING)
        await logOut()
        replace('/auth/login')
        clearNavigationStack()
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

  return (
    <View>
      {optionsRoute.map((item) => (
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
      ))}
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
