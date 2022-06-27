import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { styled, SxProp, Text, View } from 'dripsy'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const Section = ({ title, sx }: { title: string; sx?: SxProp }) => {
  const { t } = useLocalization()
  const { width } = useContainerDimension()
  const COMMON_PADDING = width * HOME_PADDING
  return (
    <StyledView sx={{ ...sx, pl: COMMON_PADDING }}>
      <StyledText>{title}</StyledText>
      <StyledButton>
        <ButtonText>{t('common.clickMore') + `  >`} </ButtonText>
      </StyledButton>
    </StyledView>
  )
}

const StyledView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  mb: '$1',
})

const StyledText = styled(Text)({
  fontSize: 13,
  color: 'white',
  pl: '$1a',
  pr: '$5',
  fontWeight: 'bold',
  textTransform: 'capitalize',
  fontStyle: 'italic',
})

const ButtonText = styled(Text)({
  fontSize: 10,
  px: '$2a',
  py: '$1',
})

const StyledButton = styled(TouchableOpacity)({
  borderRadius: 20,
  bg: 'rgb(48,89,117)',
  justifyContent: 'center',
  mr: '$2a',
})

export default Section
