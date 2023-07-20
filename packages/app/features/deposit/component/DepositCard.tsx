import Icon from 'app/components/Icon'
import IconBorder from 'app/components/IconBorder'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import { Profile_Quick_Navigation_Path } from 'app/navigation/RoutePath'
import useLocalization from 'app/provider/localization'
import { Text, useSx } from 'dripsy'
import { View, useDripsyTheme } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import { Platform, useWindowDimensions } from 'react-native'
import { Link } from 'solito/link'

const DepositOption = [{}]

const DepositCard = ({ item, onPress, ...rest }) => {
  const { t } = useLocalization()
  const sx = useSx()
  const { theme } = useDripsyTheme()
  const { width } = useWindowDimensions()
  const containerWidth = Math.min(500, width * 0.9)
  const CARD_PER_ROW = Math.floor((Platform.OS, containerWidth / 80 - 1))
  const totalCard = Profile_Quick_Navigation_Path.length
  const numEmptyCard = CARD_PER_ROW - (totalCard % CARD_PER_ROW)
  return (
    <TouchableOpacity
      onPress={onPress}
      style={sx({
        py: '$2',
        width: '48%',
        position: 'relative',
        ...rest.sx,
      })}
    >
      <View>
        <Gradient
          colors={theme.linearGradients.surface}
          sx={{
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '100%',
            height: 80,
            padding: 15,
            flex: 1,
          }}
        >
          <View>
            <IconBorder
              IconName={item.icon}
              IconSize={23}
              IconColor={'white'}
            />
          </View>
          <View sx={{ width: '65%', p: 1 }}>
            <Text
              numberOfLines={2}
              sx={{
                fontWeight: '500',
                px: 5,
                lineHeight: 20,
                textAlign: 'left',
                fontSize: 16,
                color: 'white',
              }}
            >
              {t(item.name)}
            </Text>
          </View>
        </Gradient>
      </View>
    </TouchableOpacity>
  )
}

export default DepositCard
