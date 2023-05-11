import Icon from 'app/components/icon'
import { Text, View, styled } from 'dripsy'
import { TouchableOpacity } from 'react-native'

interface ProfileOverviewTextProps {
  px?: number
  fontSize?: number
  textTransform?: string
}
interface ProfileOverviewHorizontalItemProps {
  value: string
  label: string
}

const ProfileOverviewCard = () => {
  return (
    <>
      <ProfileOverviewCardContainer>
        <ProfileOverviewHeader>
          <ProfileOverviewText fontSize={13}>overview</ProfileOverviewText>

          <TouchableOpacity
            onPress={() => null}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <ProfileOverviewText
              fontSize={13}
              px={10}
              textTransform="capitalize"
            >
              more
            </ProfileOverviewText>

            <Icon name="next" color={'white'} size={16} />
          </TouchableOpacity>
        </ProfileOverviewHeader>

        <ProfileOverviewDetails>
          <View sx={{ px: 10, py: 10, width: '50%' }}>
            <ProfileOverviewText fontSize={12}>
              monthly reward
            </ProfileOverviewText>
            <View
              sx={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ProfileOverviewText fontSize={20}>0</ProfileOverviewText>
            </View>
          </View>
          <View sx={{ backgroundColor: '$primary.100', width: 1 }} />

          <View
            sx={{
              width: '50%',
              justifyContent: 'space-between',
            }}
          >
            <ProfileOverviewHorizontalItem label="registered" value="0" />
            <View
              sx={{ backgroundColor: '$primary.100', width: '100%', height: 1 }}
            />
            <ProfileOverviewHorizontalItem label="active player" value="0" />
          </View>
        </ProfileOverviewDetails>
      </ProfileOverviewCardContainer>
    </>
  )
}

const ProfileOverviewHorizontalItem = ({
  value,
  label,
}: ProfileOverviewHorizontalItemProps) => {
  return (
    <View
      sx={{
        px: 10,
        py: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '50%',
      }}
    >
      <ProfileOverviewText fontSize={12}>{label}</ProfileOverviewText>
      <View sx={{ justifyContent: 'center', pr: 20 }}>
        <ProfileOverviewText fontSize={20}>{value}</ProfileOverviewText>
      </View>
    </View>
  )
}

const ProfileOverviewCardContainer = styled(View)({
  flexDirection: 'column',
  maxWidth: '85%',
  width: 500,
  borderRadius: 15,
  borderColor: '$primary.100',
  borderWidth: 1,
  my: 10,
  height: 150,
})
const ProfileOverviewHeader = styled(View)({
  flexDirection: 'row',
  bg: '$primary.300',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  justifyContent: 'space-between',
  px: 20,
  py: 10,
  alignItems: 'center',
})

const ProfileOverviewText = styled(Text)(
  ({
    fontSize = 16,
    px = 0,
    textTransform = 'uppercase',
  }: ProfileOverviewTextProps) => ({
    fontSize,
    px,
    color: 'white',
    fontWeight: '500',
    textTransform,
  })
)

const ProfileOverviewDetails = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  borderTopWidth: 1,
  borderTopColor: '$primary.100',
})

export default ProfileOverviewCard
