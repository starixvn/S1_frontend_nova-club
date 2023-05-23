import Icon from 'app/components/Icon'
import { useAppSelector } from 'app/provider/redux/store'
import { ActivityIndicator, View, styled } from 'dripsy'
import React, { useMemo } from 'react'
import { useAnnouncementQuery } from 'services/contentApi'
import { Link } from 'solito/link'
import MarqueeFlip from './MarqueeFlip'

const ANNOUNCEMENT_HEIGHT = 30
const ANNOUNCEMENT_CONTEXT_COLOR = '#97FFF4'

export default function AnnouncementSection() {
  const locale = useAppSelector((s) => s.setting.locale)
  const { isUninitialized, announcements } = useAnnouncementQuery(locale, {
    selectFromResult: (resp) => {
      return { ...resp, announcements: resp.data?.data?.list }
    },
  })

  const marquees = useMemo(() => {
    if (announcements == null) return null
    return announcements.map((annc) => {
      return {
        label: annc.newsId,
        value: annc.title,
        item: annc,
      }
    })
  }, [announcements])

  return (
    <StyledContainer>
      <Link href="/">
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            height: ANNOUNCEMENT_HEIGHT,
            px: '$2',
          }}
        >
          {isUninitialized ? (
            <ActivityIndicator color={'$lightCyan'} size={14} />
          ) : (
            <Icon
              name="announcement"
              color={'$secondary.100'}
              sx={{ color: '', mr: '$2' }}
              size={16}
            />
          )}
          {marquees && (
            <MarqueeFlip
              announcementList={marquees}
              announcementHeight={ANNOUNCEMENT_HEIGHT}
              textSx={{ color: '$secondary.100' }}
            />
          )}
        </View>
      </Link>
    </StyledContainer>
  )
}

const StyledContainer = styled(View)({
  borderWidth: 1,
  borderRadius: 20,
  px: '$1',
  borderColor: '$primary.100',
  mx: '$pagePadding',
})
