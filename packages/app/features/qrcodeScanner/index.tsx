import React, { useState, useEffect } from 'react'
import { StyleSheet, Button } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Image, styled, Text, View } from 'dripsy'
import { PageWithBackHeader } from 'app/components/layout/Page'
import Header from 'app/components/common/Header'
import MainHeader from 'app/navigation/MainHeader'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useRouter } from 'solito/router'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import withContextualNav from 'app/navigation/web/withContextualNav'
import useLocalization from 'app/provider/localization'

function QrcodeScannerScreen() {
  const { t } = useLocalization()
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const { push, back } = useRouter()

  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.QrScanner
  )
  const { width, height } = useContainerDimension()
  const qrSize = width * 0.7

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    // alert(`QRCode: ${data} has been scanned!`)
    handleGoToTransfer(data)
  }

  const handleGoToTransfer = (value) => {
    const params = {
      username: value,
    }

    push(makeContextualHref('transfer', params), {
      pathname: '/transfer',
      query: params,
    })
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View sx={{ flex: 1 }}>
      <Header title={'QRScan'} />
      {/* <View
        sx={{
          flex:1,
          backgroundColor: '#000000',
        }}
      > */}
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
        <StyledTextDescription>Scan your QR code</StyledTextDescription>
        <StyledImageQr
          qrSize={qrSize}
          source={require('../../assets/qrScanner.png')}
        />
        <StyledTextCancel onPress={() => back()}>
          {t('common.cancel')}
        </StyledTextCancel>
      </BarCodeScanner>

      {scanned && (
        <View
          sx={{
            position: 'absolute',
            bottom: 12,
            alignItems: 'center',
            left: 0,
            right: 0,
          }}
        >
          <Button
            title={'Tap to Scan Again'}
            onPress={() => handleGoToTransfer('techtests01')}
          />
        </View>
      )}
      {/* </View> */}
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
