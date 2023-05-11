import Icon from 'app/components/icon'
import { Profile_Quick_Navigation_Path } from 'app/components/navigation/RoutePath'
import { Text, View, styled, useDripsyTheme } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import { Link } from 'solito/link'

const CARD_PER_ROW = 4
const CARD_SIZE = 80

const ProfileQuickNavigation = () => {
  const { theme } = useDripsyTheme()
  const totalCard = Profile_Quick_Navigation_Path.length
  const numEmptyCard = CARD_PER_ROW - (totalCard % CARD_PER_ROW)

  const renderEmptyCard = () => {
    return (
      <View
        key={'empty-card'}
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
      <Link key={r.label} href={r.path ?? '/'}>
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
            {r.label}
          </Text>
        </Gradient>
      </Link>
    )
  }

  return (
    <ProfileQuickNavigationContainer>
      {Profile_Quick_Navigation_Path.map(renderNavigationCard)}
      {Array.from({ length: numEmptyCard }, (_, i) => i).map(renderEmptyCard)}
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
