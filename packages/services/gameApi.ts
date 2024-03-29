import { Currency, DEFAULT_CURRENCY } from 'utils/constant'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  FeaturedGame,
  Game,
  GameCategoryTagResult,
  GameCategoryTagTypes,
  GameConfig,
  GameListQueryArgs,
  GameScreenMultipleRequest,
  GetFeaturedGameListResult,
  GetGameListByCategoriesArgs,
  GetGameListByTagsArgs,
  GetGameListQueryArgs,
  GetGameListResult,
  GetGameUrlQueryArgs,
  GetGameUrlResult,
  GotoGameResult,
  LatestWinner,
  LatestWinnerType,
  LaunchGameWithHTML,
  LaunchGameWithUrl,
  ProviderStatus,
} from './gameApi.type'
import uniqWith from 'lodash/uniqWith'
import { createSelector } from '@reduxjs/toolkit'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */

const GAME_BY_TAG_LIMIT = 20
const GAME_BY_CATEGORY_LIMIT = 100

export const gameApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    goToGame: builder.mutation<IResponse<GotoGameResult>, GetGameUrlQueryArgs>({
      query: ({ token, ...params }) => ({
        url: `/player_api/gotogame`,
        data: params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
    }),
    demoGame: builder.mutation<
      IResponse<GetGameUrlResult>,
      GetGameUrlQueryArgs
    >({
      query: (params) => ({
        url: `/static_api/v1/gotodemogame`,
        data: params,
      }),
    }),
    gameList: builder.query<IResponse<GameConfig[]>, GameListQueryArgs>({
      query: (data) => ({
        url: `/player_api/v1/getGameList`,
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
        url: `/static_api/v1/getGameList`,
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
    getGameListByTags: builder.query<Game[], GetGameListByTagsArgs>({
      query: (query) => ({
        url: `/static_api/v1/getGameList`,
        method: 'POST',
        data: {
          game_category: [],
          limit: query.limit || GAME_BY_TAG_LIMIT,
          offset: 0,
          gdc_game_category: [],
          gdc_tag: query.tags,
        },
        _config: {
          isStaticApi: true,
        },
      }),
      transformResponse: ({ data }: { data: GetGameListResult }) => {
        return data?.rows ?? []
      },
    }),
    getGameListByCategory: builder.query<Game[], GetGameListByCategoriesArgs>({
      query: ({ categories, currency }) => ({
        url: `/static_api/v1/getGameList`,
        method: 'POST',
        data: {
          currency,
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
    featuredGameList: builder.query<FeaturedGame[], Currency>({
      query: (currency = DEFAULT_CURRENCY) => ({
        url: `/static_api/v1/getFeaturedGameList`,
        data: {
          currency,
        },
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
              url: '/static_api/v1/getGameList',
              method: 'POST',
              data: {
                currency: _arg.currency,
                game_category: _arg.game_category,
                limit: 4000,
                offset: 0,
              },
              _config: {
                isStaticApi: true,
              },
            })

            if (gcFilterResp.data?.data?.rows)
              results = results.concat(gcFilterResp.data?.data?.rows)
          }
          if (_arg.gdc_game_category) {
            const gdcFilterResp = await fetch({
              url: '/static_api/v1/getGameList',
              method: 'POST',
              data: {
                currency: _arg.currency,
                game_category: [],
                limit: 4000,
                offset: 0,
                gdc_game_category: _arg.gdc_game_category,
              },
              _config: {
                isStaticApi: true,
              },
            })

            if (gdcFilterResp.data?.data?.rows)
              results = results.concat(gdcFilterResp.data?.data?.rows)
          }

          return {
            data: uniqWith(
              results,
              (a: Game, b: Game) => a.gpc === b.gpc && a.gc === b.gc
            ),
            // data: results,
          }
        } catch (e) {
          console.log('error', e)
          return {
            error: {},
          }
        }
      },
    }),
    latestWinner: builder.query<
      LatestWinner[],
      { type: LatestWinnerType; currency: Currency }
    >({
      async queryFn(_arg, _queryApi, _extraOptions, fetch) {
        try {
          const resp = await fetch({
            baseUrl: '/',
            url: `${window.location.origin}/api/latestWinner?type=${_arg.type}&currency=${_arg.currency}`,
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
    gameProviderList: builder.query<Record<string, ProviderStatus>, Currency>({
      query: (currency = DEFAULT_CURRENCY) => ({
        url: `/static_api/v1/getGameProviderList/${currency}`,
        method: 'GET',
      }),
      transformResponse: (resp: IResponse<Record<string, ProviderStatus>>) => {
        const providers = resp.data ?? {}
        return Object.keys(providers).reduce((acc, providerId) => {
          const provider = providers[providerId]
          if (provider) acc[provider?.system_code] = provider

          return acc
        }, {})
      },
    }),
    gameCategoryTagTypes: builder.query<GameCategoryTagTypes[], Currency>({
      query: (currency = DEFAULT_CURRENCY) => ({
        url: `/static_api/v1/getGameCategoryTagTypes/${currency}`,
        method: 'GET',
      }),
      transformResponse: ({ data }: { data: GameCategoryTagResult }) => {
        return data?.rows ?? []
      },
    }),
  }),
})

export const selectFeaturedGameByCategory = createSelector(
  (res: { data?: FeaturedGame[] }) => res.data,
  (res: { data?: FeaturedGame[] }, catergoryId: string) => catergoryId,
  (data: FeaturedGame[] | undefined, catergoryId: string) =>
    data?.filter((g) => g.cat === catergoryId)
)

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
  useGameCategoryTagTypesQuery,
} = gameApi
