import { ViewScreenShotMethods } from 'app/components/ViewScreenShot'
import useLocalization from 'app/provider/localization'
import { useCallback, useRef } from 'react'

export default function useQrReceive() {
  const { t } = useLocalization()
  const ref = useRef<ViewScreenShotMethods>(null)

  const handleDownload = useCallback(() => {
    ref?.current?.download()
  }, [])

  return {
    ref,
    buttonLabel: t('qr.downloadQr'),
    buttonOnPress: handleDownload,
  }
}
