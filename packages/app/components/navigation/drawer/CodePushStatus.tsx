import Button, { ButtonProps } from 'app/components/common/Button'
import { useCodePush } from 'app/provider/CodePushProvider'
import useLocalization from 'app/provider/localization'
import { Text, View, useDripsyTheme } from 'dripsy'
import React, { ReactNode } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import codePush from 'react-native-code-push'
import { getVersion } from 'react-native-device-info'

type Props = {}

export default function CodePushStatus({}: Props) {
  const currentVersion = getVersion()
  const { theme } = useDripsyTheme()
  const { colors } = theme
  const {
    progress = 0.5,
    localPackage,
    status,
    remotePackage,
    downloadedPackage,
    downloadRemotePackage,
  } = useCodePush()
  const { t } = useLocalization()

  function renderIndicator() {
    if (remotePackage) {
      switch (status) {
        case codePush.SyncStatus.AWAITING_USER_ACTION: {
          return (
            <CodePushButton
              onPress={() => {
                downloadedPackage?.install(codePush.InstallMode.IMMEDIATE)
              }}
            >
              {t('common.update')}
            </CodePushButton>
          )
        }
        case codePush.SyncStatus.UNKNOWN_ERROR: {
          return (
            <CodePushButton
              onPress={() => {
                downloadRemotePackage(
                  remotePackage,
                  codePush.InstallMode.IMMEDIATE
                )
              }}
            >
              {t('common.update')}
            </CodePushButton>
          )
        }
        case codePush.SyncStatus.DOWNLOADING_PACKAGE: {
          return (
            <AnimatedCircularProgress
              style={{ opacity: 1 }}
              size={50}
              width={5}
              fill={progress * 100}
              tintColor={colors['$primary'][50]}
              backgroundColor={colors['$primary'][700]}
            >
              {(p) => (
                <Text style={{ fontSize: 12, lineHeight: 15 }}>
                  {Math.floor(p) + '%'}
                </Text>
              )}
            </AnimatedCircularProgress>
          )
        }
      }
    } else return null
  }

  return (
    <View sx={{ mt: 'auto', alignItems: 'center', mb: '$3' }}>
      <View sx={{ mb: '$1', height: 70, justifyContent: 'flex-end' }}>
        {renderIndicator()}
      </View>
      <Text sx={{ fontSize: 12, textAlign: 'center' }}>
        {`v${currentVersion}.${
          localPackage ? localPackage.label.replace('v', '') : '0'
        }`}
      </Text>
    </View>
  )
}

type CodePushButtonProps = {
  children: ReactNode
} & ButtonProps

function CodePushButton({ ...rest }: CodePushButtonProps) {
  return (
    <Button
      contentStyle={{
        paddingTop: 4,
        paddingBottom: 4,
      }}
      titleProps={{ sx: { fontSize: 12, lineHeight: 15 } }}
      {...rest}
    />
  )
}
