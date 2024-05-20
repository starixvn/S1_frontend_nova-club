import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Pressable } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import DropdownContent from '../DropdownContent'
import { NAVIGATION_DROPDOWN_MENU } from '../NavigationHeaderProvider'
import { LEAGUE_SECTION } from 'app/constants/recMatchMapping'

type Props = {}

export default function EuroCup({}: Props) {
  const { width } = useWindowDimensions()
  const { push } = useRouter()

  return (
    <DropdownContent menu={NAVIGATION_DROPDOWN_MENU.Euro}>
      <Pressable
        onPress={() => push(`/sportsbook?section=${LEAGUE_SECTION.EURO_MATCH}`)}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/eufa-bg.png`}
          width={width}
          height={width * (900 / 1920)}
          alt=""
        />
      </Pressable>
    </DropdownContent>
  )
}
