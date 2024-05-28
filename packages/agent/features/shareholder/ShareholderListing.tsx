import { LIMIT } from 'agent/components/DataTable/TableListing'
import { DateFilter, ShareholderStatusFilter } from 'agent/constant/select'
import {
  useShareholderListQuery,
  useShareholderSetStatusMutation,
} from 'agent/services/shareholderApi'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'
import ListingContent from './components/ListingContent'

export type ShareholderListingFilterOptions = {
  date: DateFilter | string | undefined
  startDate: Date | string
  endDate: Date | string
  username: string
  status: ShareholderStatusFilter | string | undefined
}

const ShareholderListing = () => {
  const { push } = useRouter()
  const { openModal } = useModal()

  const [offset, setOffset] = useState(0)
  const [filter, setFilter] = useState<ShareholderListingFilterOptions>({
    date: '',
    startDate: dayjs().startOf('date').toDate(),
    endDate: dayjs().endOf('date').toDate(),
    status: '',
    username: '',
  })

  const [updateStatus, { isLoading }] = useShareholderSetStatusMutation()

  const { shareholderData, totalData, isFetching, refetch } =
    useShareholderListQuery(
      {
        start: offset * LIMIT,
        length: LIMIT,
        created_at: filter.date
          ? `${dayjs(filter.startDate).format(
              'YYYY-MM-DD HH:mm:ss Z'
            )} to ${dayjs(filter.endDate).format('YYYY-MM-DD HH:mm:ss Z')}`
          : '',
        username: filter.username,
        active: filter.status,
      },
      {
        selectFromResult: ({ data, isFetching, isSuccess }) => ({
          isFetching,
          shareholderData: data?.result?.data,
          totalData: data?.result?.recordsTotal,
        }),
      }
    )

  const onNavigate = (id) => {
    Platform.OS === 'web'
      ? push(`/agent/list/shareholder/${id}`)
      : push(`/agent/shareholder/${id}`)
  }

  const onFilter = () => {
    openModal('FilterShareholderListingModal', {
      filterOptions: filter,
      onConfirm: (value: ShareholderListingFilterOptions) => {
        setFilter({
          date: value.date,
          endDate: value.endDate,
          startDate: value.startDate,
          username: value.username,
          status: value.status,
        })
        setOffset(0)
      },
    })
  }

  return (
    <ListingContent
      title={'shAgent.totalPartner'}
      data={shareholderData ?? []}
      totalData={totalData ?? 0}
      isFetching={isFetching}
      isLoading={isLoading}
      refetch={refetch}
      updateStatus={updateStatus}
      onNavigate={onNavigate}
      onFilter={onFilter}
    />
  )
}

export default ShareholderListing
