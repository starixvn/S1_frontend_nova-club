import React from 'react'
import { View } from 'dripsy'
import { DripsyGradient } from 'app/components/Gradient'

export const ACCOUNT_MENU_HEIGHT = 160 // can remove this if the component inside can have dynamic height
export default function AccountMenu({}) {
  return (
    <View
      sx={{
        height: ACCOUNT_MENU_HEIGHT,
        width: '100%',
        borderColor: '$primary.300',
        borderWidth: 1,
        borderStyle: 'dashed',
        my: 20,
      }}
    ></View>
  )
}
