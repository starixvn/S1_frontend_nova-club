import GradientBox from 'app/components/GradientBox'
import GradientTextBox from 'app/components/GradientTextBox'
import { styled, Text, View } from 'dripsy'
import React, { useEffect, useRef } from 'react'

const ProfileDetails = () => {
  const ref = useRef(null)
  const items = [
    { key: 'name', title: 'Real Name' },
    { key: 'username', title: 'Username' },
    { key: 'phone', title: 'Phone Number' },
    { key: 'referrer', title: 'Referrer' },
    { key: 'currency', title: 'Currency' },
  ]

  return (
    <StyledViewPage>
      {items.map((item) => (
        <GradientTextBox key={item.key} title={item.title} value={item.key} />
      ))}
    </StyledViewPage>
  )
}

const StyledViewPage = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  pt: '$6',
}))
export default ProfileDetails
