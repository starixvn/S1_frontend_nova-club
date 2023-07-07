import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import { Text } from 'dripsy'
import { View } from 'dripsy'

type ValueCardProps = {
  value: string
  onPress: (string) => void
}
const ValueCard = ({ value, onPress }: ValueCardProps) => {
  return (
    <TouchableOpacity
      sx={{
        minWidth: 80,
        height: 45,
        borderRadius: 100,
        m: 20,
        bg: '$primary.200',
      }}
      onPress={() => onPress(value)}
    >
      <View
        sx={{
          position: 'absolute',
          bottom: 1,
          width: '100%',
          height: 45,
          bg: '$background',
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>{value}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ValueCard
