import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import Icon from 'app/components/Icon'
import { Text, View } from 'dripsy'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'

const MainHeader = ({
  navigation,
  title,
}: {
  navigation: any
  title: string
}) => {
  const { top } = useSafeArea()
  const { push } = useRouter()

  return (
    <View
      style={{
        backgroundColor: '#0D2035',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: top,
        paddingBottom: 10,
        flexDirection: 'row',
      }}
    >
      <Text style={{ color: 'white' }}>{title}</Text>
      <TouchableOpacity
        onPress={() => push('/profile')}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="tick" size={30} />
      </TouchableOpacity>
    </View>
  )
}

export default MainHeader
