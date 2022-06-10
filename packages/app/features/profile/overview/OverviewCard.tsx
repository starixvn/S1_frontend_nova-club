import { DripsyGradient } from 'app/components/Gradient'
import { styled, Text, View } from 'dripsy'
import React from 'react'

type OverviewCardProps = {
  title: string
  isDirect?: boolean
}

const OverviewCard = ({ title, isDirect }: OverviewCardProps) => {
  return (
    <StyledView>
      <StyledViewHeader
        gradient="PaleBlue"
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        sx={{ opacity: 0.6 }}
      >
        <Text sx={{ fontWeight: 'bold' }}>{title}</Text>
      </StyledViewHeader>
      <StyledViewBody gradient="darkNavyBlue">
        <StyledViewBox>
          <StyledText>Win / Lose (VND){'\n'} 0.00</StyledText>
        </StyledViewBox>
        {isDirect && (
          <StyledViewBox>
            <StyledText>Direct{'\n'} 9</StyledText>
          </StyledViewBox>
        )}
        <View sx={{ flexDirection: 'row' }}>
          <StyledViewBox sx={{ flex: 1 }}>
            <StyledText>Turn Over{'\n'} 0.00</StyledText>
          </StyledViewBox>
          <StyledViewBox sx={{ flex: 1 }}>
            <StyledText>Real Bet{'\n'} 0.00</StyledText>
          </StyledViewBox>
        </View>
      </StyledViewBody>
    </StyledView>
  )
}

const StyledView = styled(View)(() => ({}))
const StyledViewHeader = styled(DripsyGradient)(() => ({
  height: 70,
  borderWidth: 1.5,
  borderBottomWidth: 0,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  borderColor: '$lightNavyBlue',
  justifyContent: 'center',
  pl: '$4',
}))
const StyledViewBody = styled(DripsyGradient)(() => ({}))
const StyledViewBox = styled(View)(() => ({
  height: 80,
  borderWidth: 1.5,
  borderColor: '$lightNavyBlue',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledText = styled(Text)(() => ({
  textAlign: 'center',
}))

export default OverviewCard
