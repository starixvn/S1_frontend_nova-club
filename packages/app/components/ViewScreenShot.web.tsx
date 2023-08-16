import useLocalization from 'app/provider/localization'
import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { domToDataUrl } from 'modern-screenshot'
import { createFileName } from 'app/utils'

interface ViewScreenShotProps {
  children: ReactNode
  fileName: string
}

interface ViewScreenShotMethods {
  download: () => void
}

const ViewScreenShot = forwardRef<ViewScreenShotMethods, ViewScreenShotProps>(
  function ({ children, fileName = 'screenshot' }: ViewScreenShotProps, ref) {
    const viewShotRef = useRef<HTMLDivElement>(null)
    const { t } = useLocalization()

    const htmlDownload = (image, { name = '', extension = 'png' } = {}) => {
      const a = document.createElement('a')
      a.href = image
      a.download = createFileName(extension, name)
      a.click()
      return
    }

    const download = useCallback(async () => {
      if (viewShotRef.current) {
        try {
          const dataURI = await domToDataUrl(viewShotRef.current)
          htmlDownload(dataURI, { name: fileName, extension: 'png' })

          Toast.show({ type: 'success', text1: t('status.qrDownloadSuccess') })
        } catch (error) {
          console.log('ViewScreenShot download error', error)
        }
      } else console.log('ViewScreenShot missing reference to HTMLElement')
    }, [fileName, t])

    useImperativeHandle(
      ref,
      () => ({
        download,
      }),
      []
    )

    return <div ref={viewShotRef}>{children}</div>
  }
)

ViewScreenShot.displayName = 'ViewScreenShot'

export default ViewScreenShot
