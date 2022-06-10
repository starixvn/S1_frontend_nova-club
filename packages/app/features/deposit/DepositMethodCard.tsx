import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import BouncePressable from 'app/pressable/BouncePressable'
import { styled, Text, useSx, View } from 'dripsy'
import { TouchableOpacity } from 'react-native'

const ICON_SIZE = 50

const DepositMethodCard = ({ item, ...rest }) => {
  const sx = useSx()
  return (
    <TouchableOpacity
      style={sx({
        p: '$1',
        flex: 1,
        position: 'relative',
        ...rest.sx,
      })}
    >
      <View
        sx={{
          zIndex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <IconWrap
          sx={{
            bg: item.color,
          }}
        >
          <Icon name={item.icon} size={ICON_SIZE * 0.6} />
        </IconWrap>
        <View
          sx={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            selectable={false}
            sx={{
              color: '$PaleBlue',
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 'bold',
            }}
          >
            {item.name}
          </Text>
        </View>
      </View>
      <Background gradient="PaleBlue" />
    </TouchableOpacity>
  )
}

const IconWrap = styled(View)({
  height: ICON_SIZE,
  width: ICON_SIZE,
  borderRadius: ICON_SIZE,
  borderWidth: 2,
  borderColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  m: '$0a',
})

const Background = styled(DripsyGradient)({
  position: 'absolute',
  opacity: 0.6,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#33A0D0',
})

export default DepositMethodCard
