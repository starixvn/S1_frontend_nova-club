import Icon from 'app/components/Icon'
import { View, Text, ScrollView } from 'dripsy'
import { useMemo } from 'react'
import selection from '../../assets/fonts/icon/selection.json'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { PageWithBackHeader } from 'app/components/layouts/Page'

const DemoIcon = () => {
  const { top, bottom } = useSafeArea()
  const memoList = useMemo(() => {
    return selection.icons.map((x) => x.properties.name).sort()
  }, [])

  return (
    <PageWithBackHeader
      header={{
        title: 'Demo Icon',
        actions: (
          <Icon name="notice" onPress={() => console.log('Show notice')} />
        ),
      }}
    >
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
    </PageWithBackHeader>
  )
}

export default DemoIcon
