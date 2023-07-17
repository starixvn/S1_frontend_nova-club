import { useAppSelector } from 'app/provider/redux/store'
import React, { useMemo } from 'react'

import MarqueeFlip from './MarqueeFlip'
import { useAnnouncementQuery } from 'agent/services/contentApi'

const ANNOUNCEMENT_HEIGHT = 30

export default function AnnouncementSection() {
  const { isUninitialized, data } = useAnnouncementQuery()

  const marquees = useMemo(() => {
    if (data == null) return []
    return data.map((annc) => {
      return {
        label: annc.newsId,
        value: annc.title,
        item: annc,
      }
    })
  }, [data])

  return (
    <MarqueeFlip
      announcementList={marquees}
      announcementHeight={ANNOUNCEMENT_HEIGHT}
      loading={isUninitialized}
    />
  )
}
