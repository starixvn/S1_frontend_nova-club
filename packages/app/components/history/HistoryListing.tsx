import { FlashList } from '@shopify/flash-list'
import { ActivityIndicator, FlatList } from 'dripsy'
import React, { useEffect, useRef, useState } from 'react'
import {
  ListRenderItem,
  ListRenderItemInfo,
  Platform,
  View,
} from 'react-native'
import { ReportDepositItem } from 'services/playerApi.type'
import HistoryEmpty from './HistoryEmpty'
import HistoryHeader, { HeaderProps } from './HistoryHeader'

interface HistoryListingProps<T, FetchParamsType> {
  fetchParams: FetchParamsType
  trigger: any // TODO: How to fix it to RTKQ type
  result: any // TODO: How to fix it to RTKQ type
  header: HeaderProps['data']
  keyExtractor?: (item: T, index: number) => string
  renderItem: ListRenderItem<T>
  updatedSlipId?: string
}

function HistoryListing<T, FetchParamsType>(
  props: HistoryListingProps<T, FetchParamsType>
) {
  const {
    fetchParams,
    trigger,
    result,
    header,
    keyExtractor,
    renderItem,
    updatedSlipId,
  } = props
  const { data, isFetching, isSuccess, isUninitialized } = result
  const [limit, setLimit] = useState<number>(10)
  const [totalOffset, setTotalOffset] = useState<number>(0)
  const [displayList, setDisplayList] = useState<T[]>([])
  const [totalRow, setTotalRow] = useState(0)
  const [allLoaded, setAllLoaded] = useState(false)

  useEffect(() => {
    console.log('updatedSlipId', updatedSlipId)
    if (updatedSlipId) {
      setDisplayList(
        displayList.map((item) => {
          if (item.secure_id === updatedSlipId)
            return { ...item, bank_slip_attachment: true }

          return item
        })
      )
    }
  }, [updatedSlipId])

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
      const { data, message, success } = await trigger({
        limit: limit,
        offset,
        ...fetchParams,
      })
        .unwrap()
        .catch((error) => console.log('error', error))

      if (data?.rows) {
        if (offset > 0) {
          setDisplayList(displayList.concat(data?.rows || []))
        } else {
          setDisplayList(data?.rows || [])
        }

        setTotalRow(data.row_count_total)
        setTotalOffset(offset + limit)
      } else {
        setAllLoaded(true)
        if (displayList.length && data.row_count_total === 0) setDisplayList([])
      }
    } catch (e) {
      console.log('🚀 ~ file: HistoryListing.tsx ~ line 204 ~ fetchData ~ e', e)
    }
  }

  function onLoadMore() {
    if (totalOffset >= totalRow || allLoaded) return
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
      <FlashList
        data={displayList}
        keyExtractor={keyExtractor}
        renderItem={onRenderItem}
        estimatedItemSize={10}
        onRefresh={onRefresh}
        refreshing={isFetching ?? false}
        ListEmptyComponent={onListEmpty}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.2}
        extraData={isFetching}
      />
      {/* <FlatList
        onRefresh={onRefresh}
        refreshing={isFetching ?? false}
        ListEmptyComponent={onListEmpty}
        data={displayList}
        keyExtractor={keyExtractor}
        renderItem={onRenderItem}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        extraData={displayList}
      /> */}
    </View>
  )
}

export default HistoryListing
