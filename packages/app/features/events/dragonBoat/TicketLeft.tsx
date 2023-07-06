import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'

interface TitleProps {
  balance
}

const TicketLeft = ({ balance }: TitleProps) => {
  const { t } = useLocalization()

  return (
    <View>
      <View
        sx={{
          alignSelf: 'flex-end',
          borderRadius: 30,
          borderWidth: 6,
          borderColor: 'white',
          height: 60,
          width: 150,
          justifyContent: 'center',
          // marginBottom: '5%',
          bg: 'rgba(255,255,255,0.4)',
        }}
      >
        <Text
          sx={{
            textAlign: 'center',
            fontSize: 20,
            color: 'red',
            fontFamily: 'AvertaStd-ExtraBold',
          }}
        >
          {balance ? balance.totalBalance : 0}
        </Text>
        <Text
          sx={{
            textAlign: 'center',
            fontSize: 10,
            color: 'red',
            fontFamily: 'AvertaStd-ExtraBold',
          }}
        >
          {t('event.catEvent.miniGame.ticketLeft')}
        </Text>
      </View>
    </View>
  )
}

export default TicketLeft
