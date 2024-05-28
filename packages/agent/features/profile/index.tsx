import Card from 'agent/components/Card'
import { useProfileDetailQuery } from 'agent/services/profileApi'
import { useUserInfoQuery } from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import { DripsyGradient } from 'app/components/Gradient'
import { useAppSelector } from 'app/provider/redux/store'
import { ScrollView, styled } from 'dripsy'
import { MotiView } from 'moti'
import ProfileChart from './ProfileChart'
import ProfileChartLegend from './ProfileChartLegend'
import ProfileDetails from './ProfileDetails'
import ProfileTitle from './ProfileTitle'

const AgentProfile = () => {
  const token = useAppSelector((s) => s.agent.access_token)
  const { data: userInfoData } = useUserInfoQuery(undefined, { skip: !token })
  const userRole = userInfoData?.role

  const { data, isLoading } = useProfileDetailQuery()

  const profile = data?.result?.data
  const downline = data?.result?.data.total_downline

  return (
    <DripsyGradient locations={[0.0, 0.1]} gradient="agentContent">
      <ScrollView sx={{ px: '$3', pt: '$4' }}>
        <ProfileTitle userRole={userRole} />
        <Card isLoading={isLoading} sx={{ mb: '$6' }}>
          <ProfileContentContainer
            from={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: userRole === ROLE.AGENT ? 550 : 950,
            }}
            transition={{ type: 'timing', duration: 1000 }}
          >
            <ProfileDetails data={profile} />
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
})
export default AgentProfile
