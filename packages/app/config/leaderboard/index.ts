import rank1 from 'app/assets/images/leaderboard/1.png'
import rank2 from 'app/assets/images/leaderboard/2.png'
import rank3 from 'app/assets/images/leaderboard/3.png'
import rank4 from 'app/assets/images/leaderboard/4.png'
import rank5 from 'app/assets/images/leaderboard/5.png'
import rank6 from 'app/assets/images/leaderboard/6.png'
import rank7 from 'app/assets/images/leaderboard/7.png'
import rank8 from 'app/assets/images/leaderboard/8.png'
import rank9 from 'app/assets/images/leaderboard/9.png'
import rank10 from 'app/assets/images/leaderboard/10.png'

export const getRankingImage = (rank) => {
  switch (rank) {
    case 1:
      return rank1
    case 2:
      return rank2
    case 3:
      return rank3
    case 4:
      return rank4
    case 5:
      return rank5
    case 6:
      return rank6
    case 7:
      return rank7
    case 8:
      return rank8
    case 9:
      return rank9
    case 10:
      return rank10

    default:
      return rank1
  }
}

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
