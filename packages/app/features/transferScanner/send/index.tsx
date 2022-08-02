import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { styled, Text, View } from 'dripsy'
import Header from 'app/components/common/Header'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useRouter } from 'solito/router'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import * as ImagePicker from 'expo-image-picker'
import jsQR from 'jsqr'
import { Buffer } from 'buffer'
import jpeg from 'jpeg-js'
import { useDispatch } from 'react-redux'
import BarcodeMask from 'react-native-barcode-mask'
import { Button } from 'app/components/form/Button'
import LoadingScreen from 'app/components/LoadingScreen'
import { AlertActions } from 'app/store/alert.slice'
const PNG = require('pngjs/browser').PNG

export const FINDER_WIDTH: number = 300
export const FINDER_HEIGHT: number = 300

function QrcodeScannerTab({ isActive }) {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const [hasPermission, setHasPermission] = useState(null)
  const [scanning, setScanning] = useState(true)
  const [loading, setLoading] = useState(false)
  const { push, replace } = useRouter()

  const { makeContextualHref } = useContextualRouting()
  const { width, height } = useContainerDimension()
  const viewMinX = (width - FINDER_WIDTH) / 2
  const viewMinY = (height - FINDER_HEIGHT) / 2

  useEffect(() => {
    setScanning(isActive)

    return () => {
      setScanning(false)
    }
  }, [isActive])

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data, bounds: { origin } }) => {
    const { x, y } = origin

    if (
      x >= viewMinX &&
      y >= viewMinY &&
      x <= viewMinX + FINDER_WIDTH / 2 &&
      y <= viewMinY + FINDER_HEIGHT / 2
    ) {
      setScanning(false)
      handleGoToTransfer(data)
    }
  }

  const handleGoToTransfer = (value) => {
    setScanning(false)

    const params = {
      referralCode: value,
    }

    replace(makeContextualHref('transfer', params), {
      pathname: '/transfer',
      query: params,
    })
  }

  if (hasPermission === null) {
    return <Text>{t('qr.requestCameraPermissions')}</Text>
  }
  if (hasPermission === false) {
    return <Text>{t('qr.noCameraAccess')}</Text>
  }

  const pickImageFromGallery = async () => {
    setLoading(true)

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    })

    if (!result.cancelled) {
      console.log('result.uri', result.uri)

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
            dispatch(AlertActions.addError('status.imageNotSupported'))
            return
        }

        const imageData = imageParse.data

        const data = Uint8ClampedArray.from(imageData)
        const code = jsQR(data, result.width, result.height)

        code
          ? handleGoToTransfer(code?.data)
          : dispatch(AlertActions.addError('status.scanFailed'))
      } catch (error) {
        dispatch(AlertActions.addError('status.imageNotSupported'))
      }
    }
    setLoading(false)
  }

  return (
    <View sx={{ flex: 1, bg: '$secondary' }}>
      <BarCodeScanner
        onBarCodeScanned={scanning ? handleBarCodeScanned : undefined}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={[StyleSheet.absoluteFillObject, styles.camera]}
      >
        <BarcodeMask
          width={FINDER_WIDTH}
          height={FINDER_HEIGHT}
          edgeColor="#62B1F6"
          showAnimatedLine={false}
        />
      </BarCodeScanner>
      <View
        sx={{
          m: '$4',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Button
          rounded
          stretch
          variant="lg"
          fill={{
            type: 'gradient',
            color: 'secondary',
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          onPress={pickImageFromGallery}
        >
          <Button.Label>{t('qr.scanGallery')}</Button.Label>
        </Button>
      </View>
      {loading && <LoadingScreen />}
    </View>
  )
}

const styles = StyleSheet.create({
  camera: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
})

export default QrcodeScannerTab
