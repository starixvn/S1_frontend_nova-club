import LanguageSwitch from 'app/components/LanguageSwitch'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ScrollView, View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'
import AuthHeader from './components/AuthHeader'

interface AuthLayoutProps {
  showBackButton?: boolean
  headerDesc?: string
  headerColor?: string
  formHeader?: React.ReactNode
  children?: React.ReactNode
  onBack?: () => void
}

export enum LoginType {
  Member = 'member',
  Agent = 'agent',
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
  const { back, replace } = useRouter()
  const BANNER_RATIO = 768 / 240
  return (
    <View sx={{ alignItems: 'stretch', flex: 1 }}>
      <AuthHeader
        headerDesc={headerDesc}
        onPress={() => (onBack ? onBack() : replace('/'))}
      />
      <ScrollView
        bounces={false}
        sx={{ bg: '$primary.700', flex: 1 }}
        contentContainerSx={{
          justifyContent: 'space-between',
        }}
      >
        {/* <AuthBanner bannerRatio={BANNER_RATIO} /> */}
        <View sx={{ alignItems: 'center' }}>{children}</View>
        <View sx={{ alignItems: 'center', mb: bottom + 8 }}>
          <LanguageSwitch />
        </View>
      </ScrollView>
    </View>
  )
}
