import LoadingScreen from 'app/components/LoadingScreen'
import Button from 'app/components/common/Button'
import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useImagePicker from 'app/hooks/useImagePicker'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { useEffect, useMemo, useState } from 'react'
import BarcodeMask from 'react-native-barcode-mask'
import { QrReader } from 'react-qr-reader'

function QrTransfer({ isActive }) {
  const { t } = useLocalization()
  const isFocus = useIsFocused()
  const { width, height } = useContainerDimension()

  const [loading, setLoading] = useState(false)

  const { isScanning, handleScan, handleGoToTransfer, pickImageFromGallery } =
    useImagePicker()

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

  const onScanFromGallery = async () => {
    setLoading(true)
    await pickImageFromGallery()
  }

  useEffect(() => {
    /**
     * `document.body.onfocus` is a hacky way to solve `pickImageFromGallery` bug
     * where on web, if user cancel from gallery, the promise will not resolved and
     * the `loading` state from `useImagePicker` hook will always true.
     *
     * Root cause: Inside `useImagePicker` hook, the `expo-image-picker` library missing
     * `FileReader.onAbort` event listener
     */
    document.body.onfocus = () => {
      setLoading(false)
    }

    return () => {
      document.body.onfocus = null
    }
  }, [])

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
        <Button onPress={onScanFromGallery}>{t('qr.scanGallery')}</Button>
      </View>

      {loading && <LoadingScreen />}
    </View>
  )
}

export default QrTransfer
