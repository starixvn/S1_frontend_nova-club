import Divider from 'app/components/Divider'
import { DripsyGradient } from 'app/components/Gradient'
import LanguageSwitch from 'app/components/LanguageSwitch'
import AuthBanner from 'app/features/auth/components/AuthBanner'
import { Text } from 'dripsy'
import { Container, View } from 'dripsy'
import React, { ReactNode, memo } from 'react'
import { SolitoImage } from 'solito/image'

type Props = {
  children: ReactNode
  headerDesc: string
}

export default function AuthLayout({ children, headerDesc }: Props) {
  return (
    <Container sx={{ py: 40 }}>
      <DripsyGradient gradient="surface">
        <View sx={{ flexDirection: 'row' }}>
          <LeftColumn title={headerDesc} />
          <View sx={{ width: '50%' }}>
            <Divider />
            {children}
          </View>
        </View>
      </DripsyGradient>
    </Container>
  )
}

const LeftColumn = memo(({ title }: { title: string }) => {
  return (
    <View
      sx={{
        width: '50%',
        bg: '$primary.500',
        alignItems: 'center',
        py: 30,
      }}
    >
      <Text sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>
        {title}
      </Text>
      <SolitoImage
        src={require('app/assets/images/common/logo.png')}
        alt="logo"
        width={128}
        height={80}
        resizeMode="contain"
      />
      <AuthBanner />
      <View sx={{ alignItems: 'center', mt: 'auto' }}>
        <LanguageSwitch />
      </View>
    </View>
  )
})

LeftColumn.displayName = 'RegisterLeftColumn'
