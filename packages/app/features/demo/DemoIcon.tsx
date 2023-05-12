import Icon from 'app/components/Icon'
import { View, Text, ScrollView } from 'dripsy'
import { useMemo } from 'react'
import selection from '../../assets/fonts/icon/selection.json'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

const DemoIcon = () => {
  const { top, bottom } = useSafeArea()
  const memoList = useMemo(() => {
    return selection.icons.map((x) => x.properties.name).sort()
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: top,
        paddingBottom: bottom,
      }}
      sx={{
        bg: '$primary.700',
      }}
    >
      <View
        sx={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {memoList.map((i, index) => {
          return (
            <View key={i} sx={{ width: 100, alignItems: 'center' }}>
              <Icon name={i} color={'white'} size={30} sx={{ p: 10 }} />
              <Text style={{ textAlign: 'center' }}>{i}</Text>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default DemoIcon
