import { useAgentProfileQuery } from 'agent/services/agentApi'
import { useShareholderProfileQuery } from 'agent/services/shareholderApi'
import { useUserInfoQuery } from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import { Currency } from 'app/utils/constant'
import React from 'react'

const useGetProfile = () => {
  const { role } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      role: data?.role,
    }),
  })
  const isAgent = role === ROLE.AGENT

  const { shareholderProfile, shareholderCurrency, shareholderLoading } =
    useShareholderProfileQuery(undefined, {
      selectFromResult: ({ data, isLoading }) => ({
        shareholderLoading: isLoading,
        shareholderProfile: data?.result?.data,
        shareholderCurrency: data?.result?.data.currency as Currency,
      }),
      refetchOnMountOrArgChange: true,
      skip: role ? isAgent : true,
    })

  const { agentProfile, agentCurrency, agentLoading } = useAgentProfileQuery(
    undefined,
    {
      selectFromResult: ({ data, isLoading }) => ({
        agentLoading: isLoading,
        agentProfile: data?.result?.data,
        agentCurrency: data?.result?.data.currency as Currency,
      }),
      refetchOnMountOrArgChange: true,
      skip: role ? !isAgent : true,
    }
  )

  const profile = isAgent ? agentProfile : shareholderProfile
  const loading = isAgent ? agentLoading : shareholderLoading
  const currency = isAgent ? agentCurrency : shareholderCurrency ?? Currency.VND

  return {
    profile,
    loading,
    currency,
  }
}

export default useGetProfile
