import useAlert from 'app/hooks/useAlert'
import { useAppDispatch } from 'app/provider/redux/store'
import validation from 'app/utils/validation'
import { FormikHelpers, useFormik } from 'formik'
import { authApi } from 'services/authApi'
import { LoginResult } from 'services/authApi.type'
import { IResponse } from 'services/common/types'
import * as Yup from 'yup'
import useAgentLoginProcess from './useAgentLoginProcess'
import useLoginProcess from './useLoginProcess'
import { sleep } from 'utils/common'

type LoginFormValues = {
  username: string
  password: string
}

export default function useLoginForm(isAgent?: boolean) {
  // const [login] = useLoginMutation()
  // const [agentLogin] = useAgentLoginMutation()
  const { showAlert } = useAlert()
  const dispatch = useAppDispatch()

  const { handleSuccessLogin } = useLoginProcess()
  const { handleAgentSuccessLogin } = useAgentLoginProcess()

  const onSubmit = async (
    { username, password }: LoginFormValues,
    {}: FormikHelpers<LoginFormValues>
  ) => {
    const api = isAgent ? authApi.endpoints.login : authApi.endpoints.login

    const resp = await dispatch(
      api.initiate({
        username,
        password,
      })
    )
      .unwrap()
      .catch((e: IResponse<LoginResult>) => {
        showAlert(e.message)
      })

    if (resp) {
      const { data, message } = resp
      if (data) {
        isAgent
          ? handleAgentSuccessLogin(data)
          : handleSuccessLogin(username, password, data)

        return
      } else {
        showAlert(message)
      }
    }
  }

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: validation.stringRequired,
      password: validation.stringRequired,
    }),
    onSubmit,
  })

  return { formik }
}
