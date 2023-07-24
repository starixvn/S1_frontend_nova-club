import AnnouncementPage from 'agent/features/inbox/AnnouncementPage'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import InboxRoutes from 'agent/navigation/routes/InboxRoutes'

const Announcement = () => {
  return (
    <>
      <AgentNestedTabs routes={InboxRoutes} />
      <AnnouncementPage />
    </>
  )
}

export default Announcement
