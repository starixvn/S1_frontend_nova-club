import AddShareholderPage from 'agent/features/shareholder/AddShareholder'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import AddRoutes from 'agent/navigation/routes/AddRoutes'
import { MobileAgentLayout } from 'components/layouts/agent'

const AddShareholder = () => {
  return (
    <>
      <AgentNestedTabs routes={AddRoutes} />
      <AddShareholderPage />
    </>
  )
}

AddShareholder.AgentLayout = MobileAgentLayout

export default AddShareholder
