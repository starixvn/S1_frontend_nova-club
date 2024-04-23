import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { toCleanCard } from 'app/utils'
import React, { useMemo } from 'react'
import { usePlayerBankQuery } from 'services/bank'
import { SelectOptions } from 'services/common/types'

type Props = {}

export default function useWithdrawalBankSelection() {
  const { data, isLoading } = usePlayerBankQuery()

  const bankSelections: SelectOptions[] = useMemo(() => {
    if (data) {
      return data.map((bank, index) => {
        return {
          label: toCleanCard(bank.BankAccountNumber),
          value: bank.BankAccountNumber,
          icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${bank.BankIcon}`,
        }
      })
    } else return [] as SelectOptions[]
  }, [data])

  return { playerBankList: data, isLoading, bankSelections }
}
