import { styled, Text } from 'dripsy'
import { DripsyGradient } from './Gradient'

const GoldLabelFrame = ({ title }: { title: string }) => {
  return (
    <StyledGradient
      gradient={'gold'}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 0.5, y: 1 }}
    >
      <StyledText sx={{}}>{title}</StyledText>
    </StyledGradient>
  )
}

const StyledGradient = styled(DripsyGradient)({
  mx: '$16',
  borderRadius: 5,
  bottom: 33,
})

const StyledText = styled(Text)({
  color: 'black',
  py: '$3',
  fontSize: [12, 20, 25],
  fontWeight: 'bold',
  textAlign: 'center',
})

export default GoldLabelFrame
