import { NextComponentType } from 'next'
import { useSelector } from 'react-redux'
import { useRouter } from 'solito/router'
import { RootState } from '../provider/redux/store'
import Login from '../features/auth/login'

function withAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    // Login data added to props via redux-store (or use react context for example)
    //   const { isLoggedIn } = props;

    const player = useSelector((s: RootState) => s.auth.info)
    const { push } = useRouter()

    // If user is not logged in, return login component
    if (!player) {
      return <Login />
    }

    // If user is logged in, return original component
    return <Component />
  }

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps
  }

  return Auth
}

export default withAuth
