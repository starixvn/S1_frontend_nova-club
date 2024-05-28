import { useAddNewShareholderMutation } from 'agent/services/shareholderApi'
import AddContent from './components/AddContent'
import { ShareholderAgent } from './components/CreateForm'

export type NewShareholderFormValues = {
  earning: string
  username: string
  password: string
  confirmPassword: string
}

const AddShareholder = () => {
  const initialScreen = ShareholderAgent.Shareholder

  const [postAddNewShareholder, { isLoading }] = useAddNewShareholderMutation()

  return (
    <AddContent
      initialScreen={initialScreen}
      addNewAccount={postAddNewShareholder}
      isLoading={isLoading}
    />
  )
}

export default AddShareholder
