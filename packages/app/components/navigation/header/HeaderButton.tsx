import Button, { ButtonProps } from 'app/components/common/Button'
import React from 'react'

export default function HeaderButton({ sx, ...props }: ButtonProps) {
  return (
    <Button
      sx={{ minWidth: 100, borderRadius: 15, ...sx }}
      contentProps={{
        sx: { py: '$2' },
      }}
      titleProps={{ sx: { fontSize: 14 } }}
      {...props}
    />
  )
}
