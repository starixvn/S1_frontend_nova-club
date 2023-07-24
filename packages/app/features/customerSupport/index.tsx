import { DripsyGradient } from 'app/components/Gradient'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import usePathname from 'app/hooks/usePathname'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  View,
  useDripsyTheme,
} from 'dripsy'
import React from 'react'
import { Linking, Platform } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import useSupportItemList from './useSupportItemList'

const CustomerSupportScreen = () => {
  const { t } = useLocalization()
  const mediaList = useSupportItemList()
  const desktop = isDesktop()
  const pathName = usePathname()
  const currentPath = pathName.replace('customer-support', '')
  const contactUsTitle =
    currentPath === '/account/' ? 'contact.customerSupport' : 'footer.contactUs'

  return (
    <PageWithBackHeader
      header={{ title: t(contactUsTitle) }}
      hideHeader={desktop}
    >
      <Text sx={{ pt: 30, px: '$3', fontWeight: 'bold', fontSize: 24 }}>
        {t('contact.contactVia')}
      </Text>

      <View
        sx={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {mediaList.map((item) => (
          <SupportButton
            key={item.label}
            qr={item.qr}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </View>
    </PageWithBackHeader>
  )
}

const SupportButton = ({
  icon,
  label,
  href,
  qr,
}: {
  icon: string
  label: string
  href: string
  qr: string
}) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()

  return (
    <Pressable
      onPress={() => {
        if (Platform.OS !== 'web') Linking.openURL(href)
      }}
      sx={{ minWidth: 400, alignItems: 'center', my: '$4' }}
    >
      <Shadow
        offset={[0, -1]}
        startColor={theme.colors.$primary[100]}
        distance={1}
        safeRender
        style={{ borderRadius: 50 }}
      >
        <DripsyGradient
          gradient="surface"
          href={href}
          hrefAttrs={{
            rel: 'noreferrer',
            target: '_blank',
          }}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            px: '$5',
            py: '$4',
            minWidth: 180,
            // my: 8,
          }}
        >
          {qr ? (
            <>
              <Text sx={{ fontWeight: 'bold', pb: '$3', fontSize: 20 }}>
                {t('contact.' + label)}
              </Text>

              <Image
                source={{ uri: qr }}
                alt="zalo-social-media"
                style={{
                  width: 200,
                  height: 200,
                  zIndex: 99,
                }}
              />
            </>
          ) : (
            <ActivityIndicator />
          )}
        </DripsyGradient>
      </Shadow>
    </Pressable>
  )
}

export default CustomerSupportScreen
