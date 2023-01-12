import { CONTENT_URI, MEDIA_DOMAIN, REFERRAL_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { ROUNDED_LOGO } from 'app/constant/imagePath'
import { ContextualNavigationContext } from 'app/navigation/web/ContextualNavigation'
import useLocalization from 'app/provider/localization'
import { SettingActions } from 'app/store/setting.slice'
import { View } from 'dripsy'
import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'

const CONTENT_IMAGE = `${MEDIA_DOMAIN}${CONTENT_URI}/app-download.png`

const { useParam } = createParam()

const DownloadScreen = () => {
  const [ref] = useParam('ref')
  const { t } = useLocalization()
  const { push } = useRouter()
  const dispatch = useDispatch()

  const { clear: clearNavigationStack } = useContext(
    ContextualNavigationContext
  )

  useEffect(() => {
    if (typeof ref === 'string') {
      dispatch(
        SettingActions.setReferral({
          trackingCode: ref,
        })
      )
    }
  }, [dispatch, ref])

  const handlePressDownload = () => {
    window.open(`${REFERRAL_DOMAIN}${ref ? '?ref=' + ref : ''}`)
  }
  const handlePressLogin = () => {
    clearNavigationStack()
    push('/auth/login')
  }

  const handlePressRegister = () => {
    clearNavigationStack()
    push('/auth/register')
  }
  return (
    <PageWithBackHeader header={{}} hideHeader>
      <View sx={{ mt: '$8', alignItems: 'center' }}>
        <Image
          source={{ uri: ROUNDED_LOGO }}
          style={{ height: 175, width: 175 }}
        />
        <Image
          source={{ uri: CONTENT_IMAGE }}
          style={{
            width: '65%',
            minHeight: 200,
            aspectRatio: 1,
            marginVertical: 24,
          }}
        />
        <View sx={{ width: '65%' }}>
          <Button
            stretch
            onPress={handlePressDownload}
            sx={{ mt: '$8' }}
            containerStyle={{
              justifyContent: 'space-between',
              minHeight: 60,
            }}
          >
            <Icon name="mobile" />
            <View sx={{ alignItems: 'center' }}>
              <Button.Label>{t('common.download').toUpperCase()}</Button.Label>
            </View>
            <Icon name="dl-circle" />
          </Button>

          <GrayButton
            label={t('auth.login')}
            icon="login"
            onPress={handlePressLogin}
          />
          <GrayButton
            label={t('auth.register')}
            icon="register"
            onPress={handlePressRegister}
          />
        </View>
      </View>
    </PageWithBackHeader>
  )
}

const GrayButton = ({ label, icon, onPress }) => {
  return (
    <Button
      stretch
      variant="lg"
      fill={{
        type: 'gradient',
        color: ['#F0F0F0', '#C5C5C5'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      }}
      onPress={onPress}
      containerStyle={{
        mt: '$5',
        justifyContent: 'space-between',
        height: 60,
      }}
    >
      <Icon name={icon} color="black" />
      <Button.Label sx={{ color: '$black', textTransform: 'capitalize' }}>
        {label.toUpperCase()}
      </Button.Label>
      <Icon name="next" color="black" />
    </Button>
  )
}
export default DownloadScreen
