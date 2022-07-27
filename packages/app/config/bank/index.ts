const enum BANK_NAME {
  ABBANK,
  ACB,
  AGB,
  BIDV,
  DongABank,
  EIB,
  EXIM,
  GPBank,
  HDB,
  MB,
  NamABank,
  Oceanbank,
  PGBank,
  SACOM,
  Saigonbank,
  SCB,
  SGCB,
  SHB,
  STB,
  TCB,
  TPB,
  VAB,
  VCB,
  VIB,
  Vietinbank,
  VPB,
  VTB,
}

export const BANK_LOGO: { [key in keyof typeof BANK_NAME] } = {
  ABBANK: {
    bank_code: 'ABBANK',
    image: require('../../assets/images/bank/ABBANK.jpg'),
  },
  ACB: {
    bank_code: 'ACB',
    image: require('../../assets/images/bank/ACB.jpg'),
  },
  AGB: {
    bank_code: 'AGB',
    image: require('../../assets/images/bank/AGB.jpg'),
  },
  BIDV: {
    bank_code: 'BIDV',
    image: require('../../assets/images/bank/BIDV.jpg'),
  },
  DongABank: {
    bank_code: 'DongABank',
    image: require('../../assets/images/bank/DongABank.jpg'),
  },
  EIB: {
    bank_code: 'EIB',
    image: require('../../assets/images/bank/EIB.jpg'),
  },
  EXIM: {
    bank_code: 'EXIM',
    image: require('../../assets/images/bank/EXIM.jpg'),
  },
  GPBank: {
    bank_code: 'GPBank',
    image: require('../../assets/images/bank/GPBank.jpg'),
  },
  HDB: {
    bank_code: 'HDB',
    image: require('../../assets/images/bank/HDB.jpg'),
  },
  MB: {
    bank_code: 'MB',
    image: require('../../assets/images/bank/MB.jpg'),
  },
  NamABank: {
    bank_code: 'NamABank',
    image: require('../../assets/images/bank/NamABank.jpg'),
  },
  Oceanbank: {
    bank_code: 'Oceanbank',
    image: require('../../assets/images/bank/Oceanbank.jpg'),
  },
  PGBank: {
    bank_code: 'PG Bank',
    image: require('../../assets/images/bank/PG-Bank.jpg'),
  },
  SACOM: {
    bank_code: 'SACOM',
    image: require('../../assets/images/bank/SACOM.jpg'),
  },
  Saigonbank: {
    bank_code: 'Saigonbank',
    image: require('../../assets/images/bank/Saigonbank.jpg'),
  },
  SCB: {
    bank_code: 'SCB',
    image: require('../../assets/images/bank/SCB.jpg'),
  },
  SGCB: {
    bank_code: 'SGCB',
    image: require('../../assets/images/bank/SGCB.jpg'),
  },
  SHB: {
    bank_code: 'SHB',
    image: require('../../assets/images/bank/SHB.jpg'),
  },
  STB: {
    bank_code: 'STB',
    image: require('../../assets/images/bank/STB.jpg'),
  },
  TCB: {
    bank_code: 'TCB',
    image: require('../../assets/images/bank/TCB.jpg'),
  },
  TPB: {
    bank_code: 'TPB',
    image: require('../../assets/images/bank/TPB.jpg'),
  },
  VAB: {
    bank_code: 'VAB',
    image: require('../../assets/images/bank/VAB.jpg'),
  },
  VCB: {
    bank_code: 'VCB',
    image: require('../../assets/images/bank/VCB.jpg'),
  },
  VIB: {
    bank_code: 'VIB',
    image: require('../../assets/images/bank/VIB.jpg'),
  },
  Vietinbank: {
    bank_code: 'Vietinbank',
    image: require('../../assets/images/bank/Vietinbank.jpg'),
  },
  VPB: {
    bank_code: 'VPB',
    image: require('../../assets/images/bank/VPB.jpg'),
  },
  VTB: {
    bank_code: 'VTB',
    image: require('../../assets/images/bank/VTB.jpg'),
  },
}

const BankLogo = [
  BANK_LOGO.ABBANK,
  BANK_LOGO.ACB,
  BANK_LOGO.AGB,
  BANK_LOGO.BIDV,
  BANK_LOGO.DongABank,
  BANK_LOGO.EIB,
  BANK_LOGO.EXIM,
  BANK_LOGO.GPBank,
  BANK_LOGO.HDB,
  BANK_LOGO.MB,
  BANK_LOGO.NamABank,
  BANK_LOGO.Oceanbank,
  BANK_LOGO.PGBank,
  BANK_LOGO.SACOM,
  BANK_LOGO.Saigonbank,
  BANK_LOGO.SCB,
  BANK_LOGO.SGCB,
  BANK_LOGO.SHB,
  BANK_LOGO.STB,
  BANK_LOGO.TCB,
  BANK_LOGO.TPB,
  BANK_LOGO.VAB,
  BANK_LOGO.VCB,
  BANK_LOGO.VIB,
  BANK_LOGO.Vietinbank,
  BANK_LOGO.VPB,
  BANK_LOGO.VTB,
]

export const getBankLogo = (bankCode: string) => {
  const logo = BankLogo.find(
    (el) => el.bank_code.toLowerCase() === bankCode.toLowerCase().trim()
  )?.image

  return logo ?? require('../../assets/images/home/fishing.jpg')
}

export default BankLogo
