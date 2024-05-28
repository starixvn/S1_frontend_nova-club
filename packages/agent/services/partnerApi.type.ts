import { Currency } from 'utils/constant'
import { UserTotalDownline } from './userApi.type'

export type AddNewPartnerArgs = {
  currency: {
    [key in Currency]?: {
      EARNP: string
      CASH: string
      CREDIT: string
    }
  }
  username: string
  password: string
  confirmpassword: string
}

export type AddNewPartnerResult = {
  password: string
  username: string
}

export type PartnerListArgs = {
  start: number
  length: number
  created_at?: string
  username?: string
  active?: string
}

export type PartnerListResult = {
  id: string
  username: string
  active: string
  earning_perc: string
  created_at: string
  currency: Currency
}

export type PartnerBalanceArgs = {
  id: string
}

export type PartnerBalanceResult = {
  wallet_bal_amt: {
    [key in Currency]?: string
  }
}

export interface PartnerDetailsArgs {
  id: string
}

export interface PartnerDetailsResult {
  id: string
  username: string
  name: string
  currency: string
  mobile_no: string
  email: string
  created_at: string
  lastlogin_at: string
  lastlogin_ip: string
  total_downline: UserTotalDownline
  earning_perc: {
    [key in Currency]: string
  }
}
