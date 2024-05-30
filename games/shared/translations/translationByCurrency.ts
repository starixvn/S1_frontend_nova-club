import { Currency } from 'utils/constant'

export const Translations = {
  [Currency.VND]: {
    congratulation: 'XIN CHÚC MỪNG!',
    spin: 'QUAY',
    start: 'BẮT ĐẦU',
    stop: 'DỪNG',
    total: 'TỔNG TIỀN THẮNG',
    match3ToWin: 'Ghép 3 để thắng',
    scratch3ToWin: 'TÌM       TRỨNG GIỐNG NHAU',
    next: 'CHƠI TIẾP',
    revealAll: 'TỰ ĐỘNG CÀO',
    tryAgainDoubleLine: 'THỬ\nLẠI',
    playNext: 'CHƠI TIẾ',
    won: 'BẠN ĐÃ TRÚNG THƯỞNG',
    youWon: 'Bạn nhận được',
    mini: 'KHUYẾN KHÍCH',
    major: 'LỘC PHÁT',
    grand: 'ĐẠI PHÁT',
  },
  [Currency.THB]: {
    congratulation: 'ยินดีด้วย!',
    spin: 'สปิน',
    start: 'เริ่ม',
    stop: 'หยุด',
    total: 'ชนะทั้งหมด',
    match3ToWin: 'จับคู่ 3 เพื่อชนะ',
    scratch3ToWin: 'บคู่           เพื่อชนะ',
    next: 'เล่นต่อไป',
    revealAll: 'เปิดทั้งหมด',
    tryAgainDoubleLine: 'ลองอีกครั้ง',
    playNext: 'เล่นต่อไป',
    won: 'คุณได้รับเงินรางวัลทั้งหมด',
    youWon: 'คุณได้รับรางวัล',
    mini: 'MINI',
    major: 'MAJOR',
    grand: 'GRAND',
  },
}

export const translate = (
  currency: Currency,
  key: keyof (typeof Translations)[Currency.VND]
) => {
  try {
    return Translations[currency][key]
  } catch (e) {
    console.warn('Missing Translation', key)
  }
  return key
}
