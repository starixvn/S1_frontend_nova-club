import React from 'react'
import BaseLayout from './BaseLayout'
import { Text, Container, Row, View, styled } from 'dripsy'
import LeftPanelContainer from 'desktop-ext/components/layout/LeftPanelContainer'
import AccountMenu from 'desktop-ext/components/layout/AccountMenu'
import { HEADER_HEIGHT } from 'desktop-ext/components/layout/MainHeader'

export default function AccountLayout({ children }) {
  return (
    <BaseLayout>
      <Container sx={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
        <AccountMenu />
        <Row>
          <LeftMenu />
          <RightContainer>{children}</RightContainer>
        </Row>
      </Container>
    </BaseLayout>
  )
}

const LeftMenu = () => {
  return (
    <LeftPanelContainer>
      <Text sx={{ py: '$5' }}>Left Menu</Text>
    </LeftPanelContainer>
  )
}

const RightContainer = styled(View)({
  borderWidth: 1,
  flex: 1,
  borderColor: '$primary.300',
})
