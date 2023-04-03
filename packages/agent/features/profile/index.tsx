import { skipToken } from '@reduxjs/toolkit/query/react'
import Card from 'agent/components/Card'
import { useAgentProfileQuery } from 'agent/services/agentApi'
import { useShareholderProfileQuery } from 'agent/services/shareholderApi'
import { useUserInfoQuery } from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import { DripsyGradient } from 'app/components/Gradient'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { ScrollView, styled } from 'dripsy'
import { MotiView } from 'moti'
import ProfileChart from './ProfileChart'
import ProfileChartLegend from './ProfileChartLegend'
import ProfileDetails from './ProfileDetails'
import ProfileTitle from './ProfileTitle'

const AgentProfile = () => {
  const { height } = useContainerDimension()
  const { data: userInfoData } = useUserInfoQuery()
  const isAgent = userInfoData?.result?.data.role === ROLE.AGENT
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
      colors={['rgb(224,237,254)', '#ffffff']}
      sx={{ minHeight: height }}
    >
      <ScrollView contentContainerStyle={{}} sx={{ px: '$3', pt: '$1' }}>
        <ProfileTitle userRole={userRole} />
        <Card isLoading={loading} sx={{ mb: 30 }}>
          <ProfileContentContainer
            userRole={userRole}
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
const ProfileContentContainer = styled(MotiView)(
  ({ userRole }: { userRole: string }) => ({
    minHeight: userRole === ROLE.AGENT ? 450 : 800,
    paddingBottom: '$5',
  })
)
export default AgentProfile
