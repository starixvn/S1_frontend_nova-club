import { ActivityIndicator, SxProp, View } from 'dripsy'
import React, { ComponentProps } from 'react'

type ViewProps = ComponentProps<typeof View>

interface CardProps {
  children: React.ReactNode
  padding?: number
  isLoading?: boolean
  sx?: SxProp
}

const Card = ({ children, padding = 12, isLoading = false, sx }: CardProps) => {
  return (
    <View
      sx={{
        borderRadius: 12,
        padding,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        // elevation: 4,
        backgroundColor: 'white',
        ...sx,
      }}
    >
      {isLoading ? <ActivityIndicator /> : children}
    </View>
  )
}

export default Card
