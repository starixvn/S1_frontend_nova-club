import { useAppSelector } from 'app/provider/redux/store'
import React, { useMemo } from 'react'

import { useAnnouncementQuery } from 'agent/services/contentApi'
import MarqueeFlip from './MarqueeFlip'

const ANNOUNCEMENT_HEIGHT = 30

export default function AnnouncementSection() {
  const token = useAppSelector((s) => s.agent.access_token)
  const { isUninitialized, data } = useAnnouncementQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !token,
  })

  const marquees = useMemo(() => {
    if (data == null) return []
    return data.list.map((annc) => {
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
