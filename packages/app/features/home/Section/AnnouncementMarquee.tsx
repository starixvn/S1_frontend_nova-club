import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import MarqueeText from 'app/components/Marquee'
import useContextualRouting from 'app/hooks/useContextualRouting'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { useAnnouncementQuery } from 'services/contentApi'
import { AnnouncementListItems } from 'services/contentApi.type'
import { styled, View } from 'dripsy'
import { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native'
import { useRouter } from 'solito/router'

interface MarqueeItem<T> {
  label: number
  value: string
  item: T
}

const AnnoucementMarquee = () => {
  const { push } = useRouter()
  const { makeContextualHref } = useContextualRouting(ContextualModuleKey.Home)
  const toMessages = makeContextualHref('messages', {
    tab: 1,
  })
  const { width } = useWindowDimensions()
  const { data, isSuccess } = useAnnouncementQuery()
  const [marquees, setMarquees] =
    useState<MarqueeItem<AnnouncementListItems>[]>()

  useEffect(() => {
    if (data?.data && isSuccess) {
      setMarquees(
        data.data.list.map((annc) => {
          return {
            label: annc.newsId,
            value: annc.title + ' ' + annc.content,
            item: annc,
          }
        })
      )
    }
  }, [data, isSuccess])

  const onPress = () => {
    push(toMessages, {
      pathname: '/messages',
      query: {
        tab: 1,
      },
    })
  }

  return (
    <StyledContainer>
      <TouchableOpacity onPress={onPress}>
        <DripsyGradient
          gradient="darkBlue"
          sx={{
            flexDirection: 'row',
          }}
        >
          <Icon
            name="home"
            sx={{ color: '#97FFF4', alignSelf: 'center', mx: '$2' }}
            size={18}
          />
          <MarqueeText
            textList={marquees}
            speed={60}
            width={width}
            height={25}
            direction={'left'}
            reverse={false}
            textStyle={{ fontSize: 12, color: '#97FFF4' }}
            // onTextClick={onClick}
          />
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

export default withContextualNav(AnnoucementMarquee, ContextualModuleKey.Home)
