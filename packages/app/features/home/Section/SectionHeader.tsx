import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import React from 'react'

const SectionHeader = ({
  title,
  bgColor,
  colors,
  iconName,
  ...rest
}: {
  title: string
  bgColor: string
  colors?: string[]
  iconName: string
}) => {
  const { width } = useContainerDimension()
  const { t } = useLocalization()
  const horizontalPad = width * HOME_PADDING
  return (
    <StyledView sx={{ marginLeft: horizontalPad, my: horizontalPad * 0.5 }}>
      <DripsyGradient
        colors={colors}
        gradient={bgColor}
        sx={{
          borderRadius: 20,
          m: '$0a',
          height: 40,
          aspectRatio: 1,
          justifyContent: 'center',
        }}
      >
        <Icon
          name={iconName}
          size={23}
          sx={{
            color: 'white',
            alignSelf: 'center',
          }}
        />
      </DripsyGradient>
      <StyledText>{t(title)}</StyledText>
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
  my: '$1a',
  mt: '$6',
  alignItems: 'center',
})

const StyledText = styled(Text)({
  fontSize: [18, 23],
  color: 'white',
  px: '$1a',
  pt: '$1',
  fontWeight: 900,
  textTransform: 'uppercase',
})

export default SectionHeader
