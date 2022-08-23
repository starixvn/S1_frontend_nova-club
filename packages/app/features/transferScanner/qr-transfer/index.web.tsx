import { Button } from 'app/components/form/Button'
import LoadingScreen from 'app/components/LoadingScreen'
import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import useImagePicker from 'app/hooks/transfer/useImagePicker'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { useEffect, useMemo } from 'react'
import BarcodeMask from 'react-native-barcode-mask'
import { QrReader } from 'react-qr-reader'

function QrcodeScannerTab({ isActive }) {
  const { t } = useLocalization()
  const isFocus = useIsFocused()
  const { width, height } = useContainerDimension()

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
  }, [isActive, isFocus])

  const handleBarCodeScannedWeb = (result, error) => {
    if (!!result) {
      handleScan(false)
      handleGoToTransfer(result.text)
    } else if (!!error) {
      // console.log(
      //   '🚀 ~ file: index.tsx ~ line 68 ~ handleBarCodeScannedWeb ~ error',
      //   error
      // )
    }
  }

  const QrScannerComponent = useMemo(
    () => (
      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={isScanning ? handleBarCodeScannedWeb : undefined}
        className="absolute-fill-center"
        scanDelay={500}
        videoContainerStyle={{ height }}
        videoStyle={{ zIndex: -1 }}
        ViewFinder={() => (
          <BarcodeMask
            width={width / 2}
            height={width / 2}
            edgeColor="#62B1F6"
            showAnimatedLine={false}
          />
        )}
      />
    ),
    [isScanning]
  )

  return (
    <View sx={{ flex: 1, bg: '$secondary' }}>
      {isScanning && QrScannerComponent}
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

export default QrcodeScannerTab
