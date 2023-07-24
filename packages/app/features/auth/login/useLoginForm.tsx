import { authApi as agentAuthApi } from 'agent/services/authApi'
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
import { SettingActions } from 'app/store/setting.slice'

type LoginFormValues = {
  username: string
  password: string
}

export default function useLoginForm(isAgent?: boolean, isRemember) {
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
    const api = isAgent ? agentAuthApi.endpoints.login : authApi.endpoints.login

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
      const { data, result, message, success } = resp
      if (success) {
        isAgent
          ? handleAgentSuccessLogin(result)
          : handleSuccessLogin(username, password, data)

        dispatch(
          isAgent
            ? SettingActions.setAgentRememberMe(
                isRemember ? { username, password } : undefined
              )
            : SettingActions.setRememberMe(
                isRemember ? { username, password } : undefined
              )
        )

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
