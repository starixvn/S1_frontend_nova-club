import React from 'react'
import DropdownContent from '../DropdownContent'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { NAVIGATION_DROPDOWN_MENU } from '../NavigationHeaderProvider'

type Props = {}

export default function LiveCasino({}: Props) {
  const { data } = useGetGameListByCategoryQuery([GAME_TYPE_CODE.LIVE_DEALER])

  return (
    <DropdownContent
      data={data}
      menu={NAVIGATION_DROPDOWN_MENU.LiveCasino}
      useProviderImage
    />
  )
}
