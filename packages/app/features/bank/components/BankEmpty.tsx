import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import React from 'react'

type BankEmptyProps = {
  size?: 'big' | 'small'
  message?: string
}

const BankEmpty = ({ size = 'big', message }: BankEmptyProps) => {
  const { width } = useContainerDimension()

  const ICON_SIZE = size === 'big' ? width * 0.3 : width * 0.2
  return (
    <StyledViewNoResult>
      <Image
        source={require('app/assets/images/empty-result.png')}
        style={{
          aspectRatio: 1,
          marginBottom: 12,
          height: ICON_SIZE,
        }}
      />
      <Text sx={{ color: '#72859A' }}>{message}</Text>
    </StyledViewNoResult>
  )
}

const StyledViewNoResult = styled(View)(() => ({
  textAlign: 'center',
  p: 12,
  alignItems: 'center',
}))
export default BankEmpty
