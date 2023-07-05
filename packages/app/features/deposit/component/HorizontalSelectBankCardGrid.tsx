import Image from 'app/components/common/Image'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'

type HorizontalSelectBankCardGridProps = {
  item: {
    label: string
    value: string
    icon: string
  }
  contain?: boolean
  onPress: () => void
}

const HorizontalSelectBankCardGrid = ({
  item,
  contain,
  onPress,
}: HorizontalSelectBankCardGridProps) => {
  return (
    <TouchableOpacity
      sx={{
        borderColor: '#0c7dff',
        m: '$2',
        borderRadius: 15,
        borderWidth: 2,
        overflow: 'hidden',
        width: 150,
        height: 80,
        // p: '$2',
      }}
      onPress={onPress}
    >
      <Image
        alt={item.value}
        source={
          typeof item.icon === 'string'
            ? {
                uri: item.icon,
              }
            : item.icon
        }
        resizeMode={contain ? 'contain' : 'cover'}
        sx={{ width: '100%', height: '100%' }}
      />
    </TouchableOpacity>
  )
}

export default HorizontalSelectBankCardGrid
