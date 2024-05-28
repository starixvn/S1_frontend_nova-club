import { Row, Text, View } from 'dripsy'
import { SolitoImage } from 'solito/image'

const MatchFlag = ({ flag, label }) => {
  return (
    <Row sx={{ p: '$2', alignItems: 'center' }}>
      <View
        sx={{
          mr: ['$2', '$3'],
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 50,
          overflow: 'hidden',
        }}
      >
        <SolitoImage
          src={flag}
          alt="away"
          width={30}
          height={30}
          loading="lazy"
        />
      </View>
      <Text>{label}</Text>
    </Row>
  )
}

export default MatchFlag
