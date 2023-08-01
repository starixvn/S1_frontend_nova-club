import { Row } from 'dripsy'
import React from 'react'
import LeftPanelContainer from './LeftPanelContainer'
import PageContainer from './PageContainer'

export default function WalletLayoutContainer({ children, leftContent }) {
  return (
    <Row>
      <LeftPanelContainer>{leftContent}</LeftPanelContainer>
      <PageContainer>{children}</PageContainer>
    </Row>
  )
}
