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
  const toChangePassword = makeContextualHref('change-password')

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
      routeWeb: toProfileDetails,
      route: '/commision-table',
    },
    {
      id: 4,
      title: 'Message/Announcement',
      iconName: 'sl',
      routeWeb: toProfileDetails,
      route: '/announcement',
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
              size={36}
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
  p: '$3',
}))

const StyledPressable = styled(Pressable)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
}))

const StyledIcon = styled(Icon)(() => ({
  mx: '$3',
  flex: 1 / 6,
  color: '$PastelBlue',
  textAlign: 'center',
}))
const StyledText = styled(Text)(() => ({
  flex: 1,
  fontSize: 24,
  color: '$PastelBlue',
}))

export default ProfileOptions
