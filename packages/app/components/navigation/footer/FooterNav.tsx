import LinkPressable from 'app/components/pressable/LinkPressable'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import useLocalization from 'app/provider/localization'
import { Row, Text, View } from 'dripsy'
import React from 'react'

export const FooterLinks = [
  {
    key: 'About Us',
    title: 'footer.aboutUs',
    icon: '',
    route: '/info/about-us',
    base: '/account/bank',
  },
  {
    key: 'ShareHolder',
    title: 'common.shareholder',
    icon: '',
    route: '/info/shareholder',
    base: '/account/bank',
  },
  {
    key: 'Agent',
    title: 'common.agent',
    icon: '',
    route: '/info/agent',
    base: '/account/bank',
  },
  {
    key: 'ResponsibleGaming',
    title: 'footer.responsibleGaming',
    icon: '',
    route: '/info/responsible-gaming',
    base: '/account/bank',
  },
  {
    key: 'ContactUs',
    title: 'footer.contactUs',
    icon: '',
    route: '/info/contact-us',
    base: '/account/bank',
  },
  {
    key: 'TNC',
    title: 'common.tnc',
    icon: '',
    route: '/info/tnc',
    base: '/account/bank',
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
            <LinkPressable key={l.title} href={l.route}>
              <Text sx={{ fontSize: 12, mt: FONT_TOP_OFFSET }}>
                {t(l.title)}
              </Text>
            </LinkPressable>
          )
        })}
      </Row>
    </View>
  )
}

export default FooterNav
