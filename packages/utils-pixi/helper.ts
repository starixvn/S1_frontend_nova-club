export function checkRedeemSuccess(data) {
  if (data.err) {
    console.log('data err', data.err)
    //failed
    return false
  } else {
    const code = Number(data.code)
    if (data.code === '' || (data.code !== '_ZERO_' && isNaN(code))) {
      console.log('code is empty', data.code, isNaN(code))
      //failed
      return false
    } else {
      return true
    }
  }
}

export function toThousandSeparator(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
