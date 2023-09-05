import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import IconButton from 'app/components/IconButton'
import SectionHeader from 'app/components/SectionHeader'
import Image from 'app/components/common/Image'
import CheckInBox from 'app/components/reward/CheckInBox'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Row, View } from 'dripsy'
import { useModal } from 'react-native-modalfy'
import GenericContainer from '../tnc/component/GenericContainer'

const list = [
  'rewards.tnc.dailyCheckIn.tnc1',
  'rewards.tnc.dailyCheckIn.tnc2',
  'rewards.tnc.dailyCheckIn.tnc3',
  'rewards.tnc.dailyCheckIn.tnc4',
  'rewards.tnc.dailyCheckIn.tnc5',
  'rewards.tnc.dailyCheckIn.tnc6',
]

const CheckIn = () => {
  const { t } = useLocalization()
  const lang = useAppSelector((state) => state.setting.locale)
  const isDesktop = useIsDesktop()

  const { openModal } = useModal()
  return (
    <View sx={{ my: '$sectionBottomSpace' }}>
      {isDesktop ? (
        <Row sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{
              uri: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/title/daily-check-in-${lang}.png`,
            }}
            alt="daily_check_in_header"
            resizeMode="contain"
            sx={{ width: 300, height: 60, marginHorizontal: '$4' }}
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
        </Row>
      ) : (
        <SectionHeader
          icon="daily"
          title={t('rewards.checkInModal.title').toUpperCase()}
          titleProps={{
            sx: {
              fontSize: 16,
            },
          }}
        />
      )}

      <View sx={{ mt: 24, alignItems: 'center' }}>
        <CheckInBox>
          {!isDesktop && (
            <IconButton
              name="tnc"
              size={28}
              onPress={() =>
                openModal('RewardTncModal', {
                  content: <GenericContainer list={list} />,
                })
              }
              sx={{
                position: 'absolute',
                top: -18,
                right: -8,
              }}
            />
          )}
        </CheckInBox>
      </View>
    </View>
  )
}

export default CheckIn
