import { FlashList, ListRenderItem } from '@shopify/flash-list'
import EmptyResult from 'agent/components/DataTable/EmptyResult'
import { ActivityIndicator, SxProp, View } from 'dripsy'
import React, { ComponentProps, useRef } from 'react'
import { Platform } from 'react-native'
import DataTable from './DataTable'
import DataTableRefresh from './DataTableRefresh'

/**
 * ### Usage
 * @example
 *
 * ```ts
 *     <TableListing
 *       title="Recent Transactions"
 *       data={reportData}
 *       renderItem={onRenderItem}
 *       keyExtractor={(item, index) => `${index} Table ${item.secure_id}`}
 *       onLoadMore={onLoadMore}
 *       onRefresh={onRefresh}
 *       isFetching={isFetching || isLoading}
 *       containerStyle={{ flex: 1 }}
 *     />
 *```
 */

export const LIMIT = 10
interface TableListingProps<T> {
  title: string
  titleCenter?: boolean
  data: T
  onRefresh: () => void
  keyExtractor?: (item: T, index: number) => string
  renderHeader?: () => JSX.Element
  renderItem: ListRenderItem<T>
  onLoadMore: () => void
  isFetching: boolean
  innerRef?: React.RefObject<any>
  containerStyle: SxProp
  refreshProps?: Partial<ComponentProps<typeof DataTableRefresh>>
}

const TableListing = <T, FetchParamsType>({
  title,
  titleCenter = false,
  data,
  onRefresh,
  keyExtractor,
  renderHeader,
  renderItem,
  onLoadMore,
  isFetching,
  containerStyle,
  refreshProps,
}: TableListingProps<T>) => {
  const tableRef = useRef()

  const handleRefresh = () => {
    // Platform.OS === 'web' &&

    tableRef?.current?.scrollToOffset({ animated: true, offset: 0 })
    onRefresh()
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

    return <EmptyResult sx={{ mt: '$5' }} />
  }
  return (
    <>
      <DataTable style={{ flex: 1 }}>
        <>
          <DataTableRefresh
            title={title}
            isLoading={isFetching}
            onRefresh={!!onRefresh && handleRefresh}
            center={titleCenter}
            {...refreshProps}
          />
          {renderHeader && renderHeader()}
          <View sx={{ height: 500 }}>
            <FlashList
              ref={tableRef}
              data={data}
              // ListHeaderComponent={renderHeader}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              estimatedItemSize={10}
              onRefresh={onRefresh}
              refreshing={isFetching ?? false}
              ListEmptyComponent={onListEmpty}
              onEndReached={onLoadMore}
              onEndReachedThreshold={0.3}
              extraData={isFetching}
            />
          </View>
        </>
      </DataTable>
    </>
  )
}

export default TableListing
