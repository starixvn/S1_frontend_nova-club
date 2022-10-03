import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  MEMBER_TYPE,
  OverviewResult,
  OverviewSummaryResult,
  PlayerLangArgs,
  PlayerOverviewArgs,
  ProfileResult,
  ProfileUpdateArgs,
  ReportArgs,
  ReportResult,
} from './playerApi.type'

const playerApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    playerProfile: builder.query<IResponse<ProfileResult>, void>({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerProfile`,
        method: 'POST',
      }),
    }),
    sendUpdateProfileOTP: builder.mutation<IResponse<string>, void>({
      query: (queryArgs) => ({
        url: `/player_api/updateRealNameOtp`,
        method: 'POST',
      }),
    }),
    updateProfile: builder.mutation<
      IResponse<ProfileResult>,
      ProfileUpdateArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/playerProfile`,
        method: 'PUT',
        data: {
          ...queryArgs,
        },
      }),
      async onQueryStarted(
        { field, value, ...patch },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled
          if (data.code == 0) {
            dispatch(
              playerApi.util.updateQueryData(
                'playerProfile',
                undefined,
                (draft) => {
                  if (draft.data) {
                    Object.assign(draft.data, { [field]: value })
                    console.log(
                      'Profile Data Pessimistically updated to : ',
                      draft.data
                    )
                  }
                }
              )
            )
          }
        } catch {}
      },
    }),
    playerOverview: builder.query<
      OverviewResult | undefined,
      PlayerOverviewArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerOverview`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      transformResponse: (
        res: IResponse<OverviewResult>
      ): OverviewResult | undefined => {
        return res.data
      },
    }),
    playerOverviewSummary: builder.query<
      IResponse<OverviewSummaryResult> | undefined,
      void
    >({
      query: () => ({
        url: `/player_api/getPlayerOverviewSummary`,
        method: 'POST',
      }),
    }),
    playerReport: builder.query<
      IResponse<ReportResult> | undefined,
      ReportArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerReport`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      providesTags: ['Report'],
    }),
    playerLang: builder.mutation<string, PlayerLangArgs>({
      query: ({ lang }) => ({
        url: `/player_api/lang`,
        method: 'PUT',
        data: {
          lang,
        },
      }),
    }),
  }),
})

type usePlayerProfileQueryArgs = Parameters<
  typeof playerApi.usePlayerProfileQuery
>

export const usePlayerProfileQuery = (
  _?: void,
  options?: usePlayerProfileQueryArgs[1]
) => {
  return playerApi.usePlayerProfileQuery(undefined, {
    selectFromResult: (s) => {
      return {
        ...s,
        data: s.data?.data,
        isCreditMember: true, // s.data?.data?.member_type === MEMBER_TYPE.CREDIT,
      }
    },
    ...options,
  })
}

export const {
  usePlayerReportQuery,
  usePlayerOverviewQuery,
  usePlayerOverviewSummaryQuery,
  useLazyPlayerProfileQuery,
  useLazyPlayerReportQuery,
  usePlayerLangMutation,
  useUpdateProfileMutation,
  useSendUpdateProfileOTPMutation,
} = playerApi
