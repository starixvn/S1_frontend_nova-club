export const HEADER_HEIGHT = 60

export enum LANGUAGE_CODE {
  ENGLISH = 'en',
  VIETNAM = 'vi',
}

export const LANGUAGE_SUBTAG = {
  [LANGUAGE_CODE.ENGLISH]: 'en',
  [LANGUAGE_CODE.VIETNAM]: 'vi',
}

export const LOGOUT_ACTION = 'LOGOUT'

//App Device OS
export const APP_DEVICE_IOS = 'iOS'
export const APP_DEVICE_ANDROID = 'Android'

export const currencyListMapper: { [key: number]: string } = {
  2: 'MYR',
  4: 'THB',
  13: 'RMB',
  15: 'IDR',
  51: 'VND',
}

export enum Currency {
  // MYR = 2,
  // THB = 4,
  // RMB = 13,
  // IDR = 15,
  VND = 'VND',
  // CRYPTO = 96,
}

export const CURRENCY_TO_LANGUAGE = {
  [Currency.VND]: LANGUAGE_CODE.VIETNAM,
}

export const CURRENCY_SEPARATOR = {
  [LANGUAGE_CODE.ENGLISH]: {
    decimal: '.',
    thousands: ',',
  },
  [LANGUAGE_CODE.VIETNAM]: {
    decimal: '.',
    thousands: ',',
  },
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

export const DateFilterOptions = [
  {
    value: DateFilter.TODAY,
    label: 'filter.date.today',
  },
  {
    value: DateFilter.YESTERDAY,
    label: 'filter.date.yesterday',
  },
  {
    value: DateFilter.THIS_WEEK,
    label: 'filter.date.thisWeek',
  },
  {
    value: DateFilter.LAST_WEEK,
    label: 'filter.date.lastWeek',
  },
  {
    value: DateFilter.THIS_MONTH,
    label: 'filter.date.thisMonth',
  },
  {
    value: DateFilter.CUSTOM,
    label: 'filter.date.custom',
  },
]

export enum ReportTransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  REWARDS = 'rewards', // Label renamed to Rebate
  REFERRAL = 'referral',
  TRANSFER = 'transfer',
  ADJUSTMENT = 'adjustment',
  GAME = 'game',
  BONUS = 'bonus',
}

export enum ReportBonusType {
  BONUS = 9,
}

export const ReportTransactionTypeOptions = [
  {
    value: ReportTransactionType.DEPOSIT,
    label: 'filter.transactionType.deposit',
  },
  {
    value: ReportTransactionType.WITHDRAWAL,
    label: 'filter.transactionType.withdrawal',
  },
  {
    value: ReportTransactionType.REWARDS,
    label: 'filter.transactionType.rebate',
  },
  {
    value: ReportTransactionType.REFERRAL,
    label: 'menu.referral',
  },
  {
    value: ReportTransactionType.TRANSFER,
    label: 'menu.transfer',
  },
  {
    value: ReportTransactionType.ADJUSTMENT,
    label: 'filter.transactionType.adjustment',
  },
  // {
  //   value: ReportTransactionType.GAME,
  //   label: 'filter.transactionType.game',
  // },
  {
    value: ReportTransactionType.BONUS,
    label: 'filter.transactionType.bonus',
  },
]

export enum ReportDepositStatus {
  ALL = 'all',
  PENDING = 'pending',
  SETTLED_ON_BROWSER = 'settledonBrowser',
  SETTLED = 'settled',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
  DECLINED = 'declined',
  CHECKING = 'checking',
}

export enum ReportCommonStatus {
  ALL = 'all',
  PENDING = 'pending',
  APPROVED = 'approved',
  DECLINED = 'declined',
}

export const ReportCommonStatusOptions = [
  {
    value: ReportCommonStatus.ALL,
    label: 'common.all',
  },
  {
    value: ReportCommonStatus.PENDING,
    label: 'status.pending',
  },
  {
    value: ReportCommonStatus.APPROVED,
    label: 'status.success',
  },
  {
    value: ReportCommonStatus.DECLINED,
    label: 'status.rejected',
  },
]

export const ReportDepositStatusOptions = [
  {
    value: ReportDepositStatus.ALL,
    label: 'filter.depositStatus.all',
  },
  {
    value: ReportDepositStatus.PENDING,
    label: 'filter.depositStatus.pending',
  },
  {
    value: ReportDepositStatus.SETTLED_ON_BROWSER,
    label: 'filter.depositStatus.settledonBrowser',
  },
  {
    value: ReportDepositStatus.SETTLED,
    label: 'filter.depositStatus.settled',
  },
  {
    value: ReportDepositStatus.CANCELLED,
    label: 'filter.depositStatus.cancelled',
  },
  {
    value: ReportDepositStatus.FAILED,
    label: 'filter.depositStatus.failed',
  },
  {
    value: ReportDepositStatus.DECLINED,
    label: 'filter.depositStatus.declined',
  },
  {
    value: ReportDepositStatus.CHECKING,
    label: 'filter.depositStatus.checking',
  },
]

