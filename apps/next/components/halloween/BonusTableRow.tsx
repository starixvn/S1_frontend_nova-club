/* eslint-disable @next/next/no-img-element */
interface BonusTableRowProps {
  multiplier: number
  value: string
}
function BonusTableRow({ multiplier, value }: BonusTableRowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: 5 }}>
      <span>{multiplier} x </span>
      <img
        style={{ marginBottom: 10 }}
        width={40}
        src={require('app/assets/images/events/halloween/icons/icon-pumpkin.png')}
        alt="pumpkin"
      />
      <span>{` = ${value} VND`}</span>
    </div>
  )
}

export default BonusTableRow
