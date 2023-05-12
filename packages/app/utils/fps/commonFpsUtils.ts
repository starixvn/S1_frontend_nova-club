export function RC4(key: string, value: string) {
  const ks = [...key]
  const vs = [...value]
  const c = key.length
  const d = value.length
  let i = 0
  const s: any[] = []
  for (i = 0; i < 256; i++) {
    s[i] = i
  }
  let j = 0
  let x
  for (i = 0; i < 256; i++) {
    j = (j + s[i] + ks[i % c].charCodeAt(0)) % 256
    x = s[i]
    s[i] = s[j]
    s[j] = x
  }
  i = 0
  j = 0
  let ct = ''
  for (let y = 0; y < d; y++) {
    i = (i + 1) % 256
    j = (j + s[i]) % 256
    x = s[i]
    s[i] = s[j]
    s[j] = x
    ct += String.fromCharCode(vs[y].charCodeAt(0) ^ s[(s[i] + s[j]) % 256])
  }
  return ct
}

export function encodeToHex(data: string) {
  const HexDigit = '0123456789abcdef'
  const b16_digits = HexDigit
  const b16_map: string[] = []

  for (let i = 0; i < 256; i++) {
    b16_map[i] = ''.concat(b16_digits[i >> 4], b16_digits[i & 15])
  }

  const c = data.length
  const result = []
  for (let i = 0; i < c; i++) {
    result.push(b16_map[data[i].charCodeAt(0)])
  }
  return result.join('')
}
