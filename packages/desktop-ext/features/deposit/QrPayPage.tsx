import QRPayScreen from 'app/features/deposit/qr-pay'
import DesktopPageContainer from 'desktop-ext/components/layout/DesktopPage'
import React from 'react'

export default function QRPayPage() {
  return (
    <DesktopPageContainer>
      <QRPayScreen />
    </DesktopPageContainer>
  )
}
