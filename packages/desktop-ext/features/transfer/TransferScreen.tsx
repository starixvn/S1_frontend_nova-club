import WalletLayoutContainer from 'desktop-ext/components/layout/WalletLayoutContainer'
import React from 'react'
import TransferMenu from './TransferMenu'
import QrReceive from 'app/features/transfer/qr-receive'
import ImportantNotice from './ImportantNotice'

export default function TransferScreen() {
  return (
    <WalletLayoutContainer
      leftContent={
        <>
          <TransferMenu />
          <ImportantNotice />
        </>
      }
    >
      <QrReceive />
    </WalletLayoutContainer>
  )
}
