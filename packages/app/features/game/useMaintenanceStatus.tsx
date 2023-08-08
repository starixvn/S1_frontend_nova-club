import { useGameProviderListQuery } from 'services/gameApi'

export function useMaintenanceStatus() {
  const { data } = useGameProviderListQuery(undefined, {})

  function checkMaintenance(providerCode: string) {
    // checkMaintenance only return false if the providerCode matched and its maintenance value is false

    return !(data && data[providerCode]?.maintenance == false)
  }

  return { checkMaintenance }
}
