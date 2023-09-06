import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import React from 'react'
import { useAnnouncementQuery } from 'services/contentApi'
import MessageCard from './components/MessageCard'
import AnnouncementCard from './components/AnnouncementCard'

const AnnouncementScreen = () => {
  const locale = useAppSelector((s) => s.setting.locale)
  const { data } = useAnnouncementQuery(locale)

  return (
    <View>
      {data?.map((item, i) => (
        <View
          key={item.id}
          sx={{
            mt: 12,
            // borderWidth: isDesktop ? 2 : 0,
            borderTopWidth: 2,
            borderColor: '$primary.100',
          }}
        >
          <AnnouncementCard
            id={item.id}
            title={item.title}
            content={item.content}
            index={i}
          />
        </View>
      ))}
    </View>
  )
}

export default AnnouncementScreen
