import { DripsyGradient } from 'app/components/Gradient'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'

interface SummarySectionProps {
  title: string
  amountWL: number
  amountTO: number
  amountRB: number
  amountDirect?: number
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

const TopInfo = ({ label, amount }: { label: string; amount: number }) => {
  return (
    <View
      sx={{
        borderWidth: 1,
        borderColor: '$lightNavyBlue',
        alignItems: 'center',
      }}
    >
      <Text sx={{ pt: '$3' }}>{label}</Text>
      <Text sx={{ pb: '$3' }}>{amount}</Text>
    </View>
  )
}

const BottomInfo = ({ label, amount }: { label: string; amount: number }) => {
  return (
    <StyledBottomContainer>
      <Text sx={{ pt: '$3' }}>{label}</Text>
      <Text sx={{ pb: '$3' }}>{amount}</Text>
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
