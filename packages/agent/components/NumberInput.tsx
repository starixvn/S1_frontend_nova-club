import { useRef } from 'react'
import Input, { InputProps } from './Input'
import { agentToThousandSeparator } from 'agent/utils'

interface NumberInputProps extends InputProps {
  // add any additional props specific to TestInput here
}

const NumberInput = ({ ...rest }: NumberInputProps) => {
  const valRef = useRef('')
  const handleChangeNumber = (value: string) => {
    const formattedAmount = agentToThousandSeparator(value.toString())
    valRef.current = formattedAmount.toString()
    rest.onChangeText?.(formattedAmount.toString())
  }
  return (
    <Input
      {...rest}
      onChangeText={(e) => {
        handleChangeNumber(e.replace(/[^\d]/g, ''))
      }}
    />
  )
}

export default NumberInput
