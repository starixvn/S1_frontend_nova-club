import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native'
import jsQR from 'jsqr'
import { Buffer } from 'buffer'
import jpeg from 'jpeg-js'
import { useDispatch, useSelector } from 'react-redux'
import { AlertActions } from 'app/store/alert.slice'
import useLocalization from 'app/provider/localization'
import { useLazyAffiliateUsernameQuery } from 'services/contentApi'
import useContextualRouting from '../useContextualRouting'
import { useRouter } from 'solito/router'
import { useIsFocused } from '../isFocus/useIsFocused'
import { RootState } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
const PNG = require('pngjs/browser').PNG

const useImagePicker = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const dispatch = useDispatch()
  const isScanning = useSelector(
    (state: RootState) => state.setting.transferScan
  )
  const [loading, setLoading] = useState(false)
  const { makeContextualHref, returnHref } = useContextualRouting()
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
            dispatch(AlertActions.addError(t('status.imageNotSupported')))
            return
        }
        const imageData = imageParse.data
        const data = Uint8ClampedArray.from(imageData)
        const code = jsQR(data, result.width, result.height)

        code
          ? handleGoToTransfer(code?.data)
          : dispatch(AlertActions.addError(t('status.scanFailed')))
      } catch (error) {
        dispatch(AlertActions.addError(t('status.imageNotSupported')))
      } finally {
        setLoading(false)
      }
    }
    console.log('loading flase')
    setLoading(false)
  }

  const handleGoToTransfer = async (value: string) => {
    const data = await fetchUsername(value)
      .unwrap()
      .catch((error) => {
        handleScan(true)
        dispatch(AlertActions.addError(error.message))
      })

    if (data?.success) {
      handleScan(false)
      const params = {
        referralCode: value,
      }

      push(makeContextualHref('transfer', params), {
        pathname: '/transfer',
        query: params,
      })
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
