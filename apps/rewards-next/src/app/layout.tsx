'use client'
import NiceModal from '@ebay/nice-modal-react'
import { BackgroundColor } from '@games/shared/config'
import Setup from 'rewards/Setup'
import ReduxProvider from 'rewards/provider/redux'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <body style={{ background: BackgroundColor }}>
        <ReduxProvider>
          <NiceModal.Provider>
            <Setup />
          </NiceModal.Provider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
