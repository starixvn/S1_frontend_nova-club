import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Image, styled, Text, View } from 'dripsy'
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
import BarcodeMask from 'react-native-barcode-mask'
import { Button } from 'app/components/form/Button'
const PNG = require('pngjs/browser').PNG

const MASK_WIDTH: number = 300
const MASK_HEIGHT: number = 300

function QrcodeScannerScreen() {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const { push, back } = useRouter()
  const [qrImage, setQrImage] = useState(null)

  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.QrScanner
  )
  const { width, height } = useContainerDimension()
  const viewMinX = (width - MASK_WIDTH) / 2
  const viewMinY = (height - MASK_HEIGHT) / 2

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
      x <= viewMinX + MASK_WIDTH / 2 &&
      y <= viewMinY + MASK_HEIGHT / 2
    ) {
      setScanned(true)
      // alert(`QRCode: ${data} has been scanned!`)
      handleGoToTransfer(data)
    }
  }

  const handleGoToTransfer = (value) => {
    setScanned(false)

    const params = {
      referralCode: value,
    }

    push(makeContextualHref('transfer', params), {
      pathname: '/transfer',
      query: params,
    })
  }
  console.log('scanned', scanned)
  if (hasPermission === null) {
    return <Text>{t('qr.requestCameraPermissions')}</Text>
  }
  if (hasPermission === false) {
    return <Text>{t('qr.noCameraAccess')}</Text>
  }

  const pickImageFromGallery = async () => {
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
  }

  return (
    <View sx={{ flex: 1, bg: '$secondary' }}>
      <Header title={'QRScan'} />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={[
          StyleSheet.absoluteFillObject,
          {
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: -1,
          },
        ]}
      >
        <BarcodeMask
          width={MASK_WIDTH}
          height={MASK_HEIGHT}
          edgeColor="#62B1F6"
          showAnimatedLine
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
    </View>
  )
}

const StyledTextDescription = styled(Text)({
  fontSize: 24,
  marginTop: '10%',
  textAlign: 'center',
  width: '70%',
  color: 'white',
})

const StyledTextCancel = styled(Text)({
  fontSize: 20,
  textAlign: 'center',
  width: '70%',
  color: 'white',
})

const StyledImageQr = styled(Image)(({ qrSize }: { qrSize: number }) => ({
  marginTop: '20%',
  marginBottom: '20%',
  width: qrSize,
  height: qrSize,
}))

export default withContextualNav(
  QrcodeScannerScreen,
  ContextualModuleKey.QrScanner
)
