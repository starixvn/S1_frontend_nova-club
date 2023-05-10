import Screen from 'app/components/layouts/Screen'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import React from 'react'
import WalletButton from './profile/WalletButton'
import ProfileBalanceSummary from './profile/ProfileBalanceSummary'
import ProfileOverviewCard from './profile/ProfileOverviewCard'
import ProfileQuickNavigation from './profile/ProfileQuickNavigation'

export default function ProfileScreen() {
  const { top } = useSafeArea()
  return (
    <Screen
      contentContainerSx={{
        pt: top,
        alignItems: 'center',
      }}
    >
      <ProfileBalanceSummary />
      <WalletButton />
      <ProfileOverviewCard />
      <ProfileQuickNavigation />
    </Screen>
  )
}
