import Channel from 'app/components/navigation/footer/Channel'
import Copyright from 'app/components/navigation/footer/Copyright'
import FooterAction from 'app/components/navigation/footer/FooterAction'
import FooterNav from 'app/components/navigation/footer/FooterNav'
import Powered from 'app/components/navigation/footer/Powered'
import Providers from 'app/components/navigation/footer/Providers'
import useLocalization from 'app/provider/localization'
import { Row, Text, View } from 'dripsy'
import React from 'react'

const Footer = () => {
  const { t } = useLocalization()

  return (
    <View>
      <Row sx={{ py: '$3', px: '6%', justifyContent: 'space-between' }}>
        <Text>{t('footer.note1')}</Text>
        <Text>{t('footer.note2')}</Text>
      </Row>
      <FooterNav />
      <Channel />
      <FooterAction />
      <Providers />
      <Powered />
      <Copyright />
    </View>
  )
}

export default Footer

