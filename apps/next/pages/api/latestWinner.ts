import { Currency, GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'utils/constant'
import random from 'lodash/random'
import sampleSize from 'lodash/sampleSize'
import { Game, LatestWinner, LatestWinnerType } from 'services/gameApi.type'
import { generateUsername } from 'unique-username-generator'

export default async function handler(req, res) {
  let type = req.query.type as LatestWinnerType
  let currency = (req.query.currency as Currency) ?? Currency.VND
  let games: Game[] = []

  try {
    if (!Object.values(LatestWinnerType).includes(type)) {
      type = LatestWinnerType.Games
    }
    switch (type) {
      case LatestWinnerType.Slot: {
        games = await requestSlotGameList(currency)
        break
      }
      case LatestWinnerType.Games: {
        console.log('requesting games')
        games = await requestGamesGameList(currency)
        break
      }

      default: {
        console.warn('unmatched game type for latest winner')
      }
    }

    const selectedGames = sampleSize(games, 50).map((g) => ({
      username: generateUsername('', 4, 14).replace(
        /(?<=\w{2})\w(?=\w{2})/g,
        '*'
      ),
      amount: random(10000, 5000000),
      game: g,
    })) as LatestWinner[]

    res.status(200).json(selectedGames)
  } catch (e) {
    console.log('latest winner api error', e)

    res.status(200).json([])
  }
}

async function requestGameList(
  currency: Currency,
  game_category: GAME_TYPE_CODE[] = [],
  gdc_game_category: GDC_GAME_CATEGORY[] = []
) {
  let games: Game[] = []
  try {
    if (game_category) {
      const resp = await fetch(
        `${process.env.API_DOMAIN}/static_api/v1/getGameList`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            api_key: process.env.API_KEY,
          },
          body: JSON.stringify({
            currency,
            game_category,
            limit: 9999,
            offset: 0,
            gdc_game_category: [],
          }),
        }
      )
        .then((r) => r.json())
        .then((r) => {
          return r.data?.rows
        })

      if (resp) games = games.concat(resp)
    }

    if (gdc_game_category) {
      const resp = await fetch(
        `${process.env.API_DOMAIN}/static_api/v1/getGameList`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            api_key: process.env.API_KEY,
          },
          body: JSON.stringify({
            currency,
            game_category,
            limit: 9999,
            offset: 0,
            gdc_game_category: [],
          }),
        }
      )
        .then((r) => r.json())
        .then((r) => {
          return r.data?.rows
        })

      if (resp) games = games.concat(resp)
    }

    return games
  } catch (e) {
    console.log('api error', e)
    return games
  }
}

function requestSlotGameList(currency: Currency) {
  return requestGameList(currency, [
    GAME_TYPE_CODE.SLOTS,
    GAME_TYPE_CODE.FISHING,
  ])
}

function requestGamesGameList(currency: Currency) {
  return requestGameList(
    currency,
    [GAME_TYPE_CODE.GAMES, GAME_TYPE_CODE.FISHING, GAME_TYPE_CODE.LOTTERY],
    [GDC_GAME_CATEGORY.CARDGAME]
  )
}
