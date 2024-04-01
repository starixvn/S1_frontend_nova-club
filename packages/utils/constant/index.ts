export const HEADER_HEIGHT = 60

export enum LANGUAGE_CODE {
  ENGLISH = 'en',
  VIETNAM = 'vi',
  THAILAND = 'th',
}

export enum LANGUAGE_NAMESPACE {
  MEMBER = 'Member',
  AGENT = 'Agent',
}

export const LANGUAGE_SUBTAG = {
  [LANGUAGE_CODE.ENGLISH]: 'en',
  [LANGUAGE_CODE.VIETNAM]: 'vi',
  [LANGUAGE_CODE.THAILAND]: 'th',
}

//For Desktop Scroll to Content offset and configuration
export const CONTENT_FROM_TOP = 120
export const CONTENT_FROM_TOP_2 = 130
export const SCROLL_OFFSET_TOP = 10
export const HEADER_HEIGHT_OFFSET = 125

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
  THB = 'THB',
  // RMB = 13,
  // IDR = 15,
  VND = 'VND',
  // CRYPTO = 96,
}

export const DEFAULT_CURRENCY = Currency.VND

export const CURRENCY_TO_LANGUAGE = {
  [Currency.VND]: LANGUAGE_CODE.VIETNAM,
  [Currency.THB]: LANGUAGE_CODE.THAILAND,
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
  [LANGUAGE_CODE.THAILAND]: {
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
  REBATE = 'rewards', // Label renamed to Rebate
  REFERRAL = 'referral',
  TRANSFER = 'transfer',
  ADJUSTMENT = 'adjustment',
  GAME = 'game',
  BONUS = 'bonus',
  COIN = 'coin',
}

export enum ReportBonusType {
  BONUS = 9,
}

export const ReportTransactionTypeOptions = [
  {
    value: ReportTransactionType.DEPOSIT,
    label: 'deposit.depositTitle',
  },
  {
    value: ReportTransactionType.WITHDRAWAL,
    label: 'withdrawal.withdrawalTitle',
  },
  {
    value: ReportTransactionType.REBATE,
    label: 'filter.transactionType.rebate',
  },
  {
    value: ReportTransactionType.REFERRAL,
    label: 'referral.title',
  },
  {
    value: ReportTransactionType.TRANSFER,
    label: 'transfer.transferTitle',
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
    label: 'common.bonus',
  },
]

export enum CoinRedemptionType {
  EARN = 'earn',
  REDEEM = 'redeem',
}

export const CoinRedemptionTypeOptions = [
  {
    value: '',
    label: 'common.all',
  },
  {
    value: CoinRedemptionType.EARN,
    label: 'common.earn',
  },
  {
    value: CoinRedemptionType.REDEEM,
    label: 'common.redeem',
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
    label: 'common.all',
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
  MEGAWAY = 'megaway',
  RECOMMENDED = 'recommended',
}
export const SlotTypeOptions = [
  {
    value: SlotType.ALL,
    label: 'common.all',
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
  CARD = 23,
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

export const DEPOSIT_NOTES = [
  'notes.deposit.n1',
  'notes.deposit.n2',
  'notes.deposit.n3',
  'notes.deposit.n4',
  'notes.deposit.n5',
  'notes.deposit.n6',
]

export const WITHDRAWAL_NOTES = [
  'notes.withdrawal.n1',
  'notes.withdrawal.n2',
  'notes.withdrawal.n3',
  'notes.withdrawal.n4',
  'notes.withdrawal.n5',
]

export const TOPUP_NOTES = ['notes.topUpCard.n1', 'notes.topUpCard.n2']

export const TRANSFER_NOTES = ['notes.transfer.n1']

export const REWARDS_NOTES = [
  'notes.rewards.n1',
  'notes.rewards.n2',
  'notes.rewards.n3',
  'notes.rewards.n4',
  'notes.rewards.n5',
  'notes.rewards.n6',
]

export const CRYPTO_NOTES = ['notes.crypto.n1', 'notes.crypto.n2']
export const TURNOVER_NOTES = [
  'notes.turnover.n1',
  'notes.turnover.n2',
  'notes.turnover.n3',
  'notes.turnover.n4',
]

export const REWARD_HOW_TO_EARN_NOTES = [
  'rewards.earn.notes.n1',
  'rewards.earn.notes.n2',
  'rewards.earn.notes.n3',
]

export const REWARD_GENERAL_RULE_NOTES = [
  'rewards.rule.notes.n1',
  'rewards.rule.notes.n2',
  'rewards.rule.notes.n3',
  'rewards.rule.notes.n4',
  'rewards.rule.notes.n5',
  'rewards.rule.notes.n6',
  'rewards.rule.notes.n7',
  'rewards.rule.notes.n8',
  'rewards.rule.notes.n9',
]

export const REWARD_GRID_TITLE = [
  'rewards.grid.title.t1',
  'rewards.grid.title.t2',
  // 'rewards.grid.title.t3',
  'rewards.grid.title.t4',
]
export const REWARD_GRID_REQUIREMENT = [
  'rewards.grid.requirement.r1',
  'rewards.grid.requirement.r2',
  'rewards.grid.requirement.r3',
  'rewards.grid.requirement.r4',
]
export const REWARD_GRID_COIN = [
  'rewards.grid.coins.c1',
  'rewards.grid.coins.c2',
  'rewards.grid.coins.c3',
  'rewards.grid.coins.c4',
]

export const GRID_ROW = [
  {
    earn: 'rewards.grid.title.t1',
    requirement: 'rewards.grid.requirement.r1',
    coin: 'rewards.grid.coins.c1',
    details: [
      'rewards.grid.details.d1.n1',
      'rewards.grid.details.d1.n2',
      'rewards.grid.details.d1.n3',
      'rewards.grid.details.d1.n4',
      'rewards.grid.details.d1.n5',
    ],
  },
  {
    earn: 'rewards.grid.title.t2',
    requirement: 'rewards.grid.requirement.r2',
    coin: 'rewards.grid.coins.c2',
    details: [
      'rewards.grid.details.d2.n1',
      'rewards.grid.details.d2.n2',
      'rewards.grid.details.d2.n3',
      'rewards.grid.details.d2.n4',
      'rewards.grid.details.d2.n5',
    ],
  },
  // {
  //   earn: 'rewards.grid.title.t3',
  //   requirement: 'rewards.grid.requirement.r3',
  //   coin: 'rewards.grid.coins.c3',
  //   details: [
  //     'rewards.grid.details.d3.n1',
  //     'rewards.grid.details.d3.n2',
  //     'rewards.grid.details.d3.n3',
  //     'rewards.grid.details.d3.n4',
  //     'rewards.grid.details.d3.n5',
  //   ],
  // },
  {
    earn: 'rewards.grid.title.t4',
    requirement: 'rewards.grid.requirement.r4',
    coin: 'rewards.grid.coins.c4',
    details: [
      'rewards.grid.details.d4.n1',
      'rewards.grid.details.d4.n2',
      'rewards.grid.details.d4.n3',
      'rewards.grid.details.d4.n4',
      'rewards.grid.details.d4.n5',
      'rewards.grid.details.d4.n6',
    ],
  },
]

export const MSYTERY_INTRO = [
  'event.mystery.intro.n1',
  'event.mystery.intro.n2',
  'event.mystery.intro.n3',
  'event.mystery.intro.n4',
  'event.mystery.intro.n5',
]

export const MYSTERY_DROPS_TNC = [
  'notes.mystery.n1',
  'notes.mystery.n2',
  'notes.mystery.n3',
  'notes.mystery.n4',
  'notes.mystery.n5',
  'notes.mystery.n6',
  'notes.mystery.n7',
  'notes.mystery.n8',
  'notes.mystery.n9',
  'notes.mystery.n10',
  'notes.mystery.n11',
  'notes.mystery.n11a',
  'notes.mystery.n12',
  'notes.mystery.n13',
  'notes.mystery.n14',
  'notes.mystery.n15',
  'notes.mystery.n16',
  'notes.mystery.n17',
  'notes.mystery.n18',
  'notes.mystery.n19',
  'notes.mystery.n20',
]

export const RETARGETING_TNC = [
  'tnc.retargeting.n1',
  'tnc.retargeting.n2',
  'tnc.retargeting.n3',
  'tnc.retargeting.n4',
  'tnc.retargeting.n5',
  'tnc.retargeting.n7',
  'tnc.retargeting.n8',
  'tnc.retargeting.n9',
]

export const ALL = 'ALL'
export const HOT = 'hot'

export enum ProviderImageCategory {
  LiveCasino = 'livecasino',
  Games = 'games',
  Slot = 'slot',
}

export enum ERROR_CODE {
  INVALID_OTP = 10021,
}
