import Screen from 'app/components/layouts/Screen'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Text } from 'dripsy'
import React from 'react'
import { Link } from 'solito/link'

export default function ProfileScreen() {
  const { top } = useSafeArea()
  return (
    <Screen sx={{ pt: top }}>
      <Text>Account</Text>
      <Link href="/account/profile">
        <Text>Profile</Text>
      </Link>
    </Screen>
  )
}
