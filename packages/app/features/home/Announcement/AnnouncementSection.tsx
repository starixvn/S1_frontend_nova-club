import { useAppSelector } from 'app/provider/redux/store'
import React, { useMemo } from 'react'
import { useAnnouncementQuery } from 'services/contentApi'
import MarqueeFlip from './MarqueeFlip'

const ANNOUNCEMENT_HEIGHT = 30
const ANNOUNCEMENT_CONTEXT_COLOR = '#97FFF4'

export default function AnnouncementSection() {
  const locale = useAppSelector((s) => s.setting.locale)
  const { isUninitialized, data: announcements } = useAnnouncementQuery(
    locale,
    { refetchOnMountOrArgChange: true }
  )

  const marquees = useMemo(() => {
    if (announcements == null) return []
    return announcements.map((annc) => {
      return {
        label: annc.newsId,
        value: annc.title,
        item: annc,
      }
    })
  }, [announcements])

  return (
    <MarqueeFlip
      announcementList={marquees}
      announcementHeight={ANNOUNCEMENT_HEIGHT}
      loading={isUninitialized}
    />
  )
}
