import { TextField } from 'app/components/TextField'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import React, { useEffect, useRef } from 'react'

const ProfileDetails = () => {
  const { t } = useLocalization()
  const ref = useRef(null)
  const user = {
    name: 'Tech Test S1',
    username: 'TechTestS1',
    phone: '60111222001',
    referrer: 'TechTestS2',
    currency: 'MYR',
  }

  return (
    <PageWithBackHeader header={{ title: t('menu.profile') }}>
      <StyledViewPage>
        <TextField>
          <TextField.Label label="profile.details.realname" value={user.name} />
          <TextField.Label
            label="profile.details.username"
            value={user.username}
          />
          <TextField.Label label="profile.details.phone" value={user.phone} />
          <TextField.Label
            label="profile.details.referrer"
            value={user.referrer}
          />
          <TextField.Label
            label="profile.details.currency"
            value={user.currency}
          />
        </TextField>
      </StyledViewPage>
    </PageWithBackHeader>
  )
}

const StyledViewPage = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  pt: '$3',
}))
export default ProfileDetails
