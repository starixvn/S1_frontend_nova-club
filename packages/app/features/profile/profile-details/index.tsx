import { GradientBoxText } from 'app/components/GradientBoxText'
import { styled, Text, View } from 'dripsy'
import React, { useEffect, useRef } from 'react'

const ProfileDetails = () => {
  const ref = useRef(null)
  const user = {
    name: 'Tech Test S1',
    username: 'TechTestS1',
    phone: '60111222001',
    referrer: 'TechTestS2',
    currency: 'MYR',
  }

  return (
    <StyledViewPage>
      <GradientBoxText>
        <GradientBoxText.Label label="Real Name" value={user.name} />
        <GradientBoxText.Label label="Username" value={user.username} />
        <GradientBoxText.Label label="Phone Number" value={user.phone} />
        <GradientBoxText.Label label="Referrer" value={user.referrer} />
        <GradientBoxText.Label label="Currency" value={user.currency} />
      </GradientBoxText>
    </StyledViewPage>
  )
}

const StyledViewPage = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  pt: '$6',
}))
export default ProfileDetails
