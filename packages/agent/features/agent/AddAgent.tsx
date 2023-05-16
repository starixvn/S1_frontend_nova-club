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

export type NewAgentFormValues = {
  username: string
  password: string
  confirmPassword: string
}

const AddAgent = () => {
  const initialScreen = ShareholderAgent.Agent
  const { openModal } = useModal()

  const [postAddNewAgent, { isLoading }] = useAddNewAgentMutation()

  const onSubmit = async (
    { username, password, confirmPassword }: NewAgentFormValues,
    { resetForm }: FormikHelpers<NewAgentFormValues>
  ) => {
    const { message, result, success } = await postAddNewAgent({
      currency: {
        VND: {
          CASH: '1',
          CREDIT: '1',
        },
      },
      username,
      password,
      confirmpassword: confirmPassword,
    })
      .unwrap()
      .catch((error) => {
        console.log('error', error)
        openModal('AgentAlertModal', { message: error.message })
        return error
      })

    if (success) {
      openModal('NewRegistrationModal', { username, password })
      resetForm()
    }
  }

  const formik = useFormik<NewAgentFormValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: validation.username,
      password: validation.password,
      confirmPassword: validation.confirmPassword,
    }),
    onSubmit,
  })

  return (
    <KeyboardView>
      <View sx={{ p: 12 }}>
        <CreateForm<NewAgentFormValues>
          screen={initialScreen}
          isLoading={isLoading}
          formik={formik}
        />
      </View>
    </KeyboardView>
  )
}

export default AddAgent
