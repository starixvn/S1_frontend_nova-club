import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import React from 'react'
import MysteryDropContent from './components/MysteryDropContent'

const MysteryDropEvent = () => {
  const { t } = useLocalization()

  return (
    <PageWithBackHeader header={{ title: t('event.mystery.title') }}>
      <MysteryDropContent />
    </PageWithBackHeader>
  )
}

export default MysteryDropEvent
