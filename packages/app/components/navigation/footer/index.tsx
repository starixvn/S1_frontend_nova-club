import { Row, Text, View } from 'dripsy'
import React from 'react'
import FooterNav from './FooterNav'
import LanguageSwitch from 'app/components/LanguageSwitch'
import FooterAction from './FooterAction'
import Channel from './Channel'
import Powered from './Powered'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import Copyright from './Copyright'

const Footer = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()

  return (
    <View>
      <FooterNav />
      <Powered />
      <FooterAction />
      <Copyright />
    </View>
  )
}

export default Footer
