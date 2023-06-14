import { Row, View } from 'dripsy'
import React from 'react'
import IconButton from './IconButton'
import { MotiLink } from 'solito/moti'
import Icon from './Icon'
import LinkPressable from './pressable/LinkPressable'

const MEDIA_LIST = [
  { icon: 'facebook', url: '/' },
  { icon: 'tiktok', url: '/' },
  { icon: 'youtube', url: '/' },
]

const SocialMedia = () => {
  return (
    <Row sx={{ gap: 12 }}>
      {MEDIA_LIST.map((item) => (
        <IconLink key={item.icon} icon={item.icon} href={item.url} />
      ))}
    </Row>
  )
}

const IconLink = ({ href, icon }) => {
  return (
    <LinkPressable href={href}>
      <View sx={{ borderRadius: 24, bg: '$primary.100', p: 8 }}>
        <Icon name={icon} size={16} />
      </View>
    </LinkPressable>
  )
}

export default SocialMedia
