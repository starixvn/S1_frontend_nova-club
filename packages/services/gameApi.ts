import { Currency } from 'app/utils/constant'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  Game,
  GameConfig,
  GameListQueryArgs,
  GameScreenMultipleRequest,
  GetGameListQueryArgs,
  GetGameListResult,
  GetGameUrlQueryArgs,
  GetGameUrlResult,
} from './gameApi.type'
import { sleep } from 'utils/common'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
export const gameApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    goToGame: builder.mutation<
      IResponse<GetGameUrlResult>,
      GetGameUrlQueryArgs
    >({
      query: ({ token, ...params }) => ({
        url: `/player_api/gotogame`,
        data: params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
    }),
    gameList: builder.query<IResponse<GameConfig[]>, GameListQueryArgs>({
      query: (data) => ({
        url: `/player_api/getGameList`,
        data,
      }),
    }),
    getGameList: builder.query<
      IResponse<GetGameListResult>,
      GetGameListQueryArgs
    >({
      query: ({
        currency,
        game_category,
        limit,
        offset,
        gdc_game_category,
        gdc_tag,
      }) => ({
        url: `/static_api/getGameList`,
        method: 'POST',
        data: {
          currency,
          game_category,
          limit,
          offset,
          gdc_game_category,
          gdc_tag,
        },
        _config: {
          isStaticApi: true,
        },
      }),
    }),
    featuredGameList: builder.query<IResponse<GetGameListResult>, string>({
      query: (data) => ({
        url: `/static_api/getFeaturedGameList`,
        data,
      }),
    }),
    gameListMultiple: builder.query<Game[], GameScreenMultipleRequest>({
      async queryFn(_arg, _queryApi, _extraOptions, fetch) {
        try {
          let results = []
          if (_arg.game_category) {
            const gcFilterResp = await fetch({
              url: '/static_api/getGameList',
              method: 'POST',
              data: {
                currency: Currency.VND,
                game_category: _arg.game_category,
                limit: 9999,
                offset: 0,
              },
              _config: {
                isStaticApi: true,
              },
            })

            results = results.concat(gcFilterResp.data?.data?.rows)
          }
          if (_arg.gdc_game_category) {
            const gdcFilterResp = await fetch({
              url: '/static_api/getGameList',
              method: 'POST',
              data: {
                currency: Currency.VND,
                game_category: [],
                limit: 4000,
                offset: 0,
                gdc_game_category: _arg.gdc_game_category,
              },
              _config: {
                isStaticApi: true,
              },
            })

            results = results.concat(gdcFilterResp.data?.data?.rows)
          }

          console.log('results', results.length)

          return {
            data: results,
          }
        } catch (e) {
          console.log('error', e)
          return {
            error: {},
          }
        }
      },
    }),
  }),
})

export const {
  useGoToGameMutation,
  useFeaturedGameListQuery,
  useGameListMultipleQuery,
  useGameListQuery,
  useGetGameListQuery,
} = gameApi
