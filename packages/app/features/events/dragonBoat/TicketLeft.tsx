import { Gradient } from '@dripsy/gradient'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import { ImageBackground } from 'react-native'

interface TitleProps {
  balance
}

const TicketLeft = ({ balance }: TitleProps) => {
  const { t } = useLocalization()
  return (
    <View>
      <Gradient
        sx={{
          alignSelf: 'flex-end',
          borderRadius: 30,
          borderWidth: 6,
          borderColor: 'white',
          height: 60,
          width: 150,
          // marginBottom: '5%',
        }}
        start={[0, 0]}
        end={[0.5, 0.5]}
        colors={['rgba(255,144,104,0.95)', 'rgba(255,75,31,0.95)']}
      >
        <Text
          sx={{
            textAlign: 'center',
            fontWeight: '900',
            fontSize: 20,
          }}
        >
          {balance ? balance.totalBalance : 0}
        </Text>
        <Text
          sx={{
            textAlign: 'center',
            fontSize: 10,
            fontWeight: '900',
            // fontFamily: 'AvertaStd-ExtraBoldItalic',
          }}
        >
          {t('event.catEvent.miniGame.ticketLeft')}
        </Text>
      </Gradient>
    </View>
  )
}

export default TicketLeft
