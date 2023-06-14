import React from 'react'
import { View } from 'dripsy'
import { DripsyGradient } from 'app/components/Gradient'

export const WALLET_MENU_HEIGHT = 100
export default function WalletMenu({}) {
  return (
    <DripsyGradient
      gradient="surface"
      sx={{ height: WALLET_MENU_HEIGHT, my: 20 }}
    >
      
    </DripsyGradient>
  )
}
