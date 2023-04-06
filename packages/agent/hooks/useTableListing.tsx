const useTableListing = ({
  offset,
  setOffset,
  LIMIT,
  totalData,
  isFetching,
  refetch,
}) => {
  const hasMorePage = totalData >= (offset + 1) * LIMIT

  const onLoadMore = () => {
    hasMorePage && !isFetching && setOffset((prev) => prev + 1)
  }

  const onRefresh = async () => {
    if (!offset) return refetch()
    setOffset(0)
  }

  return {
    offset,
    setOffset,
    LIMIT,
    onLoadMore,
    onRefresh,
  }
}

export default useTableListing
