import { useAppSelector } from 'app/provider/redux/store'
import { useGameProviderListQuery } from 'services/gameApi'

export function useMaintenanceStatus() {
  const currency = useAppSelector((s) => s.setting.currency)
  const { data } = useGameProviderListQuery(currency)

  function checkMaintenance(providerCode: string) {
    // checkMaintenance only return false if the providerCode matched and its maintenance value is false

    return !(data && data[providerCode]?.maintenance == false)
  }

  return { checkMaintenance }
}
