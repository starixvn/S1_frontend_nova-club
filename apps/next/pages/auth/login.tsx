import LoginPage from 'app/features/auth/login'
import type { ReactElement } from 'react'

export default LoginPage

// @ts-expect-error: To be fix
LoginPage.getLayout = function getLayout(page: ReactElement) {
  return page
}
