import { Text, View } from 'dripsy'
import { ReactNode, forwardRef } from 'react'
import Input, { InputProps } from './form/Input'
import IconButton from './IconButton'
import {
  Masks,
  createNumberMask,
  useMaskedInputProps,
} from 'react-native-mask-input'
import { toThousandSeparator } from 'app/utils'

type MoneyInputProps = {
  setValue?: (args) => void
  actions: ReactNode
} & InputProps

const MoneyInput = forwardRef<{}, MoneyInputProps>(
  ({ value, setValue, actions, ...rest }, ref) => {
    const currencyMask = createNumberMask({
      prefix: [''],
      delimiter: ',',
      separator: '.',
      precision: 0,
    })

    const maskedInputProps = useMaskedInputProps({
      value: value?.toString(),
      onChangeText: (masked, unmasked) => {
        setValue(unmasked)
      },
      mask: currencyMask,
    })

    return (
      <Input ref={ref} maxLength={13} value={value} {...rest}>
        <View
          sx={{ justifyContent: 'center', alignItems: 'flex-end', mx: '$2' }}
        >
          {actions}
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
