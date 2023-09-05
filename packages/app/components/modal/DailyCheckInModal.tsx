import GenericContainer from 'app/features/rewards/tnc/component/GenericContainer'
import { View } from 'dripsy'
import { ImageBackground } from 'react-native'
import { useModal } from 'react-native-modalfy'
import IconButton from '../IconButton'
import Image from '../common/Image'
import CheckInBox from '../reward/CheckInBox'
import TransparentHeaderBackground from './components/TransparentHeaderBackground'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { useAppSelector } from 'app/provider/redux/store'

const list = [
  'rewards.tnc.dailyCheckIn.tnc1',
  'rewards.tnc.dailyCheckIn.tnc2',
  'rewards.tnc.dailyCheckIn.tnc3',
  'rewards.tnc.dailyCheckIn.tnc4',
  'rewards.tnc.dailyCheckIn.tnc5',
  'rewards.tnc.dailyCheckIn.tnc6',
]

const DailyCheckInModal = ({ modal: { closeModal, getParam } }) => {
  const { openModal } = useModal()
  const lang = useAppSelector((state) => state.setting.locale)

  return (
    <>
      <TransparentHeaderBackground>
        <View
          sx={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton name="back" size={30} onPress={closeModal}></IconButton>
          <Image
            source={{
              uri: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/title/daily-check-in-${lang}.png`,
            }}
            alt="daily_check_in_header"
            resizeMode="contain"
            sx={{ width: 300, height: 100, marginHorizontal: '$4' }}
          />
          <IconButton
            name="tnc"
            size={30}
            onPress={() =>
              openModal('RewardTncModal', {
                content: <GenericContainer list={list} />,
              })
            }
          />
        </View>
      </TransparentHeaderBackground>
      <View sx={{ width: 500, height: 500 }}>
        <ImageBackground
          source={require('app/assets/images/rewards/check_in_bg.png')}
          resizeMode="cover"
          imageStyle={{ aspectRatio: 1 }}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <View
            sx={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckInBox />
          </View>
        </ImageBackground>
      </View>
    </>
  )
}

export default DailyCheckInModal
