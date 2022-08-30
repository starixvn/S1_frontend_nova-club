import Image from 'app/components/common/Image'
import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualNavigationContext } from 'app/navigation/web/ContextualNavigation'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { useContext } from 'react'
import { useRouter } from 'solito/router'
const LOGO_IMAGE = require('../../assets/images/auth-logo.png')
const CONTENT_IMAGE = require('../../assets/images/download.png')

const DownloadScreen = () => {
  const { t } = useLocalization()
  const { push } = useRouter()

  const { makeContextualHref } = useContextualRouting()
  const toRegister = makeContextualHref('register')

  const { clear: clearNavigationStack } = useContext(
    ContextualNavigationContext
  )

  const handlePressDownload = () => {}
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
          source={LOGO_IMAGE}
          style={{ height: 100, width: 100, aspectRatio: 1 }}
        />
        <Image
          source={CONTENT_IMAGE}
          style={{
            width: '70%',
            minHeight: 200,
            aspectRatio: 1,
            marginVertical: 24,
          }}
        />
        <View sx={{ width: '70%' }}>
          <Button
            stretch
            onPress={handlePressDownload}
            sx={{ mt: '$8' }}
            containerStyle={{
              justifyContent: 'space-between',
              minHeight: 80,
            }}
          >
            <Icon name="mobile" />
            <View sx={{ alignItems: 'center' }}>
              <Button.Label>{t('common.app').toUpperCase()}</Button.Label>
              <Button.Label>{t('common.download').toUpperCase()}</Button.Label>
            </View>
            <Icon name="dl-circle" />
          </Button>
        </View>
      </View>

      <View sx={{ alignItems: 'center' }}>
        <View sx={{ width: '70%' }}>
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
        mt: '$8',
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
