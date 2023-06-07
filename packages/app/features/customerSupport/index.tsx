import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import ShadowButton from 'app/components/ShadowButton'
import Image from 'app/components/common/Image'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { Text, View, useDripsyTheme } from 'dripsy'
import React from 'react'
import { Linking, Platform } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import useSupportItemList from './useSupportItemList'

const CustomerSupportScreen = () => {
  const { t } = useLocalization()
  const mediaList = useSupportItemList()

  return (
    <PageWithBackHeader header={{ title: t('menu.customerSupport') }}>
      <View sx={{ flex: 1, alignItems: 'center' }}>
        <Image
          source={require('app/assets/images/common/logo-circle.png')}
          alt="logo"
          style={{ height: 150, aspectRatio: 1 / 1, marginVertical: 24 }}
        />
        <Text sx={{ py: 12 }}>Contact via:</Text>

        {mediaList.map((item) => (
          <SupportButton
            key={item.label}
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
}: {
  icon: string
  label: string
  href: string
}) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()

  return (
    <TouchableOpacity
      onPress={() => {
        if (Platform.OS !== 'web') Linking.openURL(href)
      }}
      style={{ marginVertical: 8 }}
    >
      <Shadow
        offset={[0, -1]}
        startColor={theme.colors.$primary[100]}
        distance={1}
        style={{ borderRadius: 100 }}
      >
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
      </Shadow>
    </TouchableOpacity>
  )
}

export default CustomerSupportScreen
