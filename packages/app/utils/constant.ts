export const currencyListMapper: { [key: number]: string } = {
  2: 'MYR',
  4: 'THB',
  13: 'RMB',
  15: 'IDR',
  51: 'VND',
}

export enum Currency {
  MYR = 2,
  THB = 4,
  RMB = 13,
  IDR = 15,
  VND = 51,
  CRYPTO = 96,
}

export enum LANGUAGE_CODE {
  ENGLISH = 'en',
  VIETNAM = 'vn',
}

export enum PLATFORM_CODE {
  WEB = 0,
  APP = 1,
}

// Promotion
export const STATUS_RUNNING = 1
export const STATUS_CANCELLED = 2
export const STATUS_FULFILLED = 4
export const STATUS_TRANSFER_OUT = 5

//Player Report
export enum DateFilter {
  TODAY = 'Today',
  YESTERDAY = 'Yesterday',
  THIS_WEEK = 'This Week',
  LAST_WEEK = 'Last Week',
  THIS_MONTH = 'This Month',
  CUSTOM = 'Custom',
}

export enum ReportTransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  REWARD = 'reward',
}

export enum ReportStatusDeposit {
  ALL = 'all',
  PENDING = 'pending',
  SETTLED_ON_BROWSER = 'settledonBrowser',
  SETTLED = 'settled',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
  DECLINED = 'declined',
  CHECKING = 'checking',
}

export enum ReportStatusWithdrawal {
  ALL = 'all',
  REQUEST = 'request',
  PENDING_REVIEW = 'pendingReview',
  DECLINED = 'declined',
  PAID = 'paid',
  PAYMENT_PROCESSING = 'paymentProcessing',
  PAYMENT = 'payment',
}

export enum ReportGameStatus {
  ALL = 'All',
  WIN = 'Win',
  LOSE = 'Lose',
}

export enum GameProvider {
  AG = 'Asia Gaming',
  EBET = 'eBET',
  AB = 'All Bet',
  PT = 'Play Tech',
  BG = 'Big Gaming',
  BBIN = 'bbin',
  OB = 'OB',
  TG = 'Top Gaming',
  EV = 'Evolution',
  PP = 'Pragmatic Play',
  MG = 'Microgaming',
  NL = 'N2-Live',
  DG = 'Dream Gaming',
  AE_SEXY = 'AE Sexy',
  SA = 'SA Gaming Bet',
  SG = 'Skywind Group',
}
