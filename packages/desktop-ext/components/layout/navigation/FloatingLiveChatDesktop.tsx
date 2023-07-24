import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { Text, View, useDripsyTheme } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import React, { startTransition, useState } from 'react'
import { Linking } from 'react-native'

const FloatingLiveChatDesktop = () => {
  const { theme } = useDripsyTheme()
  const { t } = useLocalization()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <MotiPressable
      id="menu"
      onPress={() => {
        Linking.openURL(
          'https://secure.livechatinc.com/licence/14440122/v2/open_chat.cgi'
        )
      }}
      style={{
        position: 'fixed',
        backgroundColor: theme.colors?.$primary
          ? theme.colors?.$primary[100]
          : 'transparent',
        width: 140,
        height: 40,
        right: 0,
        bottom: '10%',
        zIndex: 5,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onHoverIn={() => startTransition(() => setIsMenuOpen(true))}
      onHoverOut={() => startTransition(() => setIsMenuOpen(false))}
      animate={{ translateX: isMenuOpen ? 15 : 95 }}
    >
      <View
        sx={{
          flexDirection: 'row',
          px: '$2',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Icon
          name={'iconCS'}
          size={20}
          sx={{
            borderRadius: 50,
            alignItems: 'center',
          }}
        />

        <Text
          sx={{
            minWidth: 70,
            marginLeft: 5,
            marginRight: 10,
            height: 21,
            lineHeight: 24,
            fontWeight: 'bold',
            textAlignVertical: 'center',
          }}
        >
          {t('common.hello')}
        </Text>
      </View>
    </MotiPressable>
  )
}

export default FloatingLiveChatDesktop
