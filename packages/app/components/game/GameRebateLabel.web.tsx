import { useResponsiveValue } from 'dripsy'
import React from 'react'

const GameRebateLabel = ({ rebateText, background = 'rgba(0,0,0,0.4)' }) => {
  const labelSize = useResponsiveValue([10, 12, 12, 14, 14])
  return (
    <div
      style={{
        background,
        paddingInline: 10,
        borderRadius: 15,
        minWidth: 30,
        display: 'flex',
        paddingBlock: 5,
        fontSize: labelSize,
      }}
    >
      <span className="rebateText" style={{ minWidth: 40, userSelect: 'none' }}>
        {(rebateText === undefined ? '0' : rebateText) + ' %'}
      </span>
    </div>
  )
}

export default GameRebateLabel
