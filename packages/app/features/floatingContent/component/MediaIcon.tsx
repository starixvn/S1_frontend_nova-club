import Text from 'agent/components/Text'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import Image from 'app/components/common/Image'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { View, styled } from 'dripsy'
import React from 'react'
import { Linking, Platform } from 'react-native'

const MediaIcon = ({ item, isShowLabel = true }) => {
  const { t } = useLocalization()

  return (
    <TouchableOpacity
      onPress={() => {
        if (Platform.OS !== 'web') Linking.openURL(item.href)
      }}
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        mb: '$3',
      }}
      href={item.href}
      hrefAttrs={{
        rel: 'noreferrer',
        target: '_blank',
      }}
    >
      {isShowLabel ? (
        <Text sx={{ mr: '$2', fontSize: 16, color: 'white' }}>
          {t('contact.' + item.label)}
        </Text>
      ) : null}
      <View
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          mx: '$2',
        }}
      >
        <SupportIconWrap colors={item.bg}>
          {item.icon ? (
            <Icon name={item.icon} />
          ) : (
            <Image
              source={item.image}
              sx={{
                width: 40,
                height: 40,
              }}
            />
          )}
        </SupportIconWrap>
      </View>
    </TouchableOpacity>
  )
}

const SupportIconWrap = styled(DripsyGradient)(({ size = 45 }) => ({
  borderRadius: size * 0.5,
  borderWidth: 2,
  borderColor: '$PaleBlue',
  m: 1,
  height: size,
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}))

export default MediaIcon
