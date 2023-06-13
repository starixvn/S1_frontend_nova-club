import React from 'react'
import BaseLayout from './BaseLayout'
import { Row, View, styled, Container } from 'dripsy'
import { Text } from 'react-native'
import WalletMenu from 'desktop-ext/components/layout/WalletMenu'

export default function WalletLayout({ children }) {
  return (
    <BaseLayout>
      <Container sx={{}}>
        <WalletMenu />
        <RightContainer>{children}</RightContainer>
      </Container>
    </BaseLayout>
  )
}

const RightContainer = styled(View)({
  borderWidth: 1,
  flex: 1,
  borderColor: '$primary.300',
})
