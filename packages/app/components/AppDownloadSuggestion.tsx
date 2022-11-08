import { Gradient } from '@dripsy/gradient'
import { CONTENT_URI, MEDIA_DOMAIN, REFERRAL_DOMAIN } from '@env'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import dayjsTz from 'app/utils/dayjs'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { useDispatch } from 'react-redux'
import Image from './common/Image'
import IconButton from './form/IconButton'

const HEIGHT = 60
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
                px: '$4',
              }}
              start={[0, 0]}
              end={[1, 1]}
              colors={['#a8dfe2', '#2ba3c4']}
            >
              <IconButton
                name="cross"
                color="primary"
                size={16}
                onPress={onClose}
              />
              <Image
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
                <Text sx={{ color: '#0056FA' }}>
                  {t('forceDownload.downloadApp')}
                </Text>
                <Text sx={{ fontWeight: 'bold', color: '#000757' }}>
                  {t('forceDownload.promoText')}
                </Text>
              </View>
              <TouchableOpacity
                sx={{
                  px: '$4',
                  py: '$2',
                  ml: 'auto',
                  backgroundColor: '#0d3664',
                  borderRadius: 10,
                }}
                onPress={() => {
                  Linking.openURL(REFERRAL_DOMAIN)
                }}
              >
                <Text>{t('forceDownload.download')}</Text>
              </TouchableOpacity>
            </Gradient>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  )
}

export default AppDownloadSuggestion
