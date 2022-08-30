import { Text } from 'dripsy'
import { forwardRef } from 'react'
import InputBase, { InputBaseProps } from './InputBase'

const MoneyInput = forwardRef<{}, InputBaseProps>(({ value, ...rest }, ref) => {
  return (
    <InputBase ref={ref} value={value} maxLength={13} {...rest}>
      <Text
        numberOfLines={1}
        sx={{
          fontWeight: 'bold',
          color: '#FFFBAE',
        }}
      >
        {`= ${value ? value : 0}K`}
      </Text>
    </InputBase>
  )
})

MoneyInput.displayName = 'MoneyInput'

export default MoneyInput
