import { useAddNewAgentMutation } from 'agent/services/agentApi'
import validation from 'agent/utils/validation'
import { ScrollView, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { useModal } from 'react-native-modalfy'
import * as Yup from 'yup'
import CreateForm, {
  ShareholderAgent,
} from '../shareholder/components/CreateForm'
import KeyboardView from 'app/components/KeyboardView'
import AddContent from '../shareholder/components/AddContent'

export type NewAgentFormValues = {
  username: string
  password: string
  confirmPassword: string
}

const AddAgent = () => {
  const initialScreen = ShareholderAgent.Agent

  const [postAddNewAgent, { isLoading }] = useAddNewAgentMutation()

  return (
    <AddContent
      initialScreen={initialScreen}
      addNewAccount={postAddNewAgent}
      isLoading={isLoading}
    />
  )
}

export default AddAgent
