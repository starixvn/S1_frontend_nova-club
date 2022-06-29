import GradientBox from 'app/components/GradientBox'
import Icon from 'app/components/Icon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { Pressable, styled, Text, View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'

const ProfileOptions = () => {
  const { push } = useRouter()

  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.Profile
  )
  const toProfileDetails = makeContextualHref('profile-details')
  const toMessages = makeContextualHref('messages', {
    tab: 0,
  })
  const toChangePassword = makeContextualHref('change-password')
  const toCommissionTable = makeContextualHref('commission-table')

  const optionsRoute = [
    {
      id: 1,
      title: 'Profile',
      iconName: 'sb',
      routeWeb: toProfileDetails,
      route: '/profile/profile-details',
    },
    {
      id: 2,
      title: 'Change Password',
      iconName: 'games',
      routeWeb: toChangePassword,
      route: '/profile/change-password',
    },
    {
      id: 3,
      title: 'Commision Table',
      iconName: 'home',
      routeWeb: toCommissionTable,
      route: '/profile/commission-table',
    },
    {
      id: 4,
      title: 'Message/Announcement',
      iconName: 'sl',
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
      title: 'Customer Support',
      iconName: 'lc',
      routeWeb: toProfileDetails,
      route: '/customer-support',
    },
    {
      id: 6,
      title: 'Switch Account',
      iconName: 'lt',
      routeWeb: toProfileDetails,
      route: '/switch-account',
      gradient: 'wineRed',
      fontColor: 'white',
    },
    {
      id: 7,
      title: 'Logout',
      iconName: 'cross',
      route: 'logout',
      fontColor: '$taupeGray',
    },
  ]

  return (
    <View>
      {optionsRoute.map((item) => (
        <StyledGradientBox
          key={item.id}
          gradient={item.gradient ?? 'darkNavyBlue'}
        >
          <StyledPressable onPress={() => push(item.routeWeb, item.route)}>
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
              {item.title}
            </StyledText>
          </StyledPressable>
        </StyledGradientBox>
      ))}
    </View>
  )
}

const StyledGradientBox = styled(GradientBox)(() => ({
  minHeight: 60,
}))

const StyledPressable = styled(Pressable)(() => ({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
}))

const StyledIcon = styled(Icon)(() => ({
  mx: '$4',
  color: '$PastelBlue',
  textAlign: 'center',
}))
const StyledText = styled(Text)(() => ({
  flex: 1,
  fontSize: 20,
  color: '$PastelBlue',
}))

export default ProfileOptions
