import LoadingScreen from 'app/components/LoadingScreen'
import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useImagePicker from 'app/hooks/useImagePicker'
import useLocalization from 'app/provider/localization'
import { Text, View, useDripsyTheme } from 'dripsy'
import { BarCodeScanner } from 'expo-barcode-scanner'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import BarcodeMask from 'react-native-barcode-mask'

export const FINDER_WIDTH: number = 300
export const FINDER_HEIGHT: number = 300

function QrTransfer({ isActive }) {
  const { t } = useLocalization()
  const [hasPermission, setHasPermission] = useState(false)
  const { width, height } = useContainerDimension()
  const viewMinX = (width - FINDER_WIDTH) / 2
  const viewMinY = (height - FINDER_HEIGHT) / 2
  const { theme } = useDripsyTheme()

  const {
    loading,
    isScanning,
    handleScan,
    handleGoToTransfer,
    pickImageFromGallery,
  } = useImagePicker()

  useEffect(() => {
    handleScan(hasPermission)

    return () => {
      handleScan(false)
    }
  }, [hasPermission])

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
          edgeColor={theme.colors.$primary[100]}
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
      {hasPermission === true ? (
        BarcodeComponent
      ) : (
        <View sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text sx={{ textAlign: 'center' }}>{t('qr.noCameraAccess')}</Text>
        </View>
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
        <Button onPress={pickImageFromGallery}>{t('qr.scanGallery')}</Button>
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

export default QrTransfer
