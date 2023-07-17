import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { useAppSelector } from 'app/provider/redux/store'
import { ActivityIndicator, styled, View } from 'dripsy'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useAnnouncementQuery } from 'services/contentApi'
import { AnnouncementListItems } from 'services/contentApi.type'
import MarqueeFlip from './MarqueeFlip'

export interface MarqueeItem<T> {
  label: number
  value: string
  item: T
}

const ANNOUNCEMENT_HEIGHT = 25
const ANNOUNCEMENT_CONTEXT_COLOR = '#97FFF4'

const AnnouncementMarquee = () => {
  const { push } = useContextualRouter()
  const locale = useAppSelector((s) => s.setting.locale)
  const { data, isSuccess, isUninitialized } = useAnnouncementQuery(locale)
  const [marquees, setMarquees] = useState<
    MarqueeItem<AnnouncementListItems>[]
  >([])

  const fontColor = ANNOUNCEMENT_CONTEXT_COLOR

  useEffect(() => {
    if (data?.data && data.data.list && isSuccess) {
      setMarquees(
        data.data.list.map((annc) => {
          return {
            label: annc.newsId,
            value: annc.title,
            item: annc,
          }
        })
      )
    }
  }, [data, isSuccess])

  const onPress = () => {
    push('/messages', {
      tab: 1,
    })
  }
  return (
    <StyledContainer>
      <TouchableOpacity onPress={onPress}>
        <DripsyGradient
          gradient={'darkBlue'}
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
              name="annoucement"
              sx={{ color: fontColor, mr: '$2' }}
              size={18}
            />
          )}
          {marquees.length > 0 && (
            <MarqueeFlip
              announcementList={marquees}
              announcementHeight={ANNOUNCEMENT_HEIGHT}
              color={fontColor}
            />
          )}
        </DripsyGradient>
      </TouchableOpacity>
    </StyledContainer>
  )
}

const StyledContainer = styled(View)({
  borderTopWidth: 1,
  borderColor: '$lightNavyBlue',
  borderBottomWidth: 1,
})

export default AnnouncementMarquee
