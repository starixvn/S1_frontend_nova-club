import { PageWithBackHeader } from 'app/components/layouts/Page'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Container } from 'dripsy'
import React, { useLayoutEffect } from 'react'
import { useRouter } from 'solito/router'
import AppDownloadSection from './AppDownloadSection'

const DownloadPage = () => {
  const desktop = useIsDesktop()
  const memberToken = useAppSelector((state) => state.auth.info?.token)
  const { t } = useLocalization()
  const { replace } = useRouter()

  useLayoutEffect(() => {
    if (desktop) {
      return
    }

    if (memberToken) {
      replace('/')
      return
    }

    replace('/auth/register')
  }, [desktop, memberToken, replace])

  return (
    <PageWithBackHeader
      header={{ title: t('common.download') }}
      disableScrollView
      hideHeader={desktop}
    >
      <Container sx={{ py: desktop ? '$4' : 0 }}>
        <AppDownloadSection />
      </Container>
    </PageWithBackHeader>
  )
}

export default DownloadPage
