import { usePlayerWalletDetailQuery } from 'services/walletApi'

export function useMaintenanceStatus() {
  const { gameMaintenanceStatus } = usePlayerWalletDetailQuery(undefined, {
    selectFromResult: (d) => {
      const detailResponse = d.data?.data
      return detailResponse
        ? {
            ...d,
            gameMaintenanceStatus: Object.keys(detailResponse).reduce(
              (acc, id) => {
                const detail = detailResponse[id]
                return detail
                  ? {
                      ...acc,
                      [detail.system_code]: detail.maintenance === 'true',
                    }
                  : acc
              },
              {}
            ) as Record<string, boolean>,
          }
        : {
            ...d,
            gameMaintenanceStatus: {},
          }
    },
  })

  function checkMaintenance(providerCode: string) {
    return !!gameMaintenanceStatus[providerCode]
  }

  return { checkMaintenance }
}
