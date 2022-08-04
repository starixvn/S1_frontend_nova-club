/* eslint-disable import/no-anonymous-default-export */
export default {
  label: 'SPORTSBOOK',
  icon: 'sb',
  gameList: [
    {
      image: require('../../assets/images/games/sports/sport-saba.png'),
      game_name: 'game.name.sports',
      game_provider_code: 'SABA',
      game_code: '1',
      desktop: true,
    },
    {
      image: require('../../assets/images/games/sports/sport-sboBet.png'),
      game_name: 'game.name.sbo',
      game_provider_code: 'SBO',
      game_code: '0',
      desktop: true,
    },
    {
      image: require('../../assets/images/games/sports/sport-bti.png'),
      game_name: 'game.name.btiSports',
      game_provider_code: 'BTI',
      game_code: '1',
      desktop: true,
    },
    {
      image: require('../../assets/images/games/sports/sport-virtual.png'),
      game_name: 'game.name.virtualSports',
      game_provider_code: 'SABA',
      game_code: '1',
      desktop: true,
    },
    {
      image: require('../../assets/images/games/sports/sport-sabaEsport.png'),
      game_name: 'game.name.esports',
      game_provider_code: 'SABA',
      game_code: '43',
      desktop: true,
    },
    {
      image: require('../../assets/images/games/sports/sport-imEsport.png'),
      game_name: 'game.name.imEsports',
      game_provider_code: 'IM',
      game_code: 'esports',
    },
    {
      image: require('../../assets/images/games/sports/sport-TG.png'),
      game_name: 'game.name.tfGamingEsports',
      game_provider_code: 'TFGM',
      game_code: 'COMBO',
    },
  ],
}
