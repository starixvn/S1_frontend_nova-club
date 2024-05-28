import {
  ReportAdjustmentType,
  ReportCommonStatus,
  ReportDepositStatus,
  ReportWithdrawalStatus,
} from 'utils/constant'

export const getDepositStatusColor = (
  status: ReportDepositStatus = ReportDepositStatus.PENDING
) => {
  switch (status) {
    case ReportDepositStatus.SETTLED:
      return '$success'
    case ReportDepositStatus.CANCELLED:
      return '$accent'
    case ReportDepositStatus.FAILED:
    case ReportDepositStatus.DECLINED:
      return '$error'
    case ReportDepositStatus.PENDING:
    case ReportDepositStatus.SETTLED_ON_BROWSER:
    case ReportDepositStatus.CHECKING:
      return '$info'
    default:
      return '#FFF'
  }
}

export const getWithdrawalStatusColor = (status?: ReportWithdrawalStatus) => {
  switch (status) {
    case ReportWithdrawalStatus.APPROVED:
    case ReportWithdrawalStatus.PAID:
      return '$success'
    case ReportWithdrawalStatus.REQUIRE_CHECK:
      return '$accent'
    case ReportWithdrawalStatus.DECLINED:
      return '$error'
    case ReportWithdrawalStatus.REQUEST:
    case ReportWithdrawalStatus.PAYMENT_PROCESSING:
    case ReportWithdrawalStatus.PAYMENT:
    case ReportWithdrawalStatus.PROCESSING:
      return '$info'
    default:
      return '#FFF'
  }
}

export const getBonusStatusColor = (
  status: ReportCommonStatus = ReportCommonStatus.PENDING
) => {
  switch (status) {
    case ReportCommonStatus.APPROVED:
      return '$success'
    case ReportCommonStatus.PENDING:
      return '$info'
    default:
      return '#FFF'
  }
}

export const getAdjustmentAmountColor = (type?: ReportAdjustmentType) => {
  switch (type) {
    case ReportAdjustmentType.ADD_BALANCE:
      return '$success'

    case ReportAdjustmentType.SUBSTRACT_BALANCE:
      return '$error'

    default:
      return '#FFF'
  }
}

export const getAdjustmentAmountPrefix = (type?: ReportAdjustmentType) => {
  switch (type) {
    case ReportAdjustmentType.ADD_BALANCE:
      return '+'

    case ReportAdjustmentType.SUBSTRACT_BALANCE:
      return '-'

    default:
      return ''
  }
}
