import { Button } from 'app/components/form/Button'
import LoadingScreen from 'app/components/LoadingScreen'
import useImagePicker from 'app/hooks/transfer/useImagePicker'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, Text, View } from 'dripsy'
import { BarCodeScanner } from 'expo-barcode-scanner'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import BarcodeMask from 'react-native-barcode-mask'

export const FINDER_WIDTH: number = 300
export const FINDER_HEIGHT: number = 300

function QrcodeScannerTab({ isActive }) {
  const { t } = useLocalization()
  const [hasPermission, setHasPermission] = useState(null)
  const { width, height } = useContainerDimension()
  const viewMinX = (width - FINDER_WIDTH) / 2
  const viewMinY = (height - FINDER_HEIGHT) / 2

  const {
    loading,
    isScanning,
    handleScan,
    handleGoToTransfer,
    pickImageFromGallery,
  } = useImagePicker()

  useEffect(() => {
    handleScan(isActive)

    return () => {
      handleScan(false)
    }
  }, [isActive])

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = ({ type, data, bounds: { origin } }) => {
    const { x, y } = origin

    if (
      x >= viewMinX &&
      y >= viewMinY &&
      x <= viewMinX + FINDER_WIDTH / 2 &&
      y <= viewMinY + FINDER_HEIGHT / 2
    ) {
      handleGoToTransfer(data)
    }
  }

  const BarcodeComponent = useMemo(
    () => (
      <BarCodeScanner
        onBarCodeScanned={isScanning ? handleBarCodeScanned : undefined}
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
    ),
    [isScanning]
  )

  if (hasPermission === null) {
    return <Text></Text>
  }

  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>
  // }

  return (
    <View sx={{ flex: 1, bg: '$secondary' }}>
      {BarcodeComponent}
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
