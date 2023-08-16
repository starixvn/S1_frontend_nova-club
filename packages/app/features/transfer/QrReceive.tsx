import QRCodeGenerator from 'app/components/QRCodeGenerator'
import ViewScreenShot from 'app/components/ViewScreenShot'
import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import useLocalization from 'app/provider/localization'
import { ScrollView, Text, View } from 'dripsy'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import useQrReceive from './useQrReceive'

const QrReceive = () => {
  const { t } = useLocalization()
  const { data } = usePlayerProfileQuery()
  const username = data?.username

  const { buttonLabel, buttonOnPress, ref } = useQrReceive()

  return (
    <FormContainer>
      <ScrollView>
        <View sx={{ p: '2%', borderRadius: 15, alignItems: 'center' }}>
          <ViewScreenShot ref={ref} fileName={`Vui123-${username}`}>
            <QRCodeGenerator />
          </ViewScreenShot>
        </View>
        <View sx={{ alignItems: 'center', py: '$3' }}>
          <Text sx={{ fontWeight: 'bold', fontSize: 18 }}>{username}</Text>
        </View>
        <View sx={{ alignItems: 'center', py: '$3' }}>
          <Text sx={{ fontSize: 16 }}>{t('notes.qr.n1')}</Text>
        </View>
        <Button onPress={buttonOnPress}>{buttonLabel}</Button>
      </ScrollView>
    </FormContainer>
  )
}

export default QrReceive
