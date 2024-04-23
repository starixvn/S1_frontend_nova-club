import Montserrat from 'app/assets/fonts/Montserrat'
import { useResponsiveValue } from 'dripsy'
import React from 'react'

const GameRebateLabel = ({ rebateText, background = 'rgba(0,0,0,1)' }) => {
  const labelSize = useResponsiveValue([11])
  return (
    <div
      style={{
        background,
        paddingInline: 7,
        borderRadius: 15,
        minWidth: 30,
        display: 'flex',
        paddingBlock: 2,
        fontSize: labelSize,
        fontWeight: 'bold',
        fontFamily: Montserrat.Bold.name,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span className="rebateText" style={{ minWidth: 40, userSelect: 'none' }}>
        {(rebateText === undefined ? '0' : rebateText) + ' %'}
      </span>
    </div>
  )
}

export default GameRebateLabel
