export const getRankStatusImage = (status) => {
  switch (status) {
    case 'r':
      return 'white'
    case 'u':
      return '#56FE66'
    case 'd':
      return '#F30106'

    default:
      return '#56FE66'
  }
}
