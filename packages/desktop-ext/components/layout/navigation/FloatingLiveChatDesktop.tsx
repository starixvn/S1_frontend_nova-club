import { LIVECHAT_URL } from '@env'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { Image, Pressable, Text, View, useDripsyTheme } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import React, { startTransition, useState } from 'react'
import { Linking, Platform } from 'react-native'
import { NAVIGATION_HEIGHT } from './NavigationHeader'
import { HEADER_HEIGHT } from 'app/utils/constant'
import useSupportItemList from 'app/features/customerSupport/useSupportItemList'
import { MotiView } from 'moti'

const FloatingLiveChatDesktop = () => {
  const { theme } = useDripsyTheme()
  const { t } = useLocalization()
  const mediaList = useSupportItemList()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <MotiPressable
      id="menu"
      style={{
        position: 'fixed',
        backgroundColor: theme.colors?.$primary
          ? theme.colors?.$primary[100]
          : 'transparent',
        width: 180,
        right: 0,
        top: NAVIGATION_HEIGHT + HEADER_HEIGHT,
        zIndex: 5,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        flexDirection: 'row',
      }}
      onHoverIn={() => startTransition(() => setIsMenuOpen(true))}
      onHoverOut={() => startTransition(() => setIsMenuOpen(false))}
      animate={{ translateX: isMenuOpen ? 25 : 160 }}
    >
      <View sx={{ position: 'relative', my: 12 }}>
        <MotiView
          animate={{
            transform: [{ rotateZ: isMenuOpen ? '180deg' : '0deg' }],
          }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Icon name={'back'} size={14} />
        </MotiView>

        <Text
          numberOfLines={1}
          sx={{ writingMode: 'vertical-lr', textOrientation: 'mixed', my: 12 }}
        >
          {t('footer.contactUs')}
        </Text>
      </View>
      <View
        sx={{
          backgroundColor: theme.colors?.$primary
            ? theme.colors?.$primary[100]
            : 'transparent',
          pb: 12,
        }}
      >
        {mediaList.map((item) => {
          return (
            item.qr && (
              <CSDesktop
                key={item.icon}
                qr={item.qr}
                label={item.label}
                href={item.href}
              />
            )
          )
        })}
      </View>
    </MotiPressable>
  )
}

export const CSDesktop = ({
  href,
  qr,
  label,
}: {
  label: string
  href: string
  qr: string
}) => {
  const { t } = useLocalization()
  return (
    <Pressable
      href={href}
      hrefAttrs={{
        rel: 'noreferrer',
        target: '_blank',
      }}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        pl: '$3',
        pr: '$4',
        mr: '$2',
        py: '$2',
      }}
    >
      <Text sx={{ fontWeight: 'bold', fontSize: 20 }}>
        {t('contact.' + label)}
      </Text>

      <Image
        source={{ uri: qr }}
        alt="zalo-social-media"
        style={{
          width: 100,
          height: 100,
          zIndex: 99,
        }}
      />
    </Pressable>
  )
}

export default FloatingLiveChatDesktop
