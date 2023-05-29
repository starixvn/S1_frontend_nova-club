import GradientButton from 'app/components/GradientButton'
import Icon from 'app/components/Icon'
import { useAppDispatch } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { Text, View } from 'dripsy'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'
import { useLoginMutation } from '../../../services/authApi'
import { Link } from 'solito/link'
import IconButtonGradient from 'app/components/IconButtonGradient'

const SplashScreenButton = () => {
  const [login] = useLoginMutation()
  const { replace, push } = useRouter()
  const dispatch = useAppDispatch()

  const TestLogin = async () => {
    try {
      const { data, success, message } = await login({
        username: 'andy06stag',
        password: 'asdf1234',
      }).unwrap()
      if (success && data) {
        console.log('Message:', message)
        dispatch(AuthActions.setAuthInfo(data))
      }

      // replace('/account/profile')
      replace('/?splashscreen=true')
    } catch (error) {
      console.log('Error Login Msg: ', error)
    }
  }
  return (
    <View
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        mb: 48,
        // bg: 'red',
      }}
    >
      <View sx={{ width: '20%' }}>
        <IconButtonGradient
          icon={'tiktok'}
          iconProps={{ name: 'tiktok' }}
          onPress={() => push('/demoIconScreen')}
        />
        <IconButtonGradient.Label>{'icon'}</IconButtonGradient.Label>
      </View>

      <View sx={{ width: '20%' }}>
        <GradientButton
          iconProps={{ name: 'megaway' }}
          onPress={() => push('/account/profile/bank')}
          label="Custom"
        />
      </View>
      <View sx={{ width: '20%' }}>
        <GradientButton
          iconProps={{ name: 'file' }}
          onPress={() => push('/demo/input')}
          label="demo input"
        />
      </View>

      <GradientButton
        iconProps={{ name: 'home' }}
        label="login page"
        onPress={() => push('/auth/login')}
      />

      <TouchableOpacity
        style={{ alignItems: 'center', width: '30%' }}
        onPress={() => TestLogin()}
      >
        <Icon name={'home'} color={'white'} />
        <Text>Test Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: 'center', width: '30%' }}
        onPress={() => TestLogin()}
      >
        <Link href="/?splashscreen=true">
          <Icon name={'home'} color={'white'} />
          <Text>Home</Text>
        </Link>
      </TouchableOpacity>
    </View>
  )
}

export default SplashScreenButton
