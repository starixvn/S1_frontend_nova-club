import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { useAppSelector } from 'app/provider/redux/store'
import { Text, View } from 'dripsy'
import { MotiView } from 'moti'
import React from 'react'
import { useCheckTicketSpinQuery } from 'services/eventApi'

const PlinkoEvent = ({ size }: { size: number }) => {
  const { push } = useContextualRouter()
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const { width } = useContainerDimension()
  const iconSize = Math.min(100, width * 0.3)

  const { balance, isFetching } = useCheckTicketSpinQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: (s) => ({ ...s, balance: s.data?.data }),
    skip: !token,
  })

  const handlePress = () => {
    push('/event/plinko')
  }

  return (
    <MotiView
      from={{ translateY: -10 }}
      animate={{ translateY: 10 }}
      transition={{ type: 'timing', loop: true, duration: 3000 }}
    >
      <TouchableOpacity
        onPress={handlePress}
        sx={{ justifyContent: 'center', mb: 10, ml: -5 }}
      >
        <Image
          source={
            token
              ? require('app/assets/images/events/plinko/HAB_Button.png')
              : require('app/assets/images/events/plinko/btnStart.png')
          }
          style={{
            width: iconSize,
            height: iconSize,
          }}
          resizeMode="contain"
        />
        {token ? (
          <View
            sx={{
              position: 'absolute',
              top: -26,
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              sx={{
                fontSize: 12,
                lineHeight: 16,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#f9ff59',
                //   zIndex: 99,
              }}
            >
              {balance?.totalBalance
                ? balance?.totalBalance > 99
                  ? '99+'
                  : balance?.totalBalance
                : 0}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </MotiView>
  )
}
export default PlinkoEvent
