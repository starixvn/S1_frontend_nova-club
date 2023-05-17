import { skipToken } from '@reduxjs/toolkit/query/react'
import Card from 'agent/components/Card'
import { useAgentProfileQuery } from 'agent/services/agentApi'
import { useShareholderProfileQuery } from 'agent/services/shareholderApi'
import { useUserInfoQuery } from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import { DripsyGradient } from 'app/components/Gradient'
import { ScrollView, styled } from 'dripsy'
import { MotiView } from 'moti'
import ProfileChart from './ProfileChart'
import ProfileChartLegend from './ProfileChartLegend'
import ProfileDetails from './ProfileDetails'
import ProfileTitle from './ProfileTitle'

const AgentProfile = () => {
  const { data: userInfoData } = useUserInfoQuery()
  const isAgent = userInfoData?.role === ROLE.AGENT
  const userRole = isAgent ? ROLE.AGENT : ROLE.SHAREHOLDER
  const { data: shareholderData, isLoading: shareholderLoading } =
    useShareholderProfileQuery(isAgent ? skipToken : undefined)

  const { data: agentData, isLoading: agentLoading } = useAgentProfileQuery(
    isAgent ? undefined : skipToken
  )

  const loading = isAgent ? agentLoading : shareholderLoading
  const data = isAgent ? agentData : shareholderData

  const downline = isAgent
    ? agentData?.result?.data.total_downline
    : shareholderData?.result?.data.total_downline

  return (
    <DripsyGradient
      locations={[0.0, 0.1]}
      colors={['rgb(224,237,254)', '#ffffff']}
    >
      <ScrollView
        contentContainerStyle={{}}
        sx={{ px: '$3', pt: '$4', mb: '$5' }}
      >
        <ProfileTitle userRole={userRole} />
        <Card isLoading={loading} sx={{ mb: 30 }}>
          <ProfileContentContainer
            from={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: userRole === ROLE.AGENT ? 450 : 800,
            }}
            transition={{ type: 'timing', duration: 1000 }}
          >
            <ProfileDetails data={data} />
            <>
              <ProfileChartLegend />
              {downline && <ProfileChart downline={downline} />}
            </>
          </ProfileContentContainer>
        </Card>
      </ScrollView>
    </DripsyGradient>
  )
}
const ProfileContentContainer = styled(MotiView)({
  minHeight: 525,
  paddingBottom: '$8',
})
export default AgentProfile
