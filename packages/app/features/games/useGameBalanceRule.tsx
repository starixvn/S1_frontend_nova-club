import { useAppSelector } from 'app/provider/redux/store'
import { useState, useRef, useEffect, useCallback } from 'react'
import {
  usePlayerWalletDetailQuery,
  useTransferAllToOneMutation,
  usePlayerBalanceQuery,
} from 'services/walletApi'

type WalletDetail = {
  isMaintenance: boolean
  id: number
  seamless: number
}

export default function useGameBalanceRule() {
  const [isBalanceReady, setBalanceReady] = useState(true)
  const [isTransferTriggered, setisTransferTriggered] = useState(false)
  const currentProvider = useRef<string | undefined>()

  const { walletDetails } = usePlayerWalletDetailQuery(undefined, {
    selectFromResult: (d) => {
      const detailResponse = d.data?.data ?? {}
      return {
        ...d,
        walletDetails: Object.keys(detailResponse).reduce((acc, id) => {
          const detail = detailResponse[id]
          return {
            ...acc,
            [detail?.system_code ?? '']: {
              isMaintenance:
                (detail?.maintenance && detail.maintenance === 'true') ?? false,
              id: Number(id),
              seamless: detail?.seamless ?? 0,
            },
          }
        }, {}) as Record<string, WalletDetail>,
      }
    },
  })

  const targetProvider = useAppSelector((s) => s.gameLauncher.providerCode)
  if (targetProvider) currentProvider.current = targetProvider

  // to persist the value when launcher cleared the provider
  const isSeamless = !walletDetails
    ? true
    : walletDetails[currentProvider.current ?? '']?.seamless

  const balanceQuery = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: !isTransferringToMain && !isTransferTriggered, // if transferAllToOne is fetching, playerBalance cannot be called
  })

  const {
    data: playerBalance,
    isLoading,
    isFetching: isCheckingBalance,
    refetch,
  } = balanceQuery

  async function transferToGame() {
    // transfer single vendor wallet to main wallet
    const mainBalance = playerBalance?.data?.main.balance
    try {
      if (mainBalance != null && walletDetails) {
        if (!isSeamless && Number(mainBalance) > 0) {
          await transferAllToOne({
            transfer_from: 0,
            transfer_to: walletDetails[currentProvider.current ?? '']?.id ?? 0,
          }).unwrap()
        }
      }
    } catch (error) {
      throw error
    }
  }

  const isTargetProviderMaintenance =
    walletDetails && currentProvider.current
      ? walletDetails[currentProvider.current]?.isMaintenance
      : false

  return {
    // Ready when done translfer all
    refreshWallet: refetch,
    isWalletDetailsAvailable: !!walletDetails,
    isSeamless,
    isBalanceReady,
    isCheckingBalance,
    isGameMaintenance: isTargetProviderMaintenance,
    transferAllToMain,
    transferToGame,
    playerBalance: playerBalance?.data,
    currentProvider: currentProvider.current,
  }
}
