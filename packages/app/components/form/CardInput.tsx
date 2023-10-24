import React from 'react'
import Input from './Input'
import { Masks, useMaskedInputProps } from 'react-native-mask-input'

const CardInput = ({ value, setValue, ...rest }) => {
  const CREDIT_CARD = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    [/\d/],
    [/\d/],
    [/\d/],
    [/\d/],
    ' ',
    [/\d/],
    [/\d/],
    [/\d/],
    [/\d/],
    ' ',
    [/\d/],
    [/\d/],
    [/\d/],
    [/\d/],
    ' ',
    /\d/,
    /\d/,
    /\d/,
  ]

  const maskedInputProps = useMaskedInputProps({
    value: value,
    onChangeText: (masked, unmasked) => setValue(unmasked),
    mask: CREDIT_CARD,
    obfuscationCharacter: '+',
  })

  return <Input {...rest} {...maskedInputProps} placeholder="" />
}

export default CardInput
