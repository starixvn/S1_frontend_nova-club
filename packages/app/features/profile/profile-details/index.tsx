import { TextField } from 'app/components/TextField'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import React, { useEffect, useRef } from 'react'
import { RootState, useAppSelector } from 'app/provider/redux/store'
import { ProfileResult } from 'app/services/playerApi.type'

const ProfileDetails = () => {
  const { t } = useLocalization()
  const user = useAppSelector<ProfileResult>(
    (state: RootState) => state.player.currentLoginUser
  )

  return (
    <PageWithBackHeader header={{ title: t('menu.profile') }}>
      <StyledViewPage>
        <TextField>
          <TextField.Label
            label="profile.details.realname"
            value={user.firstName}
          />
          <TextField.Label
            label="profile.details.username"
            value={user.username}
          />
          <TextField.Label
            label="profile.details.phone"
            value={user.contractNumber}
          />
          <TextField.Label
            label="profile.details.referrer"
            value={user.referral_code}
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
