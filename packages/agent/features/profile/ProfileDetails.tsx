import Text from 'agent/components/Text'
import { useAgentLocalization } from 'app/provider/localization'
import dayjs from 'dayjs'
import { styled, View } from 'dripsy'

const ProfileDetails = ({ data }) => {
  const { t } = useAgentLocalization()

  const currency = data?.currency
  const name = data?.name
  const mobile_no = data?.mobile_no as String
  const mobileNumber = mobile_no?.startsWith('+') ? mobile_no : '+' + mobile_no
  const email = data?.email
  const createdDate = data?.created_at
  const lastLoginAt = data?.lastlogin_at
  const lastLoginIp = data?.lastlogin_ip

  return (
    <View sx={{ paddingX: '$2', pt: '$1', pb: '$2' }}>
      <ProfileRow>
        <ProfileLabel>{t('profile.currency')}:</ProfileLabel>
        <ProfileData sx={{ color: '#0342A9', fontWeight: 'bold' }}>
          {currency}
        </ProfileData>
      </ProfileRow>
      <ProfileRow>
        <ProfileLabel>{t('profile.name')}:</ProfileLabel>
        <ProfileData>{name ? name : 'N/A'}</ProfileData>
      </ProfileRow>
      <ProfileRow>
        <ProfileLabel>{t('profile.mobile')}:</ProfileLabel>
        <ProfileData>{mobileNumber}</ProfileData>
      </ProfileRow>
      <ProfileRow>
        <ProfileLabel>{t('profile.email')}:</ProfileLabel>
        <ProfileData>{email ? email : 'N/A'}</ProfileData>
      </ProfileRow>
      <ProfileRow>
        <ProfileLabel>{t('profile.createdDate')}:</ProfileLabel>
        <ProfileData>
          {`${dayjs(createdDate).format(
            'YYYY-MM-DD hh:mm:ss A'
          )} \n(IP: ${lastLoginIp})`}
        </ProfileData>
      </ProfileRow>
      <ProfileRow>
        <ProfileLabel>{t('profile.lastLogin')}:</ProfileLabel>
        <ProfileData>
          {`${dayjs(lastLoginAt).format(
            'YYYY-MM-DD hh:mm:ss A'
          )} \n(IP: ${lastLoginIp})`}
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
