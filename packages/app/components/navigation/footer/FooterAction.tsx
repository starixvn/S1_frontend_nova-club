import LanguageSwitch from 'app/components/LanguageSwitch'
import SocialMedia from 'app/components/SocialMedia'
import { Row } from 'dripsy'
import React from 'react'

const FooterAction = () => {
  return (
    <Row
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 48,
        px: '6%',
        mt: 4,
        bg: '$primary.500',
      }}
    >
      <LanguageSwitch />
      <SocialMedia />
    </Row>
  )
}

export default FooterAction
