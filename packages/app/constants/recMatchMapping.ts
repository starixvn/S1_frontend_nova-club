export const MatchNameMapping = {
  'Manchester United': 'Man Utd',
  'Manchester City': 'Man City',
  'Leicester City': 'Leicester',
  'Tottenham Hotspur': 'Spurs',
  'West Ham United': 'West Ham',
  'Leeds United': 'Leeds',
  'Wolverhampton Wanderers': 'Wolves',
  'Newcastle United': 'Newcastle',
  'West Bromwich Albion': 'West Brom',
  'AFC Bournemouth': 'Bournemouth',
  'Brighton & Hove Albion': 'Brighton',
  'Nottingham Forest': 'Nottm Forest',
  'Birmingham City': 'Birmingham',
  'Coventry City': 'Coventry',
  'Huddersfield Town': 'Huddersfield',
  'Norwich City': 'Norwich',
  'Preston North End': 'Preston',
  'Queens Park Rangers': 'QPR',
  'Rotherham United': 'Rotherham',
  'Stoke City': 'Stoke',
  'Swansea City': 'Swansea',
  'Wigan Athletic': 'Wigan',
  'Borussia Dortmund': 'Dortmund',
  'Paris Saint Germain': 'PSG',
  'Bayern Munchen': 'Bayern',
  'Eintracht Frankfurt': 'SGE',
  'TSG 1899 Hoffenheim': 'Hoffenheim',
  'Bayer 04 Leverkusen ': 'Leverkusen',
  'Atletico de Madrid': 'Atletico',
  'FC Heidenheim 1846': 'FC Heidenheim',
}

export enum MatchLeagueId {
  ENGLISH_PREMIER_LEAGUE = 3,
  ITALY_SERIE_A = 4,
  GERMANY_BUNDESLIGA_I = 5,
  SPAIN_PRIMERA_LALIGA = 43,
  UEFA_CHAMPIONS_LEAGUE = 1837,
  EURO_CUP = 141197,
  EURO_SELECTOR = 1,
}

export const MatchLeagueColorMapping = {
  [MatchLeagueId.ENGLISH_PREMIER_LEAGUE]: '#3D195B',
  [MatchLeagueId.ITALY_SERIE_A]: '#338FD7',
  [MatchLeagueId.GERMANY_BUNDESLIGA_I]: '#D10214',
  [MatchLeagueId.SPAIN_PRIMERA_LALIGA]: '#F57D06',
  [MatchLeagueId.UEFA_CHAMPIONS_LEAGUE]: '#03024B',
}

export const MatchLeagueLogoMapping = {
  [MatchLeagueId.ENGLISH_PREMIER_LEAGUE]: 'epl.png',
  [MatchLeagueId.ITALY_SERIE_A]: 'isa.png',
  [MatchLeagueId.GERMANY_BUNDESLIGA_I]: 'bdl.png',
  [MatchLeagueId.SPAIN_PRIMERA_LALIGA]: 'sl.png',
  [MatchLeagueId.UEFA_CHAMPIONS_LEAGUE]: 'ucl.png',
  [MatchLeagueId.EURO_CUP]: 'ucl.png',
}

export const MatchLeagueTabIconMapping = {
  [MatchLeagueId.ENGLISH_PREMIER_LEAGUE]: 'sport-gbl',
  [MatchLeagueId.ITALY_SERIE_A]: 'sport-isa',
  [MatchLeagueId.GERMANY_BUNDESLIGA_I]: 'sport-gb',
  [MatchLeagueId.SPAIN_PRIMERA_LALIGA]: 'sport-sl',
  [MatchLeagueId.UEFA_CHAMPIONS_LEAGUE]: 'sport-uefa',
  [MatchLeagueId.EURO_CUP]: 'sport-euro-cup',
  [MatchLeagueId.EURO_SELECTOR]: 'sport-euro-cup',
}

export enum MatchHandicapType {
  FULL_TIME = 1,
  FULL_TIME_OVER = 3,
  FULL_TIME_DOUBLE = 5,
  FULL_TIME_OVER_UNDER = 2,
  HALF_TIME = 7,
  HALF_TIME_OVER = 8,
  HALF_TIME_DOUBLE = 15,
}

export enum LEAGUE_SECTION {
  EURO_MATCH = 'euro-match',
  EURO_STANDINGS = 'euro-standings',
  EURO_ODDS = 'euro-odds',
  LEAGUE_ODDS = 'league-odds',
}
