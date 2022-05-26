import { Image, ScrollView, styled } from 'dripsy'

const ListImage = ({ data }: { data: any[] }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      sx={{ ml: '$5' }}
    >
      {data.map((i) => {
        return <StyledImage key={i.image.toString()} source={i.image} />
      })}
    </ScrollView>
  )
}
const StyledImage = styled(Image)({
  margin: 1,
  borderRadius: 5,
  height: [130, 150, 170],
  width: [130, 150, 170],
})
export default ListImage
