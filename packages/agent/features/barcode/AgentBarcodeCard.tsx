import Card from 'agent/components/Card'
import Icon from 'agent/components/Icon'
import Text from 'agent/components/Text'
import { useAgentReferralDetailsQuery } from 'agent/services/agentApi'
import { copyToClipboard } from 'agent/utils/agentCopyToClipboard'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { styled, View } from 'dripsy'
import { MotiView } from 'moti'
import { useMemo } from 'react'
import { useWindowDimensions } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

const AgentBarcodeCard = ({ userId }: { userId: number }) => {
  const { width } = useWindowDimensions()
  const cardWidth = Math.min(500, width * 0.8)

  const { domain, userName, cash, isLoading } = useAgentReferralDetailsQuery(
    { agentId: userId.toString() },
    {
      selectFromResult: ({ data, isLoading }) => ({
        domain: data?.result?.data.qrcode.VND.domain,
        userName: data?.result?.data.username,
        cash: data?.result?.data.qrcode.VND.agent_type,
        isLoading,
      }),
      skip: userId ? false : true,
    }
  )

  const BarcodeCard = useMemo(
    () => (
      <MotiView
        style={{ justifyContent: 'center' }}
        from={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: 350,
        }}
        transition={{ type: 'timing', duration: 500 }}
      >
        <View sx={{ alignItems: 'center' }}>
          <QRCode
            value={domain}
            size={Math.min(width * 0.7, 250)}
            // ecl="H"
            quietZone={12}
            backgroundColor="transparent"
            // logoMargin={4}
            logoBorderRadius={250}
          />
        </View>

        <BarcodeInfo>
          <BarcodeTitle>{`${cash}: ${userName}`}</BarcodeTitle>
          <BarcodeDomain onPress={() => copyToClipboard(domain)}>
            <Icon name="copy" color={'black'} size={20} sx={{ pr: '$2' }} />
            <Text numberOfLines={1} sx={{ fontSize: 14, py: '$1' }}>
              {domain}
            </Text>
          </BarcodeDomain>
        </BarcodeInfo>
      </MotiView>
    ),
    [cash, domain, userName, width]
  )

  return (
    <Card
      sx={{ my: '$2', py: '$10', px: '$5', width: cardWidth }}
      isLoading={isLoading}
    >
      {domain ? BarcodeCard : null}
    </Card>
  )
}
const BarcodeInfo = styled(View)({})
const BarcodeTitle = styled(Text)({
  fontSize: 20,
  pt: '$5',
})
const BarcodeDomain = styled(TouchableOpacity)({
  flexDirection: 'row',
  alignItems: 'center',
})

export default AgentBarcodeCard
