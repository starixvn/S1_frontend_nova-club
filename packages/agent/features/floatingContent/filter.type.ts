import { DateFilter, TypeFilter } from 'agent/constant/select'

export type FilterTransactionReport = {
  transactionDate: DateFilter
  startDate: string
  endDate: string
  type: TypeFilter
}
