import GradientButton from 'app/components/GradientButton'
import Icon from 'app/components/icon'
import { useAppDispatch } from 'app/provider/redux/store'
import { useLoginMutation } from 'app/services/authApi'
import { AuthActions } from 'app/store/authReducer'
import { Text, View } from 'dripsy'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'

const SplashScreenButton = () => {
  const [login] = useLoginMutation()
  const { replace } = useRouter()
  const dispatch = useAppDispatch()

  const TestLogin = async () => {
    try {
      const { data, success, message } = await login({
        username: 'andy01stag',
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
        // bg: 'red',
      }}
    >
      <View sx={{ width: '25%' }}>
        <GradientButton
          iconProps={{ name: 'tiktok' }}
          routePath="/demoIconScreen"
          label="Demo Button"
        />
      </View>

      <View sx={{ width: '25%' }}>
        <GradientButton
          iconProps={{ name: 'file' }}
          routePath="/demo/input"
          label="demo input"
        />
      </View>
      {/* <Link
        href="/?splashscreen=true"
        replace
        experimental={{
          nativeBehavior: 'stack-replace',
          isNestedNavigator: false,
        }}
      > */}
      <GradientButton
        iconProps={{ name: 'home' }}
        routePath="/?splashscreen=true"
      />
      {/* <Text>Home</Text> */}
      {/* </Link> */}
      <TouchableOpacity
        style={{ alignItems: 'center', width: '30%' }}
        onPress={() => TestLogin()}
      >
        <Icon name={'next'} color={'white'} />
        <Text>Test Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SplashScreenButton
