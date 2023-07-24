import Card from 'agent/components/Card'
import useGetProfile from 'agent/hooks/useGetProfile'
import { useUserInfoQuery } from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import { DripsyGradient } from 'app/components/Gradient'
import { ScrollView, styled } from 'dripsy'
import { MotiView } from 'moti'
import ProfileChart from './ProfileChart'
import ProfileChartLegend from './ProfileChartLegend'
import ProfileDetails from './ProfileDetails'
import ProfileTitle from './ProfileTitle'
import { useAppSelector } from 'app/provider/redux/store'

const AgentProfile = () => {
  const token = useAppSelector((s) => s.agent.access_token)
  const { data: userInfoData } = useUserInfoQuery(undefined, { skip: !token })
  const isAgent = userInfoData?.role === ROLE.AGENT
  const userRole = isAgent ? ROLE.AGENT : ROLE.SHAREHOLDER

  const { loading, profile } = useGetProfile()

  const downline = profile?.total_downline

  return (
    <DripsyGradient locations={[0.0, 0.1]} gradient="agentContent">
      <ScrollView sx={{ px: '$3', pt: '$4' }}>
        <ProfileTitle userRole={userRole} />
        <Card isLoading={loading} sx={{ mb: 30 }}>
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
