const enum FIFA_TEAMS {
  Uruguay,
  Tunisia,
  Croatia,
  Poland,
  Denmark,
  Netherlands,
  Portugal,
  England,
  USA,
  Japan,
  Switzerland,
  Germany,
  Spain,
  Belgium,
  Canada,
  Cameroon,
  Morocco,
  Iran,
  France,
  Ghana,
  Senegal,
  Qatar,
  SaudiArabia,
  Ecuador,
  Australia,
  Wales,
  Serbia,
  KoreaRepublic,
  CostaRica,
  Brazil,
  Argentina,
  Mexico,
}

export const FIFA_TEAM: { [key in keyof typeof FIFA_TEAMS] } = {
  Uruguay: {
    id: 152,
    name: 'Uruguay',
    image: require('../../assets/images/fifa/152.png'),
  },
  Tunisia: {
    id: 169,
    name: 'Tunisia',
    image: require('../../assets/images/fifa/169.png'),
  },
  Croatia: {
    id: 171,
    name: 'Croatia',
    image: require('../../assets/images/fifa/171.png'),
  },
  Poland: {
    id: 172,
    name: 'Poland',
    image: require('../../assets/images/fifa/172.png'),
  },
  Denmark: {
    id: 175,
    name: 'Denmark',
    image: require('../../assets/images/fifa/175.png'),
  },
  Netherlands: {
    id: 178,
    name: 'Netherlands',
    image: require('../../assets/images/fifa/178.png'),
  },
  Portugal: {
    id: 182,
    name: 'Portugal',
    image: require('../../assets/images/fifa/182.png'),
  },
  England: {
    id: 184,
    name: 'England',
    image: require('../../assets/images/fifa/184.png'),
  },
  USA: {
    id: 191,
    name: 'USA',
    image: require('../../assets/images/fifa/191.png'),
  },
  Japan: {
    id: 217,
    name: 'Japan',
    image: require('../../assets/images/fifa/217.png'),
  },
  Switzerland: {
    id: 235,
    name: 'Switzerland',
    image: require('../../assets/images/fifa/235.png'),
  },
  Germany: {
    id: 238,
    name: 'Germany',
    image: require('../../assets/images/fifa/238.png'),
  },
  Spain: {
    id: 250,
    name: 'Spain',
    image: require('../../assets/images/fifa/250.png'),
  },
  Belgium: {
    id: 254,
    name: 'Belgium',
    image: require('../../assets/images/fifa/254.png'),
  },
  Canada: {
    id: 264,
    name: 'Canada',
    image: require('../../assets/images/fifa/264.png'),
  },
  Cameroon: {
    id: 269,
    name: 'Cameroon',
    image: require('../../assets/images/fifa/269.png'),
  },
  Morocco: {
    id: 748,
    name: 'Morocco',
    image: require('../../assets/images/fifa/748.png'),
  },
  Iran: {
    id: 818,
    name: 'Iran',
    image: require('../../assets/images/fifa/818.png'),
  },
  France: {
    id: 928,
    name: 'France',
    image: require('../../assets/images/fifa/928.png'),
  },
  Ghana: {
    id: 1064,
    name: 'Ghana',
    image: require('../../assets/images/fifa/1064.png'),
  },
  Senegal: {
    id: 1262,
    name: 'Senegal',
    image: require('../../assets/images/fifa/1262.png'),
  },
  Qatar: {
    id: 1922,
    name: 'Qatar',
    image: require('../../assets/images/fifa/1922.png'),
  },
  SaudiArabia: {
    id: 2133,
    name: 'SaudiArabia',
    image: require('../../assets/images/fifa/2133.png'),
  },
  Ecuador: {
    id: 2793,
    name: 'Ecuador',
    image: require('../../assets/images/fifa/2793.png'),
  },
  Australia: {
    id: 3397,
    name: 'Australia',
    image: require('../../assets/images/fifa/3397.png'),
  },
  Wales: {
    id: 7078,
    name: 'Wales',
    image: require('../../assets/images/fifa/7078.png'),
  },
  Serbia: {
    id: 7804,
    name: 'Serbia',
    image: require('../../assets/images/fifa/7804.png'),
  },
  KoreaRepublic: {
    id: 9917,
    name: 'KoreaRepublic',
    image: require('../../assets/images/fifa/9917.png'),
  },
  CostaRica: {
    id: 12055,
    name: 'CostaRica',
    image: require('../../assets/images/fifa/12055.png'),
  },
  Brazil: {
    id: 18955,
    name: 'Brazil',
    image: require('../../assets/images/fifa/18955.png'),
  },
  Argentina: {
    id: 18956,
    name: 'Argentina',
    image: require('../../assets/images/fifa/18956.png'),
  },
  Mexico: {
    id: 18958,
    name: 'Mexico',
    image: require('../../assets/images/fifa/18958.png'),
  },
}

const FifaTeam = [
  FIFA_TEAM.Uruguay,
  FIFA_TEAM.Tunisia,
  FIFA_TEAM.Croatia,
  FIFA_TEAM.Poland,
  FIFA_TEAM.Denmark,
  FIFA_TEAM.Netherlands,
  FIFA_TEAM.Portugal,
  FIFA_TEAM.England,
  FIFA_TEAM.USA,
  FIFA_TEAM.Japan,
  FIFA_TEAM.Switzerland,
  FIFA_TEAM.Germany,
  FIFA_TEAM.Spain,
  FIFA_TEAM.Belgium,
  FIFA_TEAM.Canada,
  FIFA_TEAM.Cameroon,
  FIFA_TEAM.Morocco,
  FIFA_TEAM.Iran,
  FIFA_TEAM.France,
  FIFA_TEAM.Ghana,
  FIFA_TEAM.Senegal,
  FIFA_TEAM.Qatar,
  FIFA_TEAM.SaudiArabia,
  FIFA_TEAM.Ecuador,
  FIFA_TEAM.Australia,
  FIFA_TEAM.Wales,
  FIFA_TEAM.Serbia,
  FIFA_TEAM.KoreaRepublic,
  FIFA_TEAM.CostaRica,
  FIFA_TEAM.Brazil,
  FIFA_TEAM.Argentina,
  FIFA_TEAM.Mexico,
]

export const getFifaTeam = (teamId: number) => {
  try {
    const logo = FifaTeam.find((el) => el.id === teamId)?.image

    return logo ?? require('../../assets/images/empty-result.png')
  } catch (e) {
    return require('../../assets/images/empty-result.png')
  }
}

export default FifaTeam
