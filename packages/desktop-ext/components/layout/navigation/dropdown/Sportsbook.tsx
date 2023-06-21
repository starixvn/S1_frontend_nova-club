import React from 'react'
import DropdownContent from '../DropdownContent'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { NAVIGATION_DROPDOWN_MENU } from '../NavigationHeaderProvider'

type Props = {}

export default function Sportsbook({}: Props) {
  const { data } = useGetGameListByCategoryQuery([
    GAME_TYPE_CODE.SPORTS,
    GAME_TYPE_CODE.E_SPORTS,
    GAME_TYPE_CODE.VIRTUAL_SPORTS,
  ])

  return (
    <DropdownContent data={data} menu={NAVIGATION_DROPDOWN_MENU.Sportsbook} />
  )
}
