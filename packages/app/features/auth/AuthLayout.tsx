import IconButton from 'app/components/IconButton'
import LanguageSwitch from 'app/components/LanguageSwitch'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View, Image, Text, ScrollView } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useRouter } from 'solito/router'

interface AuthLayoutProps {
  showBackButton?: boolean
  headerDesc?: string
  headerColor?: string
  formHeader?: React.ReactNode
  children?: React.ReactNode
  onBack?: () => void
}

export default function AuthLayout({
  showBackButton = true,
  headerDesc,
  headerColor,
  formHeader,
  children,
  onBack,
}: AuthLayoutProps) {
  const { top, bottom } = useSafeArea()
  const { back } = useRouter()
  const { width } = useWindowDimensions()
  const BANNER_RATIO = 768 / 240
  return (
    <>
      <View
        sx={{
          bg: '$primary.500',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: top,
          px: 20,
          py: 20,
        }}
      >
        <IconButton onPress={back} name="back" />
        <View sx={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/common/logo.png')}
            alt="authentication-logo"
            sx={{ height: 40, aspectRatio: 64 / 24 }}
          />
          <Text sx={{ textTransform: 'uppercase', fontWeight: 'bold', pt: 5 }}>
            {headerDesc}
          </Text>
        </View>
        <IconButton sx={{ opacity: 0 }} name="back" />
      </View>
      <View sx={{ width: '100%' }}>
        <Image
          source={require('../../assets/images/auth/banner.png')}
          alt="auth-banner"
          resizeMode="cover"
          sx={{ width, height: width / BANNER_RATIO }}
        />
      </View>
      <ScrollView
        bounces={false}
        sx={{ bg: '$primary.700' }}
        contentContainerSx={{
          minHeight: '70%',
          justifyContent: 'space-between',
        }}
      >
        <View sx={{ alignItems: 'center' }}>{children}</View>
        <View sx={{ alignItems: 'center', mb: bottom + 8 }}>
          <LanguageSwitch />
        </View>
      </ScrollView>
    </>
  )
}
