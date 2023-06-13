import React from 'react'
import { MotiLink } from 'solito/moti'

const LinkPressable = ({ href, children }) => {
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
    >
      {children}
    </MotiLink>
  )
}

export default LinkPressable
