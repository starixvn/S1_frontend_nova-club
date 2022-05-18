import { Image, styled, Text, View } from 'dripsy'
import React from 'react'
import { Gradient } from '@dripsy/gradient'

const SectionHeader = ({
  title,
  bgColor,
}: {
  title: string
  bgColor: string
}) => {
  return (
    <StyledView>
      <Gradient
        gradient={bgColor}
        sx={{ borderRadius: 20, m: '$2', padding: '$2' }}
      >
        <Image
          source={require('../../../assets/poker.png')}
          sx={{
            height: [30, 35, 40],
            width: [30, 35, 40],
          }}
        ></Image>
      </Gradient>
      <Text
        sx={{
          fontSize: [18, 23, 28],
          color: 'white',
          padding: '$3',
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>
    </StyledView>
  )
}

const StyledView = styled(View)({
  bg: '$primary',
  borderTopLeftRadius: 30,
  borderBottomLeftRadius: 30,
  borderWidth: 2,
  borderRightColor: '$primary',
  borderColor: '$shadow',
  flexDirection: 'row',
  ml: '$7',
  my: '$3',
  mt: '$15',
  alignItems: 'center',
})

export default SectionHeader
