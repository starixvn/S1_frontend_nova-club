import { TextField } from 'app/components/TextField'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import React, { useEffect, useRef } from 'react'
import { RootState, useAppSelector } from 'app/provider/redux/store'
import { ProfileResult } from 'services/playerApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'

const ProfileDetails = () => {
  const { t } = useLocalization()
  const { data: userProfile } = usePlayerProfileQuery()

  return (
    <PageWithBackHeader header={{ title: t('menu.profile') }}>
      <StyledViewPage>
        <TextField>
          <TextField.Label
            label={t('profile.details.realname')}
            value={userProfile?.data?.firstName || ''}
          />
          <TextField.Label
            label={t('profile.details.username')}
            value={userProfile?.data?.username || ''}
          />
          <TextField.Label
            label={t('profile.details.phone')}
            value={userProfile?.data?.contractNumber || ''}
          />
          <TextField.Label
            label={t('common.id')}
            value={userProfile?.data?.referral_code || ''}
            copy
          />
          <TextField.Label
            label={t('profile.details.currency')}
            value={userProfile?.data?.currency || ''}
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
