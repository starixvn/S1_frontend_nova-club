import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { styled, View } from 'dripsy'
import SimpleGridImage from './SimpleGridImage'

const SimpleWrap = ({ data, showTitle }) => {
  const { width, height } = useContainerDimension()
  const borderedWidth = width - 4
  const leftRightSpace = borderedWidth * HOME_PADDING * 0.5
  return (
    <StyledWrapItem sx={{ p: leftRightSpace }}>
      {data.map((item, rindex) => {
        return (
          <View key={item.gameName}>
            <SimpleGridImage
              gameName={item.gameName}
              providerCode={item.providerCode}
              gameCode={item.gameCode}
              image={item.image}
              title={item.gameName}
              showTitle={showTitle}
            />
          </View>
        )
      })}
    </StyledWrapItem>
  )
}
const StyledWrapItem = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  borderWidth: 2,
  borderColor: 'transparent',
})

export default SimpleWrap
