import { Currency } from 'app/utils/constant'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  FeaturedGame,
  Game,
  GameConfig,
  GameListQueryArgs,
  GameScreenMultipleRequest,
  GetFeaturedGameListResult,
  GetGameListQueryArgs,
  GetGameListResult,
  GetGameUrlQueryArgs,
  GetGameUrlResult,
  LatestWinner,
  LatestWinnerType,
  ProviderStatus,
} from './gameApi.type'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */

const GAME_BY_TAG_LIMIT = 30
const GAME_BY_CATEGORY_LIMIT = 100

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
    getGameListByTags: builder.query<Game[], string[]>({
      query: (tags) => ({
        url: `/static_api/getGameList`,
        method: 'POST',
        data: {
          currency: Currency.VND,
          game_category: [],
          limit: GAME_BY_TAG_LIMIT,
          offset: 0,
          gdc_game_category: [],
          gdc_tag: tags,
        },
        _config: {
          isStaticApi: true,
        },
      }),
      transformResponse: ({ data }: { data: GetGameListResult }) => {
        return data?.rows ?? []
      },
    }),
    getGameListByCategory: builder.query<Game[], string[]>({
      query: (categories) => ({
        url: `/static_api/getGameList`,
        method: 'POST',
        data: {
          currency: Currency.VND,
          game_category: categories,
          limit: GAME_BY_CATEGORY_LIMIT,
          offset: 0,
          gdc_game_category: [],
          gdc_tag: [],
        },
        _config: {
          isStaticApi: true,
        },
      }),
      transformResponse: ({ data }: { data: GetGameListResult }) => {
        return data?.rows ?? []
      },
    }),
    featuredGameList: builder.query<FeaturedGame[], void>({
      query: () => ({
        url: `/static_api/getFeaturedGameList`,
      }),
      transformResponse: ({ data }: { data: GetFeaturedGameListResult }) => {
        return data?.rows ?? []
      },
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
    latestWinner: builder.query<LatestWinner[], LatestWinnerType>({
      async queryFn(_arg, _queryApi, _extraOptions, fetch) {
        try {
          const resp = await fetch({
            baseUrl: '/',
            url: `${window.location.origin}/api/latestWinner?type=${_arg}`,
            method: 'GET',
          })

          return {
            data: resp.data,
          }
        } catch (e) {
          return {
            data: [],
          }
        }
      },
    }),
    gameProviderList: builder.query<Record<string, ProviderStatus>, void>({
      query: () => ({
        url: `/static_api/getGameProviderList`,
        method: 'GET',
      }),
      transformResponse: (resp: IResponse<Record<string, ProviderStatus>>) => {
        const providers = resp.data ?? {}
        return Object.keys(providers).reduce((acc, providerId) => {
          console.log('providerId', providerId)
          const provider = providers[providerId]
          if (provider) acc[provider?.system_code] = provider

          return acc
        }, {})
      },
    }),
    demoGame: builder.mutation<FeaturedGame[], void>({
      query: () => ({
        url: `/static_api/gotodemogame`,
      }),
    }),
  }),
})

export const {
  useGoToGameMutation,
  useFeaturedGameListQuery,
  useGameListMultipleQuery,
  useGameListQuery,
  useGetGameListQuery,
  useGetGameListByTagsQuery,
  useGetGameListByCategoryQuery,
  useLatestWinnerQuery,
  useDemoGameMutation,
  useGameProviderListQuery,
} = gameApi
