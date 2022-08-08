const enum PROVIDER_NAME {
  ADVP,
  ALL,
  ALLB,
  BBIN,
  BGGG,
  BTI,
  CQ9,
  EBET,
  EVOL,
  HABA,
  JDBG,
  JILI,
  OBLE,
  PGSF,
  PRGP,
  PTV2,
  SABA,
  SEXY,
  SPGM,
  TCG,
  TFGM,
  SBO,
  IM,
}

export const PROVIDER_LOGO: { [key in keyof typeof PROVIDER_NAME] } = {
  ALL: {
    provider_code: 'ALL',
    image: require('../../../assets/images/provider/ALL.png'),
  },
  ADVP: {
    provider_code: 'ADVP',
    image: require('../../../assets/images/provider/AP.png'),
  },
  ALLB: {
    provider_code: 'ALLB',
    image: require('../../../assets/images/provider/Allbet.png'),
  },
  BBIN: {
    provider_code: 'BBIN',
    image: require('../../../assets/images/provider/bbin.png'),
  },
  BGGG: {
    provider_code: 'BGGG',
    image: require('../../../assets/images/provider/BG.png'),
  },
  BTI: {
    provider_code: 'BTI',
    image: require('../../../assets/images/provider/BTI.png'),
  },
  CQ9: {
    provider_code: 'CQ9',
    image: require('../../../assets/images/provider/CQ9.png'),
  },
  EBET: {
    provider_code: 'EBET',
    image: require('../../../assets/images/provider/Ebet.png'),
  },
  HABA: {
    provider_code: 'HABA',
    image: require('../../../assets/images/provider/Habanero.png'),
  },
  JDBG: {
    provider_code: 'JDBG',
    image: require('../../../assets/images/provider/JDB.png'),
  },
  JILI: {
    provider_code: 'JILI',
    image: require('../../../assets/images/provider/Jili.png'),
  },
  OBLE: {
    provider_code: 'OBLE',
    image: require('../../../assets/images/provider/OB.png'),
  },
  PGSF: {
    provider_code: 'PGSF',
    image: require('../../../assets/images/provider/PG.png'),
  },
  PRGP: {
    provider_code: 'PRGP',
    image: require('../../../assets/images/provider/PP.png'),
  },
  PTV2: {
    provider_code: 'PTV2',
    image: require('../../../assets/images/provider/PT.png'),
  },
  SABA: {
    provider_code: 'SABA',
    image: require('../../../assets/images/provider/SABA_SPORT.png'),
  },
  SEXY: {
    provider_code: 'SEXY',
    image: require('../../../assets/images/provider/AE.png'),
  },
  SPGM: {
    provider_code: 'SPGM',
    image: require('../../../assets/images/provider/SG.png'),
  },
  TCG: {
    provider_code: 'TCG',
    image: require('../../../assets/images/provider/TC.png'),
  },
  TFGM: {
    provider_code: 'TFGM',
    image: require('../../../assets/images/provider/TF.png'),
  },
  EVOL: {
    provider_code: 'EVOL',
    image: require('../../../assets/images/provider/EVOL.png'),
  },
  SBO: {
    provider_code: 'SBO',
    image: require('../../../assets/images/provider/SBO_BET.png'),
  },
  IM: {
    provider_code: 'IM',
    image: require('../../../assets/images/provider/IM.png'),
  },
}

const ProviderLogo = [
  PROVIDER_LOGO.ALL,
  PROVIDER_LOGO.ADVP,
  PROVIDER_LOGO.BGGG,
  PROVIDER_LOGO.ALLB,
  PROVIDER_LOGO.BBIN,
  PROVIDER_LOGO.BTI,
  PROVIDER_LOGO.CQ9,
  PROVIDER_LOGO.EBET,
  PROVIDER_LOGO.HABA,
  PROVIDER_LOGO.JDBG,
  PROVIDER_LOGO.JILI,
  PROVIDER_LOGO.OBLE,
  PROVIDER_LOGO.PGSF,
  PROVIDER_LOGO.PRGP,
  PROVIDER_LOGO.PTV2,
  PROVIDER_LOGO.SABA,
  PROVIDER_LOGO.SEXY,
  PROVIDER_LOGO.SPGM,
  PROVIDER_LOGO.TCG,
  PROVIDER_LOGO.TFGM,
  PROVIDER_LOGO.EVOL,
  PROVIDER_LOGO.SBO,
  PROVIDER_LOGO.IM,
]

export const getProviderLogo = (code: string) => {
  const logo = ProviderLogo.find((el) => el.provider_code === code)?.image

  return logo ?? require('../../../assets/images/provider/ALL.png')
}

export default ProviderLogo
