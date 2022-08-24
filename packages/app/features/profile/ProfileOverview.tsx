import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { styled, SxProp, Text, useDripsyTheme, View } from 'dripsy'
import { usePlayerOverviewSummaryQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'

type Amount = string | number

interface ProfileOverviewProps {
  title: string
  amountWL: Amount
  amountTO: Amount
  amountRB: Amount
  amountDirect?: Amount
}

const ProfileOverview = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { theme } = useDripsyTheme()

  const { data } = usePlayerOverviewSummaryQuery()

  const { makeContextualHref } = useContextualRouting()
  const toOverview = makeContextualHref('/profile/overview')

  return (
    <StyledContainer>
      <View
        sx={{
          overflow: 'hidden',
        }}
      >
        <DripsyGradient
          gradient={'PaleBlue'}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0 }}
        >
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: '$3',
            }}
          >
            <Text sx={{ fontWeight: 'bold' }}>
              {t('profile.overview.title').toUpperCase()}
            </Text>
            <BouncePressable
              sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => push(toOverview, '/profile/overview')}
            >
              <Text
                sx={{
                  color: '$lightCyan',
                  mr: '$1',
                }}
              >
                {t('common.more')}
              </Text>
              <Icon
                name="chevright"
                size={16}
                color={theme.colors.$lightCyan}
                sx={{ mt: 3 }}
              />
            </BouncePressable>
          </View>
        </DripsyGradient>
      </View>

      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <SmallInfo
          label={t('profile.reward')}
          amount={data?.data?.accumulate_reward ?? 0}
          sx={{
            width: '60%',
            justifyContent: 'center',
            alignItems: 'center',
            pr: 0,
          }}
        />
        <View sx={{ width: '40%' }}>
          <SmallInfo
            label={t('profile.registered')}
            amount={data?.data?.registered ?? 0}
          />
          <SmallInfo
            label={t('profile.active')}
            amount={data?.data?.active_player ?? 0}
          />
        </View>
      </View>
    </StyledContainer>
  )
}

const SmallInfo = ({
  label,
  amount,
  sx,
}: {
  label: string
  amount: Amount
  sx?: SxProp
}) => {
  return (
    <StyledBottomContainer sx={sx}>
      <Text
        sx={{
          position: 'absolute',
          left: 4,
          top: 4,
          fontSize: 12,
        }}
      >
        {label}
      </Text>
      <Text sx={{ textAlign: 'right', fontSize: 20 }}>{amount}</Text>
    </StyledBottomContainer>
  )
}

const StyledContainer = styled(View)({
  borderColor: '$lightNavyBlue',
})

const StyledBottomContainer = styled(View)({
  borderWidth: 1,
  borderColor: '$lightNavyBlue',
  pt: '$5',
  pb: '$2',
  pr: '$4',
})

export default ProfileOverview