export enum ReportWithdrawalStatus {
  ALL = 'all',
  REQUEST = 'request',
  PENDING_REVIEW = 'pendingReview',
  DECLINED = 'declined',
  PAID = 'paid',
  PAYMENT_PROCESSING = 'paymentProcessing',
  PAYMENT = 'payment',
}

export const ReportWithdrawalStatusOptions = [
  {
    value: ReportWithdrawalStatus.ALL,
    label: 'filter.withdrawalStatus.all',
  },
  {
    value: ReportWithdrawalStatus.REQUEST,
    label: 'filter.withdrawalStatus.request',
  },
  {
    value: ReportWithdrawalStatus.PENDING_REVIEW,
    label: 'filter.withdrawalStatus.pendingReview',
  },
  {
    value: ReportWithdrawalStatus.DECLINED,
    label: 'filter.withdrawalStatus.declined',
  },
  {
    value: ReportWithdrawalStatus.PAID,
    label: 'filter.withdrawalStatus.paid',
  },
  {
    value: ReportWithdrawalStatus.PAYMENT_PROCESSING,
    label: 'filter.withdrawalStatus.paymentProcessing',
  },
  {
    value: ReportWithdrawalStatus.PAYMENT,
    label: 'filter.withdrawalStatus.payment',
  },
]

export enum ReportGameStatus {
  ALL = 'all',
  WIN = 'win',
  LOSS = 'loss',
}

// export const ReportGameStatusOptions = [
//   {
//     value: ReportGameStatus.ALL,
//     label: 'common.all',
//     icon: getProviderLogo(ReportGameStatus.ALL),
//   },
//   {
//     value: ReportGameStatus.WIN,
//     label: 'filter.gameStatus.win',
//   },
//   {
//     value: ReportGameStatus.LOSS,
//     label: 'filter.gameStatus.loss',
//   },
// ]

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

export enum SlotType {
  ALL = 'all',
  NEW = 'new',
  HOT = 'hot',
  JACKPOT = 'jackpot',
}
export const SlotTypeOptions = [
  {
    value: SlotType.ALL,
    label: 'filter.genre.all',
  },
  {
    value: SlotType.NEW,
    label: 'filter.genre.new',
  },
  {
    value: SlotType.HOT,
    label: 'filter.genre.hot',
  },
  {
    value: SlotType.JACKPOT,
    label: 'filter.genre.jackpot',
  },
]

export enum LiveCasinoGenre {
  ALL = 'all',
  SICBO = 'sicbo',
  POKER = 'poker',
  ROULETTE = 'roulette',
  BLACKJACK = 'blackjack',
  BACCARAT = 'baccarat',
  DRAGON_TIGER = 'dragonTiger',
}

export const LiveCasinoGenreOptions = [
  {
    value: LiveCasinoGenre.ALL,
    label: 'filter.genre.all',
  },
  {
    value: LiveCasinoGenre.SICBO,
    label: 'filter.genre.sicbo',
  },
  {
    value: LiveCasinoGenre.POKER,
    label: 'filter.genre.poker',
  },
  {
    value: LiveCasinoGenre.ROULETTE,
    label: 'filter.genre.roulette',
  },
  {
    value: LiveCasinoGenre.BLACKJACK,
    label: 'filter.genre.blackjack',
  },
  {
    value: LiveCasinoGenre.BACCARAT,
    label: 'filter.genre.baccarat',
  },
  {
    value: LiveCasinoGenre.DRAGON_TIGER,
    label: 'filter.genre.dragonTiger',
  },
]

export enum TopUpCard {
  MOBIFONE = 'Mobi',
  VIETTEL = 'VT',
  VINAPHONE = 'Vina',
}

export enum WALLET {
  MAIN_WALLET,
}

export enum MaxLength {
  AMOUNT = 9,
  CARD = 19,
}

export enum GAME_TYPE_CODE {
  E_SPORTS = 'e_sports',
  FISHING = 'fishing',
  LIVE_DEALER = 'live_dealer',
  SLOTS = 'slots',
  SPORTS = 'sports',
  P2P = 'P2P',
  LOTTERY = 'lottery',
  VIRTUAL_SPORTS = 'virtual_sports',
  GAMES = 'games',
  COCKFIGHTING = 'cockfighting',
  CARD_GAME = 'card_game',
}

export enum GDC_GAME_CATEGORY {
  CARDGAME = 'cardgame',
}

export enum GAME_TAGS {
  NEW = 'new',
  HOT = 'hot',
  DESKTOP = 'desktop',
}
