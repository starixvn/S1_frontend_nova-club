import useDefaultParamSelector from 'app/hooks/useDefaultParamSelector'
import { View } from 'dripsy'
import React from 'react'
import { useAnnouncementQuery } from 'services/contentApi'
import AnnouncementCard from './components/AnnouncementCard'

const AnnouncementScreen = () => {
  const defaultParams = useDefaultParamSelector()
  const { data } = useAnnouncementQuery(defaultParams)

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
