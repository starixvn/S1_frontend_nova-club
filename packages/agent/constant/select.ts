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
    value: TypeFilter.ADJUSTMENT,
    label: 'filter.type.adjustment',
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
    value: TypeFilter.COMMISSION,
    label: 'filter.type.commission',
  },
]

// Shareholder Type
export enum ShareholderStatusFilter {
  ALL = '',
  ACTIVE = '1',
  INACTIVE = '0',
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
    label: 'common.inactive',
  },
]

// Member Status
export enum MemberStatus {
  NORMAL = '0',
  BLOCK = '1',
  SUSPENDED = '5',
  SELF_EXCLUSION = '7',
  FAIL_LOGIN_ATTEMPT = '8',
}

export const getMemberStatus = (status) => {
  switch (status) {
    case MemberStatus.NORMAL:
      return 'filter.member.normal'
    case MemberStatus.BLOCK:
      return 'filter.member.block'
    case MemberStatus.SUSPENDED:
      return 'common.suspended'
    case MemberStatus.SELF_EXCLUSION:
      return 'filter.member.exclusion'
    case MemberStatus.FAIL_LOGIN_ATTEMPT:
      return 'filter.member.failLogin'

    default:
      return 'filter.member.normal'
  }
}
