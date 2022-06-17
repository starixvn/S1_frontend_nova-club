import useContainerDimension from 'app/hooks/useContainerDimension'
import { Image, styled, View } from 'dripsy'
import GoldLabelFrame from './GoldLabelFrame'

const SimpleGridImage = ({ data }: { data: any[] }) => {
  const { width, height } = useContainerDimension()
  const StyledImage = styled(Image)({
    mx: '$1a',
    borderRadius: 10,
    my: '$1a',
    width: [width / 2.25, width / 2.25, width / 2.25],
    height: [width / 2.2, width / 2.2, width / 2.2],
  })
  return (
    <View>
      <StyledWrapItem>
        {data.map((r, rindex) => {
          return (
            <View key={rindex}>
              <StyledImage source={r.image} />
              {r.title && <GoldLabelFrame title={r.title} />}
            </View>
          )
        })}
      </StyledWrapItem>
    </View>
  )
}
const StyledWrapItem = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  ml: '$2a',
})

export default SimpleGridImage
