import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import MarqueeText from 'app/components/Marquee'
import { styled, Text, View } from 'dripsy'
import { useWindowDimensions } from 'react-native'

const AnnoucementMarquee = () => {
  const { width } = useWindowDimensions()

  const dummyText =
    'Lorem Ipsum refers to a dummy block of text that is often used in publishing and graphic design to fill gaps in the page before the actual words are put into the finished product.'
  return (
    <StyledContainer>
      <DripsyGradient
        gradient="darkBlue"
        sx={{
          flexDirection: 'row',
        }}
      >
        <Icon
          name="home"
          sx={{ color: '#97FFF4', alignSelf: 'center' }}
          size={18}
        />
        <MarqueeText
          textList={[{ value: dummyText }]}
          speed={60}
          width={width}
          height={25}
          direction={'left'}
          reverse={false}
          textStyle={{ fontSize: 10, color: '#97FFF4' }}
        />
      </DripsyGradient>
    </StyledContainer>
  )
}

const StyledContainer = styled(View)({
  borderTopWidth: 1,
  borderColor: '$lightNavyBlue',
  borderBottomWidth: 1,
  pl: '$5',
})

export default AnnoucementMarquee
