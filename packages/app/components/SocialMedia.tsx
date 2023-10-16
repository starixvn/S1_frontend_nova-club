import {
  SocialMedia as SM,
  getSocialMediaScheme,
} from 'app/constants/socialMedia'
import { Row, View } from 'dripsy'
import React from 'react'
import { Linking } from 'react-native'
import Icon from './Icon'
import BouncePressable from './pressable/BouncePressable'

const MEDIA_LIST = [
  { label: SM.FACEBOOK, icon: 'facebook' },
  { label: SM.TELEGRAM_MEDIA, icon: 'telegram' },
  { label: SM.TIKTOK, icon: 'tiktok' },
  { label: SM.YOUTUBE, icon: 'youtube' },
]

const SocialMedia = () => {
  return (
    <Row sx={{ gap: 12 }}>
      {MEDIA_LIST.map((item) => {
        const { backUpScheme } = getSocialMediaScheme(item.label)

        return <IconLink key={item.icon} icon={item.icon} href={backUpScheme} />
      })}
    </Row>
  )
}

const IconLink = ({ href, icon }) => {
  return (
    <BouncePressable
      onPress={() => {
        Linking.openURL(href)
      }}
    >
      <View sx={{ borderRadius: 24, bg: '$primary.100', p: 8 }}>
        <Icon name={icon} size={16} />
      </View>
    </BouncePressable>
  )
}

export default SocialMedia
