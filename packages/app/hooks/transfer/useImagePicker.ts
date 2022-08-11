import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native'
import jsQR from 'jsqr'
import { Buffer } from 'buffer'
import jpeg from 'jpeg-js'
import { useDispatch } from 'react-redux'
import { AlertActions } from 'app/store/alert.slice'
import useLocalization from 'app/provider/localization'
import { useLazyAffiliateUsernameQuery } from 'services/contentApi'
import useContextualRouting from '../useContextualRouting'
import { useRouter } from 'solito/router'
const PNG = require('pngjs/browser').PNG

const useImagePicker = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [isScanning, setIsScanning] = useState(true)
  const { makeContextualHref } = useContextualRouting()
  const [fetchUsername, { isError, error }] = useLazyAffiliateUsernameQuery()

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
    setLoading(false)
  }

  const handleGoToTransfer = async (value: string) => {
    const data = await fetchUsername(value)
      .unwrap()
      .catch((error) => {
        setIsScanning(true)
        dispatch(AlertActions.addError(error.message))
      })

    if (data?.success) {
      setIsScanning(false)
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
    setIsScanning,
    pickImageFromGallery,
    handleGoToTransfer,
  }
}

export default useImagePicker
