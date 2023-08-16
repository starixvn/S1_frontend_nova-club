import AnnouncementPage from 'agent/features/inbox/AnnouncementPage'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import InboxRoutes from 'agent/navigation/routes/InboxRoutes'
import { MobileAgentLayout } from 'components/layouts/agent'

const Announcement = () => {
  return (
    <>
      <AgentNestedTabs routes={InboxRoutes} />
      <AnnouncementPage />
    </>
  )
}
Announcement.AgentLayout = MobileAgentLayout

export default Announcement
