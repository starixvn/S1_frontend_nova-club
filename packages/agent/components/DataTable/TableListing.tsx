import { FlashList, ListRenderItem } from '@shopify/flash-list'
import EmptyResult from 'agent/components/DataTable/EmptyResult'
import { ActivityIndicator, FlatList, SxProp, View, useSx } from 'dripsy'
import React, { ComponentProps, useRef } from 'react'
import { FlatListProps, Platform } from 'react-native'
import DataTable from './DataTable'
import DataTableRefresh from './DataTableRefresh'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { TAB_HEIGHT } from 'app/constant/sizes'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

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
  onRefresh?: () => void
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
  ...rest
}: TableListingProps<T>) => {
  const tableRef = useRef()
  const { height } = useContainerDimension()
  const { bottom } = useSafeArea()
  const sx = useSx()

  const handleRefresh = () => {
    // Platform.OS === 'web' &&

    tableRef?.current?.scrollToOffset({ animated: true, offset: 0 })
    onRefresh && onRefresh()
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

  const viewStyle =
    Platform.OS === 'web' ? { height: height - TAB_HEIGHT * 3 } : { flex: 1 }
  return (
    <DataTable style={{ flex: 1 }}>
      <>
        <DataTableRefresh
          title={title}
          isLoading={isFetching}
          onRefresh={onRefresh && handleRefresh}
          center={titleCenter}
          {...refreshProps}
        />
        {renderHeader && renderHeader()}
        <View sx={viewStyle}>
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
            contentContainerStyle={{
              paddingBottom: bottom,
              ...sx(containerStyle),
            }}
            {...rest}
          />
        </View>
      </>
    </DataTable>
  )
}

export default TableListing
