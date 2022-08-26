import { DripsyGradient } from 'app/components/Gradient'
import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { styled, Text, View } from 'dripsy'
import { usePlayerProfileQuery } from 'services/playerApi'

type Amount = string | number

interface SummarySectionProps {
  title: string
  amountWL: Amount
  amountTO: Amount
  amountRB: Amount
  amountDirect?: Amount
}

const SummarySection = ({
  title,
  amountWL,
  amountTO,
  amountRB,
  amountDirect,
}: SummarySectionProps) => {
  const { t } = useLocalization()

  return (
    <StyledContainer>
      <View
        sx={{
          overflow: 'hidden',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}
      >
        <DripsyGradient
          gradient={'PaleBlue'}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0 }}
        >
          <StyledTitle>{title}</StyledTitle>
        </DripsyGradient>
      </View>
      <TopInfo label={t('profile.overview.w/l')} amount={amountWL} />
      {amountDirect !== undefined && (
        <TopInfo label={t('profile.overview.direct')} amount={amountDirect} />
      )}
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <BottomInfo label={t('profile.overview.turnover')} amount={amountTO} />
        <BottomInfo label={t('profile.overview.realbet')} amount={amountRB} />
      </View>
    </StyledContainer>
  )
}

const TopInfo = ({ label, amount }: { label: string; amount: Amount }) => {
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  return (
    <View
      sx={{
        borderWidth: 1,
        borderColor: '$lightNavyBlue',
        alignItems: 'center',
      }}
    >
      <Text sx={{ pt: '$3' }}>{label}</Text>
      <Text sx={{ pb: '$3' }}>
        {toCurrency(amount ?? 0, currency, {
          symbol: false,
          hideTruncatedThousand: false,
        })}
      </Text>
    </View>
  )
}

const BottomInfo = ({ label, amount }: { label: string; amount: Amount }) => {
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  return (
    <StyledBottomContainer>
      <Text sx={{ pt: '$3' }}>{label}</Text>
      <Text sx={{ pb: '$3' }}>
        {toCurrency(amount ?? 0, currency, {
          symbol: false,
          hideTruncatedThousand: false,
        })}
      </Text>
    </StyledBottomContainer>
  )
}

const StyledContainer = styled(View)({
  borderWidth: 1,
  borderColor: '$lightNavyBlue',
  m: '$5',
  mt: '$10',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
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

export default SummarySection
