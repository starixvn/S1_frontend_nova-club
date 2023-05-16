import Text from 'agent/components/Text'
import { useAgentLocalization } from 'app/provider/localization'
import { styled, View } from 'dripsy'
import dayjs from 'dayjs'

const ProfileDetails = ({ data }) => {
  const { t } = useAgentLocalization()
  return (
    <View sx={{ paddingX: '$2', pt: '$1', pb: '$5' }}>
      <ProfileRow>
        <ProfileLabel>{t('profile.currency')}:</ProfileLabel>
        <ProfileData sx={{ color: '#0342A9', fontWeight: 'bold' }}>
          {data?.result?.data.currency}
        </ProfileData>
      </ProfileRow>
      <ProfileRow>
        <ProfileLabel>{t('profile.realName')}:</ProfileLabel>
        <ProfileData>
          {data?.result?.data.name ? data?.result?.data.name : 'N/A'}
        </ProfileData>
      </ProfileRow>
      <ProfileRow>
        <ProfileLabel>{t('profile.mobile')}:</ProfileLabel>
        <ProfileData>{data?.result?.data.mobile_no}</ProfileData>
      </ProfileRow>
      <ProfileRow>
        <ProfileLabel>{t('profile.email')}:</ProfileLabel>
        <ProfileData>
          {data?.result?.data.email ? data?.result?.data.email : 'N/A'}
        </ProfileData>
      </ProfileRow>
      <ProfileRow>
        <ProfileLabel>{t('profile.createdDate')}:</ProfileLabel>
        <ProfileData>
          {dayjs(data?.result?.data.created_at).format('DD-MM-YYYY') +
            '   (IP: ' +
            data?.result?.data.lastlogin_ip +
            ')'}
        </ProfileData>
      </ProfileRow>
      <ProfileRow>
        <ProfileLabel>{t('profile.lastLogin')}:</ProfileLabel>
        <ProfileData>
          {dayjs(data?.result?.data.lastlogin_at).format('DD-MM-YYYY') +
            '   (IP: ' +
            data?.result?.data.lastlogin_ip +
            ')'}
        </ProfileData>
      </ProfileRow>
    </View>
  )
}
const ProfileRow = styled(View)({
  flexDirection: 'row',
  py: '$1',
})
const ProfileLabel = styled(Text)({
  paddingRight: '$2',
  minWidth: 150,
})
const ProfileData = styled(Text)({
  flex: 1,
  paddingRight: '$2',
})

export default ProfileDetails
