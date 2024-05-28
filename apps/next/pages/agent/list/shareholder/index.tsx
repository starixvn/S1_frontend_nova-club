import ShareholderListing from 'agent/features/shareholder/ShareholderListing'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import ShareholderListRoutes from 'agent/navigation/routes/ListRoutes'
import { MobileAgentLayout } from 'components/layouts/agent'

const ListShareholder = () => {
  return (
    <>
      <AgentNestedTabs routes={ShareholderListRoutes} />
      <ShareholderListing />
    </>
  )
}
ListShareholder.AgentLayout = MobileAgentLayout

export default ListShareholder
