import { DripsyGradient } from 'app/components/Gradient'
import IconButton from 'app/components/IconButton'
import { Linking } from 'react-native'

const LiveChatButton = () => {
  return (
    <>
      <DripsyGradient
        gradient="button"
        sx={{
          borderRadius: 50,
          mt: '$2',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onPress={() => {
            Linking.openURL(
              'https://secure.livechatinc.com/licence/14440122/v2/open_chat.cgi'
            )
          }}
          name="iconCS"
          size={24}
          sx={{ p: '$2', borderRadius: 50 }}
        />
      </DripsyGradient>
    </>
  )
}

export default LiveChatButton
