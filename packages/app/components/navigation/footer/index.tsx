import { View } from 'dripsy'
import React from 'react'
import Copyright from './Copyright'
import FooterAction from './FooterAction'
import FooterNav from './FooterNav'
import Powered from './Powered'

const Footer = () => {
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
