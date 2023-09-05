import { CONTENT_URI, MEDIA_DOMAIN, REFERRAL_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { HEADER_HEIGHT } from 'utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { Text, View } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import { AnimatePresence, MotiView } from 'moti'
import { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { useDispatch } from 'react-redux'
import IconButton from './IconButton'
import Image from './common/Image'
import HeaderButton from './navigation/header/HeaderButton'

const HEIGHT = HEADER_HEIGHT
const AppDownloadSuggestion = () => {
  const [show, setShow] = useState(false)
  const { t } = useLocalization()
  const dispatch = useDispatch()

  function onClose() {
    dispatch(SettingActions.setAppDownloadSuggestionDate(new Date()))
  }

  const appDownloadSuggestionDate = useAppSelector(
    (s) => s.setting.appDownloadSuggestion
  )

  useEffect(() => {
    setShow(
      !appDownloadSuggestionDate ||
        dayjsTz(appDownloadSuggestionDate).diff(dayjsTz(), 'day') > 1
    )
  }, [appDownloadSuggestionDate])

  return (
    <View>
      <AnimatePresence>
        {show && (
          <MotiView
            from={{ height: 0, translateY: -HEIGHT }}
            animate={{ height: HEIGHT, translateY: 0 }}
            exit={{ height: 0, translateY: -HEIGHT }}
            transition={{ type: 'timing' }}
          >
            <Gradient
              sx={{
                height: HEIGHT,
                flexDirection: 'row',
                alignItems: 'center',
                px: '$3',
              }}
              start={[0, 0]}
              end={[1, 1]}
              gradient={'button'}
            >
              <IconButton
                name="cross"
                size={16}
                onPress={onClose}
                color={'$primary.500'}
              />
              <Image
                alt="logo"
                source={{
                  uri: `${MEDIA_DOMAIN}${CONTENT_URI}/app-logo-40.png`,
                }}
                sx={{
                  aspectRatio: 1,
                  height: '80%',
                  mx: '$2',
                  borderRadius: 10,
                }}
              />
              <View>
                <Text sx={{ color: '$primary.500' }}>
                  {t('forceDownload.downloadApp')}
                </Text>
                <Text sx={{ color: '$primary.500', fontWeight: 'bold' }}>
                  {t('forceDownload.promoText')}
                </Text>
              </View>
              <HeaderButton
                sx={{
                  bg: '$primary.300',
                  ml: 'auto',
                }}
                onPress={() => {
                  Linking.openURL(REFERRAL_DOMAIN)
                }}
              >
                {t('forceDownload.download')}
              </HeaderButton>
            </Gradient>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  )
}

export default AppDownloadSuggestion
