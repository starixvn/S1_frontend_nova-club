import { createApi } from '@reduxjs/toolkit/query/react'
import { agentAxiosBaseQuery } from './common/agentAxiosBaseQuery'

export const agentBaseApi = createApi({
  reducerPath: 'agentBaseApi',
  baseQuery: agentAxiosBaseQuery(),
  endpoints: () => ({}),
})

export const agentBaseApiWithTag = agentBaseApi.enhanceEndpoints({
  addTagTypes: [
    'agentAuth',
    'AgentCommission',
    'ShareholderCommission',
    'PartnerCommission',
    'TransactionReport',
    'Memberlist',
    'AgentList',
    'ShareholderList',
    'WalletAmount',
    'BankAccount',
    'ShareholderTransferHistory',
    'AgentTransferHistory',
    'WithdrawalHistory',
    'UserInfo',
    'Profile',
  ],
})
