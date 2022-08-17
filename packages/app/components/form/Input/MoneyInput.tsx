import { Text } from 'dripsy'
import { forwardRef } from 'react'
import InputBase, { InputBaseProps } from './InputBase'

const MoneyInput = forwardRef<{}, InputBaseProps>(({ value, ...rest }, ref) => {
  return (
    <InputBase
      ref={ref}
      value={value}
      maxLength={13}
      action={
        <Text
          numberOfLines={1}
          sx={{
            fontWeight: 'bold',
            color: '#FFFBAE',
            right: '$4',
          }}
        >
          {`= ${value ? value : 0}K`}
        </Text>
      }
      {...rest}
    />
  )
})

MoneyInput.displayName = 'MoneyInput'

export default MoneyInput
