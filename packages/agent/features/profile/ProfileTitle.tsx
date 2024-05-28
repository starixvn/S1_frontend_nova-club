import Text from 'agent/components/Text'
import { ROLE } from 'agent/utils/helper'
import { useAgentLocalization } from 'app/provider/localization'
import { View } from 'dripsy'

const ProfileTitle = ({ userRole }: { userRole: string | undefined }) => {
  const { t } = useAgentLocalization()
  return (
    <View
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        px: '$3',
        py: '$2',
      }}
    >
      <View>
        <Text
          sx={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 24,
            lineHeight: 24,
            paddingRight: '$2',
          }}
        >
          {t('profile.title')}
        </Text>
      </View>

      <View
        sx={{
          borderRadius: 10,
          paddingX: 10,
          backgroundColor: userRole === ROLE.AGENT ? '#d02fa9' : '#ffd900',
          py: '$1',
        }}
      >
        <Text
          sx={{
            color: userRole === ROLE.AGENT ? 'white' : 'black',
            fontSize: 10,
            fontStyle: 'italic',
          }}
        >
          {userRole === ROLE.AGENT
            ? t('common.agent')
            : userRole === ROLE.SHAREHOLDER
            ? t('common.shareholder')
            : t('common.shareholder_agent')}
        </Text>
      </View>
    </View>
  )
}

export default ProfileTitle
