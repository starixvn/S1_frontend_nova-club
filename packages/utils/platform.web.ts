export function getOs() {
  if (navigator.userAgent.match(/Android/i)) return 'android'
  else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) return 'ios'
  else return 'any'
}
