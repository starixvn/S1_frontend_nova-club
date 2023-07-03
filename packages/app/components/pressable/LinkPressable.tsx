import React from 'react'
import { MotiLink, MotiLinkProps } from 'solito/moti'

const LinkPressable = ({ href, children, ...rest }: MotiLinkProps) => {
  return (
    <MotiLink
      href={href}
      animate={({ hovered, pressed }) => {
        'worklet'
        return {
          scale: pressed ? 0.9 : 1,
          opacity: hovered ? 0.5 : 1,
        }
      }}
      {...rest}
    >
      {children}
    </MotiLink>
  )
}

export default LinkPressable
