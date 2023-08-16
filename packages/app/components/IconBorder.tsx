import { View } from 'dripsy'
import IconButton from './IconButton'
import Icon from './Icon'

type IconBorderProps = {
  IconName?: string
  IconSize?: number
  IconColor?: string
}

const IconBorder = ({
  IconName,
  IconSize = 24,
  IconColor,
}: IconBorderProps) => {
  const secondaryBorderValue = IconSize + 21
  return (
    <View
      sx={{
        width: secondaryBorderValue,
        height: secondaryBorderValue,
        borderRadius: 30,
        bg: '$primary.50',
      }}
    >
      <View
        sx={{
          borderRadius: 30,
          bg: '$background',
        }}
      >
        <Icon
          name={IconName ?? 'notice'}
          color={IconColor}
          size={IconSize}
          sx={{ p: 10 }}
        />
      </View>
    </View>
  )
}

export default IconBorder
