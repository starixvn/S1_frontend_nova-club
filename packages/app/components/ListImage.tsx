import { Image, ScrollView, styled } from 'dripsy'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'

const ListImage = ({ data }: { data: any[] }) => {
  const { push } = useRouter()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      sx={{ ml: '$2a' }}
    >
      {data.map((i) => {
        return (
          <TouchableOpacity
            key={i.image.toString()}
            onPress={() => {
              push('/games/prelaunchgame')
            }}
          >
            <StyledImage source={i.image} />
          </TouchableOpacity>
        )
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
