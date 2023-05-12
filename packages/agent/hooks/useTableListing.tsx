import { Dispatch, SetStateAction } from 'react'

type useTableListingProps = {
  offset: number
  setOffset: Dispatch<SetStateAction<number>>
  LIMIT: number
  totalData: number | undefined
  isFetching: boolean
  refetch?: any
}

const useTableListing = ({
  offset,
  setOffset,
  LIMIT,
  totalData = 0,
  isFetching,
  refetch,
}: useTableListingProps) => {
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
