import LinkPressable from 'app/components/pressable/LinkPressable'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import { Row, Text, View } from 'dripsy'
import React from 'react'

const FooterLinks = [
  {
    label: 'footer.aboutUs',
    href: '/',
  },
  {
    label: 'common.shareholder',
    href: '/',
  },
  {
    label: 'common.agent',
    href: '/',
  },
  {
    label: 'footer.responsibleGaming',
    href: '/',
  },
  {
    label: 'footer.contactUs',
    href: '/',
  },
  {
    label: 'common.tnc',
    href: '/',
  },
]

const FooterNav = () => {
  const { t } = useLocalization()

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
          py: '$2',
          gap: ['$3', '$3', '$3', '$4'],
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {FooterLinks.map((l) => {
          return (
            <LinkPressable key={l.label} href={l.href}>
              <Text sx={{ fontSize: 12, mt: FONT_TOP_OFFSET }}>
                {t(l.label)}
              </Text>
            </LinkPressable>
          )
        })}
      </Row>
    </View>
  )
}

export default FooterNav
