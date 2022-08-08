import { ActivityIndicator, FlatList } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { ListRenderItem, View } from 'react-native'
import HistoryEmpty from './HistoryEmpty'
import HistoryHeader from './HistoryHeader'

interface HistoryListingProps<T> {
  fetchParams: object
  trigger: any
  result: any
  header: []
  keyExtractor?: (item: T, index: number) => string
  renderItem: ListRenderItem<T>
  // _header?: Omit<IButtonCollapsibleProps, 'isLoading' | 'onPressRefresh'>;
}

function HistoryListing<T>(props: HistoryListingProps<T>) {
  const { fetchParams, trigger, result, header, keyExtractor, renderItem } =
    props
  const { isFetching, isSuccess, isUninitialized } = result
  const [limit, setLimit] = useState<number>(10)
  const [totalOffset, setTotalOffset] = useState<number>(0)
  const [displayList, setDisplayList] = useState<T[]>([])
  const [totalRow, setTotalRow] = useState(0)
  const [allLoaded, setAllLoaded] = useState(false)

  useEffect(() => {
    refreshData()
  }, [fetchParams])

  const refreshData = () => {
    setTotalRow(0)
    setTotalOffset(0)
    setDisplayList([])
    setAllLoaded(false)
    !isFetching && fetchData(0)
  }

  async function fetchData(offset: number) {
    try {
      const res = await trigger({
        limit: limit,
        offset,
        ...fetchParams,
      })
        .unwrap()
        .catch((error) => console.log('error', error))

      if (res?.rows) {
        if (offset > 0) setDisplayList(displayList.concat(res?.rows || []))
        else setDisplayList(res?.rows || [])

        setTotalRow(res.row_count_total)
        setTotalOffset(offset + limit)
      } else {
        setAllLoaded(true)
      }
    } catch (e) {
      console.log('🚀 ~ file: HistoryListing.tsx ~ line 204 ~ fetchData ~ e', e)
    }
  }

  function onLoadMore() {
    if (totalOffset > totalRow || allLoaded) return
    fetchData(totalOffset)
  }

  function onRefresh() {
    refreshData()
  }

  return (
    <View style={{ flex: 1 }}>
      <HistoryHeader data={header} />
      <FlatList
        onRefresh={onRefresh}
        refreshing={isFetching ?? false}
        ListEmptyComponent={<HistoryEmpty sx={{ mt: '$5' }} />}
        // ListFooterComponent={() =>
        //   isFetching &&
        //   !allLoaded &&
        //   displayList.length > 0 && <ActivityIndicator color={'$lightCyan'} />
        // }
        data={displayList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}

export default HistoryListing
