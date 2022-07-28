import { API_DOMAIN, API_KEY } from '@env'
import FilePicker from 'app/components/FilePicker'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { AlertActions } from 'app/store/alert.slice'
import axios from 'axios'
import { styled, Text, View } from 'dripsy'
import { Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useUploadDepositSlipMutation } from 'services/deposit'
import { usePlayerProfileQuery } from 'services/playerApi'

type DepositUploadProps = {
  isDepositSubmitted: boolean
  secureId: string
}

const DepositUpload = ({
  isDepositSubmitted,
  secureId,
}: DepositUploadProps) => {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const [postUploadReceipt] = useUploadDepositSlipMutation()
  const { data } = usePlayerProfileQuery()
  const username = data?.data?.username ?? ''

  const token = useSelector((state) => state?.auth.info.token)

  const uploadSlip = async (path) => {
    try {
      const { data, success, message } = await postUploadReceipt({
        secure_id: secureId,
        file:
          Platform.OS === 'web'
            ? path
            : {
                uri: Platform.OS === 'ios' ? path : path,
                name: path.split('/').pop() ?? '',
                type: `image/${path.split('.').pop()}` ?? '',
              },
      })
        .unwrap()
        .catch(({ message }) => dispatch(AlertActions.addError(message)))

      console.log(
        '🚀 ~ file: DepositUpload.tsx ~ line 22 ~ upload ~ data',
        data
      )

      if (success) {
        dispatch(AlertActions.addSuccess(message))
      }
    } catch (e) {
      dispatch(AlertActions.addError('status.systemError'))
    }
  }

  const handleUploadDeposit = async (path) => {
    // const formData = new FormData()
    // formData.append('secure_id', secureId ?? 'D569496076195')
    // formData.append('username', username)
    // formData.append('file', {
    //   uri: Platform.OS === 'ios' ? path.replace('file://', '') : path,
    //   name: path.split('/').pop() ?? '',
    //   type: `image/${path.split('.').pop()}` ?? '',
    // })
    // console.log('formData 1', formData)

    // axios({
    //   url: `${API_DOMAIN}/player_api/uploadPlayerDepositSlip`,
    //   method: 'POST',
    //   data: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: `Bearer ${token}`,
    //     api_key: API_KEY,
    //   },
    // })
    //   .then(function (response) {
    //     //handle success
    //     console.log('success', response.data)
    //   })
    //   .catch(function (response) {
    //     //handle error
    //     console.log('error', response)
    //   })

    uploadSlip(path)
  }

  return (
    <StyledTop
      gradient={'PaleBlue'}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0 }}
    >
      <View
        sx={{
          py: '$3',
          px: '$7',
        }}
      >
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon name="lc" color={'#82BAF6'} size={33} />
          <Text sx={{ color: '#82BAF6', fontWeight: 'bold' }}>
            {t('deposit.upload.title')}
          </Text>
        </View>
        <Text sx={{ color: '#82BAF6', fontSize: 12, mt: '$1' }}>
          {t('deposit.upload.description')}
        </Text>
        <FilePicker
          isActive={isDepositSubmitted}
          onPress={handleUploadDeposit}
        />
      </View>
    </StyledTop>
  )
}

const StyledTop = styled(DripsyGradient)({
  m: '$2',
  mx: '$4',
  alignItems: 'center',
  borderRadius: 10,
  borderColor: '$border2',
  borderWidth: 1,
})

export default DepositUpload
