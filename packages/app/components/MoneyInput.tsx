import { Text, View } from 'dripsy'
import { forwardRef } from 'react'
import Input, { InputProps } from './form/Input'
import IconButton from './IconButton'

const MoneyInput = forwardRef<{}, InputProps & { onIconPress: () => void }>(
  ({ value, onIconPress, ...rest }, ref) => {
    return (
      <Input ref={ref} value={value} maxLength={13} {...rest}>
        <View
          sx={{ justifyContent: 'center', alignItems: 'flex-end', mx: '$2' }}
        >
          <IconButton
            name="cash"
            size={18}
            color={'$secondary.100'}
            onPress={onIconPress}
          />
          <Text
            numberOfLines={1}
            sx={{
              fontWeight: 'bold',
              color: '$secondary.100',
            }}
          >
            {`= ${value ? value : 0}K`}
          </Text>
        </View>
      </Input>
    )
  }
)

MoneyInput.displayName = 'MoneyInput'

export default MoneyInput
