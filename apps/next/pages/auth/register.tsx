import RegisterPage from 'app/features/auth/register'
import { ReactElement } from 'react'

export default RegisterPage

// @ts-expect-error: To be fix
RegisterPage.getLayout = function getLayout(page: ReactElementt) {
  return page
}
