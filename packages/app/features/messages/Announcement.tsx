import FormContainer from 'app/components/form/FormContainer'
import { useAppSelector } from 'app/provider/redux/store'
import { View, useResponsiveValue } from 'dripsy'
import React from 'react'
import { useAnnouncementQuery } from 'services/contentApi'
import MessageCard from './components/MessageCard'

const AnnouncementScreen = () => {
  const locale = useAppSelector((s) => s.setting.locale)
  const { data } = useAnnouncementQuery(locale)
  const isDesktop = useResponsiveValue([false, false, false, true])

  return (
    <FormContainer hidePadding={!isDesktop}>
      {data?.map((item, i) => (
        <View
          key={item.id}
          sx={{
            mt: 12,
            borderWidth: isDesktop ? 2 : 0,
            borderTopWidth: 2,
            borderColor: '$primary.100',
          }}
        >
          <MessageCard
            id={item.id}
            title={item.title}
            content={item.content}
            index={i}
          />
        </View>
      ))}
    </FormContainer>
  )
}

export default AnnouncementScreen
