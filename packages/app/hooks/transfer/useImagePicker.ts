import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { RootState } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { Buffer } from 'buffer'
import * as ImagePicker from 'expo-image-picker'
import jpeg from 'jpeg-js'
import jsQR from 'jsqr'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyAffiliateUsernameQuery } from 'services/contentApi'
import { useIsFocused } from '../isFocus/useIsFocused'
import useAlert from '../useAlert'
const PNG = require('pngjs/browser').PNG

const useImagePicker = () => {
  const { t } = useLocalization()
  const { push } = useContextualRouter()
  const { openModal } = useModal()
  const { showAlert } = useAlert()
  const dispatch = useDispatch()
  const isScanning = useSelector(
    (state: RootState) => state.setting.transferScan
  )
  const [loading, setLoading] = useState(false)
  const [fetchUsername, { isError, error }] = useLazyAffiliateUsernameQuery()

  const isFocus = useIsFocused()

  useEffect(() => {
    handleScan(true)
    return () => {
      handleScan(false)
      setLoading(false)
    }
  }, [isFocus])

  const handleScan = (value: boolean) => {
    dispatch(SettingActions.toogleScan(value))
  }

  const pickImageFromGallery = async () => {
    setLoading(true)

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    })
    console.log(
      '🚀 ~ file: useImagePicker.ts ~ line 54 ~ pickImageFromGallery ~ result',
      result
    )

    if (!result.cancelled) {
      try {
        const imageBuffer = Buffer.from(result.base64, 'base64')
        const imageExtension =
          Platform.OS === 'web'
            ? result.uri.substring(
                result.uri.indexOf('/') + 1,
                result.uri.indexOf(';base64')
              )
            : result.uri.substring(result.uri.lastIndexOf('.') + 1)

        let imageParse
        switch (imageExtension.toLowerCase()) {
          case 'png':
            imageParse = PNG.sync.read(imageBuffer)
            break
          case 'jpg':
          case 'jpeg':
            imageParse = jpeg.decode(imageBuffer, { useTArray: true })
            break
          default:
            showAlert(t('status.imageNotSupported'))
            return
        }
        const imageData = imageParse.data
        const data = Uint8ClampedArray.from(imageData)
        const code = jsQR(data, result.width, result.height)
        console.log(
          '🚀 ~ file: useImagePicker.ts ~ line 88 ~ pickImageFromGallery ~ code',
          code
        )

        code
          ? handleGoToTransfer(code?.data)
          : showAlert(t('status.scanFailed'))
      } catch (error) {
        showAlert(t('status.imageNotSupported'))
      } finally {
        setLoading(false)
      }
    }

    setLoading(false)
  }

  const handleGoToTransfer = async (value: string) => {
    handleScan(false)

    const cleanText = value.replace(/\W/g, '') ?? ''

    const data = await fetchUsername(cleanText)
      .unwrap()
      .catch((error) => {
        openModal('AlertModal', {
          message: error.message,
          onClose: () => handleScan(true),
        })
      })

    if (data?.success) {
      handleScan(false)
      const params = {
        referralCode: cleanText,
      }

      push('/transfer', params)
    }
  }

  return {
    loading,
    isScanning,
    handleScan,
    pickImageFromGallery,
    handleGoToTransfer,
  }
}

export default useImagePicker
