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
        borderRadius: 100,
        mt: '$3',
        bg: '$primary.200',
      }}
      onPress={() => onPress(value)}
    >
      <View
        sx={{
          bottom: 1,
          width: '100%',
          py: '$2',
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
