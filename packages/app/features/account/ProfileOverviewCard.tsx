import Icon from 'app/components/Icon'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import isDesktop from 'app/utils/isDesktop'
import { ActivityIndicator, Text, View, styled } from 'dripsy'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { usePlayerOverviewSummaryQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'

interface ProfileOverviewTextProps {
  px?: number
  fontSize?: number
  textTransform?: string
  flex?: number
}
interface ProfileOverviewHorizontalItemProps {
  value: number
  label: string
}

interface ProfileOverviewCardProps {
  currency: Currency
}

const ProfileOverviewCard = ({ currency }: ProfileOverviewCardProps) => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const { data, isFetching } = usePlayerOverviewSummaryQuery(undefined, {
    skip: !token,
  })
  const desktop = useIsDesktop()
  const { width } = useWindowDimensions()
  const overViewContainerWidth = Math.min(
    450,
    desktop ? width * 0.3 : width * 0.85
  )

  return (
    <>
      <ProfileOverviewCardContainer
        width={overViewContainerWidth}
        desktop={desktop}
      >
        <ProfileOverviewHeader>
          <ProfileOverviewText fontSize={13}>
            {t('common.overview')}
          </ProfileOverviewText>

          <TouchableOpacity
            onPress={() => push('/account/profile-overview')}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <ProfileOverviewText
              fontSize={13}
              px={10}
              textTransform="capitalize"
            >
              {t('common.more')}
            </ProfileOverviewText>

            <Icon name="next" color={'white'} size={16} />
          </TouchableOpacity>
        </ProfileOverviewHeader>

        <ProfileOverviewDetails>
          <View sx={{ px: 10, py: 10, width: '50%' }}>
            <ProfileOverviewText fontSize={12}>
              {t('profile.monthlyReward')}
            </ProfileOverviewText>
            <View
              sx={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isFetching ? (
                <ActivityIndicator color="$primary.100" />
              ) : (
                <ProfileOverviewText fontSize={20}>
                  {toCurrency(data?.data?.accumulate_reward ?? 0, currency, {
                    symbol: false,
                    hideTruncatedThousand: false,
                  })}
                </ProfileOverviewText>
              )}
            </View>
          </View>
          <View sx={{ backgroundColor: '$primary.100', width: 1 }} />

          <View
            sx={{
              width: '50%',
              justifyContent: 'space-between',
            }}
          >
            {isFetching ? (
              <ActivityIndicator
                color="$primary.100"
                sx={{
                  height: '50%',
                }}
              />
            ) : (
              <ProfileOverviewHorizontalItem
                label={t('profile.registered')}
                value={data?.data?.registered ?? 0}
              />
            )}
            <View
              sx={{ backgroundColor: '$primary.100', width: '100%', height: 1 }}
            />
            {isFetching ? (
              <ActivityIndicator
                color="$primary.100"
                sx={{
                  height: '50%',
                }}
              />
            ) : (
              <ProfileOverviewHorizontalItem
                label={t('profile.activePlayer')}
                value={data?.data?.active_player ?? 0}
              />
            )}
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
      <ProfileOverviewText fontSize={10} flex={1}>
        {label}
      </ProfileOverviewText>
      <View sx={{ justifyContent: 'center', pr: 12 }}>
        <ProfileOverviewText fontSize={20} flex={1}>
          {value}
        </ProfileOverviewText>
      </View>
    </View>
  )
}
const ProfileOverviewCardContainer = styled(View)(
  ({ width, desktop }: { width: number; desktop: boolean }) => ({
    flexDirection: 'column',
    borderRadius: 15,
    borderColor: '$primary.100',
    borderWidth: 1,
    my: 10,
    height: desktop ? 125 : 150,
    bg: desktop ? '$primary.500' : 'transparent',
    width,
  })
)

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
    flex,
  }: ProfileOverviewTextProps) => ({
    fontSize,
    px,
    color: 'white',
    fontWeight: '500',
    textTransform,
    flex,
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
