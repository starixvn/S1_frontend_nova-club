import { styled, Text } from 'dripsy'
import { DripsyGradient } from './Gradient'
import Icon from './Icon'

const GradientIcon = ({
  size,
  bgColor,
  iconName,
}: {
  size: string
  bgColor: string
  iconName: string
}) => {
  let iconSize = 15
  if (size === 'small') {
    iconSize = 33
  }
  return (
    <StyledGradient gradient={bgColor}>
      <StyledIcon name={iconName} size={iconSize} />
    </StyledGradient>
  )
}
const StyledGradient = styled(DripsyGradient)({
  borderWidth: 1,
  borderRadius: 15,
  borderColor: '#99ECFE',
})

const StyledIcon = styled(Icon)({
  color: 'white',
  padding: '$1',
})

export default GradientIcon
