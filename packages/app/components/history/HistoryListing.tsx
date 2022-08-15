import { ActivityIndicator, FlatList } from 'dripsy'
import React, { useEffect, useRef, useState } from 'react'
import {
  ListRenderItem,
  ListRenderItemInfo,
  Platform,
  View,
} from 'react-native'
import HistoryEmpty from './HistoryEmpty'
import HistoryHeader, { HeaderProps } from './HistoryHeader'

interface HistoryListingProps<T, FetchParamsType> {
  fetchParams: FetchParamsType
  trigger: any // TODO: How to fix it to RTKQ type
  result: any // TODO: How to fix it to RTKQ type
  header: HeaderProps['data']
  keyExtractor?: (item: T, index: number) => string
  renderItem: ListRenderItem<T>
}

function HistoryListing<T, FetchParamsType>(
  props: HistoryListingProps<T, FetchParamsType>
) {
  const { fetchParams, trigger, result, header, keyExtractor, renderItem } =
    props
  const { isFetching, isSuccess, isUninitialized } = result
  const [limit, setLimit] = useState<number>(10)
  const [totalOffset, setTotalOffset] = useState<number>(0)
  const [displayList, setDisplayList] = useState<T[]>([])
  const [totalRow, setTotalRow] = useState(0)
  const [allLoaded, setAllLoaded] = useState(false)

  useEffect(() => {
    if (displayList.length) setDisplayList([])
    refreshData()
  }, [fetchParams])

  const refreshData = () => {
    setTotalRow(0)
    setTotalOffset(0)
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
        if (displayList.length && res.row_count_total === 0) setDisplayList([])
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

  function onRenderItem(item: ListRenderItemInfo<T>) {
    return renderItem(item)
  }

  function onListEmpty() {
    if (Platform.OS === 'web') {
      if (isFetching) {
        return (
          <ActivityIndicator
            size={'large'}
            color={'$lightCyan'}
            sx={{ mt: '$4' }}
          />
        )
      }
    }

    if (isFetching) {
      return null
    }

    return <HistoryEmpty sx={{ mt: '$5' }} />
  }

  return (
    <View style={{ flex: 1 }}>
      <HistoryHeader data={header} />
      <FlatList
        onRefresh={onRefresh}
        refreshing={isFetching ?? false}
        ListEmptyComponent={onListEmpty}
        data={displayList}
        keyExtractor={keyExtractor}
        renderItem={onRenderItem}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}

export default HistoryListing
