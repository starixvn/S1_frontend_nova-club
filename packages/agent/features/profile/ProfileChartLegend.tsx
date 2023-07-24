import Text from 'agent/components/Text'
import { useAgentLocalization } from 'app/provider/localization'
import { styled, View } from 'dripsy'

const ProfileChartLegend = () => {
  const { t } = useAgentLocalization()
  return (
    <LegendContainer>
      <LegendRow>
        <LegendIndicator color={'#95C4FF'} />
        <ChartLegendLabelText sx={{ color: 'black' }}>
          {t('profile.direct')}
        </ChartLegendLabelText>
      </LegendRow>
      <LegendRow>
        <LegendIndicator color={'#0C7DFF'} />
        <ChartLegendLabelText sx={{ color: 'black' }}>
          {t('profile.indirect')}
        </ChartLegendLabelText>
      </LegendRow>
    </LegendContainer>
  )
}

export default ProfileChartLegend

const LegendContainer = styled(View)({
  justifyContent: 'space-around',
  alignItems: 'center',
  flexDirection: 'row',
  py: '$3',
  borderRadius: 15,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.1,
  shadowRadius: 2.62,
  elevation: 4,
  bg: 'white',
})

const LegendRow = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  paddingY: '$1',
})

const LegendIndicator = styled(View)(({ color }: { color: string }) => ({
  width: 15,
  height: 15,
  bg: color,
  mr: '$3',
}))

const ChartLegendLabelText = styled(Text)({
  fontWeight: 'bold',
})
