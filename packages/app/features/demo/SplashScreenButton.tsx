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
import Select from 'app/components/select/Select'
import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'
import { useState } from 'react'
import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { useWithdrawalBankQuery } from 'services/bank'

export const StatusOptions = [
  {
    value: 'ALL',
    label: 'common.all',
  },
  {
    value: 'ACTIVE',
    label: 'common.active',
  },
  {
    value: 'INACTIVE',
    label: 'common.inactive',
  },
]
const SplashScreenButton = () => {
  const [login] = useLoginMutation()
  const { replace, push } = useRouter()
  const dispatch = useAppDispatch()

  const [status, setStatus] = useState(StatusOptions[0])
  const [selectedBank, setSelectedBank] = useState()

  const { bankData } = useWithdrawalBankQuery(undefined, {
    selectFromResult: (s) => ({
      ...s,
      bankData: s.data?.data?.filter((b) => b.bank_code),
    }),
  })

  const sheetData =
    bankData?.map((item) => {
      return {
        label: item.bank_name,
        value: item.bank_code,
        icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.bank_icon}`,
      }
    }) ?? []

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
    <>
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
            onPress={() => push('/withdrawal')}
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
      <View sx={{ width: '100%' }}>
        <Select
          options={StatusOptions}
          placeholder={'Day'}
          value={status}
          onSelected={(val) => {
            if (!val) return
            setStatus(val)
          }}
          label={'Day'}
          isRequired
        />

        <SelectWithCardGrid
          label={'common.bankCard'}
          placeholder={'common.selectBank'}
          options={sheetData}
          value={selectedBank}
          sx={{ width: '100%', mb: '$3' }}
          onSelected={(e) => console.log('Selected Bank', e)}
        />
      </View>
    </>
  )
}

export default SplashScreenButton
