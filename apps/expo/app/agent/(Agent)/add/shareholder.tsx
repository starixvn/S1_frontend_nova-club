import AddShareholderPage from 'agent/features/shareholder/AddShareholder'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import AddRoutes from 'agent/navigation/routes/AddRoutes'

const AddShareholder = () => {
  return (
    <>
      <AgentNestedTabs routes={AddRoutes} />
      <AddShareholderPage />
    </>
  )
}

export default AddShareholder
