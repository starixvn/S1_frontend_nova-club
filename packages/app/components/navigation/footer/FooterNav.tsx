import LinkPressable from 'app/components/pressable/LinkPressable'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import { Row, Text } from 'dripsy'
import React from 'react'

const FooterNav = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()

  return (
    <Row
      sx={{
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: desktop ? 60 : 36,
        bg: '$primary.500',
      }}
    >
      <NavLink href="/">{t('footer.aboutUs')}</NavLink>
      <NavLink href="/">{t('common.shareholder')}</NavLink>
      <NavLink href="/">{t('common.agent')}</NavLink>
      <NavLink href="/">{t('footer.responsibleGaming')}</NavLink>
      <NavLink href="/">{t('footer.contactUs')}</NavLink>
      <NavLink href="/">{t('common.tnc')}</NavLink>
    </Row>
  )
}

const NavLink = ({ href, children }) => {
  return (
    <LinkPressable href={href}>
      <Text sx={{ fontSize: 12 }}>{children}</Text>
    </LinkPressable>
  )
}

export default FooterNav
