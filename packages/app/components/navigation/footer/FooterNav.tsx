import LinkPressable from 'app/components/pressable/LinkPressable'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import { Row, Text, View } from 'dripsy'
import React from 'react'

const FooterNav = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()

  return (
    <View
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        bg: '$primary.500',
      }}
    >
      <Row
        sx={{
          flex: 1,
          flexWrap: 'wrap',
          width: desktop ? '70%' : '100%',
          justifyContent: 'space-evenly',
          p: '$3',
        }}
      >
        <NavLink href="/">{t('footer.aboutUs')}</NavLink>
        <NavLink href="/">{t('common.shareholder')}</NavLink>
        <NavLink href="/">{t('common.agent')}</NavLink>
        <NavLink href="/">{t('footer.responsibleGaming')}</NavLink>
        <NavLink href="/">{t('footer.contactUs')}</NavLink>
        <NavLink href="/">{t('common.tnc')}</NavLink>
      </Row>
    </View>
  )
}

const NavLink = ({ href, children }) => {
  return (
    <LinkPressable href={href}>
      <Text sx={{ p: '$2', fontSize: 12 }}>{children}</Text>
    </LinkPressable>
  )
}

export default FooterNav
