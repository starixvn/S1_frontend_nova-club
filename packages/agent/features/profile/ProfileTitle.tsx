import Text from 'agent/components/Text'
import { ROLE } from 'agent/utils/helper'
import { NotoSansItalic } from 'app/provider/dripsy'
import { useAgentLocalization } from 'app/provider/localization'
import { View } from 'dripsy'

const ProfileTitle = ({ userRole }: { userRole: string }) => {
  const { t } = useAgentLocalization()
  return (
    <View
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingX: '$5',
        paddingY: '$3',
      }}
    >
      <View>
        <Text
          sx={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 24,
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
            fontFamily: NotoSansItalic,
            fontSize: 10,
          }}
        >
          {userRole === ROLE.AGENT
            ? t('common.agent')
            : t('common.shareholder')}
        </Text>
      </View>
    </View>
  )
}

export default ProfileTitle
