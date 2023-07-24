import ShareholderListing from 'agent/features/shareholder/ShareholderListing'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import ListRoutes from 'agent/navigation/routes/ListRoutes'

const ListShareholder = () => {
  return (
    <>
      <AgentNestedTabs routes={ListRoutes} />
      <ShareholderListing />
    </>
  )
}

export default ListShareholder
