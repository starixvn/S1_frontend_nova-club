import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { View } from 'dripsy'
import Header from 'app/components/common/Header'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useRouter } from 'solito/router'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import withContextualNav from 'app/navigation/web/withContextualNav'
import useLocalization from 'app/provider/localization'
import * as ImagePicker from 'expo-image-picker'
import jsQR from 'jsqr'
import { Buffer } from 'buffer'
import jpeg from 'jpeg-js'
import { useDispatch } from 'react-redux'
import { AlertActions } from 'app/store/alert'
import { Button } from 'app/components/form/Button'
import { QrReader } from 'react-qr-reader'
import BarcodeMask from 'react-native-barcode-mask'
import { FINDER_HEIGHT, FINDER_WIDTH } from '.'
import LoadingScreen from 'app/components/LoadingScreen'
const PNG = require('pngjs/browser').PNG

function QrcodeScannerScreen() {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const [scanned, setScanned] = useState(false)
  const { push, replace } = useRouter()
  const [loading, setLoading] = useState(false)

  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.QrScanner
  )
  const { width, height } = useContainerDimension()

  const handleBarCodeScannedWeb = (result, error) => {
    if (scanned) return

    if (!!result) {
      setScanned(true)
      handleGoToTransfer(result.text)
    } else if (!!error) {
      console.log(
        '🚀 ~ file: index.tsx ~ line 68 ~ handleBarCodeScannedWeb ~ error',
        error
      )
    }
  }

  const handleGoToTransfer = (value) => {
    const params = {
      referralCode: value,
    }

    replace(makeContextualHref('transfer', params), {
      pathname: '/transfer',
      query: params,
    })
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
            dispatch(AlertActions.addError('status.imageNotSupported'))
            return
        }
        const imageData = imageParse.data
        const data = Uint8ClampedArray.from(imageData)
        const code = jsQR(data, result.width, result.height)
        code
          ? handleGoToTransfer(code?.data)
          : dispatch(AlertActions.addError('status.qrCodeNotDetected'))
      } catch (error) {
        dispatch(AlertActions.addError('status.imageNotSupported'))
      }
    }
    setLoading(false)
  }

  return (
    <View sx={{ flex: 1, bg: '$secondary' }}>
      <Header title={'QRScan'} />
      {!scanned && (
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={handleBarCodeScannedWeb}
          className="absolute-fill-center"
          videoContainerStyle={{ height }}
          videoStyle={{ zIndex: -1 }}
          ViewFinder={() => (
            <BarcodeMask
              width={FINDER_WIDTH}
              height={FINDER_HEIGHT}
              edgeColor="#62B1F6"
              showAnimatedLine={false}
            />
          )}
        />
      )}
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

export default withContextualNav(
  QrcodeScannerScreen,
  ContextualModuleKey.QrScanner
)
