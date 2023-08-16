import Button, { ButtonProps } from 'app/components/common/Button'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import React from 'react'

export default function HeaderButton({
  sx,
  titleProps,
  ...props
}: ButtonProps) {
  return (
    <Button
      sx={{ minWidth: 100, borderRadius: 20, ...sx }}
      titleProps={{
        sx: { mt: FONT_TOP_OFFSET, fontSize: [12, 12, 12, 12, 13] },
        ...titleProps,
      }}
      {...props}
    />
  )
}
