import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import BouncePressable from 'app/pressable/BouncePressable'
import { Image, styled, View, Text } from 'dripsy'
import GoldLabelFrame from './GoldLabelFrame'

const SimpleGridImage = ({ data }: { data: any[] }) => {
  const { width, height } = useContainerDimension()
  const borderedWidth = width - 4
  const leftRightSpace = borderedWidth * HOME_PADDING * 0.5
  const columnWidth = (borderedWidth - leftRightSpace * 2) / 2

  const StyledImage = styled(Image)({
    borderRadius: 10,
  })
  return (
    <View>
      <StyledWrapItem sx={{ p: leftRightSpace }}>
        {data.map((r, rindex) => {
          return (
            <BouncePressable
              key={rindex}
              sx={{ p: leftRightSpace, width: columnWidth }}
            >
              <StyledImage
                resizeMode="cover"
                source={r.image}
                sx={{
                  width: columnWidth - leftRightSpace * 2,
                  height: columnWidth - leftRightSpace * 2,
                }}
              />
              {r.title && (
                <Text
                  sx={{
                    textAlign: 'center',
                    color: '$lightNavyBlue',
                    mt: -5,
                    fontSize: 15,
                  }}
                >
                  {r.title}
                </Text>
              )}
            </BouncePressable>
          )
        })}
      </StyledWrapItem>
    </View>
  )
}
const StyledWrapItem = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  borderWidth: 2,
  borderColor: 'transparent',
})

export default SimpleGridImage
