import { useAddNewShareholderMutation } from 'agent/services/shareholderApi'
import validation from 'agent/utils/validation'
import { ScrollView, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { useModal } from 'react-native-modalfy'
import * as Yup from 'yup'
import CreateForm, { ShareholderAgent } from './components/CreateForm'

export type NewShareholderFormValues = {
  earning: string
  username: string
  password: string
  confirmPassword: string
}

const AddShareholder = () => {
  const initialScreen = ShareholderAgent.Shareholder
  const { openModal } = useModal()

  const [postAddNewShareholder, { isLoading }] = useAddNewShareholderMutation()

  const onSubmit = async (
    { earning, username, password, confirmPassword }: NewShareholderFormValues,
    { resetForm }: FormikHelpers<NewShareholderFormValues>
  ) => {
    const { message, result, success } = await postAddNewShareholder({
      currency: {
        VND: {
          EARNP: earning,
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

  const formik = useFormik<NewShareholderFormValues>({
    initialValues: {
      earning: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      earning: validation.stringRequired,
      username: validation.username,
      password: validation.password,
      confirmPassword: validation.confirmPassword,
    }),
    onSubmit,
  })

  return (
    <ScrollView>
      <View sx={{ p: 12 }}>
        <CreateForm<NewShareholderFormValues>
          screen={initialScreen}
          isLoading={isLoading}
          formik={formik}
        />
      </View>
    </ScrollView>
  )
}

export default AddShareholder
