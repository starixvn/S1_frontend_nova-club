import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import ShadowButton from 'app/components/ShadowButton'
import Image from 'app/components/common/Image'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useIsDesktop from 'app/hooks/useIsDesktop'
import usePathname from 'app/hooks/usePathname'
import useLocalization from 'app/provider/localization'
import { Pressable, Text, View, useDripsyTheme } from 'dripsy'
import React from 'react'
import { Linking, Platform } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import useSupportItemList from './useSupportItemList'

const CustomerSupportScreen = () => {
  const { t } = useLocalization()
  const mediaList = useSupportItemList()
  const isDesktop = useIsDesktop()
  const pathName = usePathname()
  const currentPath = pathName.replace('customer-support', '')
  const contactUsTitle =
    currentPath === '/account/' ? 'contact.customerSupport' : 'footer.contactUs'

  return (
    <PageWithBackHeader
      header={{ title: t(contactUsTitle) }}
      hideHeader={isDesktop}
    >
      <View sx={!isDesktop && { flex: 1, alignItems: 'center' }}>
        {!isDesktop && (
          <Image
            source={require('app/assets/images/common/logo-circle.png')}
            alt="logo"
            style={{ height: 150, aspectRatio: 1 / 1, marginVertical: 24 }}
          />
        )}

        <Text
          sx={
            isDesktop
              ? { pt: 30, px: '$3', fontWeight: 'bold', fontSize: 24 }
              : { py: 12 }
          }
        >
          {t('contact.contactVia')}
        </Text>

        <View
          sx={
            isDesktop
              ? {
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              : {
                  minHeight: 200,
                }
          }
        >
          {mediaList.map((item) => (
            <SupportButton
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              qr={item.qr}
              isDesktop={isDesktop}
            />
          ))}
        </View>
      </View>
    </PageWithBackHeader>
  )
}

const SupportButton = ({
  icon,
  label,
  href,
  isDesktop,
  qr,
}: {
  icon: string
  label: string
  href: string
  isDesktop: boolean
  qr: string
}) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()

  if (isDesktop && !qr) return null

  return (
    <Pressable
      onPress={() => {
        if (Platform.OS !== 'web') Linking.openURL(href)
      }}
      sx={
        isDesktop
          ? {
              minWidth: 400,
              alignItems: 'center',
              my: '$4',
            }
          : { my: '$2' }
      }
    >
      <Shadow
        offset={[0, -1]}
        startColor={theme.colors.$primary[100]}
        distance={1}
        safeRender
        style={{ borderRadius: 50 }}
      >
        {isDesktop ? (
          <CSDesktop qr={qr} label={label} href={href} />
        ) : (
          <CSMobile label={label} href={href} icon={icon} />
        )}
      </Shadow>
    </Pressable>
  )
}

const CSMobile = ({
  href,
  label,
  icon,
}: {
  icon: string
  label: string
  href: string
}) => {
  const { t } = useLocalization()
  return (
    <DripsyGradient
      gradient="surface"
      href={href}
      hrefAttrs={{
        rel: 'noreferrer',
        target: '_blank',
      }}
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
        p: 4,
        minWidth: 180,
        // my: 8,
      }}
    >
      <ShadowButton containerStyle={{ aspectRatio: 1 / 1, mr: 12 }}>
        <Icon name={icon} />
      </ShadowButton>
      <Text sx={{ fontWeight: 'bold' }}>{t('contact.' + label)}</Text>
    </DripsyGradient>
  )
}

const CSDesktop = ({
  href,
  qr,
  label,
}: {
  label: string
  href: string
  qr: string
}) => {
  const { t } = useLocalization()
  return (
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
      }}
    >
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
    </DripsyGradient>
  )
}

export default CustomerSupportScreen
