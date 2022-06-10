import dayjs from 'dayjs'
import { useDripsyTheme, useSx } from 'dripsy'
import React, { useRef, useState } from 'react'
import { ListRenderItem, View } from 'react-native'
import { FlatListScrollTop } from '../list/withScolllToTop'
import HistoryEmpty from './HistoryEmpty'

interface HistoryListingProps<T> {
  apiUri: string
  keyExtractor?: (item: T, index: number) => string
  renderItem: ListRenderItem<T>
  _header?: any
  // _header?: Omit<IButtonCollapsibleProps, 'isLoading' | 'onPressRefresh'>;
}

function HistoryListing<T>(props: HistoryListingProps<T>) {
  const { apiUri, keyExtractor, renderItem, _header } = props
  const [isRequesting, setIsRequesting] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(1)
  const [isSearched, setIsSearched] = useState(false)
  const [displayList, setDisplayList] = useState<T[]>([])
  const isSearchFromButtonRef = useRef(false)
  const sx = useSx()

  // async function search(dtRange: DateRangeType, pn: number) {
  //   if (isRequesting) return;
  //   try {
  //     setIsRequesting(true);
  //     const params = {
  //       StartDate: dayjs(dtRange.startDate).startOf('date').unix(),
  //       EndDate: dayjs(dtRange.endDate).endOf('date').unix(),
  //       PageNumber: pn,
  //     };

  //     const { data } = await axios.post<
  //       typeof params,
  //       AxiosResponse<PaginatedResponse<T[]>>
  //     >(apiUri, params);

  //     const {
  //       data: responseData,
  //       errorCode,
  //       pageNumber: responsePageNumber,
  //       totalPages,
  //     } = data;

  //     if (errorCode === 0) {
  //       if (responsePageNumber > 1)
  //         setDisplayList(displayList.concat(responseData || []));
  //       else setDisplayList(responseData || []);
  //       setMaxPage(totalPages);
  //       setPageNumber(responsePageNumber);
  //     }

  //     if (!isSearched) setIsSearched(true);
  //     if (isSearchFromButtonRef.current) isSearchFromButtonRef.current = false;
  //   } catch (e) {
  //     console.log('search error', e);
  //   } finally {
  //     setIsRequesting(false);
  //   }
  // }

  // function onSearch(dt: DateRangeType) {
  //   setDateRange(dt);
  //   search(dt, 1);
  // }

  function onLoadMore() {
    // if (pageNumber + 1 > maxPage) return;
    // dateRange && search(dateRange, pageNumber + 1);
  }

  function onRefresh() {
    // if (historyDateRangeRef.current) {
    //   const { startDate, endDate } = historyDateRangeRef.current.values;
    //   onSearch({ startDate, endDate });
    // }
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatListScrollTop
        contentContainerStyle={sx({ padding: '$1a' })}
        onRefresh={onRefresh}
        refreshing={!isSearchFromButtonRef.current && isRequesting}
        ListEmptyComponent={isSearched ? <HistoryEmpty mt="$2a" /> : null}
        data={displayList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  )
}

export default HistoryListing
