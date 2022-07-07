const enum BANK_NAME {
  ACB,
  AGB,
  BIDV,
  EXIM,
  HDB,
  MB,
  SACOM,
  SGCB,
  TCB,
  VCB,
  VTB,
}

export const BANK_LOGO: { [key in keyof typeof BANK_NAME] } = {
  ACB: {
    bank_code: 'ACB',
    image: require('app/assets/images/bank/ACB.jpg'),
  },
  AGB: {
    bank_code: 'AGB',
    image: require('app/assets/images/bank/AGB.jpg'),
  },
  BIDV: {
    bank_code: 'BIDV',
    image: require('app/assets/images/bank/BIDV.jpg'),
  },
  EXIM: {
    bank_code: 'EXIM',
    image: require('app/assets/images/bank/EXIM.jpg'),
  },
  HDB: {
    bank_code: 'HDB',
    image: require('app/assets/images/bank/HDB.jpg'),
  },
  MB: {
    bank_code: 'MB',
    image: require('app/assets/images/bank/MB.jpg'),
  },
  SACOM: {
    bank_code: 'SACOM',
    image: require('app/assets/images/bank/SACOM.jpg'),
  },
  SGCB: {
    bank_code: 'SGCB',
    image: require('app/assets/images/bank/SGCB.jpg'),
  },
  TCB: {
    bank_code: 'TCB',
    image: require('app/assets/images/bank/TCB.jpg'),
  },
  VCB: {
    bank_code: 'VCB',
    image: require('app/assets/images/bank/VCB.jpg'),
  },
  VTB: {
    bank_code: 'VTB',
    image: require('app/assets/images/bank/VTB.jpg'),
  },
}

const BankLogo = [
  BANK_LOGO.ACB,
  BANK_LOGO.AGB,
  BANK_LOGO.BIDV,
  BANK_LOGO.EXIM,
  BANK_LOGO.HDB,
  BANK_LOGO.MB,
  BANK_LOGO.SACOM,
  BANK_LOGO.SGCB,
  BANK_LOGO.TCB,
  BANK_LOGO.VCB,
  BANK_LOGO.VTB,
]

export const getBankLogo = (bankCode: string) => {
  const logo = BankLogo.find((el) => el.bank_code === bankCode)?.image

  return logo ?? require('app/assets/images/home/fishing.png')
}

export default BankLogo
