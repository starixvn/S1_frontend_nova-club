import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
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

const ProfileOverview = ({
  title,
  amountWL,
  amountTO,
  amountRB,
  amountDirect,
}: ProfileOverviewProps) => {
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

      <BottomInfo
        label={t('profile.reward')}
        amount={data?.data?.accumulate_reward ?? 0}
      />

      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <BottomInfo
          label={t('profile.registered')}
          amount={data?.data?.registered ?? 0}
        />
        <BottomInfo
          label={t('profile.active')}
          amount={data?.data?.active_player ?? 0}
        />
      </View>
    </StyledContainer>
  )
}

const BottomInfo = ({ label, amount }: { label: string; amount: Amount }) => {
  return (
    <StyledBottomContainer>
      <Text sx={{ pt: '$3', fontSize: 24 }}>{amount}</Text>
      <Text sx={{ pb: '$3' }}>{label}</Text>
    </StyledBottomContainer>
  )
}

const StyledContainer = styled(View)({
  // borderWidth: 1,
  borderColor: '$lightNavyBlue',
})

const StyledTitle = styled(Text)({
  p: '$3',
  fontWeight: 'bold',
  pt: '$6',
  pb: '$3',
  fontSize: 18,
})

const StyledBottomContainer = styled(View)({
  borderWidth: 1,
  borderColor: '$lightNavyBlue',
  flex: 1,
  alignItems: 'center',
})

export default ProfileOverview
