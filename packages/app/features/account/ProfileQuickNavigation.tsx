import Icon from 'app/components/Icon'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import { Profile_Quick_Navigation_Path } from 'app/navigation/RoutePath'
import useLocalization from 'app/provider/localization'
import { Pressable, Text, View, styled, useDripsyTheme } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import { useEffect, useState } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { useRouter } from 'solito/router'

const CARD_SIZE = 80

const ProfileQuickNavigation = () => {
  const { theme } = useDripsyTheme()
  const { width } = useWindowDimensions()
  const { push } = useRouter()
  const { logout } = useOnAppLogout()
  const { t } = useLocalization()

  const containerWidth = Math.min(500, width * 0.9)
  const CARD_PER_ROW = Math.floor((Platform.OS, containerWidth / CARD_SIZE - 1))
  const totalCard = Profile_Quick_Navigation_Path.length
  const numEmptyCard = CARD_PER_ROW - (totalCard % CARD_PER_ROW)

  useEffect(() => {
    const findPath = Profile_Quick_Navigation_Path.findIndex(
      (el) => el.label === 'biometric.title'
    )

    if (Platform.OS === 'web' && findPath > 0)
      Profile_Quick_Navigation_Path.splice(findPath, 1)
  }, [])

  const TriggerLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error(error)
    }
  }

  const renderEmptyCard = (index: number) => {
    return (
      <View
        key={`empty-card-${index}`}
        sx={{
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          width: CARD_SIZE,
          height: CARD_SIZE,
        }}
      />
    )
  }

  const renderNavigationCard = (r, index) => {
    return (
      <Pressable
        key={r.label}
        onPress={() =>
          r.icon === 'logout' ? TriggerLogout() : push(r.path ?? '/')
        }
      >
        <Gradient
          colors={theme.linearGradients.surface}
          sx={{
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            width: CARD_SIZE,
            height: CARD_SIZE,
          }}
        >
          <Icon
            name={r.icon ?? 'notice'}
            color={'white'}
            size={24}
            sx={{ p: 10 }}
          />
          <Text
            numberOfLines={2}
            sx={{
              fontWeight: '500',
              px: 5,
              lineHeight: 12,
              textAlign: 'center',
              textTransform: 'uppercase',
              fontSize: 9,
              color: 'white',
            }}
          >
            {t(r.label)}
          </Text>
        </Gradient>
      </Pressable>
    )
  }

  return (
    <ProfileQuickNavigationContainer>
      {Profile_Quick_Navigation_Path.map(renderNavigationCard)}
      {Array.from({ length: numEmptyCard }, (_, i) => i).map((_, index) =>
        renderEmptyCard(index)
      )}
    </ProfileQuickNavigationContainer>
  )
}

const ProfileQuickNavigationContainer = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  maxWidth: '90%',
  width: 500,
  borderRadius: 15,
  justifyContent: 'center',
  gap: 15,
})

export default ProfileQuickNavigation
