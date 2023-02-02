import dayjs from 'dayjs'

//Date
export enum DateFilter {
  TODAY = 'Today',
  YESTERDAY = 'Yesterday',
  THIS_WEEK = 'This Week',
  LAST_WEEK = 'Last Week',
  THIS_MONTH = 'This Month',
  CUSTOM = 'Custom',
}

export const DateFilterOptions = [
  {
    value: DateFilter.TODAY,
    label: 'filter.date.today',
  },
  {
    value: DateFilter.YESTERDAY,
    label: 'filter.date.yesterday',
  },
  {
    value: DateFilter.THIS_WEEK,
    label: 'filter.date.thisWeek',
  },
  {
    value: DateFilter.LAST_WEEK,
    label: 'filter.date.lastWeek',
  },
  {
    value: DateFilter.THIS_MONTH,
    label: 'filter.date.thisMonth',
  },
  {
    value: DateFilter.CUSTOM,
    label: 'filter.date.custom',
  },
]

export const getDateRange = (
  value: string
): { startDate: Date; endDate: Date } => {
  let startDate: Date
  let endDate: Date

  switch (value) {
    case DateFilter.TODAY:
      startDate = dayjs().startOf('date').toDate()
      endDate = dayjs().endOf('date').toDate()
      return { startDate, endDate }

    case DateFilter.YESTERDAY:
      startDate = dayjs().subtract(1, 'day').startOf('date').toDate()
      endDate = dayjs().subtract(1, 'day').endOf('date').toDate()
      return { startDate, endDate }

    case DateFilter.THIS_WEEK:
      startDate = dayjs().startOf('week').toDate()
      endDate = dayjs().endOf('date').toDate()
      return { startDate, endDate }

    case DateFilter.LAST_WEEK:
      startDate = dayjs().subtract(1, 'week').startOf('week').toDate()
      endDate = dayjs().subtract(1, 'week').endOf('week').toDate()
      return { startDate, endDate }

    case DateFilter.THIS_MONTH:
      startDate = dayjs().startOf('month').toDate()
      endDate = dayjs().endOf('date').toDate()
      return { startDate, endDate }

    case DateFilter.CUSTOM:
      return { startDate: undefined, endDate: undefined }

    default:
      startDate = dayjs().startOf('date').toDate()
      endDate = dayjs().endOf('date').toDate()
      return { startDate, endDate }
  }
}

// Transaction Type
export enum TypeFilter {
  ALL = '',
  ADJUSTMENT = 1,
  TRANSFER = 2,
  WITHDRAW = 3,
  COMMISSION = 4,
}

export const TypeFilterOptions = [
  {
    value: TypeFilter.ALL,
    label: 'common.all',
  },
  {
    value: TypeFilter.COMMISSION,
    label: 'filter.type.commission',
  },
  {
    value: TypeFilter.TRANSFER,
    label: 'filter.type.transfer',
  },
  {
    value: TypeFilter.WITHDRAW,
    label: 'filter.type.withdraw',
  },
  {
    value: TypeFilter.ADJUSTMENT,
    label: 'filter.type.adjustment',
  },
]

// Shareholder Type
export enum ShareholderStatusFilter {
  ALL = '',
  ACTIVE = '0',
  INACTIVE = '1',
}

export const ShareholderStatusFilterOptions = [
  {
    value: ShareholderStatusFilter.ALL,
    label: 'common.all',
  },
  {
    value: ShareholderStatusFilter.ACTIVE,
    label: 'common.active',
  },
  {
    value: ShareholderStatusFilter.INACTIVE,
    label: 'common.suspended',
  },
]

// Earning
export const EarningOptions = [
  {
    value: 100,
    label: '100',
  },
  {
    value: 95,
    label: '95',
  },
  {
    value: 90,
    label: '90',
  },
  {
    value: 85,
    label: '85',
  },
  {
    value: 80,
    label: '80',
  },
  {
    value: 75,
    label: '75',
  },
  {
    value: 70,
    label: '70',
  },
  {
    value: 65,
    label: '65',
  },
  {
    value: 60,
    label: '60',
  },
  {
    value: 55,
    label: '55',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 45,
    label: '45',
  },
  {
    value: 40,
    label: '40',
  },
  {
    value: 35,
    label: '35',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 25,
    label: '25',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 15,
    label: '15',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 0,
    label: '0',
  },
]
