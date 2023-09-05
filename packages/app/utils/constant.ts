import { getProviderLogo } from 'app/config/games/provider'
import { ReportGameStatus } from 'utils/constant'

export const ReportGameStatusOptions = [
  {
    value: ReportGameStatus.ALL,
    label: 'common.all',
    icon: getProviderLogo(ReportGameStatus.ALL),
  },
  {
    value: ReportGameStatus.WIN,
    label: 'filter.gameStatus.win',
  },
  {
    value: ReportGameStatus.LOSS,
    label: 'filter.gameStatus.loss',
  },
]
