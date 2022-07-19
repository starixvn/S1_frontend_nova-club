import { ReportDepositStatus } from 'app/utils/constant'
import { DripsyFinalTheme } from 'dripsy'

export const getStatusColor = (status: string, theme: DripsyFinalTheme) => {
  switch (status.toLowerCase()) {
    case ReportDepositStatus.SETTLED:
      return theme.colors.$success
    case ReportDepositStatus.CANCELLED:
      return theme.colors.$accent
    case ReportDepositStatus.FAILED:
      return theme.colors.$error
    case ReportDepositStatus.PENDING:
      return theme.colors.$info
    default:
      return '#FFF'
  }
}
